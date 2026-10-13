// Labels for the closing figure, keyed by aift-web message key, plus the
// strings the app RENDERS from them for the fixture (ICU plurals, the account
// label, the joined status sentence). The rendered strings were read off the
// real components (ChecksSection, SignOffRail) rendered with the same fixture,
// so they are the app's output, not a re-translation.
//
// Rebuilt 1:1 from aift-web (feat/closing-ux-rework-2 @ eb092fa9, 2026-10-14):
//   src/app/(app)/workspaces/[workspaceId]/closing/[period]/page.tsx
//   src/app/(app)/workspaces/[workspaceId]/closing/_components/ChecksSection.tsx
//   src/app/(app)/workspaces/[workspaceId]/closing/_components/SignOffRail.tsx
// Fixture data is fictional: workspace, account number and counts.
import type { Locale } from '@/lib/i18n'

export const UI_KEYS = [
  'closing.title',
  'closing.status_open',
  'closing.todo_title',
  'closing.severity_blocker',
  'closing.severity_advisory',
  'closing.check_open',
  'closing.checks_title',
  'closing.not_applicable',
  'closing.check_ok',
  'closing.signoff_title',
  'closing.signoff_not_ready',
  'closing.signoff_auto',
  'closing.signoff_blockers',
  'closing.signoff_advisories',
  'closing.signoff_manual',
  'closing.close_cta',
  'closing.groups.completeness',
  'closing.groups.quality',
  'closing.groups.reconciliation',
  'closing.groups.export_readiness',
  'closing.checks.statement_coverage',
  'closing.checks.statement_balance',
  'closing.checks.nav_sync',
  'closing.checks.intake',
  'closing.checks.pipeline_stuck',
  'closing.checks.problem_ladder',
  'closing.checks.txn_categorized',
  'closing.checks.vat_complete',
  'closing.checks.fx_resolved',
  'closing.checks.match_suggestions',
  'closing.checks.txn_resolved',
  'closing.checks.net_gl',
  'closing.checks.bank_gl',
  'closing.checks.huf_amounts',
  'closing.checks.line_vat',
  'closing.checks.basis_dates',
] as const

export type UiKey = (typeof UI_KEYS)[number]

export type TodoRow = { id: string; blocker: boolean; count: string; lines: string[] }
export type CheckRow = { id: string; group: string; fact?: string; naReason?: string }

type Copy = {
  ui: Record<UiKey, string>
  rendered: {
    /** formatPeriodLabel('2026-09-01'): Intl month long + year. */
    period: string
    /** closing.detail_subtitle with closing.basis_delivery. */
    subtitle: string
    todoTally: string
    todo: TodoRow[]
    checksTally: string
    checks: CheckRow[]
    rail: { auto: string; blockers: string; advisories: string; manual: string; left: string }
  }
  help: { alt: string }
}

