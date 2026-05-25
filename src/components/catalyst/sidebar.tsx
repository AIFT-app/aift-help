'use client'

import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import { LayoutGroup, motion } from 'motion/react'
import React, { createContext, forwardRef, useContext, useId } from 'react'
import { TouchTarget } from './button'
import { Link } from './link'
import { useSidebarState } from '@/hooks/useSidebarState'

// ── Sidebar collapse context ──────────────────────────────────────────────────

interface SidebarContextValue {
  collapsed: boolean
  toggle: () => void
}

const SidebarContext = createContext<SidebarContextValue>({ collapsed: false, toggle: () => {} })

export function useSidebarContext() {
  return useContext(SidebarContext)
}

// ── Layout ────────────────────────────────────────────────────────────────────

export function SidebarLayout({
  navbar,
  sidebar,
  children,
}: React.PropsWithChildren<{ navbar: React.ReactNode; sidebar: React.ReactNode }>) {
  const { collapsed, toggle } = useSidebarState()

  return (
    <SidebarContext.Provider value={{ collapsed, toggle }}>
      <div className="relative isolate flex min-h-svh w-full bg-white max-lg:flex-col lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950">
        {/* Sidebar on desktop */}
        <div
          className={clsx(
            'fixed inset-y-0 left-0 max-lg:hidden overflow-hidden transition-all duration-200 ease-in-out',
            collapsed ? 'w-16' : 'w-64',
          )}
        >
          {sidebar}
        </div>

        {/* Navbar on mobile */}
        <header className="flex items-center px-4 lg:hidden">
          <div className="min-w-0 flex-1">{navbar}</div>
        </header>

        {/* Content */}
        <main
          className={clsx(
            'flex flex-1 flex-col pb-2 lg:min-w-0 lg:pr-2 lg:pt-2 transition-all duration-200 ease-in-out',
            collapsed ? 'lg:pl-16' : 'lg:pl-64',
          )}
        >
          {/* Card chrome + content cap. Pages that need a wider cap can
              override via `body[data-catalyst-content="wide"]` — see
              globals.css. Used by the Ledger Explorer (see
              ledger-redesign-v2.md): expands the cap to 96rem and tightens
              card padding so the 9-column ledger table breathes. */}
          <div className="grow p-6 lg:rounded-2xl lg:bg-white lg:p-10 lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
            <div className="mx-auto max-w-6xl">{children}</div>
          </div>
        </main>
      </div>
    </SidebarContext.Provider>
  )
}

// ── Sidebar primitives ────────────────────────────────────────────────────────

export function Sidebar({ className, ...props }: React.ComponentPropsWithoutRef<'nav'>) {
  return (
    <nav
      {...props}
      className={clsx(className, 'flex h-full flex-col p-2')}
    />
  )
}

export function SidebarHeader({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={clsx(className, 'flex flex-col border-b border-zinc-950/5 p-2 pb-4 dark:border-white/5')} />
}

export function SidebarBody({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={clsx(className, 'flex flex-1 flex-col overflow-y-auto p-2')} />
}

export function SidebarFooter({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={clsx(className, 'flex flex-col border-t border-zinc-950/5 p-2 pt-4 dark:border-white/5')} />
}

export function SidebarSection({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const id = useId()
  return (
    <LayoutGroup id={id}>
      <div {...props} className={clsx(className, 'flex flex-col gap-0.5')} />
    </LayoutGroup>
  )
}

export function SidebarDivider({ className, ...props }: React.ComponentPropsWithoutRef<'hr'>) {
  return (
    <hr
      {...props}
      className={clsx(className, 'my-2 border-zinc-950/5 dark:border-white/5 lg:-mx-2')}
    />
  )
}

export function SidebarSpacer({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div aria-hidden="true" {...props} className={clsx(className, 'mt-8 flex-1')} />
}

export function SidebarHeading({ className, ...props }: React.ComponentPropsWithoutRef<'h3'>) {
  return (
    <h3
      {...props}
      className={clsx(className, 'mb-1 px-2 text-xs/6 font-medium text-zinc-500 dark:text-zinc-400')}
    />
  )
}

export const SidebarItem = forwardRef(function SidebarItem(
  {
    current,
    className,
    center,
    children,
    ...props
  }: { current?: boolean; className?: string; center?: boolean; children: React.ReactNode } & (
    | ({ href?: never } & Omit<Headless.ButtonProps, 'as' | 'className'>)
    | ({ href: string } & Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'>)
  ),
  ref: React.ForwardedRef<HTMLAnchorElement | HTMLButtonElement>
) {
  const classes = clsx(
    // Base styles
    'flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 sm:py-2 sm:text-sm/5',
    // Center (icon-only mode)
    center && 'justify-center',
    // Leading icon/icon-only
    '*:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:fill-zinc-500 sm:*:data-[slot=icon]:size-5',
    // Trailing icon (chevron, etc.)
    '*:data-[slot=icon]:last:ml-auto *:data-[slot=icon]:last:size-5 sm:*:data-[slot=icon]:last:size-4',
    // Avatar
    '*:data-[slot=avatar]:size-6 *:data-[slot=avatar]:-m-0.5 *:data-[slot=avatar]:rounded-md sm:*:data-[slot=avatar]:size-5',
    // Hover
    'data-hover:bg-zinc-950/5 dark:text-white dark:*:data-[slot=icon]:fill-zinc-400',
    'dark:data-hover:bg-white/5',
    // Active state
    'data-active:bg-zinc-950/5 dark:data-active:bg-white/5',
    // Current (selected) state
    current && 'bg-zinc-950/5 *:data-[slot=icon]:fill-zinc-950 dark:bg-white/5 dark:*:data-[slot=icon]:fill-white',
  )

  return (
    <span className={clsx(className, 'relative')}>
      {current && (
        <motion.span
          layoutId="current-sidebar-item"
          className="absolute inset-y-0 -left-2 w-0.5 rounded-full bg-zinc-950 dark:bg-white"
        />
      )}
      {'href' in props && props.href !== undefined ? (
        <Link
          {...props}
          className={classes}
          data-current={current ? 'true' : undefined}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        >
          <TouchTarget>{children}</TouchTarget>
        </Link>
      ) : (
        <Headless.Button
          {...props}
          className={clsx('cursor-default', classes)}
          data-current={current ? 'true' : undefined}
          ref={ref as React.ForwardedRef<HTMLButtonElement>}
        >
          <TouchTarget>{children}</TouchTarget>
        </Headless.Button>
      )}
    </span>
  )
})

export function SidebarLabel({ className, ...props }: React.ComponentPropsWithoutRef<'span'>) {
  return <span {...props} className={clsx(className, 'truncate')} />
}
