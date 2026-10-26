// Strings for the Matching Overview figure: what the app RENDERS for the
// fixture (ICU plurals, money and compact-number formatting, month names),
// read off the real components rendered with the same fixture in a throwaway
// aift-web page (origin/main messages, 2026-10-26). The app's output, not a
// re-translation.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-10-26):
//   src/app/(app)/workspaces/[workspaceId]/matching/_components/MatchingOverview.tsx
//   src/app/(app)/workspaces/[workspaceId]/matching/_components/OverviewTrendChart.tsx
//   src/app/(app)/workspaces/[workspaceId]/matching/_components/ExportButton.tsx
//   src/components/date-range/date-range-filter.tsx (the closed trigger)
// Fixture data is fictional.
import type { Locale } from '@/lib/i18n'

export type Tile = { label: string; count: string; sub: string; tone: 'amber' | 'green' | 'zinc' }

type Copy = {
  date: string
  tiles: Tile[]
  heading: string
  exportLabel: string
  metric: [string, string]
  metricLabel: string
  /** The y-axis labels, bottom to top (25%, 50%, 75%, 100% of the scale). */
  yLabels: string[]
  /** The value printed above each bar. */
  values: string[]
  /** The x-axis tick under each bar. */
  ticks: string[]
  year: string
  legend: { auto: string; manual: string; open: string; backlog: string; runs: string }
  table: { th: string[]; rows: string[][] }
  alt: string
}

const en: Copy = {
  date: 'This year',
  tiles: [
    { label: 'Invoices without payment', count: '14', sub: 'HUF\u00a03,920,000.00', tone: 'amber' },
    { label: 'Unmatched transactions', count: '19', sub: 'HUF\u00a02,610,000.00', tone: 'amber' },
    { label: 'Matched', count: '217', sub: '82% auto-matched', tone: 'green' },
    { label: 'Unapplied payments', count: '4', sub: 'HUF\u00a0860,000.00', tone: 'zinc' },
    { label: 'No invoice needed', count: '63', sub: 'HUF\u00a01,450,000.00', tone: 'zinc' },
  ],
  heading: 'Matched per month',
  exportLabel: 'Export',
  metric: ['Amount', 'Matches'],
  metricLabel: 'Metric',
  yLabels: ['1.9m', '3.9m', '5.8m', '7.7m'],
  values: ['4.8m', '5.2m', '6.1m', '5m', '6.8m', '6m', '6.4m', '5.6m', '7.1m', '3.1m'],
  ticks: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct'],
  year: '2026',
  legend: {
    auto: 'Auto-matched',
    manual: 'Confirmed by hand',
    open: 'Still open from this period',
    backlog: 'Outstanding at period end',
    runs: 'Matching run',
  },
  table: {
    th: ['Period', 'Matched', 'Auto', 'Amount', 'Amount (auto)'],
    rows: [
      ['January 2026', '18', '14', '4,820,000', '3,910,000'],
      ['February 2026', '21', '17', '5,240,000', '4,300,000'],
      ['March 2026', '24', '20', '6,110,000', '5,120,000'],
      ['April 2026', '19', '16', '5,020,000', '4,260,000'],
      ['May 2026', '26', '22', '6,780,000', '5,790,000'],
      ['June 2026', '23', '19', '5,960,000', '4,900,000'],
      ['July 2026', '25', '21', '6,420,000', '5,400,000'],
      ['August 2026', '22', '18', '5,610,000', '4,590,000'],
      ['September 2026', '27', '22', '7,050,000', '5,820,000'],
      ['October 2026', '12', '9', '3,100,000', '2,450,000'],
    ],
  },
  alt: 'The Overview tab of the Matching page for this year: five tiles (Invoices without payment, Unmatched transactions, Matched, Unapplied payments, No invoice needed) and a bar chart of the amount matched per month, split into auto-matched and confirmed by hand, with the still-open part on top of the latest bars and a line for the amount outstanding at each month end. Numbered markers point to the date filter, two tiles, the chart heading and the outstanding line in the legend.',
}

