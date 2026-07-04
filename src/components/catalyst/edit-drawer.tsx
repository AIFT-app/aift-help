'use client'

import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import React from 'react'

type EditDrawerProps = {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export function EditDrawer({ open, onClose, title, children, footer }: EditDrawerProps) {
  const t = useTranslations('common.edit_drawer')

  return (
    <Headless.Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/20 dark:bg-black/40" aria-hidden="true" />
      <div className="fixed inset-y-0 right-0 flex">
        <Headless.DialogPanel
          className={clsx(
            'flex w-full max-w-lg flex-col overflow-y-auto bg-white shadow-xl dark:bg-zinc-900',
          )}
          data-testid="edit-drawer"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-100 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              data-testid="edit-drawer-close"
            >
              {t('close')}
            </button>
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {title}
            </span>
          </div>

          <div className="flex flex-1 flex-col">{children}</div>

          {footer ? (
            <div className="sticky bottom-0 z-10 flex items-center justify-end gap-3 border-t border-zinc-100 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
              {footer}
            </div>
          ) : null}
        </Headless.DialogPanel>
      </div>
    </Headless.Dialog>
  )
}
