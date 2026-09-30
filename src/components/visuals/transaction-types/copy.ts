// Text and data for the transaction-type illustrations (transaction-types).
//
// `ui` holds the app's own labels, copied VERBATIM from
// aift-web/messages/<locale>.json and keyed by their message key (plural-free
// messages only; placeholders are filled with `fill`, plurals are rendered in
// `rendered`). Hungarian ones are tegező because the app is. `help` holds the
// article's own words (diagram labels, alt text, what a user would type),
// magázó in Hungarian like every aift-help article.
//
// The type is the default Bank Fee type with its seeded name, description and
// two of its seeded patterns (aift-db 20260721180002). The match count and the
// AI confidence are examples.

import type { Locale } from '@/lib/i18n'

export const UI_KEYS = [
  'common.edit_drawer.close',
  'master_data.transaction_types.form.edit_title',
  'master_data.transaction_types.form.name_label',
  'master_data.transaction_types.form.name_placeholder',
  'master_data.transaction_types.form.description_label',
  'master_data.transaction_types.form.description_help',
  'master_data.transaction_types.form.description_placeholder',
  'master_data.transaction_types.form.active_label',
  'master_data.transaction_types.form.active_help',
  'master_data.transaction_types.form.partner_enable_label',
  'master_data.transaction_types.form.partner_section_help',
  'master_data.transaction_types.form.partner_section_label',
  'master_data.transaction_types.form.partner_mode_bank',
  'master_data.transaction_types.form.partner_mode_fixed',
  'master_data.transaction_types.form.partner_mode_bank_help',
  'master_data.transaction_types.form.cancel',
  'master_data.transaction_types.form.save_changes',
  'master_data.transaction_types.patterns.heading',
  'master_data.transaction_types.patterns.description',
  'master_data.transaction_types.patterns.field_description',
  'master_data.transaction_types.patterns.field_counterparty_name',
  'master_data.transaction_types.patterns.field_reference',
  'master_data.transaction_types.patterns.mode_contains',
  'master_data.transaction_types.patterns.mode_starts_with',
  'master_data.transaction_types.patterns.mode_exact',
  'master_data.transaction_types.patterns.remove_aria',
  'master_data.transaction_types.patterns.add_pattern',
  'master_data.transaction_types.patterns.value_placeholder',
  'defaults.systemDefaultHint',
  'defaults.transactionTypes.TT-BANK-FEE',
  'transactions.slide_over.matched_by_pattern',
  'transactions.slide_over.matched_by_ai',
  'transactions.slide_over.confidence_medium',
  'transactions.slide_over.marked_manually',
  'transactions.slide_over.undo_mark_unmatched',
  'transactions.detail.chip_own_entity',
] as const

export type UiKey = (typeof UI_KEYS)[number]

export type Pattern = { field: 'description' | 'counterparty_name' | 'reference'; mode: 'contains' | 'starts_with' | 'exact'; value: string }

/** Seeded Bank Fee patterns (aift-db 20260721180002). */
export const PATTERNS: Pattern[] = [
  { field: 'description', mode: 'contains', value: 'BANK FEE' },
  { field: 'description', mode: 'contains', value: 'JUTALÉK' },
]

/**
 * A default type keeps its seeded name and description (aift-db
 * 20260721180002), in English in every workspace: the list shows the name in
 * the workspace's language, the editor the stored name.
 */
export const TYPE_NAME = 'Bank Fee'
export const TYPE_DESCRIPTION =
  'Regular bank charges: monthly account fees, transfer fees, card fees, and commission. Typical descriptions: FORGALMI KÜLÖNDÍJ, JUTALÉK, HAVI DÍJ, SZÁMLAVEZETÉSI DÍJ, TRANZAKCIÓS ILLETÉK, KÁRTYA TRANZAKCIÓ JUTALÉKA, ZÁRLATI DÍJ, WISE CHARGES.'

/** The live preview's count in the example. */
export const MATCH_COUNT = 42

/** The AI's confidence in the example (the app prints it with 2 decimals). */
export const AI_SCORE = '0.72'

