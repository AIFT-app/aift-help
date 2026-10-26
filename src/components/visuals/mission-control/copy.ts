// Strings for the Mission control figures.
//
// `screen` holds what the app RENDERS for the fixture (ICU plurals, money
// formatting, the month), read off the real MissionControlClient rendered with
// the same fixture in a throwaway aift-web page (aift-web origin/main messages,
// 2026-10-26). They are the app's output, not a re-translation.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-10-26):
//   src/app/(app)/mission-control/_components/MissionControlClient.tsx
// Fixture data is fictional: client names, counts and amounts.
//
// `rules` is the help centre's own wording for the diagram of where a row goes
// (get_mission_control on production, 2026-10-26). Its two section titles are
// the app's labels (mission_control.section_today_bare / section_friday_bare).
import type { Locale } from '@/lib/i18n'

export type Tile = { label: string; value: string; sub: string; tone: 'amber' | 'blue' | 'zinc' }

type ScreenCopy = {
  title: string
  subtitle: string
  banner: string
  tiles: Tile[]
  pills: string[]
  allClients: string
  search: string
}

type RulesCopy = {
  today: string
  later: string
  todayRows: string[]
  laterRows: string[]
  order: string
  alt: string
}

type Copy = { screen: ScreenCopy; alt: string; rules: RulesCopy }

const en: Copy = {
  screen: {
    title: 'Mission control',
    subtitle: 'Everything waiting on you, across 8 clients',
    banner: '3 clients have 5 to-dos waiting for you, 7 urgent, 1 can wait for the week.',
    tiles: [
      { label: 'Needs your knowledge', value: '5', sub: 'across 3 clients', tone: 'amber' },
      { label: 'Match suggestions', value: '7', sub: 'HUF 1,842,500.00 pending', tone: 'amber' },
      { label: 'Waiting on documents', value: '2', sub: 'statements missing at 2 clients', tone: 'blue' },
      { label: 'Closing backlog', value: '2', sub: 'month to close: Sept 2026', tone: 'amber' },
      { label: 'Unread messages', value: '2', sub: '1 thread awaits your reply', tone: 'zinc' },
    ],
    pills: ['All', 'Invoices', 'Matches', 'Documents', 'Closing', 'Messages'],
    allClients: 'All clients',
    search: 'Search client, partner, message…',
  },
  alt: 'The top of the Mission control page: a summary line, five tiles (Needs your knowledge, Match suggestions, Waiting on documents, Closing backlog, Unread messages), and the filters: type buttons, a client picker and a search box. Numbered markers point to the summary line, two tiles, the type buttons and the client picker.',
  rules: {
    today: 'Do today',
    later: 'Later this week',
    todayRows: [
      'Invoice problems of high priority',
      'Invoice problems of medium priority, from 7 days of waiting',
      'Match suggestions: 5 or more at a client, or 7 days old',
      'Missing statements',
      'Closing, from two months behind',
      'Unread messages',
    ],
    laterRows: [
      'Invoice problems of medium priority, under 7 days',
      'Invoice problems of low priority',
      'Match suggestions: fewer than 5 and under 7 days old',
    ],
    order: 'Within a section the longest-waiting row comes first. From 7 days the waiting time turns amber.',
    alt: 'Where a row goes. Do today: invoice problems of high priority; of medium priority from 7 days of waiting; match suggestions when a client has 5 or more or they are 7 days old; missing statements; closing from two months behind; unread messages. Later this week: medium-priority invoice problems under 7 days, low-priority invoice problems, and match suggestions that are fewer than 5 and under 7 days old.',
  },
}