const en: Copy = {
  "ui": {
    "closing.title": "Closing",
    "closing.status_open": "Open",
    "closing.todo_title": "To do",
    "closing.severity_blocker": "Blocking",
    "closing.severity_advisory": "Advisory",
    "closing.check_open": "Open →",
    "closing.checks_title": "Checks",
    "closing.not_applicable": "Not applicable",
    "closing.check_ok": "All clear",
    "closing.signoff_title": "Closing status",
    "closing.signoff_not_ready": "Not ready to close",
    "closing.signoff_auto": "Automatic checks",
    "closing.signoff_blockers": "Blocking checks",
    "closing.signoff_advisories": "Advisories",
    "closing.signoff_manual": "Manual checklist",
    "closing.close_cta": "Close period",
    "closing.groups.completeness": "Data completeness",
    "closing.groups.quality": "Processing",
    "closing.groups.reconciliation": "Matching",
    "closing.groups.export_readiness": "Export readiness",
    "closing.checks.statement_coverage": "Statements cover the period",
    "closing.checks.statement_balance": "Statement balances reconcile",
    "closing.checks.nav_sync": "NAV Online Számla synced",
    "closing.checks.intake": "Intake processed",
    "closing.checks.pipeline_stuck": "No pending processing",
    "closing.checks.problem_ladder": "Problem invoices resolved",
    "closing.checks.txn_categorized": "Transactions categorized",
    "closing.checks.vat_complete": "VAT codes complete",
    "closing.checks.fx_resolved": "Exchange rates resolved",
    "closing.checks.match_suggestions": "No pending match suggestions",
    "closing.checks.txn_resolved": "All transactions resolved",
    "closing.checks.net_gl": "GL codes complete",
    "closing.checks.bank_gl": "Bank contra accounts set",
    "closing.checks.huf_amounts": "HUF amounts available",
    "closing.checks.line_vat": "Line VAT matches header",
    "closing.checks.basis_dates": "Delivery dates present"
  },
  "rendered": {
    "period": "September 2026",
    "subtitle": "Scoped by delivery date",
    "todoTally": "4 checks · 3 blocking",
    "todo": [
      {
        "id": "statement_coverage",
        "blocker": true,
        "count": "1 bank account",
        "lines": [
          "11773016-01234565 · Fő HUF számla: no statement from 2026-09-01 to 2026-09-30"
        ]
      },
      {
        "id": "problem_ladder",
        "blocker": true,
        "count": "96 invoices",
        "lines": [
          "This month's problem invoices, filtered on the invoice list.",
          "Invoices that are only waiting for payment are not counted."
        ]
      },
      {
        "id": "txn_categorized",
        "blocker": true,
        "count": "47 transactions",
        "lines": [
          "Bank transactions without a category this month."
        ]
      },
      {
        "id": "bank_gl",
        "blocker": false,
        "count": "9 transactions",
        "lines": [
          "Transactions marked “No invoice needed” whose category has no contra GL account."
        ]
      }
    ],
    "checksTally": "11 passing · 1 not applicable",
    "checks": [
      {
        "id": "nav_sync",
        "group": "completeness",
        "fact": "last sync: 2026-10-13"
      },
      {
        "id": "intake",
        "group": "completeness"
      },
      {
        "id": "pipeline_stuck",
        "group": "completeness"
      },
      {
        "id": "vat_complete",
        "group": "quality"
      },
      {
        "id": "fx_resolved",
        "group": "quality"
      },
      {
        "id": "match_suggestions",
        "group": "reconciliation"
      },
      {
        "id": "txn_resolved",
        "group": "reconciliation"
      },
      {
        "id": "net_gl",
        "group": "export_readiness"
      },
      {
        "id": "huf_amounts",
        "group": "export_readiness"
      },
      {
        "id": "line_vat",
        "group": "export_readiness"
      },
      {
        "id": "basis_dates",
        "group": "export_readiness"
      },
      {
        "id": "statement_balance",
        "group": "completeness",
        "naReason": "No statement has an opening and closing balance yet."
      }
    ],
    "rail": {
      "auto": "11/15",
      "blockers": "3",
      "advisories": "1",
      "manual": "1/2",
      "left": "3 blocking checks left. 1 manual item is not ticked. Advisories do not block closing."
    }
  },
  "help": {
    "alt": "The Closing page for September 2026, at the width of a laptop screen. On the left the To do card lists only the failing checks, each with a red Blocking or amber Advisory label, the check name with its count and unit, one line saying what the check found, and an Open link on the right. Below it the Checks card begins, listing the passing checks one per line with a green tick. On the right the Closing status card reads Not ready to close, counts 11 of 15 automatic checks passing, 3 blocking checks, 1 advisory and 1 of 2 manual items, shows a greyed Close period button, and says under it what is still missing."
  }
}