type Copy = {
  ui: Record<UiKey, string>
  /** Plural app messages, rendered for MATCH_COUNT. */
  rendered: { matchCount: string }
  help: {
    flow: {
      patterns: string
      patternsDetail: string
      partner: string
      partnerDetail: string
      ai: string
      aiDetail: string
      person: string
      personDetail: string
      footnote: string
    }
    alt: { flow: string; editor: string }
  }
}

// ── English ─────────────────────────────────────────────────────────────────

const en: Copy = {
  ui: {
    'common.edit_drawer.close': '← Close',
    'master_data.transaction_types.form.edit_title': 'Edit transaction type',
    'master_data.transaction_types.form.name_label': 'Name *',
    'master_data.transaction_types.form.name_placeholder': 'e.g. Bank Fee',
    'master_data.transaction_types.form.description_label': 'Description',
    'master_data.transaction_types.form.description_help': 'Describe what transactions belong to this type. This text is shown to the AI when classifying transactions.',
    'master_data.transaction_types.form.description_placeholder': 'e.g. Regular bank charges: monthly account fees, transfer fees, and card fees.',
    'master_data.transaction_types.form.active_label': 'Active',
    'master_data.transaction_types.form.active_help': 'Inactive types are excluded from AI matching and the manual selection dropdown',
    'master_data.transaction_types.form.partner_enable_label': 'Set the partner from this type',
    'master_data.transaction_types.form.partner_section_help': 'When on, these movements get a partner automatically. Either the account\'s bank, or one specific partner.',
    'master_data.transaction_types.form.partner_section_label': 'Partner',
    'master_data.transaction_types.form.partner_mode_bank': 'Bank',
    'master_data.transaction_types.form.partner_mode_fixed': 'Specific partner',
    'master_data.transaction_types.form.partner_mode_bank_help': 'The party is the account\'s own bank. Set each account\'s bank (name + tax ID) under Master Data → Bank accounts.',
    'master_data.transaction_types.form.cancel': 'Cancel',
    'master_data.transaction_types.form.save_changes': 'Save changes',
    'master_data.transaction_types.patterns.heading': 'Patterns',
    'master_data.transaction_types.patterns.description': 'Match transactions where any pattern applies (case-insensitive):',
    'master_data.transaction_types.patterns.field_description': 'Description',
    'master_data.transaction_types.patterns.field_counterparty_name': 'Partner name',
    'master_data.transaction_types.patterns.field_reference': 'Reference',
    'master_data.transaction_types.patterns.mode_contains': 'Contains',
    'master_data.transaction_types.patterns.mode_starts_with': 'Starts with',
    'master_data.transaction_types.patterns.mode_exact': 'Exact',
    'master_data.transaction_types.patterns.remove_aria': 'Remove pattern',
    'master_data.transaction_types.patterns.add_pattern': '+ Add pattern',
    'master_data.transaction_types.patterns.value_placeholder': 'e.g. FORGALMI KÜLÖNDÍJ',
    'defaults.systemDefaultHint': 'System default. Its name is shown in the workspace\'s language automatically. Rename it to set a custom name.',
    'defaults.transactionTypes.TT-BANK-FEE': 'Bank Fee',
    'transactions.slide_over.matched_by_pattern': 'Matched by pattern rule',
    'transactions.slide_over.matched_by_ai': 'Matched by AI · Confidence: {label} ({score})',
    'transactions.slide_over.confidence_medium': 'Medium',
    'transactions.slide_over.marked_manually': 'Marked manually',
    'transactions.slide_over.undo_mark_unmatched': 'Undo: mark as unmatched',
    'transactions.detail.chip_own_entity': 'Own company',
  },
  rendered: { matchCount: '42 existing transactions in this workspace would match these patterns.' },
  help: {
    flow: {
      patterns: 'Your patterns',
      patternsDetail: 'Every unmatched transaction is checked against the patterns of your active types when it arrives. A match marks it at once.',
      partner: 'The partner',
      partnerDetail: 'A transfer between two accounts of the same company, or a type bound to a specific partner.',
      ai: 'The AI',
      aiDetail: 'Reads the transaction, your type descriptions and examples, and marks it when it is at least 60% sure. Once per transaction.',
      person: 'A person',
      personDetail: "Marks or undoes on the transaction's page. The decision becomes an example for the AI.",
      footnote: 'Any mark can be taken back on the transaction page:',
    },
    alt: {
      flow:
        "Diagram of how a bank transaction gets its type: first your patterns, then the partner (a transfer between your own accounts or a type bound to a specific partner), then the AI when it is at least 60% sure, and a person can mark or undo at any time. The transaction's page says which of them marked it.",
      editor:
        'The editor drawer of the default Bank Fee transaction type: name, description, Active, Set the partner from this type with Bank selected, two patterns that look for BANK FEE and JUTALÉK in the description, and the live count of matching transactions. Numbered markers point to the parts described in the list below.',
    },
  },
}