const hu: Copy = {
  date: 'Ez az év',
  tiles: [
    { label: 'Számlák fizetés nélkül', count: '14', sub: '3\u00a0920\u00a0000,00\u00a0Ft', tone: 'amber' },
    { label: 'Párosítatlan tételek', count: '19', sub: '2\u00a0610\u00a0000,00\u00a0Ft', tone: 'amber' },
    { label: 'Párosítva', count: '217', sub: '82% automatikus', tone: 'green' },
    { label: 'Nem rendezett befizetések', count: '4', sub: '860\u00a0000,00\u00a0Ft', tone: 'zinc' },
    { label: 'Nem igényel számlát', count: '63', sub: '1\u00a0450\u00a0000,00\u00a0Ft', tone: 'zinc' },
  ],
  heading: 'Havi párosítás',
  exportLabel: 'Exportálás',
  metric: ['Összeg', 'Párosítások'],
  metricLabel: 'Mérőszám',
  yLabels: ['1,9\u00a0M', '3,9\u00a0M', '5,8\u00a0M', '7,7\u00a0M'],
  values: ['4,8\u00a0M', '5,2\u00a0M', '6,1\u00a0M', '5\u00a0M', '6,8\u00a0M', '6\u00a0M', '6,4\u00a0M', '5,6\u00a0M', '7,1\u00a0M', '3,1\u00a0M'],
  ticks: ['jan.', 'febr.', 'márc.', 'ápr.', 'máj.', 'jún.', 'júl.', 'aug.', 'szept.', 'okt.'],
  year: '2026',
  legend: {
    auto: 'Automatikus',
    manual: 'Kézzel jóváhagyva',
    open: 'Ebből még nyitott',
    backlog: 'Nyitott állomány az időszak végén',
    runs: 'Párosítás futtatva',
  },
  table: {
    th: ['Időszak', 'Párosítva', 'Automatikus', 'Összeg', 'Összeg (automatikus)'],
    rows: [
      ['2026. január', '18', '14', '4\u00a0820\u00a0000', '3\u00a0910\u00a0000'],
      ['2026. február', '21', '17', '5\u00a0240\u00a0000', '4\u00a0300\u00a0000'],
      ['2026. március', '24', '20', '6\u00a0110\u00a0000', '5\u00a0120\u00a0000'],
      ['2026. április', '19', '16', '5\u00a0020\u00a0000', '4\u00a0260\u00a0000'],
      ['2026. május', '26', '22', '6\u00a0780\u00a0000', '5\u00a0790\u00a0000'],
      ['2026. június', '23', '19', '5\u00a0960\u00a0000', '4\u00a0900\u00a0000'],
      ['2026. július', '25', '21', '6\u00a0420\u00a0000', '5\u00a0400\u00a0000'],
      ['2026. augusztus', '22', '18', '5\u00a0610\u00a0000', '4\u00a0590\u00a0000'],
      ['2026. szeptember', '27', '22', '7\u00a0050\u00a0000', '5\u00a0820\u00a0000'],
      ['2026. október', '12', '9', '3\u00a0100\u00a0000', '2\u00a0450\u00a0000'],
    ],
  },
  alt: 'A Párosítás oldal Áttekintés füle az idei évre: öt csempe (Számlák fizetés nélkül, Párosítatlan tételek, Párosítva, Nem rendezett befizetések, Nem igényel számlát) és egy oszlopdiagram a havonta párosított összegről, automatikus és kézzel jóváhagyott részre bontva, a legutóbbi oszlopok tetején a még nyitott résszel, és egy vonallal a hónapvégi nyitott állományról. A számozott jelölők a dátumszűrőre, két csempére, a diagram címére és a jelmagyarázatban a nyitott állomány vonalára mutatnak.',
}