const hu: Copy = {
  "ui": {
    "closing.title": "Zárás",
    "closing.status_open": "Nyitott",
    "closing.todo_title": "Teendők",
    "closing.severity_blocker": "Blokkoló",
    "closing.severity_advisory": "Figyelmeztetés",
    "closing.check_open": "Megnyitás →",
    "closing.checks_title": "Ellenőrzések",
    "closing.not_applicable": "Nem alkalmazható",
    "closing.check_ok": "Minden rendben",
    "closing.signoff_title": "Zárás állapota",
    "closing.signoff_not_ready": "Még nem zárható",
    "closing.signoff_auto": "Automatikus ellenőrzések",
    "closing.signoff_blockers": "Blokkoló ellenőrzések",
    "closing.signoff_advisories": "Figyelmeztetések",
    "closing.signoff_manual": "Kézi ellenőrzőlista",
    "closing.close_cta": "Időszak lezárása",
    "closing.groups.completeness": "Adatok teljessége",
    "closing.groups.quality": "Feldolgozás",
    "closing.groups.reconciliation": "Párosítás",
    "closing.groups.export_readiness": "Export-készenlét",
    "closing.checks.statement_coverage": "Bankkivonatok lefedik az időszakot",
    "closing.checks.statement_balance": "Kivonategyenlegek egyeznek",
    "closing.checks.nav_sync": "NAV Online Számla szinkronizálva",
    "closing.checks.intake": "Gyűjtő feldolgozva",
    "closing.checks.pipeline_stuck": "Nincs függő feldolgozás",
    "closing.checks.problem_ladder": "Problémás számlák rendezve",
    "closing.checks.txn_categorized": "Tranzakciók kategorizálva",
    "closing.checks.vat_complete": "ÁFA-kódok hiánytalanok",
    "closing.checks.fx_resolved": "Árfolyamok rendezve",
    "closing.checks.match_suggestions": "Nincs függő párosítási javaslat",
    "closing.checks.txn_resolved": "Minden tranzakció rendezve",
    "closing.checks.net_gl": "Főkönyvi számok hiánytalanok",
    "closing.checks.bank_gl": "Bank ellenszámlák beállítva",
    "closing.checks.huf_amounts": "HUF összegek rendelkezésre állnak",
    "closing.checks.line_vat": "Tételsor-ÁFA egyezik a fejléccel",
    "closing.checks.basis_dates": "Teljesítési dátumok hiánytalanok"
  },
  "rendered": {
    "period": "2026. szeptember",
    "subtitle": "teljesítés dátuma szerint",
    "todoTally": "4 ellenőrzés · 3 blokkoló",
    "todo": [
      {
        "id": "statement_coverage",
        "blocker": true,
        "count": "1 bankszámla",
        "lines": [
          "11773016-01234565 · Fő HUF számla: 2026-09-01 és 2026-09-30 között nincs kivonat"
        ]
      },
      {
        "id": "problem_ladder",
        "blocker": true,
        "count": "96 számla",
        "lines": [
          "A hónap problémás számlái, a számlalistán szűrve.",
          "A csak fizetésre váró számlák nem számítanak bele."
        ]
      },
      {
        "id": "txn_categorized",
        "blocker": true,
        "count": "47 tranzakció",
        "lines": [
          "Kategória nélküli banki tranzakciók ebben a hónapban."
        ]
      },
      {
        "id": "bank_gl",
        "blocker": false,
        "count": "9 tranzakció",
        "lines": [
          "„Nem kell számla” jelölésű tranzakciók, amelyek kategóriájához nincs főkönyvi ellenszámla."
        ]
      }
    ],
    "checksTally": "11 rendben · 1 nem alkalmazható",
    "checks": [
      {
        "id": "nav_sync",
        "group": "completeness",
        "fact": "utolsó szinkron: 2026-10-13"
      },
      {
        "id": "intake",
        "group": "completeness"
      },
      {
        "id": "pipeline_stuck",
        "group": "completeness"
      },
      {
        "id": "vat_complete",
        "group": "quality"
      },
      {
        "id": "fx_resolved",
        "group": "quality"
      },
      {
        "id": "match_suggestions",
        "group": "reconciliation"
      },
      {
        "id": "txn_resolved",
        "group": "reconciliation"
      },
      {
        "id": "net_gl",
        "group": "export_readiness"
      },
      {
        "id": "huf_amounts",
        "group": "export_readiness"
      },
      {
        "id": "line_vat",
        "group": "export_readiness"
      },
      {
        "id": "basis_dates",
        "group": "export_readiness"
      },
      {
        "id": "statement_balance",
        "group": "completeness",
        "naReason": "Még egyik kivonaton sincs nyitó és záró egyenleg."
      }
    ],
    "rail": {
      "auto": "11/15",
      "blockers": "3",
      "advisories": "1",
      "manual": "1/2",
      "left": "Még 3 blokkoló ellenőrzés. 1 kézi tétel nincs kipipálva. A figyelmeztetések nem akadályozzák a zárást."
    }
  },
  "help": {
    "alt": "A Zárás oldal 2026. szeptemberre, egy laptop képernyőjének szélességében. Balra a Teendők kártya csak a nem teljesülő ellenőrzéseket sorolja fel: mindegyiken piros Blokkoló vagy sárga Figyelmeztetés jelzés, az ellenőrzés neve a darabszámmal és a mértékegységgel, egy sor arról, mit talált, jobbra pedig a Megnyitás hivatkozás. Alatta kezdődik az Ellenőrzések kártya, soronként egy rendben lévő ellenőrzéssel és zöld pipával. Jobbra a Zárás állapota kártya: Még nem zárható, 15 automatikus ellenőrzésből 11 rendben, 3 blokkoló ellenőrzés, 1 figyelmeztetés, a kézi ellenőrzőlistán 2-ből 1 kész, egy szürke Időszak lezárása gomb, alatta pedig az, ami még hiányzik."
  }
}

