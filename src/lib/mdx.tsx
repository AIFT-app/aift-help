import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import { localizeHref, type Locale } from './i18n'
import { visualComponents } from '@/components/visuals/registry'

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
    ...visualComponents(locale),
    a: ({ href = '', ...rest }: React.ComponentProps<'a'>) => (
      <a href={localizeHref(href, locale)} {...rest} />
    ),
    // A table wider than a phone scrolls in its own box instead of widening
    // the page (which makes mobile browsers zoom the whole article out). On
    // phones the box reaches into the article's side padding (px-6), so the
    // table gets the full screen width before it has to scroll.
    table: (props: React.ComponentProps<'table'>) => (
      <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
        <table {...props} />
      </div>
    ),
  }
}
