# Thinketh — As a Man Thinketh (Multilingual, static Next.js)

Live site: https://jatinthummar.github.io/thinketh/

Thinketh is a minimal, fast, multi‑language e‑reading site for “As a Man Thinketh”.
It uses Next.js (App Router) with a static export for GitHub Pages, Pug for content
authoring, and a small parser to render custom reading components (callouts, dividers,
spacers, highlights) directly from Pug.

## Features

- Static Next.js (output: `export`) — deployable to GitHub Pages
- Multilingual (English, Gujarati, Hindi) with language switcher
- Content authored in Pug under `content/<lang>/`
- App Router pages with fast navigation and hot reload for Pug edits
- Reading UX: Noto Serif fonts, light/dark/auto theme toggle, clean typography
- Custom components in content: `x-callout`, `x-divider`, `x-space`, `x-highlight`
- Auto‑slugged headings with anchor links on all h2/h3
- SEO: canonical + hreflang, OpenGraph/Twitter cards, sitemap and robots.txt

## Project Structure

- `app/` — App Router pages and metadata
- `components/` — UI components (LanguageSwitcher, ThemeToggle, ContentRenderer, etc.)
- `content/` — Pug content per language (`en`, `gu`, `hi`)
- `lib/` — helpers (Pug rendering, i18n discovery, contentVersion for HMR)
- `public/` — static assets (favicons, icons, og image)
- `scripts/` — dev orchestration and content watcher
- `styles/` — global styles (minimal, CSS variables)
- `.github/workflows/deploy.yml` — GitHub Pages CI workflow

## Prerequisites

- Node.js 18+ (Node 20 recommended)

## Local Development

```bash
npm install
npm run dev
# Open the URL printed by Next (e.g. http://localhost:3000)
```

Notes
- The dev script runs a watcher that hot‑reloads when you edit `content/**/*.pug`.
- If port 3000 is busy, the script will pick the next free port automatically.
- Pin a port: `PORT=3002 npm run dev`.

## Build (Static Export)

GitHub Pages serves project sites under `/<REPO_NAME>`. For this repo the base path is `/thinketh`.

```bash
# Build with base path so links are correct under Pages
NEXT_BASE_PATH=/thinketh npm run build

# Preview static output
npx serve out
```

## Deployment (GitHub Pages)

Automated via GitHub Actions: `.github/workflows/deploy.yml`

- Triggers on pushes to `main`/`master`.
- Sets `NEXT_BASE_PATH` to `/<repo>` automatically.
- Runs `next build` (static export), uploads `out/` and deploys to Pages.

One‑time setup in GitHub:
- Settings → Pages → Build and deployment → Source: GitHub Actions
- Settings → Environments → `github-pages` → Allow deployments from `main`

## Environment Variables

- `NEXT_BASE_PATH` — base path for static routing (CI sets to `/thinketh`).
- `NEXT_PUBLIC_SITE_URL` — absolute site URL for canonical/og tags (e.g.
  `https://jatinthummar.github.io/thinketh`). Optional locally.

## Authoring Content (Pug)

Location: `content/<lang>/content.pug` (includes reference other Pug files in the same folder).

Headings and anchors
- All `h2`/`h3` get IDs and a `#` anchor link (auto‑slugged).
- Force style per heading: `data-heading="accent"` or `data-heading="plain"`.

Custom components (via ContentRenderer)
- Callout (preferred tag):
  ```pug
  x-callout(type="tip")
    | Helpful tip text
  ```
- Callout (attribute form):
  ```pug
  div(data-component="callout" data-type="warn") Warning text
  ```
- Divider:
  ```pug
  x-divider
  ```
- Spacer (vertical space):
  ```pug
  x-space(size="sm")  // sizes: xs|sm|md|lg|xl
  ```
- Inline highlight:
  ```pug
  p
    | Important
    x-highlight phrase
  ```

## Adding a New Language

1) Create a folder: `content/<lang>/`
2) Add `content.pug` and any includes you need (e.g., `title.pug`, `section-*.pug`).
3) The site auto‑discovers languages by scanning `content/*/content.pug`.
4) Optional: Update label mapping in `components/LanguageSwitcher.jsx` to show a friendly name.

## SEO & Social Preview

- Canonical + hreflang alternates are generated for `/` and `/<lang>/` routes.
- Robots and sitemap are served from App Router.
- OpenGraph/Twitter images point to `public/android-chrome-512x512.png` by default.
  - To customize, add `public/og-image.png` (1200×630) and update:
    - `app/layout.jsx` and `app/*/page.jsx` metadata `images` to `${SITE_URL}/og-image.png`.

Favicons
- Replace files in `public/` with your design (favicon.ico, 32×32, 16×16, apple‑touch‑icon).
- No code changes needed if you keep the same filenames.

## Contributing

Issues and PRs are welcome! For translations, typo fixes, or new components:

1) Fork the repo and create a feature branch:
   ```bash
   git switch -c feat/<short-topic>
   ```
2) Make your changes:
   - Content: edit files under `content/<lang>/`
   - New language: add `content/<lang>/content.pug` (+ includes)
   - UI/SEO: components under `components/`, metadata in `app/`
   - Custom components: add component, then map it in `components/ContentRenderer.jsx`
3) Test locally:
   ```bash
   npm install
   npm run dev
   # or build static
   NEXT_BASE_PATH=/thinketh npm run build
   ```
4) Commit and push, then open a Pull Request.

Style guidelines (lightweight)
- Keep design minimal and accessible; prefer semantic HTML and CSS variables.
- Keep dependencies lean; avoid heavy UI frameworks.
- Multilingual content should preserve meaning/structure across languages.

## Troubleshooting

- Port in use:
  ```bash
  lsof -nP -iTCP:3000 -sTCP:LISTEN
  kill -9 <PID>
  # or run on a new port
  PORT=3002 npm run dev
  ```
- Dev console shows “Canceling since a higher priority request exists”: harmless Next.js dev log.
- Theme mismatch warning: should be resolved; ThemeToggle mounts client‑side and preloads theme in layout.
