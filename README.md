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

1. Create `content/<slug>.mdx` with frontmatter (`title`, `description`)
2. Update navigation in `src/app/layout.tsx` if needed
3. Commit and push to main
