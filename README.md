# aift-help

Source for the AI Finance Team help center, hosted at https://help.aifinance.team.

Built with Next.js and next-mdx-remote. Articles live in `content/` as MDX files.

## Local development

```bash
npm install
npm run dev   # preview at http://localhost:3000
```

## Editing

- Local: clone, run `npm run dev`, edit `.mdx` files in `content/`, see live preview at http://localhost:3000
- GitHub web: navigate to any file in `content/`, click the pencil icon, commit. Site redeploys automatically.

## Adding a new article

1. Create `content/<slug>.mdx` with frontmatter (`title`, `description`). English is the source of
   truth.
2. Register it in **`src/lib/navigation.ts`** with its per-locale `title` (`{ en, hu, de }`).
   Nothing appears in the nav until it is listed there.
3. Commit and push to `main` — the site redeploys automatically.

## Translations

English lives at the root (`/invoices`); Hungarian and German live under a prefix (`/hu/invoices`,
`/de/invoices`). An article with no translation **falls back to English** with a notice, so nothing
404s.

- **Translate an article:** add `content/<slug>.<locale>.mdx` — e.g. `content/invoices.hu.mdx`.
  That is all; the route appears automatically.
- **Internal links:** always write the **English** slug — `[text](/invoices)` — even inside a
  translation. The framework rewrites it to the current locale. Do not hard-code `/hu/`.
- **Quoted UI labels:** when an article quotes a button or field label, use the app's real string for
  that locale from `aift-web/messages/<locale>.json`, so the help matches what the user sees.
- **Register:** Hungarian help is **magázó** (formal) — the opposite of the app, which is tegező.
  Nothing enforces this, so check the convention rather than the surrounding paragraph.

> **MDX gotcha:** a bare `{X}` in prose is parsed as a JSX expression and breaks the build. Write `X`.
> Same for a stray `<` followed by a letter.
