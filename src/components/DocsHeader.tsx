'use client'

import { useState } from 'react'
import { Bars3Icon, XMarkIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'
import * as Headless from '@headlessui/react'
import { DocsSidebar } from './DocsSidebar'

export function DocsHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 h-14 border-b border-zinc-950/5 bg-white/95 backdrop-blur-sm">
        <nav className="flex h-full items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="-m-2 rounded-md p-2 text-zinc-500 hover:text-zinc-950 lg:hidden"
              aria-label="Open navigation"
            >
              <Bars3Icon className="size-5" />
            </button>
            <a href="/" className="flex items-center gap-2.5">
              <span className="text-sm font-semibold text-zinc-950">AI Finance Team</span>
              <span className="text-zinc-200">|</span>
              <span className="text-sm text-zinc-500">Help</span>
            </a>
          </div>
          <a
            href="https://aift.aifinance.team"
            className="flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-950"
          >
            Back to app
            <ArrowTopRightOnSquareIcon className="size-3.5" />
          </a>
        </nav>
      </header>

      {/* Mobile sidebar drawer */}
      <Headless.Dialog open={mobileOpen} onClose={setMobileOpen} className="lg:hidden">
        <Headless.DialogBackdrop
          transition
          className="fixed inset-0 z-40 bg-black/30 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
        />
        <Headless.DialogPanel
          transition
          className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
        >
          <div className="flex h-14 items-center justify-between border-b border-zinc-950/5 px-4">
            <span className="text-sm font-semibold text-zinc-950">Navigation</span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="-m-2 rounded-md p-2 text-zinc-500 hover:text-zinc-950"
              aria-label="Close navigation"
            >
              <XMarkIcon className="size-5" />
            </button>
          </div>
          <DocsSidebar onNavigate={() => setMobileOpen(false)} />
        </Headless.DialogPanel>
      </Headless.Dialog>
    </>
  )
}
