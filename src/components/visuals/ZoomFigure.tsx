'use client'

// Phones: an app screen is laid out at desktop width and zoomed to fit, about
// 60% on a 390px phone, which is too small to read. This puts an "Enlarge"
// control over the figure, shown only while the figure is narrower than 640px
// (a container query on the figure, so tablets and desktops never see it),
// that opens the same screen full screen at 100% to swipe or pinch around.
//
// It sits beside the figure's role="img" element, not inside it, so the
// picture stays one image to a screen reader and the control stays a button.

import { useState } from 'react'
import * as Headless from '@headlessui/react'
import { ArrowsPointingOutIcon, XMarkIcon } from '@heroicons/react/20/solid'

export function ZoomFigure({
  alt,
  enlarge,
  close,
  width,
  children,
}: {
  alt: string
  enlarge: string
  close: string
  /** The width the screen is shown at when enlarged (its AppScreen minWidth). */
  width: number
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="absolute inset-0 hidden cursor-zoom-in items-end justify-end p-3 @max-[40rem]:flex"
      >
        <span className="flex items-center gap-1.5 rounded-full bg-zinc-950/80 px-3 py-1.5 text-xs font-medium text-white shadow-sm">
          <ArrowsPointingOutIcon className="size-3.5" />
          {enlarge}
        </span>
      </button>

      <Headless.Dialog open={open} onClose={setOpen} className="relative z-50">
        <Headless.DialogPanel className="fixed inset-0 flex flex-col bg-zinc-100">
          <Headless.DialogTitle className="sr-only">{alt}</Headless.DialogTitle>
          <div className="flex h-12 shrink-0 items-center justify-end border-b border-zinc-950/5 bg-white px-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={close}
              className="-m-2 rounded-md p-2 text-zinc-500 hover:text-zinc-950"
            >
              <XMarkIcon className="size-5" />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-auto overscroll-contain p-3">
            <div style={{ width }}>{children}</div>
          </div>
        </Headless.DialogPanel>
      </Headless.Dialog>
    </>
  )
}
