'use client'

// Catalyst-style combobox primitive — a thin, DOMAIN-FREE wrapper over Headless
// UI v2's Combobox, matching select.tsx's house style. The kit had no combobox;
// this is the searchable sibling of <Select>. Domain logic (suggestion rows,
// code pills, filtering) belongs in consumers, NOT here — this file is mirrored
// verbatim into aift-help by sync-catalyst-to-help.sh, so it must carry no `@/`
// imports.
//
// Uses the v2 `anchor` prop on ComboboxOptions, which portals the panel to the
// document body and positions it with Floating UI — so the panel escapes the
// overflow/stacking-context clipping of table cells (e.g. invoice line rows near
// the viewport fold) and auto-flips above the input near the bottom.

import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import React from 'react'

export function Combobox<T>(props: Headless.ComboboxProps<T, false>) {
  return <Headless.Combobox {...props} />
}

export const ComboboxInput = React.forwardRef(function ComboboxInput(
  {
    className,
    ...props
  }: { className?: string } & Omit<Headless.ComboboxInputProps, 'as' | 'className'>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <span
      data-slot="control"
      className={clsx([
        className,
        'relative block w-full',
        'before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm dark:before:hidden',
        'after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset sm:focus-within:after:ring-2 sm:focus-within:after:ring-blue-500',
        'has-data-disabled:opacity-50 has-data-disabled:before:bg-zinc-950/5 has-data-disabled:before:shadow-none',
      ])}
    >
      <Headless.ComboboxInput
        ref={ref}
        {...props}
        className={clsx([
          'relative block w-full appearance-none rounded-lg',
          'py-[calc(--spacing(2.5)-1px)] pl-[calc(--spacing(3.5)-1px)] pr-[calc(--spacing(10)-1px)]',
          'sm:py-[calc(--spacing(1.5)-1px)] sm:pl-[calc(--spacing(3)-1px)] sm:pr-[calc(--spacing(9)-1px)]',
          'text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white',
          'border border-zinc-950/10 data-hover:border-zinc-950/20 dark:border-white/10 dark:data-hover:border-white/20',
          'bg-transparent dark:bg-white/5',
          'focus:outline-hidden',
          'data-disabled:border-zinc-950/20 dark:data-disabled:border-white/15 dark:data-disabled:bg-white/2.5',
        ])}
      />
      <Headless.ComboboxButton className="group absolute inset-y-0 right-0 flex items-center pr-2.5">
        <svg
          className="size-5 stroke-zinc-500 group-data-hover:stroke-zinc-700 dark:stroke-zinc-400 sm:size-4"
          viewBox="0 0 16 16"
          aria-hidden="true"
          fill="none"
        >
          <path d="M5.75 10.75L8 13L10.25 10.75" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.25 5.25L8 3L5.75 5.25" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Headless.ComboboxButton>
    </span>
  )
})

export function ComboboxOptions({
  className,
  anchor = { to: 'bottom start', gap: 4 },
  ...props
}: { className?: string } & Omit<Headless.ComboboxOptionsProps, 'as' | 'className'>) {
  return (
    <Headless.ComboboxOptions
      transition
      anchor={anchor}
      {...props}
      className={clsx([
        className,
        // Track the trigger width (anchor sets --input-width) with a floor.
        'w-(--input-width) min-w-[16rem] [--anchor-max-height:20rem]',
        'z-50 overflow-y-auto rounded-xl p-1',
        'bg-white/95 backdrop-blur-xl shadow-lg ring-1 ring-zinc-950/10 dark:bg-zinc-800/95 dark:ring-white/10',
        'transition duration-100 ease-in data-closed:data-leave:opacity-0',
        'empty:invisible',
      ])}
    />
  )
}

export function ComboboxOption<T>({
  className,
  children,
  ...props
}: { className?: string; children?: React.ReactNode } & Omit<
  Headless.ComboboxOptionProps<'div', T>,
  'as' | 'className' | 'children'
>) {
  return (
    <Headless.ComboboxOption
      as="div"
      {...props}
      className={clsx([
        className,
        'group/option grid cursor-default grid-cols-[1fr_auto] items-center gap-2 rounded-lg px-3 py-2',
        'text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white',
        'data-focus:bg-blue-500 data-focus:text-white',
        'data-disabled:opacity-50',
      ])}
    >
      {children}
    </Headless.ComboboxOption>
  )
}

export function ComboboxLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'span'>) {
  return <span {...props} className={clsx(className, 'col-start-1 truncate')} />
}
