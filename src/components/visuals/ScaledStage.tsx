'use client'

// App screens render at 100%: 1 CSS px is 1 px, exactly as in the app, and the
// screen's own responsive markup lays itself out at the figure's width, the
// way the app does at that window width. Only when the figure is narrower than
// `minWidth` (a phone) is the screen laid out at `minWidth` and zoomed down to
// fit, like a desktop screenshot viewed on a phone.
//
// `zoom` (not transform) so a zoomed box also takes its zoomed height in the
// page flow. The server render is the 100% case, so desktop readers never see
// a resize.

import { useLayoutEffect, useRef, useState } from 'react'

export function ScaledStage({ minWidth, children }: { minWidth: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [fit, setFit] = useState<{ width?: number; zoom: number }>({ zoom: 1 })

  useLayoutEffect(() => {
    const parent = ref.current?.parentElement
    if (!parent) return
    const measure = () => {
      const w = parent.clientWidth
      setFit(w >= minWidth ? { zoom: 1 } : { width: minWidth, zoom: w / minWidth })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(parent)
    return () => ro.disconnect()
  }, [minWidth])

  return (
    <div ref={ref} style={{ width: fit.width, zoom: fit.zoom }}>
      {children}
    </div>
  )
}
