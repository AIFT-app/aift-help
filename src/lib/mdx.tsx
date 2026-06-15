import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import { localizeHref, type Locale } from './i18n'

export const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: 'github-light' }],
    ] as never,
  },
}

/**
 * MDX component overrides bound to a locale. Internal links written as `/slug`
 * in the article body are rewritten to the locale-prefixed path, so a Hungarian
 * article's links stay within Hungarian. External links and `#anchors` pass
 * through untouched.
 */
export function mdxComponents(locale: Locale) {
  return {
    a: ({ href = '', ...rest }: React.ComponentProps<'a'>) => (
      <a href={localizeHref(href, locale)} {...rest} />
    ),
  }
}
