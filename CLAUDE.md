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
- **aift-help deploys from `main`** — the only AIFT repo that does. `.github/workflows/ff-staging.yml` automates the sync (PRD `help-staging-auto-fastforward`): on every push to `main` it fast-forwards `staging` back, non-force, and only when `staging` is a strict ancestor of `main`. If `staging` holds commits `main` does not (the state a slug promote leaves behind), the workflow warns and exits 0. Resolve that with a `staging -> main` merge (the merge push re-triggers the workflow), or fast-forward manually as the fallback: `git push origin origin/main:refs/heads/staging` (non-force, so it fails loudly if it isn't a clean fast-forward).
- **Keep aift-help out of slug promotes.** `promote.sh <slug>` cherry-picks, which rewrites the sha, so the change lands on `main` twice — once from the cherry-pick, once when the next wholesale merge carries the original along. Shiplog counts both. Use `AIFT_PROMOTE_REPOS` to drop aift-help, and merge `staging -> main` for it separately.
- A behind-by-N `staging` here is almost always drifted **history, not content** — the trees usually match exactly. Diff them (`git diff origin/staging origin/main`) before treating it as missing work. Full mechanism and evidence: `aift-ops/docs/aift-help-branch-model.md`.

## Changing an article: check the content first

Every change to an article, whatever its size, starts by checking the article's claims against the app as it is on `main`: quoted labels against `aift-web/messages/<locale>.json`, screens against the component that renders them, numbers and thresholds against the code. Fix what is stale in the same PR, in all three locales. Adding visuals to `approving-invoices` found three stale claims this way.

Then update the article's row in the **Help Centre Refresh** tracker (https://claude.ai/artifact/QNYFXjnFzNmumFJiN2tLxd, collection `articles`, doc id = the slug, `home` for the index): `visuals`, `content` (`unchecked` / `stale` / `verified`), `contentCheckedOn`, `notes`. Full standard: `aift-ops/specs/help-visuals-pilot.md`.

## Visuals: app screens rebuilt 1:1, where they add value

- **New articles include visuals when a picture explains faster than prose**: an app screen with numbered markers plus a numbered legend list, a state diagram, a timeline. A short reference page may need none.
- **App screens are rebuilt 1:1 from aift-web, not drawn and not screenshotted.** Use the real Catalyst components from `src/components/catalyst/` (a byte-identical mirror of the app's, checked by the manifest; sync missing ones with `aift-ops/scripts/sync-catalyst-to-help.sh`) and copy the app's own non-Catalyst markup (list rows, chips, tabs, panels, pills) **class for class** from the aift-web source file, naming that file in the screen's header comment. Wrap the screen in `AppScreen` inside a `Figure wide` (`src/components/visuals/kit.tsx`): it renders **at 100%** (1 CSS px = 1 px, like the app; only on phones is it laid out at 640px and zoomed down), cropped at the inner edge of the app's content panel so the page's own layout padding is the app's, uses the full article column, applies the app's fonts (Arial body, Geist Mono for `font-mono`; see `.app-screen` in `globals.css`), and makes it `inert`. Never zoom a desktop screen to fit: a 92% zoom was exactly what made spacings and font sizes look wrong. Put numbered markers in with `Pin`, which never shifts the app's layout. `approvals/` is the worked example.
- **Verify by the numbers**: render the real aift-web component with the same fixture in a throwaway local page (never committed) and diff the **computed CSS** of every element, sizes included, with `aift-ops/scripts/help-screen-css-diff.mjs`. The approvals screens show zero differences in all three locales.
- **Labels verbatim** from the app's message files, keyed by message key in `copy.ts`. **Data fictional**: web-search every invented company name and drop it if a real business uses it. Never real customer data.
- `dark:` is class-based on this site (see `globals.css`), so Catalyst components always render light, matching the white site. Violet is reserved for annotation markers.
- Each figure is `role="img"` with localized alt text; nothing inside a figure may be focusable.
- Check the result at phone width and at the article's full 768px width in all three locales before shipping.

## Localization (en / hu / de)

English lives at the root (`/invoices`); Hungarian and German live under a prefix (`/hu/invoices`, `/de/invoices`). Any article without a translation **falls back to English** with a notice, so nothing 404s.

- **Translate an article:** add `content/<slug>.<locale>.mdx` (e.g. `content/invoices.hu.mdx`). That's it — the route appears automatically.
- **Internal links:** in any article (including translations) write links with the **English slug** — `[text](/invoices)`. The framework rewrites them to the current locale (`/hu/invoices`). Don't hard-code `/hu/`.
- **Quoted UI labels:** when an article quotes a button/tab/field label, use the app's real string for that locale from `aift-web/messages/<locale>.json`, so the help matches what users actually see.
- **Nav titles** are per-locale in `src/lib/navigation.ts` (`title: { en, hu, de }`).
- **Chrome strings** (header/footer/fallback notice/TOC) live in `src/lib/i18n.ts`.
- **MDX gotcha:** a bare `{X}` in prose is parsed as a JSX expression and breaks the build. Write `X`, not `{X}`. Same for stray `<` followed by a letter.