const hu: Copy = {
  screen: {
    title: 'Teendők',
    subtitle: 'Minden, ami rád vár: 8 ügyfél',
    banner: '3 ügyfélnél összesen 5 teendő vár rád, 7 sürgős, 1 ráér a hét folyamán.',
    tiles: [
      { label: 'A tudásodra vár', value: '5', sub: '3 ügyfélnél', tone: 'amber' },
      { label: 'Párosítási javaslatok', value: '7', sub: '1 842 500,00 Ft függőben', tone: 'amber' },
      { label: 'Dokumentumra várunk', value: '2', sub: '2 ügyfélnél hiányzik kivonat', tone: 'blue' },
      { label: 'Zárási elmaradás', value: '2', sub: 'zárandó hónap: 2026. szept.', tone: 'amber' },
      { label: 'Olvasatlan üzenetek', value: '2', sub: '1 szál vár a válaszodra', tone: 'zinc' },
    ],
    pills: ['Mind', 'Számlák', 'Párosítások', 'Dokumentumok', 'Zárás', 'Üzenetek'],
    allClients: 'Minden ügyfél',
    search: 'Keresés: ügyfél, partner, üzenet…',
  },
  alt: 'A Teendők oldal teteje: egy összegző sor, öt csempe (A tudásodra vár, Párosítási javaslatok, Dokumentumra várunk, Zárási elmaradás, Olvasatlan üzenetek) és a szűrők: típusgombok, ügyfélválasztó és keresőmező. A számozott jelölők az összegző sorra, két csempére, a típusgombokra és az ügyfélválasztóra mutatnak.',
  rules: {
    today: 'Ma intézd',
    later: 'Ráér a hét folyamán',
    todayRows: [
      'Magas prioritású számlaproblémák',
      'Közepes prioritású számlaproblémák, 7 nap várakozástól',
      'Párosítási javaslatok: legalább 5 egy ügyfélnél, vagy 7 napos',
      'Hiányzó kivonatok',
      'Zárás, két hónap lemaradástól',
      'Olvasatlan üzenetek',
    ],
    laterRows: [
      'Közepes prioritású számlaproblémák, 7 napnál fiatalabbak',
      'Alacsony prioritású számlaproblémák',
      'Párosítási javaslatok: 5-nél kevesebb és 7 napnál fiatalabb',
    ],
    order: 'Egy részen belül a legrégebben váró sor áll elöl. 7 naptól a várakozási idő borostyánszínű.',
    alt: 'Hova kerül egy sor. Ma intézd: a magas prioritású számlaproblémák; a közepes prioritásúak 7 nap várakozástól; a párosítási javaslatok, ha egy ügyfélnél legalább 5 van, vagy 7 naposak; a hiányzó kivonatok; a zárás két hónap lemaradástól; az olvasatlan üzenetek. Ráér a hét folyamán: a 7 napnál fiatalabb közepes prioritású és az alacsony prioritású számlaproblémák, valamint az 5-nél kevesebb, 7 napnál fiatalabb párosítási javaslatok.',
  },
}

const de: Copy = {
  screen: {
    title: 'Cockpit',
    subtitle: 'Alles, was auf Sie wartet: 8 Mandanten',
    banner: 'Bei 3 Kunden warten insgesamt 5 Aufgaben auf Sie, 7 dringend, 1 hat Zeit bis Ende der Woche.',
    tiles: [
      { label: 'Wartet auf Ihr Wissen', value: '5', sub: 'bei 3 Mandanten', tone: 'amber' },
      { label: 'Zuordnungsvorschläge', value: '7', sub: '1.842.500,00 HUF offen', tone: 'amber' },
      { label: 'Warten auf Belege', value: '2', sub: 'Bei 2 Kunden fehlen Kontoauszüge', tone: 'blue' },
      { label: 'Abschlussrückstand', value: '2', sub: 'abzuschließender Monat: Sept. 2026', tone: 'amber' },
      { label: 'Ungelesene Nachrichten', value: '2', sub: '1 Thread wartet auf Ihre Antwort', tone: 'zinc' },
    ],
    pills: ['Alle', 'Rechnungen', 'Zuordnungen', 'Belege', 'Abschluss', 'Nachrichten'],
    allClients: 'Alle Kunden',
    search: 'Suche: Mandant, Partner, Nachricht…',
  },
  alt: 'Der obere Teil des Cockpits: eine Zusammenfassung, fünf Kacheln (Wartet auf Ihr Wissen, Zuordnungsvorschläge, Warten auf Belege, Abschlussrückstand, Ungelesene Nachrichten) und die Filter: Typ-Schaltflächen, eine Mandantenauswahl und ein Suchfeld. Nummerierte Markierungen zeigen auf die Zusammenfassung, zwei Kacheln, die Typ-Schaltflächen und die Mandantenauswahl.',
  rules: {
    today: 'Heute erledigen',
    later: 'Kann später diese Woche warten',
    todayRows: [
      'Rechnungsprobleme mit hoher Priorität',
      'Rechnungsprobleme mit mittlerer Priorität, ab 7 Tagen Wartezeit',
      'Zuordnungsvorschläge: 5 oder mehr bei einem Mandanten, oder 7 Tage alt',
      'Fehlende Kontoauszüge',
      'Abschluss, ab zwei Monaten Rückstand',
      'Ungelesene Nachrichten',
    ],
    laterRows: [
      'Rechnungsprobleme mit mittlerer Priorität, unter 7 Tagen',
      'Rechnungsprobleme mit niedriger Priorität',
      'Zuordnungsvorschläge: weniger als 5 und unter 7 Tagen alt',
    ],
    order: 'Innerhalb eines Abschnitts steht die am längsten wartende Zeile vorn. Ab 7 Tagen wird die Wartezeit bernsteinfarben.',
    alt: 'Wohin eine Zeile kommt. Heute erledigen: Rechnungsprobleme mit hoher Priorität; mit mittlerer Priorität ab 7 Tagen Wartezeit; Zuordnungsvorschläge, wenn ein Mandant 5 oder mehr hat oder sie 7 Tage alt sind; fehlende Kontoauszüge; Abschluss ab zwei Monaten Rückstand; ungelesene Nachrichten. Kann später diese Woche warten: Rechnungsprobleme mittlerer Priorität unter 7 Tagen, Rechnungsprobleme niedriger Priorität und Zuordnungsvorschläge, die weniger als 5 und jünger als 7 Tage sind.',
  },
}

export const missionControlCopy: Record<Locale, Copy> = { en, hu, de }
