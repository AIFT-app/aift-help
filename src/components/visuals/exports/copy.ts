// Strings for the two export figures: what the app RENDERS for the fixtures
// (money formatting, ICU messages), read off throwaway aift-web pages that render
// the same markup with the same fixtures (origin/main messages, 2026-10-26).
// Fixture data is fictional.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-10-26):
//   src/app/(app)/workspaces/[workspaceId]/exports/rlb/_components/RlbFixBeforeExportPanel.tsx
//   src/app/(app)/workspaces/[workspaceId]/exports/hessyn-kettos/page.tsx
//   src/app/(app)/workspaces/[workspaceId]/exports/hessyn-kettos/_components/HessynGlAccountsCard.tsx
//   src/app/(app)/workspaces/[workspaceId]/exports/hessyn-kettos/_components/HessynExportControls.tsx
import type { Locale } from '@/lib/i18n'

// ── RLB: Fix before export ──────────────────────────────────────────────────
//
// Two of six already fixed, one left in each section. Line 2's VAT: 19,990 net
// at 27% is 5,397.30, stored as 5,400.

type FixCopy = {
  title: string
  subtitle: string
  progress: [string, string]
  sections: [string, string, string, string]
  categoryAria: string
  inv: { amount: string; chip: string; line: [string, string]; lineAmount: string; category: string; placeholder: string; linkLead: string; link: string }
  bank: { amount: string; chip: string; placeholder: string }
  fx: { amount: string; chip: string; hint: string; label: string; unit: string; save: string }
  vat: { amount: string; chip: string; line: [string, string]; compare: string; button: string }
  footer: [string, string, string]
  alt: string
}

export const FIX_RECORDS = {
  inv: { number: 'GM-2026-0418', id: 'HPK-INV-2026-0512', meta: 'Gearmont Kft. · 2026-10-08' },
  bank: { id: 'HPK-TXN-2026-1342', meta: 'Slatebridge Bank Zrt. · 2026-10-14' },
  fx: { number: 'RW/1012', id: 'HPK-INV-2026-0519', meta: 'Reamwell Kft. · 2026-10-21 · EUR' },
  vat: { number: 'QM-2026-0233', id: 'HPK-INV-2026-0497', meta: 'Quillmoor Kft. · 2026-10-02' },
}