const de: Copy = {
  "ui": {
    "closing.title": "Abschluss",
    "closing.status_open": "Offen",
    "closing.todo_title": "Zu erledigen",
    "closing.severity_blocker": "Blockierend",
    "closing.severity_advisory": "Hinweis",
    "closing.check_open": "Öffnen →",
    "closing.checks_title": "Prüfungen",
    "closing.not_applicable": "Nicht anwendbar",
    "closing.check_ok": "Alles in Ordnung",
    "closing.signoff_title": "Abschlussstatus",
    "closing.signoff_not_ready": "Noch nicht abschließbar",
    "closing.signoff_auto": "Automatische Prüfungen",
    "closing.signoff_blockers": "Blockierende Prüfungen",
    "closing.signoff_advisories": "Hinweise",
    "closing.signoff_manual": "Manuelle Checkliste",
    "closing.close_cta": "Zeitraum abschließen",
    "closing.groups.completeness": "Datenvollständigkeit",
    "closing.groups.quality": "Verarbeitung",
    "closing.groups.reconciliation": "Zuordnung",
    "closing.groups.export_readiness": "Exportbereitschaft",
    "closing.checks.statement_coverage": "Kontoauszüge decken den Zeitraum ab",
    "closing.checks.statement_balance": "Auszugssalden stimmen überein",
    "closing.checks.nav_sync": "NAV Online Számla synchronisiert",
    "closing.checks.intake": "Sammelstelle abgearbeitet",
    "closing.checks.pipeline_stuck": "Keine ausstehende Verarbeitung",
    "closing.checks.problem_ladder": "Problemrechnungen geklärt",
    "closing.checks.txn_categorized": "Transaktionen kategorisiert",
    "closing.checks.vat_complete": "USt-Codes vollständig",
    "closing.checks.fx_resolved": "Wechselkurse aufgelöst",
    "closing.checks.match_suggestions": "Keine offenen Zuordnungsvorschläge",
    "closing.checks.txn_resolved": "Alle Transaktionen geklärt",
    "closing.checks.net_gl": "Sachkonten vollständig",
    "closing.checks.bank_gl": "Bank-Gegenkonten gesetzt",
    "closing.checks.huf_amounts": "HUF-Beträge verfügbar",
    "closing.checks.line_vat": "Zeilen-USt stimmt mit dem Kopf überein",
    "closing.checks.basis_dates": "Leistungsdaten vorhanden"
  },
  "rendered": {
    "period": "September 2026",
    "subtitle": "Nach Leistungsdatum",
    "todoTally": "4 Prüfungen · 3 blockierend",
    "todo": [
      {
        "id": "statement_coverage",
        "blocker": true,
        "count": "1 Bankkonto",
        "lines": [
          "11773016-01234565 · Fő HUF számla: kein Auszug von 2026-09-01 bis 2026-09-30"
        ]
      },
      {
        "id": "problem_ladder",
        "blocker": true,
        "count": "96 Rechnungen",
        "lines": [
          "Die Problemrechnungen dieses Monats, in der Rechnungsliste gefiltert.",
          "Rechnungen, die nur auf Zahlung warten, zählen nicht."
        ]
      },
      {
        "id": "txn_categorized",
        "blocker": true,
        "count": "47 Transaktionen",
        "lines": [
          "Banktransaktionen ohne Kategorie in diesem Monat."
        ]
      },
      {
        "id": "bank_gl",
        "blocker": false,
        "count": "9 Transaktionen",
        "lines": [
          "Als „Keine Rechnung nötig“ markierte Transaktionen, deren Kategorie kein Gegenkonto hat."
        ]
      }
    ],
    "checksTally": "11 bestanden · 1 nicht anwendbar",
    "checks": [
      {
        "id": "nav_sync",
        "group": "completeness",
        "fact": "letzte Synchronisierung: 2026-10-13"
      },
      {
        "id": "intake",
        "group": "completeness"
      },
      {
        "id": "pipeline_stuck",
        "group": "completeness"
      },
      {
        "id": "vat_complete",
        "group": "quality"
      },
      {
        "id": "fx_resolved",
        "group": "quality"
      },
      {
        "id": "match_suggestions",
        "group": "reconciliation"
      },
      {
        "id": "txn_resolved",
        "group": "reconciliation"
      },
      {
        "id": "net_gl",
        "group": "export_readiness"
      },
      {
        "id": "huf_amounts",
        "group": "export_readiness"
      },
      {
        "id": "line_vat",
        "group": "export_readiness"
      },
      {
        "id": "basis_dates",
        "group": "export_readiness"
      },
      {
        "id": "statement_balance",
        "group": "completeness",
        "naReason": "Noch kein Auszug hat einen Anfangs- und Endsaldo."
      }
    ],
    "rail": {
      "auto": "11/15",
      "blockers": "3",
      "advisories": "1",
      "manual": "1/2",
      "left": "Noch 3 blockierende Prüfungen. 1 manueller Punkt ist nicht abgehakt. Hinweise blockieren den Abschluss nicht."
    }
  },
  "help": {
    "alt": "Die Abschlussseite für September 2026 in der Breite eines Laptop-Bildschirms. Links listet die Karte Zu erledigen nur die nicht bestandenen Prüfungen, jede mit einem roten Etikett Blockierend oder einem gelben Etikett Hinweis, dem Namen der Prüfung mit Anzahl und Einheit, einer Zeile dazu, was die Prüfung gefunden hat, und rechts dem Link Öffnen. Darunter beginnt die Karte Prüfungen, mit einer bestandenen Prüfung je Zeile und grünem Haken. Rechts zeigt die Karte Abschlussstatus Noch nicht abschließbar, 11 von 15 automatischen Prüfungen bestanden, 3 blockierende Prüfungen, 1 Hinweis und 1 von 2 manuellen Punkten, eine graue Schaltfläche Zeitraum abschließen und darunter, was noch fehlt."
  }
}

export const closingCopy: Record<Locale, Copy> = { en, hu, de }
