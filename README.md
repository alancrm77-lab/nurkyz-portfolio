# Nurkyz — Portfolio

A vibrant, bilingual (EN/RU) one-page portfolio for **Nurkyz**, lifestyle creator and host of the *Kochmon Podcast*. Built as a zero-build static site.

## Tech

Plain HTML, CSS and vanilla JS — no framework, no build step.

| File | Purpose |
| --- | --- |
| `index.html` | Page structure |
| `styles.css` | All styling, animations, responsive rules |
| `app.js` | Bilingual content, rendering, language toggle, contact form |

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Configuration

Settings live at the top of `app.js`:

```js
const CONFIG = {
  defaultLanguage: 'en', // 'en' | 'ru'
  showStats: true,       // toggle the stats section
  showRates: true,       // toggle the services / rates section
  year: 2026,
  web3formsKey: '...',   // Web3Forms access key for the contact form
};
```

### Contact form (Web3Forms)

The contact form submits to [Web3Forms](https://web3forms.com) from the visitor's
browser — no server needed. Set your access key in `CONFIG.web3formsKey`.
Submissions are emailed to the address tied to that key.

## Customising content

- **Copy & translations** — edit the `D.en` / `D.ru` dictionaries in `app.js`.
- **Photos** — replace the striped placeholder blocks (`.photo-frame`, `.work-thumb`)
  with real images.
- **Stats** — update the `STATS` object (currently placeholder numbers).
- **Links** — Instagram / YouTube / email live in the `SOCIALS` array.

### Live podcast episodes

The podcast section pulls the newest videos from the
[Kochmon Podcast](https://www.youtube.com/@Kochmon_podcast1) YouTube channel —
new uploads appear on the site automatically, no edits needed.

The browser can't read YouTube's feed directly — it sends no CORS headers — so the
fetch happens in CI instead:

1. `.github/workflows/update-episodes.yml` runs every 3 hours.
2. `scripts/fetch-episodes.mjs` reads the channel's public RSS feed
   (no API key, no quota) and writes `episodes.json`.
3. If the file changed, the workflow commits it, which triggers a redeploy.
4. `app.js` loads `episodes.json` at runtime and renders the cards.

If `episodes.json` is missing — opening the page from the filesystem, say — the
site falls back to the episodes listed in `D.<lang>.episodes` in `app.js`, so the
section is never empty.

Run it by hand with `node scripts/fetch-episodes.mjs`, or from the repo's
**Actions → Update podcast episodes → Run workflow**. `YT_CHANNEL_ID` overrides the
channel; `COUNT` sets how many entries are written. `CONFIG.episodeCount` in
`app.js` controls how many of them are shown, and `CONFIG.liveEpisodes = false`
disables the feature.

> The workflow needs **Settings → Actions → General → Workflow permissions** set to
> **Read and write**, otherwise it can't commit the refreshed file.

## Deployment (Cloudflare Pages)

Connected to Cloudflare Pages — no build command, output directory is the repo root.
Every push to `main` triggers an automatic deploy.