// ── Hungarian ───────────────────────────────────────────────────────────────

const hu: Copy = {
  ui: {
    'common.edit_drawer.close': '← Bezárás',
    'master_data.transaction_types.form.edit_title': 'Tranzakció típus szerkesztése',
    'master_data.transaction_types.form.name_label': 'Név *',
    'master_data.transaction_types.form.name_placeholder': 'pl. Banki díj',
    'master_data.transaction_types.form.description_label': 'Leírás',
    'master_data.transaction_types.form.description_help': 'Írd le, milyen tranzakciók tartoznak ebbe a típusba. Ez a szöveg jelenik meg az AI-nak a tranzakciók osztályozásakor.',
    'master_data.transaction_types.form.description_placeholder': 'pl. Rendszeres banki költségek: havi számlavezetési díjak, átutalási díjak és kártyadíjak.',
    'master_data.transaction_types.form.active_label': 'Aktív',
    'master_data.transaction_types.form.active_help': 'Az inaktív típusok ki vannak zárva az AI párosításból és a manuális kiválasztási legördülőből',
    'master_data.transaction_types.form.partner_enable_label': 'A partnert a típus állítsa be',
    'master_data.transaction_types.form.partner_section_help': 'Bekapcsolva ezek a tételek automatikusan partnert kapnak. Vagy a számlát vezető bankot, vagy egy konkrét partnert.',
    'master_data.transaction_types.form.partner_section_label': 'Partner',
    'master_data.transaction_types.form.partner_mode_bank': 'Bank',
    'master_data.transaction_types.form.partner_mode_fixed': 'Konkrét partner',
    'master_data.transaction_types.form.partner_mode_bank_help': 'A fél a számla saját bankja. A számlák bankját (név + adószám) a Törzsadatok → Bankszámlák alatt add meg.',
    'master_data.transaction_types.form.cancel': 'Mégse',
    'master_data.transaction_types.form.save_changes': 'Módosítások mentése',
    'master_data.transaction_types.patterns.heading': 'Minták',
    'master_data.transaction_types.patterns.description': 'Olyan tranzakciók párosítása, ahol bármely minta illeszkedik (kis-/nagybetű érzéketlen):',
    'master_data.transaction_types.patterns.field_description': 'Leírás',
    'master_data.transaction_types.patterns.field_counterparty_name': 'Partner neve',
    'master_data.transaction_types.patterns.field_reference': 'Hivatkozás',
    'master_data.transaction_types.patterns.mode_contains': 'Tartalmazza',
    'master_data.transaction_types.patterns.mode_starts_with': 'Ezzel kezdődik',
    'master_data.transaction_types.patterns.mode_exact': 'Pontos',
    'master_data.transaction_types.patterns.remove_aria': 'Minta eltávolítása',
    'master_data.transaction_types.patterns.add_pattern': '+ Minta hozzáadása',
    'master_data.transaction_types.patterns.value_placeholder': 'pl. FORGALMI KÜLÖNDÍJ',
    'defaults.systemDefaultHint': 'Rendszer-alapértelmezett. A neve automatikusan a munkaterület nyelvén jelenik meg. Nevezd át egyedi név megadásához.',
    'defaults.transactionTypes.TT-BANK-FEE': 'Bankköltség',
    'transactions.slide_over.matched_by_pattern': 'Minta szerint párosítva',
    'transactions.slide_over.matched_by_ai': 'AI által párosítva · Bizonyosság: {label} ({score})',
    'transactions.slide_over.confidence_medium': 'Közepes',
    'transactions.slide_over.marked_manually': 'Manuálisan megjelölve',
    'transactions.slide_over.undo_mark_unmatched': 'Visszavonás: megjelölés nem párosítottként',
    'transactions.detail.chip_own_entity': 'Saját cég',
  },
  rendered: { matchCount: '42 meglévő tranzakció illeszkedne ezekre a mintákra ebben a munkaterületben.' },
  help: {
    flow: {
      patterns: 'Az Ön mintái',
      patternsDetail: 'Minden nem párosított tranzakciót a beérkezésekor összevetünk az aktív típusok mintáival. Egyezés esetén azonnal megjelöljük.',
      partner: 'A partner',
      partnerDetail: 'Átvezetés ugyanannak a cégnek két számlája között, vagy egy konkrét partnerhez kötött típus.',
      ai: 'Az AI',
      aiDetail: 'Elolvassa a tranzakciót, a típusleírásokat és a példákat, és megjelöli, ha legalább 60%-ban biztos. Tranzakciónként egyszer.',
      person: 'Egy személy',
      personDetail: 'A tranzakció oldalán megjelöli vagy visszavonja. A döntésből példa lesz az AI számára.',
      footnote: 'Bármelyik jelölés visszavonható a tranzakció oldalán:',
    },
    alt: {
      flow:
        'Ábra arról, hogyan kap típust egy banki tranzakció: először az Ön mintái, aztán a partner (átvezetés a saját számlái között vagy konkrét partnerhez kötött típus), aztán az AI, ha legalább 60%-ban biztos, és egy személy bármikor megjelölheti vagy visszavonhatja. A tranzakció oldala mutatja, melyikük jelölte meg.',
      editor:
        'Az alapértelmezett Bank Fee (Bankköltség) tranzakciótípus szerkesztőpanelje: név, leírás, Aktív, A partnert a típus állítsa be a Bank lehetőséggel, két minta, amely a BANK FEE és a JUTALÉK szót keresi a leírásban, és az illeszkedő tranzakciók élő száma. A számozott jelölők az alábbi listában leírt részekre mutatnak.',
    },
  },
}

