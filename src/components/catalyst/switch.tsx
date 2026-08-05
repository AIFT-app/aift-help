'use client'

// Catalyst-style Switch primitive (weekly-accountant-digest lands the open
// catalyst-switch-primitive debt item — two hand-rolled role="switch" toggles
// predate it and can migrate here over time).
//
// Contract shared with combobox.tsx: this file is mirrored into aift-help by
// sync-catalyst-to-help.sh, so it carries NO `@/` imports. Any change lands on
// aift-web@main FIRST, then the sync script runs, then aift-help.

import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import type React from 'react'

export function SwitchField({
  className,
  ...props
}: { className?: string } & Omit<Headless.FieldProps, 'as' | 'className'>) {
  return (
    <Headless.Field
      data-slot="field"
      {...props}
      className={clsx(
        className,
        'grid grid-cols-[1fr_auto] gap-x-8 gap-y-1 sm:grid-cols-[1fr_auto]',
        '*:data-[slot=control]:col-start-2 *:data-[slot=control]:self-start',
        '*:data-[slot=label]:col-start-1 *:data-[slot=label]:row-start-1',
        '*:data-[slot=description]:col-start-1 *:data-[slot=description]:row-start-2',
        'has-data-[slot=description]:**:data-[slot=label]:font-medium'
      )}
    />
  )
}

export function Switch({
  className,
  ...props
}: { className?: string } & Omit<
  Headless.SwitchProps,
  'as' | 'className' | 'children'
>) {
  return (
    <Headless.Switch
      data-slot="control"
      {...props}
      className={clsx(
        className,
        // Track
        'group relative isolate inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full p-0.5',
        'transition duration-200 ease-in-out',
        // Unchecked
        'bg-zinc-200 ring-1 ring-black/5 ring-inset dark:bg-white/10 dark:ring-white/15',
        // Checked
        'data-[checked]:bg-zinc-900 data-[checked]:ring-zinc-950/90 dark:data-[checked]:bg-white dark:data-[checked]:ring-white/80',
        // Focus
        'focus:outline-none data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500',
        // Disabled
        'data-[disabled]:cursor-default data-[disabled]:opacity-50'
      )}
    >
      <span
        aria-hidden="true"
        className={clsx(
          // Thumb
          'pointer-events-none relative inline-block size-4 rounded-full',
          'translate-x-0 transition duration-200 ease-in-out',
          'bg-white shadow-sm ring-1 ring-black/5',
          'group-data-[checked]:translate-x-4',
          'dark:group-data-[checked]:bg-zinc-900'
        )}
      />
    </Headless.Switch>
  )
}
