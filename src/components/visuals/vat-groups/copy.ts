// Labels for the VAT group step strip, verbatim from aift-web
// messages/<locale>.json (master_data.vat_groups.*, origin/main 2026-09-23),
// keyed by message key so scratchpad/drift-any.py catches a change.
// `rendered` holds the lines the app fills placeholders into; `help` is this
// article's own text.
import type { Locale } from '@/lib/i18n'

export const UI_KEYS = [
  'master_data.vat_groups.steps_label',
  'master_data.vat_groups.tab_connection',
  'master_data.vat_groups.tab_members',
  'master_data.vat_groups.tab_routing',
  'master_data.vat_groups.step_connection_syncing',
  'master_data.vat_groups.step_last_sync',
  'master_data.vat_groups.step_members_summary',
  'master_data.vat_groups.step_members_waiting',
  'master_data.vat_groups.step_routing_invoices',
  'master_data.vat_groups.step_routing_waiting',
] as const

export type UiKey = (typeof UI_KEYS)[number]

type Copy = {
  ui: Record<UiKey, string>
  rendered: { lastSync: string; membersSummary: string; membersWaiting: string; routingInvoices: string; routingWaiting: string }
  help: { alt: string }
}

/** The fixture the strip is rendered with: a group mid-setup. */
export const FIXTURE = {
  members: { total: 5, linked: 2, notClient: 1, unlinked: 2 },
  routing: { reports: 18, decisions: 4 },
} as const


const en: Copy = {
  ui: {
    'master_data.vat_groups.steps_label': "Steps",
    'master_data.vat_groups.tab_connection': "NAV connection",
    'master_data.vat_groups.tab_members': "Members",
    'master_data.vat_groups.tab_routing': "Filing",
    'master_data.vat_groups.step_connection_syncing': "Connected · syncing",
    'master_data.vat_groups.step_last_sync': "Last sync: {date}",
    'master_data.vat_groups.step_members_summary': "{total} members · {linked} paired · {notClient} not members",
    'master_data.vat_groups.step_members_waiting': "{count} members waiting to be paired",
    'master_data.vat_groups.step_routing_invoices': "{count} invoices waiting to be filed",
    'master_data.vat_groups.step_routing_waiting': "{count} decisions waiting for you",
  },
  rendered: {
    "lastSync": "Last sync: 23 Sept 2026, 08:40",
    "membersSummary": "5 members · 2 paired · 1 not members",
    "membersWaiting": "2 members waiting to be paired",
    "routingInvoices": "18 invoices waiting to be filed",
    "routingWaiting": "4 decisions waiting for you"
  },
  help: { alt: "The three-step strip at the top of a VAT group page: step one green and syncing, step two amber with members waiting to be paired, step three amber with decisions waiting, above the three tabs with their counts." },
}

const hu: Copy = {
  ui: {
    'master_data.vat_groups.steps_label': "Lépések",
    'master_data.vat_groups.tab_connection': "NAV-kapcsolat",
    'master_data.vat_groups.tab_members': "Tagok",
    'master_data.vat_groups.tab_routing': "Besorolás",
    'master_data.vat_groups.step_connection_syncing': "Csatlakoztatva · szinkronizál",
    'master_data.vat_groups.step_last_sync': "Utolsó szinkron: {date}",
    'master_data.vat_groups.step_members_summary': "{total} tag · {linked} párosítva · {notClient} nem tag",
    'master_data.vat_groups.step_members_waiting': "{count} tag vár párosításra",
    'master_data.vat_groups.step_routing_invoices': "{count} számla vár besorolásra",
    'master_data.vat_groups.step_routing_waiting': "{count} döntés vár rád",
  },
  rendered: {
    "lastSync": "Utolsó szinkron: 2026. szept. 23. 08:40",
    "membersSummary": "5 tag · 2 párosítva · 1 nem tag",
    "membersWaiting": "2 tag vár párosításra",
    "routingInvoices": "18 számla vár besorolásra",
    "routingWaiting": "4 döntés vár rád"
  },
  help: { alt: "Egy áfacsoport oldalának tetején látható háromlépéses sáv: az első lépés zöld és szinkronizál, a második borostyánsárga, párosításra váró tagokkal, a harmadik borostyánsárga, várakozó döntésekkel, alatta a három fül a számlálóikkal." },
}

const de: Copy = {
  ui: {
    'master_data.vat_groups.steps_label': "Schritte",
    'master_data.vat_groups.tab_connection': "NAV-Verbindung",
    'master_data.vat_groups.tab_members': "Mitglieder",
    'master_data.vat_groups.tab_routing': "Zuordnung",
    'master_data.vat_groups.step_connection_syncing': "Verbunden · synchronisiert",
    'master_data.vat_groups.step_last_sync': "Letzte Synchronisierung: {date}",
    'master_data.vat_groups.step_members_summary': "{total} Mitglieder · {linked} zugeordnet · {notClient} keine Mitglieder",
    'master_data.vat_groups.step_members_waiting': "{count} Mitglieder warten auf Zuordnung",
    'master_data.vat_groups.step_routing_invoices': "{count} Rechnungen warten auf Zuordnung",
    'master_data.vat_groups.step_routing_waiting': "{count} Entscheidungen warten auf Sie",
  },
  rendered: {
    "lastSync": "Letzte Synchronisierung: 23. Sept. 2026, 08:40",
    "membersSummary": "5 Mitglieder · 2 zugeordnet · 1 keine Mitglieder",
    "membersWaiting": "2 Mitglieder warten auf Zuordnung",
    "routingInvoices": "18 Rechnungen warten auf Zuordnung",
    "routingWaiting": "4 Entscheidungen warten auf Sie"
  },
  help: { alt: "Die dreistufige Leiste oben auf der Seite einer Umsatzsteuergruppe: Schritt eins grün und synchronisierend, Schritt zwei bernsteinfarben mit Mitgliedern, die auf Zuordnung warten, Schritt drei bernsteinfarben mit wartenden Entscheidungen, darunter die drei Tabs mit ihren Zählern." },
}

export const vatGroupsCopy: Record<Locale, Copy> = { en, hu, de }
