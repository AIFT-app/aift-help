# aift-help

Next.js + next-mdx-remote help center. Content in `content/*.mdx`. Deployed to help.aifinance.team (GitHub Pages, static export, on push to `main`).

## Commands

```bash
npm run dev    # local preview at localhost:3000
npm run build  # static export (output: `out/`)
```

## Conventions

- **Add an article:** create `content/<slug>.mdx` (English, the source of truth) and register it in `src/lib/navigation.ts` with its per-locale `title`.
- This repo is usually independent of the schema flow — most changes need no coordination with aift-db/api/web.
- Only requires coordination when a PRD explicitly ships a coupled help article.
- aift-help deploys from `main`; keep `staging` in sync (fast-forward) so the staging-first flow keeps working.

## Localization (en / hu / de)

English lives at the root (`/invoices`); Hungarian and German live under a prefix (`/hu/invoices`, `/de/invoices`). Any article without a translation **falls back to English** with a notice, so nothing 404s.

- **Translate an article:** add `content/<slug>.<locale>.mdx` (e.g. `content/invoices.hu.mdx`). That's it — the route appears automatically.
- **Internal links:** in any article (including translations) write links with the **English slug** — `[text](/invoices)`. The framework rewrites them to the current locale (`/hu/invoices`). Don't hard-code `/hu/`.
- **Quoted UI labels:** when an article quotes a button/tab/field label, use the app's real string for that locale from `aift-web/messages/<locale>.json`, so the help matches what users actually see.
- **Nav titles** are per-locale in `src/lib/navigation.ts` (`title: { en, hu, de }`).
- **Chrome strings** (header/footer/fallback notice/TOC) live in `src/lib/i18n.ts`.
- **MDX gotcha:** a bare `{X}` in prose is parsed as a JSX expression and breaks the build. Write `X`, not `{X}`. Same for stray `<` followed by a letter.
