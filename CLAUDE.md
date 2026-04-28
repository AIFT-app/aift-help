# aift-help

Next.js + next-mdx-remote help center. Content in `content/*.mdx`. Deployed to help.aifinance.team.

> Note: README.md still references MkDocs — it's stale. The actual stack is Next.js.

## Commands

```bash
npm run dev    # local preview at localhost:3000
npm run build  # static export (output: `out/`)
```

## Conventions

- Content: add `.mdx` files to `content/`, update navigation in `src/app/layout.tsx` if needed
- This repo is usually independent of the schema flow — most changes need no coordination with aift-db/api/web
- Only requires coordination when a PRD explicitly ships a coupled help article
