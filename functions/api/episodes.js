/**
 * Cloudflare Pages Function — GET /api/episodes
 *
 * Returns the latest videos from the Kochmon Podcast YouTube channel as JSON.
 *
 * Uses YouTube's public RSS feed, so there is no API key and no quota to manage.
 * The feed is fetched from Cloudflare's edge (the browser can't fetch it directly
 * because YouTube sends no CORS headers) and cached for an hour.
 *
 * Optional environment variables (Pages → Settings → Environment variables):
 *   YT_CHANNEL_ID  UC-style channel id. Set this to skip handle resolution.
 *   YT_HANDLE      channel handle without the @ (default: Kochmon_podcast1)
 */

const DEFAULT_HANDLE = 'Kochmon_podcast1';
// Kochmon Podcast. Hardcoded so we never depend on scraping the channel page,
// which YouTube may answer with a consent wall or bot check.
const DEFAULT_CHANNEL_ID = 'UC8JyIR56W9pxa-9riSs4OXg';
const CACHE_SECONDS = 3600; // 1 hour
const MAX_EPISODES = 12;
const UA =
  'Mozilla/5.0 (compatible; NurkyzPortfolio/1.0; +https://github.com/alancrm77-lab/nurkyz-portfolio)';

export async function onRequestGet(context) {
  const { request, env, waitUntil } = context;
  const url = new URL(request.url);
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '3', 10) || 3, MAX_EPISODES);
  const debug = url.searchParams.get('debug') === '1';

  // ?debug=1 reports how far the lookup got. Reaching this at all proves the
  // Pages Function is deployed and routing correctly.
  const trace = [];

  // Serve from the edge cache when we can (never for debug requests).
  const cache = caches.default;
  const cacheKey = new Request(`${url.origin}${url.pathname}?limit=${limit}`, { method: 'GET' });
  if (!debug) {
    const cached = await cache.match(cacheKey);
    if (cached) return cached;
  }

  try {
    const channelId = await resolveChannelId(env, trace);
    const episodes = (await fetchFeed(channelId, trace)).slice(0, limit);

    if (debug) return json({ ok: true, channelId, count: episodes.length, trace, episodes }, 200, 0);

    const response = json({ channelId, episodes }, 200, CACHE_SECONDS);
    waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  } catch (err) {
    const message = String(err && err.message ? err.message : err);
    // Don't cache failures for long — the site falls back to its built-in list.
    return json({ ok: false, error: message, trace, episodes: [] }, debug ? 200 : 502, debug ? 0 : 60);
  }
}

function json(body, status, maxAge) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': `public, max-age=${maxAge}`,
      'access-control-allow-origin': '*',
    },
  });
}

/**
 * Resolve the UC… channel id, either from config or by scraping the channel page.
 *
 * YouTube can answer datacenter IPs with a consent interstitial or a bot check,
 * so we send consent cookies, force English, and try a few entry points before
 * giving up. Setting YT_CHANNEL_ID skips all of this.
 */
async function resolveChannelId(env, trace = []) {
  if (env && env.YT_CHANNEL_ID) {
    trace.push('channel id from YT_CHANNEL_ID env var');
    return env.YT_CHANNEL_ID;
  }
  // Only fall through to scraping if the handle was overridden, since the
  // hardcoded id belongs to the default handle.
  if (DEFAULT_CHANNEL_ID && !(env && env.YT_HANDLE)) {
    trace.push('channel id from built-in default');
    return DEFAULT_CHANNEL_ID;
  }

  const handle = (env && env.YT_HANDLE) || DEFAULT_HANDLE;
  const candidates = [
    `https://www.youtube.com/@${handle}`,
    `https://www.youtube.com/@${handle}/videos`,
    `https://m.youtube.com/@${handle}`,
  ];

  for (const target of candidates) {
    try {
      const res = await fetch(`${target}?hl=en&persist_hl=1`, {
        headers: {
          'user-agent': UA,
          'accept-language': 'en-US,en;q=0.9',
          // Skips the EU consent interstitial that otherwise hides the page markup.
          cookie: 'CONSENT=YES+cb; SOCS=CAI',
        },
        cf: { cacheTtl: CACHE_SECONDS, cacheEverything: true },
      });
      const html = res.ok ? await res.text() : '';
      trace.push(`GET ${target} → ${res.status}${res.ok ? ` (${html.length} bytes)` : ''}`);
      if (!res.ok) continue;

      const id = extractChannelId(html);
      if (id) {
        trace.push(`resolved channel id ${id}`);
        return id;
      }
      trace.push('no channel id in markup (consent wall or bot check?)');
    } catch (err) {
      trace.push(`GET ${target} threw ${err && err.message}`);
    }
  }

  throw new Error(
    'could not resolve channel id from handle — set the YT_CHANNEL_ID environment variable in Cloudflare Pages',
  );
}

