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
const CACHE_SECONDS = 3600; // 1 hour
const MAX_EPISODES = 12;
const UA =
  'Mozilla/5.0 (compatible; NurkyzPortfolio/1.0; +https://github.com/alancrm77-lab/nurkyz-portfolio)';

export async function onRequestGet(context) {
  const { request, env, waitUntil } = context;
  const url = new URL(request.url);
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '3', 10) || 3, MAX_EPISODES);

  // Serve from the edge cache when we can.
  const cache = caches.default;
  const cacheKey = new Request(`${url.origin}${url.pathname}?limit=${limit}`, { method: 'GET' });
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  try {
    const channelId = await resolveChannelId(env);
    const episodes = (await fetchFeed(channelId)).slice(0, limit);

    const response = json({ channelId, episodes }, 200, CACHE_SECONDS);
    waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  } catch (err) {
    // Don't cache failures for long — the site falls back to its built-in list.
    return json({ error: String(err && err.message ? err.message : err), episodes: [] }, 502, 60);
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

/** Resolve the UC… channel id, either from config or from the channel page. */
async function resolveChannelId(env) {
  if (env && env.YT_CHANNEL_ID) return env.YT_CHANNEL_ID;

  const handle = (env && env.YT_HANDLE) || DEFAULT_HANDLE;
  const res = await fetch(`https://www.youtube.com/@${handle}`, {
    headers: { 'user-agent': UA, 'accept-language': 'en' },
    cf: { cacheTtl: CACHE_SECONDS, cacheEverything: true },
  });
  if (!res.ok) throw new Error(`channel page returned ${res.status}`);

  const html = await res.text();
  const match =
    html.match(/"channelId":"(UC[0-9A-Za-z_-]{22})"/) ||
    html.match(/youtube\.com\/channel\/(UC[0-9A-Za-z_-]{22})/) ||
    html.match(/"externalId":"(UC[0-9A-Za-z_-]{22})"/);
  if (!match) throw new Error('could not resolve channel id from handle');
  return match[1];
}

/** Fetch and parse the channel's Atom feed. */
async function fetchFeed(channelId) {
  const res = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`,
    {
      headers: { 'user-agent': UA },
      cf: { cacheTtl: CACHE_SECONDS, cacheEverything: true },
    },
  );
  if (!res.ok) throw new Error(`feed returned ${res.status}`);
  return parseFeed(await res.text());
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
