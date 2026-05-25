import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import React, { forwardRef } from 'react'

export const Select = forwardRef(function Select(
  {
    className,
    children,
    ...props
  }: { className?: string } & Omit<Headless.SelectProps, 'as' | 'className'>,
  ref: React.ForwardedRef<HTMLSelectElement>
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
      <Headless.Select
        ref={ref}
        {...props}
        className={clsx([
          'relative block w-full appearance-none rounded-lg',
          'py-[calc(--spacing(2.5)-1px)] pl-[calc(--spacing(3.5)-1px)] pr-[calc(--spacing(10)-1px)]',
          'sm:py-[calc(--spacing(1.5)-1px)] sm:pl-[calc(--spacing(3)-1px)] sm:pr-[calc(--spacing(9)-1px)]',
          'text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white',
          'border border-zinc-950/10 data-hover:border-zinc-950/20 dark:border-white/10 dark:data-hover:border-white/20',
          'bg-transparent dark:bg-white/5',
          'focus:outline-hidden',
          'data-disabled:border-zinc-950/20 dark:data-disabled:border-white/15 dark:data-disabled:bg-white/2.5 dark:data-hover:data-disabled:border-white/15',
          'dark:scheme-dark',
        ])}
      >
        {children}
      </Headless.Select>
      <span
        className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
        aria-hidden="true"
      >
        <svg
          className="size-5 stroke-zinc-500 dark:stroke-zinc-400 sm:size-4"
          viewBox="0 0 16 16"
          aria-hidden="true"
          fill="none"
        >
          <path d="M5.75 10.75L8 13L10.25 10.75" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.25 5.25L8 3L5.75 5.25" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </span>
  )
})