// ── German ──────────────────────────────────────────────────────────────────

const de: Copy = {
  ui: {
    'common.edit_drawer.close': '← Schließen',
    'master_data.transaction_types.form.edit_title': 'Transaktionstyp bearbeiten',
    'master_data.transaction_types.form.name_label': 'Name *',
    'master_data.transaction_types.form.name_placeholder': 'z. B. Bankgebühr',
    'master_data.transaction_types.form.description_label': 'Beschreibung',
    'master_data.transaction_types.form.description_help': 'Beschreiben Sie, welche Transaktionen zu diesem Typ gehören. Dieser Text wird der KI bei der Klassifizierung von Transaktionen angezeigt.',
    'master_data.transaction_types.form.description_placeholder': 'z. B. Regelmäßige Bankgebühren: monatliche Kontoführungsgebühren, Überweisungsgebühren und Kartengebühren.',
    'master_data.transaction_types.form.active_label': 'Aktiv',
    'master_data.transaction_types.form.active_help': 'Inaktive Typen werden bei der KI-Zuordnung und im Dropdown für manuelle Auswahl ausgeschlossen',
    'master_data.transaction_types.form.partner_enable_label': 'Partner durch diesen Typ setzen',
    'master_data.transaction_types.form.partner_section_help': 'Wenn aktiviert, erhalten diese Bewegungen automatisch einen Partner. Entweder die kontoführende Bank oder einen bestimmten Partner.',
    'master_data.transaction_types.form.partner_section_label': 'Partner',
    'master_data.transaction_types.form.partner_mode_bank': 'Bank',
    'master_data.transaction_types.form.partner_mode_fixed': 'Bestimmter Partner',
    'master_data.transaction_types.form.partner_mode_bank_help': 'Die Partei ist die eigene Bank des Kontos. Legen Sie die Bank (Name + Steuernummer) jedes Kontos unter Stammdaten → Bankkonten fest.',
    'master_data.transaction_types.form.cancel': 'Abbrechen',
    'master_data.transaction_types.form.save_changes': 'Änderungen speichern',
    'master_data.transaction_types.patterns.heading': 'Muster',
    'master_data.transaction_types.patterns.description': 'Transaktionen treffen zu, wenn ein beliebiges Muster passt (Groß-/Kleinschreibung ignoriert):',
    'master_data.transaction_types.patterns.field_description': 'Beschreibung',
    'master_data.transaction_types.patterns.field_counterparty_name': 'Name des Partners',
    'master_data.transaction_types.patterns.field_reference': 'Verwendungszweck',
    'master_data.transaction_types.patterns.mode_contains': 'Enthält',
    'master_data.transaction_types.patterns.mode_starts_with': 'Beginnt mit',
    'master_data.transaction_types.patterns.mode_exact': 'Exakt',
    'master_data.transaction_types.patterns.remove_aria': 'Muster entfernen',
    'master_data.transaction_types.patterns.add_pattern': '+ Muster hinzufügen',
    'master_data.transaction_types.patterns.value_placeholder': 'z. B. FORGALMI KÜLÖNDÍJ',
    'defaults.systemDefaultHint': 'Systemstandard. Der Name wird automatisch in der Sprache des Arbeitsbereichs angezeigt. Benennen Sie ihn um, um einen eigenen Namen zu vergeben.',
    'defaults.transactionTypes.TT-BANK-FEE': 'Bankgebühr',
    'transactions.slide_over.matched_by_pattern': 'Per Musterregel zugeordnet',
    'transactions.slide_over.matched_by_ai': 'Per KI zugeordnet · Konfidenz: {label} ({score})',
    'transactions.slide_over.confidence_medium': 'Mittel',
    'transactions.slide_over.marked_manually': 'Manuell markiert',
    'transactions.slide_over.undo_mark_unmatched': 'Rückgängig: als nicht zugeordnet markieren',
    'transactions.detail.chip_own_entity': 'Eigenes Unternehmen',
  },
  rendered: { matchCount: '42 bestehende Transaktionen in diesem Arbeitsbereich würden diesen Mustern entsprechen.' },
  help: {
    flow: {
      patterns: 'Ihre Muster',
      patternsDetail: 'Jede nicht zugeordnete Transaktion wird beim Eintreffen mit den Mustern Ihrer aktiven Typen verglichen. Ein Treffer markiert sie sofort.',
      partner: 'Der Partner',
      partnerDetail: 'Eine Umbuchung zwischen zwei Konten desselben Unternehmens oder ein Typ, der an einen bestimmten Partner gebunden ist.',
      ai: 'Die KI',
      aiDetail: 'Liest die Transaktion, Ihre Typbeschreibungen und Beispiele und markiert sie, wenn sie zu mindestens 60 % sicher ist. Einmal pro Transaktion.',
      person: 'Eine Person',
      personDetail: 'Markiert oder macht rückgängig auf der Seite der Transaktion. Die Entscheidung wird zu einem Beispiel für die KI.',
      footnote: 'Jede Markierung lässt sich auf der Seite der Transaktion zurücknehmen:',
    },
    alt: {
      flow:
        'Diagramm, wie eine Banktransaktion ihren Typ erhält: zuerst Ihre Muster, dann der Partner (eine Umbuchung zwischen Ihren eigenen Konten oder ein an einen bestimmten Partner gebundener Typ), dann die KI, wenn sie zu mindestens 60 % sicher ist, und eine Person kann jederzeit markieren oder rückgängig machen. Die Seite der Transaktion zeigt, wer sie markiert hat.',
      editor:
        'Das Bearbeitungsfenster des Standard-Transaktionstyps Bank Fee (Bankgebühr): Name, Beschreibung, Aktiv, Partner durch diesen Typ setzen mit Bank ausgewählt, zwei Muster, die in der Beschreibung nach BANK FEE und JUTALÉK suchen, und die Live-Zahl passender Transaktionen. Nummerierte Markierungen zeigen auf die Teile, die in der Liste darunter beschrieben sind.',
    },
  },
}

export const transactionTypesCopy: Record<Locale, Copy> = { en, hu, de }
