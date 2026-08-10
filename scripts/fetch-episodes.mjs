/**
 * Fetches the latest videos from the Kochmon Podcast YouTube channel and writes
 * them to episodes.json, which the site loads at runtime.
 *
 * Run by .github/workflows/update-episodes.yml on a schedule, so new uploads
 * reach the site without anyone touching the code. Uses YouTube's public RSS
 * feed — no API key, no quota.
 *
 *   node scripts/fetch-episodes.mjs
 *
 * Environment: YT_CHANNEL_ID overrides the channel, COUNT the number of entries.
 */

import { readFile, writeFile } from 'node:fs/promises';

const CHANNEL_ID = process.env.YT_CHANNEL_ID || 'UC8JyIR56W9pxa-9riSs4OXg';
const COUNT = Number(process.env.COUNT || 6);
const OUTPUT = new URL('../episodes.json', import.meta.url);

const main = async () => {
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(CHANNEL_ID)}`;
  const res = await fetch(feedUrl, {
    headers: {
      'user-agent': 'Mozilla/5.0 (compatible; NurkyzPortfolio/1.0)',
      'accept-language': 'en-US,en;q=0.9',
    },
  });
  if (!res.ok) throw new Error(`feed returned ${res.status}`);

  const episodes = parseFeed(await res.text()).slice(0, COUNT);
  if (!episodes.length) throw new Error('feed contained no entries');

  // Only rewrite when the channel actually changed. The file is committed by CI,
  // so stamping a fresh timestamp every run would produce a commit — and a
  // redeploy — every few hours for no reason.
  const previous = await readFile(OUTPUT, 'utf8').catch(() => null);
  if (previous) {
    const before = JSON.parse(previous).episodes;
    if (JSON.stringify(before) === JSON.stringify(episodes)) {
      console.log(`No change — ${episodes.length} episodes already current.`);
      return;
    }
  }

  const payload = {
    channelId: CHANNEL_ID,
    updated: new Date().toISOString(),
    episodes,
  };
  await writeFile(OUTPUT, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`Wrote ${episodes.length} episodes:`);
  for (const ep of episodes) console.log(`  ${ep.published.slice(0, 10)}  ${ep.title}`);
};

/**
 * Minimal Atom parsing. The feed shape is stable, so targeted regexes avoid
 * pulling in an XML dependency.
 */
export function parseFeed(xml) {
  const episodes = [];

  for (const entry of xml.split('<entry>').slice(1)) {
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
export function parseEpisodeNumber(title) {
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

export function decodeEntities(str) {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(parseInt(code, 10)))
    .replace(/&amp;/g, '&');
}

// Only run when executed directly, so the parser can be imported by tests.
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(`Failed to update episodes: ${err.message}`);
    process.exit(1);
  });
}
