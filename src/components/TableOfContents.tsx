'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import type { Heading } from '@/lib/content'

export function TableOfContents({ items }: { items: Heading[] }) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0% -70% 0%' }
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <aside className="sticky top-20 hidden w-52 shrink-0 py-10 pl-4 xl:block">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-950">
        On this page
      </p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={clsx(
                'block text-sm leading-5 transition-colors',
                item.level === 3 && 'pl-3',
                activeId === item.id
                  ? 'font-medium text-zinc-950'
                  : 'text-zinc-500 hover:text-zinc-950'
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