function extractChannelId(html) {
  const patterns = [
    /"channelId":"(UC[0-9A-Za-z_-]{22})"/,
    /"externalId":"(UC[0-9A-Za-z_-]{22})"/,
    /youtube\.com\/channel\/(UC[0-9A-Za-z_-]{22})/,
    /<meta[^>]+itemprop="channelId"[^>]+content="(UC[0-9A-Za-z_-]{22})"/,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return m[1];
  }
  return null;
}

/** Fetch and parse the channel's Atom feed. */
async function fetchFeed(channelId, trace = []) {
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`;
  const res = await fetch(feedUrl, {
    headers: { 'user-agent': UA, 'accept-language': 'en-US,en;q=0.9' },
    cf: { cacheTtl: CACHE_SECONDS, cacheEverything: true },
  });
  trace.push(`GET feed → ${res.status}`);
  if (!res.ok) throw new Error(`feed returned ${res.status} for channel ${channelId}`);

  const xml = await res.text();
  const episodes = parseFeed(xml);
  trace.push(`parsed ${episodes.length} entries from ${xml.length} bytes`);
  if (!episodes.length) throw new Error('feed contained no entries');
  return episodes;
}

/**
 * Minimal Atom parsing. Workers have no DOMParser, and the feed shape is stable,
 * so targeted regexes are sufficient here.
 */
function parseFeed(xml) {
  const episodes = [];
  const entries = xml.split('<entry>').slice(1);

  for (const entry of entries) {
    const videoId = pick(entry, /<yt:videoId>([^<]+)<\/yt:videoId>/);
    const title = decodeEntities(pick(entry, /<title>([\s\S]*?)<\/title>/));
    if (!videoId || !title) continue;

    episodes.push({
      videoId,
      title,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      published: pick(entry, /<published>([^<]+)<\/published>/),
      thumbnail:
        pick(entry, /<media:thumbnail[^>]*url="([^"]+)"/) ||
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      views: toInt(pick(entry, /<media:statistics[^>]*views="(\d+)"/)),
      episodeNumber: parseEpisodeNumber(title),
    });
  }
  return episodes;
}

function pick(text, re) {
  const m = text.match(re);
  return m ? m[1].trim() : '';
}

function toInt(value) {
  const n = parseInt(value, 10);
  return Number.isFinite(n) ? n : null;
}

/** Pull an episode number out of the title when the title carries one. */
function parseEpisodeNumber(title) {
  const patterns = [
    /#\s*(\d{1,4})/i,
    /\bep(?:isode)?\.?\s*(\d{1,4})/i,
    // \b is ASCII-only in JS, so it never matches before a Cyrillic letter.
    /(?:^|[^\p{L}])выпуск\s*№?\s*(\d{1,4})/iu,
    /^\s*(\d{1,4})\s*[.|—–-]/,
  ];
  for (const re of patterns) {
    const m = title.match(re);
    if (m) return m[1];
  }
  return null;
}

function decodeEntities(str) {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(parseInt(code, 10)))
    .replace(/&amp;/g, '&');
}
