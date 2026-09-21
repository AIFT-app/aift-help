'use client'

// Renders an app screen at the width the app really lays it out at, then zooms
// it to fit the article, the way a screenshot is shown smaller than its pixels.
// Laying out at a narrower width instead would reflow the screen (truncation,
// wrapping) into something the app never shows at desktop size.
//
// `zoom` (not transform) so the scaled box also takes its scaled height in the
// page flow. The first paint assumes the article's usual 736px content width,
// so desktop readers see the right size before hydration.

import { useLayoutEffect, useRef, useState } from 'react'

const TYPICAL_ARTICLE_WIDTH = 736

export function ScaledStage({ width, children }: { width: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(Math.min(1, TYPICAL_ARTICLE_WIDTH / width))

  useLayoutEffect(() => {
    const parent = ref.current?.parentElement
    if (!parent) return
    const fit = () => setZoom(Math.min(1, parent.clientWidth / width))
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(parent)
    return () => ro.disconnect()
  }, [width])

  return (
    <div ref={ref} style={{ width, zoom }}>
      {children}
    </div>
  )
}
