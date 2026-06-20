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

## Deployment (Cloudflare Pages)

Connected to Cloudflare Pages — no build command, output directory is the repo root.
Every push to `main` triggers an automatic deploy.
