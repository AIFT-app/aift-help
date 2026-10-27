'use client'

// The closed CategoryCombobox, as RlbFixBeforeExportPanel renders it:
// aift-web src/components/category/CategoryCombobox.tsx (the Catalyst Combobox
// with its input, never opened). A client wrapper because the Headless combobox
// needs an onChange and a displayValue function, which a server figure cannot
// pass. The figure is `inert`, so nothing here can run.

import { Combobox, ComboboxInput } from '@/components/catalyst/combobox'

export function ClosedCategoryPicker({
  value,
  placeholder,
  ariaLabel,
}: {
  /** The chosen category as the input shows it, or null for none. */
  value: string | null
  placeholder: string
  ariaLabel: string
}) {
  return (
    <Combobox<string | null> immediate value={value ? 'chosen' : null} onChange={() => {}}>
      <ComboboxInput aria-label={ariaLabel} placeholder={placeholder} displayValue={() => value ?? ''} />
    </Combobox>
  )
}
