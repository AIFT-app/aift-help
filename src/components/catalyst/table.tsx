'use client'

import clsx from 'clsx'
import Link from 'next/link'
import React, { createContext, useContext } from 'react'

export function Table({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={clsx('w-full overflow-x-auto', className)}>
      <table className="min-w-full text-sm text-zinc-950 dark:text-zinc-100">{children}</table>
    </div>
  )
}

export function TableHead({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <thead className={clsx('border-b border-zinc-200 dark:border-zinc-700', className)}>{children}</thead>
}

export function TableBody({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <tbody className={clsx('divide-y divide-zinc-100 dark:divide-zinc-800', className)}>{children}</tbody>
  )
}

// Catalyst's "TableRow href" pattern: rows can be clickable links without
// nesting <a> inside <tr> (invalid HTML). The row passes an href via context;
// each TableCell renders its children inside a spanning <Link>. Right-click /
// cmd-click / middle-click → Open in new tab works because each cell carries
// the link.
const TableRowHrefContext = createContext<string | null>(null)
const TableRowClickableContext = createContext<boolean>(false)

export function TableRow({
  className,
  children,
  href,
  onClick,
}: {
  className?: string
  children: React.ReactNode
  href?: string
  onClick?: (e: React.MouseEvent<HTMLTableRowElement>) => void
}) {
  const clickable = Boolean(href || onClick)
  return (
    <TableRowHrefContext.Provider value={href ?? null}>
      <TableRowClickableContext.Provider value={clickable}>
        <tr
          onClick={onClick}
          className={clsx(
            'transition-colors',
            clickable && 'cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50',
            !clickable && 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50',
            className,
          )}
        >
          {children}
        </tr>
      </TableRowClickableContext.Provider>
    </TableRowHrefContext.Provider>
  )
}

export function TableHeader({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <th
      scope="col"
      className={clsx(
        'px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400',
        className
      )}
    >
      {children}
    </th>
  )
}

export function TableCell({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const href = useContext(TableRowHrefContext)

  if (href) {
    return (
      <td className={clsx('p-0 align-middle', className)}>
        <Link
          href={href}
          className="block px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-blue-500"
        >
          {children}
        </Link>
      </td>
    )
  }

  return (
    <td className={clsx('px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300', className)}>{children}</td>
  )
}