const de: Copy = {
  date: 'Dieses Jahr',
  tiles: [
    { label: 'Rechnungen ohne Zahlung', count: '14', sub: '3.920.000,00\u00a0HUF', tone: 'amber' },
    { label: 'Nicht zugeordnete Buchungen', count: '19', sub: '2.610.000,00\u00a0HUF', tone: 'amber' },
    { label: 'Zugeordnet', count: '217', sub: '82% automatisch', tone: 'green' },
    { label: 'Nicht zugeordnete Zahlungen', count: '4', sub: '860.000,00\u00a0HUF', tone: 'zinc' },
    { label: 'Kein Beleg nötig', count: '63', sub: '1.450.000,00\u00a0HUF', tone: 'zinc' },
  ],
  heading: 'Zuordnung pro Monat',
  exportLabel: 'Export',
  metric: ['Betrag', 'Zuordnungen'],
  metricLabel: 'Kennzahl',
  yLabels: ['1,9\u00a0Mio.', '3,9\u00a0Mio.', '5,8\u00a0Mio.', '7,7\u00a0Mio.'],
  values: ['4,8\u00a0Mio.', '5,2\u00a0Mio.', '6,1\u00a0Mio.', '5\u00a0Mio.', '6,8\u00a0Mio.', '6\u00a0Mio.', '6,4\u00a0Mio.', '5,6\u00a0Mio.', '7,1\u00a0Mio.', '3,1\u00a0Mio.'],
  ticks: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt'],
  year: '2026',
  legend: {
    auto: 'Automatisch zugeordnet',
    manual: 'Manuell bestätigt',
    open: 'Aus diesem Zeitraum noch offen',
    backlog: 'Offener Bestand am Periodenende',
    runs: 'Zuordnungslauf',
  },
  table: {
    th: ['Zeitraum', 'Zugeordnet', 'Automatisch', 'Betrag', 'Betrag (automatisch)'],
    rows: [
      ['Januar 2026', '18', '14', '4.820.000', '3.910.000'],
      ['Februar 2026', '21', '17', '5.240.000', '4.300.000'],
      ['März 2026', '24', '20', '6.110.000', '5.120.000'],
      ['April 2026', '19', '16', '5.020.000', '4.260.000'],
      ['Mai 2026', '26', '22', '6.780.000', '5.790.000'],
      ['Juni 2026', '23', '19', '5.960.000', '4.900.000'],
      ['Juli 2026', '25', '21', '6.420.000', '5.400.000'],
      ['August 2026', '22', '18', '5.610.000', '4.590.000'],
      ['September 2026', '27', '22', '7.050.000', '5.820.000'],
      ['Oktober 2026', '12', '9', '3.100.000', '2.450.000'],
    ],
  },
  alt: 'Der Tab Übersicht der Seite Zuordnung für dieses Jahr: fünf Kacheln (Rechnungen ohne Zahlung, Nicht zugeordnete Buchungen, Zugeordnet, Nicht zugeordnete Zahlungen, Kein Beleg nötig) und ein Balkendiagramm des pro Monat zugeordneten Betrags, aufgeteilt in automatisch zugeordnet und manuell bestätigt, mit dem noch offenen Teil oben auf den letzten Balken und einer Linie für den offenen Bestand am Monatsende. Nummerierte Markierungen zeigen auf den Datumsfilter, zwei Kacheln, die Überschrift des Diagramms und die Linie des offenen Bestands in der Legende.',
}

export const matchingOverviewCopy: Record<Locale, Copy> = { en, hu, de }

/**
 * The fixture's series, as the RPC would return it for 2026 (month buckets):
 * matched amount, auto amount, still-open amount, backlog level, runs.
 * Counts are only in the hidden data table (copy.table).
 */
export const SERIES: { matched: number; auto: number; open: number; backlog: number; runs: number }[] = [
  { matched: 4820000, auto: 3910000, open: 0, backlog: 710000, runs: 8 },
  { matched: 5240000, auto: 4300000, open: 0, backlog: 640000, runs: 9 },
  { matched: 6110000, auto: 5120000, open: 0, backlog: 760000, runs: 10 },
  { matched: 5020000, auto: 4260000, open: 0, backlog: 690000, runs: 9 },
  { matched: 6780000, auto: 5790000, open: 120000, backlog: 1020000, runs: 11 },
  { matched: 5960000, auto: 4900000, open: 0, backlog: 880000, runs: 10 },
  { matched: 6420000, auto: 5400000, open: 210000, backlog: 1210000, runs: 12 },
  { matched: 5610000, auto: 4590000, open: 340000, backlog: 1640000, runs: 11 },
  { matched: 7050000, auto: 5820000, open: 680000, backlog: 2050000, runs: 12 },
  { matched: 3100000, auto: 2450000, open: 1260000, backlog: 2610000, runs: 7 },
]
