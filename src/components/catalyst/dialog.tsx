'use client'

import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import React from 'react'

export function Dialog({
  open,
  onClose,
  children,
  size = 'md',
}: {
  open: boolean
  onClose: (value: boolean) => void
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}) {
  const sizes = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
  }

  return (
    <Headless.Dialog open={open} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Centering container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Headless.DialogPanel
          className={clsx(
            'flex max-h-[calc(100vh-2rem)] w-full flex-col rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900 dark:ring-1 dark:ring-white/10',
            sizes[size]
          )}
        >
          {children}
        </Headless.DialogPanel>
      </div>
    </Headless.Dialog>
  )
}

export function DialogTitle({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <Headless.DialogTitle
      className={clsx('shrink-0 text-base/6 font-semibold text-zinc-950 dark:text-white', className)}
    >
      {children}
    </Headless.DialogTitle>
  )
}

export function DialogBody({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={clsx('mt-4 min-h-0 flex-1 overflow-y-auto', className)}>
      {children}
    </div>
  )
}

export function DialogActions({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={clsx(
        'mt-6 shrink-0 flex flex-col-reverse items-center justify-end gap-3 sm:flex-row',
        className
      )}
    >
      {children}
    </div>
  )
}
