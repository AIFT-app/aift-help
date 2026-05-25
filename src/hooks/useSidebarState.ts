'use client'

import { useCallback, useSyncExternalStore, useState } from 'react'

const STORAGE_KEY = 'aift_sidebar_collapsed'

// useSyncExternalStore reads localStorage on the client and returns false on
// the server — the React 18 idiomatic way to subscribe to external stores
// without triggering the react-hooks/set-state-in-effect lint rule.
function subscribe() {
  return () => {}
}
function getSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}
function getServerSnapshot() {
  return false
}

export function useSidebarState() {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [localOverride, setLocalOverride] = useState<boolean | null>(null)

  // localOverride drives same-tab toggles; stored drives the initial hydrated value.
  const collapsed = localOverride ?? stored

  const toggle = useCallback(() => {
    setLocalOverride((prev) => {
      const next = !(prev ?? stored)
      try {
        localStorage.setItem(STORAGE_KEY, String(next))
      } catch {
        // ignore
      }
      return next
    })
  }, [stored])

  return { collapsed, toggle }
}