export const fixCopy: Record<Locale, FixCopy> = {
  en: {
    title: 'Fix before export',
    subtitle: 'Rows without a general-ledger account are skipped by RLB. Fix them, then export.',
    progress: ['2 of 6 fixed', '4 remaining'],
    sections: ['Invoices · GL account', 'Bank transactions · GL account', 'Invoices · HUF rate', 'Invoices · VAT'],
    categoryAria: 'Category',
    inv: {
      amount: 'HUF 254,000.00',
      chip: '1 line needs a GL account',
      line: ['Line 1', 'Office chairs'],
      lineAmount: 'HUF 200,000.00',
      category: 'Office equipment',
      placeholder: 'Reassign to a coded category',
      linkLead: 'or ',
      link: 'set a Code on «Office equipment»',
    },
    bank: { amount: '-HUF 3,175.00', chip: 'No category', placeholder: 'Choose a category with a Code' },
    fx: { amount: '€1,240.00', chip: 'Rate pending', hint: 'A HUF rate will be fetched automatically. Or set it now.', label: 'HUF rate', unit: 'HUF/EUR', save: 'Save' },
    vat: {
      amount: 'HUF 127,000.00',
      chip: 'Line VAT ≠ invoice VAT',
      line: ['Line 2', 'Delivery'],
      compare: 'Stored HUF 5,400.00, should be HUF 5,397.30',
      button: 'Recompute VAT from rate',
    },
    footer: ['Fix the rows above, or export anyway from the export menu.', 'Close', 'Export now'],
    alt: 'The Fix before export panel of the RLB page: 2 of 6 fixed, 4 remaining. Under Invoices · GL account, an invoice whose line 1 sits in a category with no Code, with a category picker and a link to set a Code. Under Bank transactions · GL account, a bank fee with no category. Under Invoices · HUF rate, a EUR invoice whose rate is pending, with a HUF rate field and Save. Under Invoices · VAT, an invoice whose line VAT is 5,400.00 but should be 5,397.30, with Recompute VAT from rate. At the bottom, Close and a greyed-out Export now.',
  },
  hu: {
    title: 'Javítás exportálás előtt',
    subtitle: 'A főkönyvi szám nélküli sorokat az RLB kihagyja. Javítsd őket, majd exportálj.',
    progress: ['2 / 6 javítva', '4 van hátra'],
    sections: ['Számlák · főkönyvi szám', 'Banki tételek · főkönyvi szám', 'Számlák · HUF árfolyam', 'Számlák · áfa'],
    categoryAria: 'Kategória',
    inv: {
      amount: '254 000,00 Ft',
      chip: '1 tételsorhoz kell főkönyvi szám',
      line: ['1. tétel', 'Irodai székek'],
      lineAmount: '200 000,00 Ft',
      category: 'Irodai eszközök',
      placeholder: 'Sorold át kóddal rendelkező kategóriába',
      linkLead: 'vagy ',
      link: 'adj kódot a(z) «Irodai eszközök» kategóriának',
    },
    bank: { amount: '-3 175,00 Ft', chip: 'Nincs kategória', placeholder: 'Válassz kóddal rendelkező kategóriát' },
    fx: { amount: '1 240,00 EUR', chip: 'Árfolyam függőben', hint: 'A HUF árfolyamot automatikusan lekérjük. Vagy add meg most.', label: 'HUF árfolyam', unit: 'HUF/EUR', save: 'Mentés' },
    vat: {
      amount: '127 000,00 Ft',
      chip: 'Tétel-áfa ≠ számla-áfa',
      line: ['2. tétel', 'Szállítás'],
      compare: 'Tárolt: 5 400,00 Ft, helyesen: 5 397,30 Ft',
      button: 'Áfa újraszámítása a kulcsból',
    },
    footer: ['Javítsd a fenti sorokat, vagy exportálj mégis az export menüből.', 'Bezárás', 'Exportálás most'],
    alt: 'Az RLB oldal Javítás exportálás előtt panelje: 2 / 6 javítva, 4 van hátra. A Számlák · főkönyvi szám alatt egy számla, amelynek 1. tétele kód nélküli kategóriában van, kategóriaválasztóval és egy kódadó hivatkozással. A Banki tételek · főkönyvi szám alatt egy kategória nélküli banki díj. A Számlák · HUF árfolyam alatt egy EUR számla függő árfolyammal, HUF árfolyam mezővel és Mentés gombbal. A Számlák · áfa alatt egy számla, amelynek tétel-áfája 5 400,00, de 5 397,30 kellene, Áfa újraszámítása a kulcsból gombbal. Alul Bezárás és a szürke Exportálás most.',
  },
  de: {
    title: 'Vor dem Export beheben',
    subtitle: 'Zeilen ohne Sachkonto überspringt RLB. Beheben, dann exportieren.',
    progress: ['2 von 6 behoben', '4 verbleibend'],
    sections: ['Rechnungen · Sachkonto', 'Banktransaktionen · Sachkonto', 'Rechnungen · HUF-Kurs', 'Rechnungen · USt.'],
    categoryAria: 'Kategorie',
    inv: {
      amount: '254.000,00 HUF',
      chip: '1 Position braucht ein Sachkonto',
      line: ['Position 1', 'Bürostühle'],
      lineAmount: '200.000,00 HUF',
      category: 'Büroausstattung',
      placeholder: 'Zu codierter Kategorie ändern',
      linkLead: 'oder ',
      link: 'Code für «Büroausstattung» festlegen',
    },
    bank: { amount: '-3.175,00 HUF', chip: 'Keine Kategorie', placeholder: 'Kategorie mit Code wählen' },
    fx: { amount: '1.240,00 €', chip: 'Kurs ausstehend', hint: 'Ein HUF-Kurs wird automatisch abgerufen. Oder jetzt festlegen.', label: 'HUF-Kurs', unit: 'HUF/EUR', save: 'Speichern' },
    vat: {
      amount: '127.000,00 HUF',
      chip: 'Positions-USt. ≠ Rechnungs-USt.',
      line: ['Position 2', 'Lieferung'],
      compare: 'Gespeichert 5.400,00 HUF, korrekt 5.397,30 HUF',
      button: 'USt. aus Satz neu berechnen',
    },
    footer: ['Beheben Sie die Zeilen oben oder exportieren Sie dennoch über das Export-Menü.', 'Schließen', 'Jetzt exportieren'],
    alt: 'Das Fenster Vor dem Export beheben der RLB-Seite: 2 von 6 behoben, 4 verbleibend. Unter Rechnungen · Sachkonto eine Rechnung, deren Position 1 in einer Kategorie ohne Code liegt, mit Kategorieauswahl und einem Link zum Festlegen eines Codes. Unter Banktransaktionen · Sachkonto eine Bankgebühr ohne Kategorie. Unter Rechnungen · HUF-Kurs eine EUR-Rechnung mit ausstehendem Kurs, einem Feld HUF-Kurs und Speichern. Unter Rechnungen · USt. eine Rechnung, deren Positions-USt. 5.400,00 beträgt, aber 5.397,30 sein müsste, mit USt. aus Satz neu berechnen. Unten Schließen und ein ausgegrautes Jetzt exportieren.',
  },
}

// ── HessynKettős page after an export ───────────────────────────────────────

type HessynCopy = {
  title: string
  subtitle: string
  glTitle: string
  glHint: string
  glCustomer: string
  glSalesVat: string
  glSave: string
  exportTitle: string
  date: string
  exportButton: string
  done: string
  advisories: [string, string, string]
  alt: string
}

