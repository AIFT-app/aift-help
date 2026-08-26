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
- **aift-help deploys from `main`** — the only AIFT repo that does. After every wholesale `staging -> main` merge, fast-forward `staging` back as the last step: `git push origin origin/main:refs/heads/staging` (non-force, so it fails loudly if it isn't a clean fast-forward). Nothing automates this.
- **Keep aift-help out of slug promotes.** `promote.sh <slug>` cherry-picks, which rewrites the sha, so the change lands on `main` twice — once from the cherry-pick, once when the next wholesale merge carries the original along. Shiplog counts both. Use `AIFT_PROMOTE_REPOS` to drop aift-help, and merge `staging -> main` for it separately.
- A behind-by-N `staging` here is almost always drifted **history, not content** — the trees usually match exactly. Diff them (`git diff origin/staging origin/main`) before treating it as missing work. Full mechanism and evidence: `aift-ops/docs/aift-help-branch-model.md`.

## Localization (en / hu / de)

English lives at the root (`/invoices`); Hungarian and German live under a prefix (`/hu/invoices`, `/de/invoices`). Any article without a translation **falls back to English** with a notice, so nothing 404s.

- **Translate an article:** add `content/<slug>.<locale>.mdx` (e.g. `content/invoices.hu.mdx`). That's it — the route appears automatically.
- **Internal links:** in any article (including translations) write links with the **English slug** — `[text](/invoices)`. The framework rewrites them to the current locale (`/hu/invoices`). Don't hard-code `/hu/`.
- **Quoted UI labels:** when an article quotes a button/tab/field label, use the app's real string for that locale from `aift-web/messages/<locale>.json`, so the help matches what users actually see.
- **Nav titles** are per-locale in `src/lib/navigation.ts` (`title: { en, hu, de }`).
- **Chrome strings** (header/footer/fallback notice/TOC) live in `src/lib/i18n.ts`.
- **MDX gotcha:** a bare `{X}` in prose is parsed as a JSX expression and breaks the build. Write `X`, not `{X}`. Same for stray `<` followed by a letter.
