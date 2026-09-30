'use client'

// The roles table row, as aift-web's RolesTable.tsx renders it:
// `<TableRow onClick={() => setViewing(role)}>`. With an onClick the Catalyst
// TableRow adds `cursor-pointer`, because a click on the row opens the
// read-only View drawer.
//
// The figure is a server component, and an event handler cannot be passed from
// a server component to the client TableRow. This client wrapper hands it a
// handler that does nothing, so the row carries the same classes as the app's.
// The figure is `inert`, so the handler can never run.

import { TableRow } from '@/components/catalyst/table'

export function ClickableRow({ children }: { children: React.ReactNode }) {
  return <TableRow onClick={() => {}}>{children}</TableRow>
}