export const HESSYN_ACCOUNTS = ['311', '467'] as const

export const hessynCopy: Record<Locale, HessynCopy> = {
  en: {
    title: 'HessynKettős export',
    subtitle: 'Export outbound sales invoices as a Számlázz.hu CSV that HessynKettős imports.',
    glTitle: 'GL accounts',
    glHint: "The customer control and sales-VAT accounts HessynKettős books against. The per-line revenue account comes from each category's Code.",
    glCustomer: 'Customer control account (Főkönyv vevő)',
    glSalesVat: 'Sales VAT account (Tétel árbevétel áfa)',
    glSave: 'Save',
    exportTitle: 'Generate export',
    date: 'All time',
    exportButton: 'Export CSV',
    done: 'Exported 64 line(s) across 23 invoice(s).',
    advisories: [
      '1 corrective (helyesbítő) invoice(s) were excluded. Book these manually in HessynKettős.',
      '2 cash invoice(s) were excluded (transfer invoices only in this version).',
      '3 line(s) had no revenue GL code. HessynKettős will use the journal default.',
    ],
    alt: 'The HessynKettős export page: GL accounts with the customer control account 311 and the sales VAT account 467, then Generate export with the date range set to All time and Export CSV. Under it the last export: 64 lines across 23 invoices, and in amber that 1 corrective invoice and 2 cash invoices were left out and 3 lines had no revenue GL code.',
  },
  hu: {
    title: 'HessynKettős export',
    subtitle: 'Kimenő számlák exportálása Számlázz.hu CSV formátumban, amelyet a HessynKettős beolvas.',
    glTitle: 'Főkönyvi számlák',
    glHint: 'A vevő gyűjtő- és a fizetendő áfa főkönyvi számla, amelyre a HessynKettős könyvel. A tételsor árbevétel-számláját a kategória Kódja adja.',
    glCustomer: 'Vevő főkönyvi számla (Főkönyv vevő)',
    glSalesVat: 'Fizetendő áfa számla (Tétel árbevétel áfa)',
    glSave: 'Mentés',
    exportTitle: 'Export készítése',
    date: 'Teljes időszak',
    exportButton: 'CSV export',
    done: '64 tételsor exportálva, 23 számlából.',
    advisories: [
      '1 helyesbítő számla kimaradt: ezeket kézzel könyveld a HessynKettősben.',
      '2 készpénzes számla kimaradt (ebben a verzióban csak átutalásos számlák).',
      '3 tételsornak nincs árbevétel főkönyvi kódja. A HessynKettős a napló alapértelmezését használja.',
    ],
    alt: 'A HessynKettős export oldal: Főkönyvi számlák 311-es vevő és 467-es fizetendő áfa számlával, alatta Export készítése, Teljes időszak dátumtartománnyal és CSV export gombbal. Alatta az utolsó export: 64 tételsor 23 számlából, és sárgával, hogy 1 helyesbítő és 2 készpénzes számla kimaradt, 3 tételsornak pedig nincs árbevétel főkönyvi kódja.',
  },
  de: {
    title: 'HessynKettős-Export',
    subtitle: 'Ausgehende Rechnungen als Számlázz.hu-CSV exportieren, die HessynKettős importiert.',
    glTitle: 'Sachkonten',
    glHint: 'Das Debitoren-Sammelkonto und das Umsatzsteuerkonto, auf die HessynKettős bucht. Das Erlöskonto je Position stammt aus dem Code der Kategorie.',
    glCustomer: 'Debitoren-Sammelkonto (Főkönyv vevő)',
    glSalesVat: 'Umsatzsteuerkonto (Tétel árbevétel áfa)',
    glSave: 'Speichern',
    exportTitle: 'Export erstellen',
    date: 'Gesamter Zeitraum',
    exportButton: 'CSV exportieren',
    done: '64 Position(en) aus 23 Rechnung(en) exportiert.',
    advisories: [
      '1 Korrekturrechnung(en) wurden ausgeschlossen. Bitte manuell in HessynKettős buchen.',
      '2 Barrechnung(en) wurden ausgeschlossen (nur Überweisungsrechnungen in dieser Version).',
      '3 Position(en) ohne Erlöskonto. HessynKettős verwendet die Journalvorgabe.',
    ],
    alt: 'Die Seite HessynKettős-Export: Sachkonten mit dem Debitoren-Sammelkonto 311 und dem Umsatzsteuerkonto 467, darunter Export erstellen mit dem Zeitraum Gesamter Zeitraum und CSV exportieren. Darunter der letzte Export: 64 Positionen aus 23 Rechnungen, und gelb, dass 1 Korrekturrechnung und 2 Barrechnungen ausgelassen wurden und 3 Positionen kein Erlöskonto hatten.',
  },
}
