// Text and data for the approval-setup illustrations (setting-up-approvals).
//
// `ui` holds the app's own labels, copied VERBATIM from
// aift-web/messages/<locale>.json and keyed by their message key (plural-free
// messages only; placeholders are filled with `fill`). Hungarian ones are
// tegező because the app is. `help` holds the article's own words (diagram
// labels, alt text, the rule note a user would type), magázó in Hungarian like
// every aift-help article.
//
// The data is FICTIONAL: the supplier and the approvers (Anna Berg, David
// Hart) are the ones the other approval illustrations use. Never real data.

import type { Locale } from '@/lib/i18n'

export const UI_KEYS = [
  'approvals.settings.section_rules',
  'approvals.settings.rules_hint',
  'approvals.settings.reorder_rule',
  'approvals.settings.sentence_any',
  'approvals.settings.sentence_partner',
  'approvals.settings.sentence_category',
  'approvals.settings.sentence_above',
  'approvals.settings.sentence_below',
  'approvals.settings.sentence_go_to',
  'approvals.settings.sentence_no_approval',
  'approvals.settings.add_rule',
  'approvals.settings.tail_title',
  'approvals.settings.default_needs_label',
  'approvals.settings.default_needs_help',
  'approvals.settings.fallback_label',
  'approvals.settings.fallback_help',
  'approvals.settings.fallback_none',
  'approvals.settings.apply_rules',
  'approvals.settings.apply_rules_help',
  'approvals.settings.outcome_approver',
  'approvals.settings.outcome_no_approval',
  'approvals.overview.needs_you',
] as const

export type UiKey = (typeof UI_KEYS)[number]

/** One routing rule (aift-web RuleRow, the parts the sentence uses). */
export type Rule = {
  partner?: string
  category?: string
  /** Gross, in the workspace's base currency. */
  amountMin?: number
  amountMax?: number
  /** The approver's name; none means "needs no approval". */
  approver?: string
  note?: string
}

export const APPROVERS = ['Anna Berg', 'David Hart']

/** The workspace's base currency, the same in every locale. */
export const BASE_CURRENCY = 'HUF'

type Copy = {
  ui: Record<UiKey, string>
  rules: Rule[]
  help: {
    ladder: {
      rules: string
      rulesDetail: string
      learned: string
      learnedDetail: string
      policy: string
      policyDetail: string
      fallback: string
      fallbackDetail: string
      ai: string
      aiDetail: string
      needsYou: string
      needsYouDetail: string
      footnote: string
    }
    alt: { rules: string; ladder: string }
  }
}

function rules(category: string, note: string): Rule[] {
  return [
    { partner: 'Reamwell Office Supplies Ltd.', approver: 'Anna Berg' },
    { category, amountMin: 500000, approver: 'David Hart', note },
    { amountMax: 20000 },
  ]
}

// ── English ─────────────────────────────────────────────────────────────────

const en: Copy = {
  ui: {
    'approvals.settings.section_rules': 'Routing',
    'approvals.settings.rules_hint': 'Checked in order, first match wins.',
    'approvals.settings.reorder_rule': 'Reorder rule',
    'approvals.settings.sentence_any': 'Any invoice',
    'approvals.settings.sentence_partner': 'An invoice from {partner}',
    'approvals.settings.sentence_category': 'in {category}',
    'approvals.settings.sentence_above': 'above {min}',
    'approvals.settings.sentence_below': 'under {max}',
    'approvals.settings.sentence_go_to': 'goes to {name}',
    'approvals.settings.sentence_no_approval': 'needs no approval',
    'approvals.settings.add_rule': 'Add rule',
    'approvals.settings.tail_title': 'When no rule matches',
    'approvals.settings.default_needs_label': 'Everything needs approval unless a rule says otherwise',
    'approvals.settings.default_needs_help': 'A no-approval outcome can only come from a rule you write.',
    'approvals.settings.fallback_label': 'Fallback approver',
    'approvals.settings.fallback_help': 'Gets every invoice no rule places.',
    'approvals.settings.fallback_none': 'Nobody (unrouted tray)',
    'approvals.settings.apply_rules': 'Apply rules to waiting invoices',
    'approvals.settings.apply_rules_help': 'New rules only route invoices that arrive after them.',
    'approvals.settings.outcome_approver': 'Goes to an approver',
    'approvals.settings.outcome_no_approval': 'Needs no approval',
    'approvals.overview.needs_you': 'Needs you',
  },
  rules: rules('Subcontracted work', 'Large subcontractor bills are signed by the managing director.'),
  help: {
    ladder: {
      rules: 'Your rules, in order',
      rulesDetail: 'The first rule that matches wins. A rule whose approver can no longer approve stops the invoice there.',
      learned: 'Earlier decisions',
      learnedDetail: 'The last 3 decisions for a verified partner agree: the invoice follows them.',
      policy: '"Everything needs approval unless a rule says otherwise" is off',
      policyDetail: 'With the switch off, an invoice nothing above placed needs no approval, and the steps below are skipped.',
      fallback: 'Fallback approver',
      fallbackDetail: 'Receives every invoice still unplaced, as long as that person can approve.',
      ai: 'The AI, from your approver descriptions',
      aiDetail: 'Picks a person only when it is at least 70% sure, with one attempt per invoice. It never waives approval.',
      needsYou: 'You assign it',
      needsYouDetail: 'Anything still unplaced waits on the Overview.',
      footnote: 'No approval needed comes only from a rule, from earlier decisions, or from the switched-off policy. Never from the AI.',
    },
    alt: {
      rules:
        'The Routing section of the approval settings: three numbered rules written as sentences, each with a drag handle, an Add rule button, the When no rule matches settings with the policy switch on and no fallback approver, and the Apply rules to waiting invoices button. Numbered markers point to the parts described in the list below.',
      ladder:
        'Diagram of the order in which an invoice finds its approver: first your rules in order, then earlier decisions for the partner, then the policy switch (off means no approval is needed), then the fallback approver, then the AI from your approver descriptions, and last the Needs you list on the Overview, where you assign it. A no-approval outcome never comes from the AI.',
    },
  },
}

// ── Hungarian ───────────────────────────────────────────────────────────────

const hu: Copy = {
  ui: {
    'approvals.settings.section_rules': 'Irányítás',
    'approvals.settings.rules_hint': 'Sorrendben fut, az első találat nyer.',
    'approvals.settings.reorder_rule': 'Szabály átrendezése',
    'approvals.settings.sentence_any': 'Minden számla',
    'approvals.settings.sentence_partner': '{partner} számlái',
    'approvals.settings.sentence_category': '{category} kategóriában',
    'approvals.settings.sentence_above': '{min} felett',
    'approvals.settings.sentence_below': '{max} alatt',
    'approvals.settings.sentence_go_to': 'jóváhagyó: {name}',
    'approvals.settings.sentence_no_approval': 'jóváhagyás nélkül',
    'approvals.settings.add_rule': 'Új szabály',
    'approvals.settings.tail_title': 'Ha egyetlen szabály sem illeszkedik',
    'approvals.settings.default_needs_label': 'Mindenhez kell jóváhagyás, hacsak egy szabály mást nem mond',
    'approvals.settings.default_needs_help': 'A „nem kell jóváhagyás” csak olyan szabályból jöhet, amit te írsz.',
    'approvals.settings.fallback_label': 'Alapértelmezett jóváhagyó',
    'approvals.settings.fallback_help': 'Minden olyan számlát megkap, amit egyetlen szabály sem helyez el.',
    'approvals.settings.fallback_none': 'Senki (kiosztatlan tálca)',
    'approvals.settings.apply_rules': 'Szabályok alkalmazása a várakozó számlákra',
    'approvals.settings.apply_rules_help': 'Az új szabályok csak az utánuk érkező számlákat irányítják.',
    'approvals.settings.outcome_approver': 'Jóváhagyóhoz kerül',
    'approvals.settings.outcome_no_approval': 'Nem kell jóváhagyás',
    'approvals.overview.needs_you': 'Rád vár',
  },
  rules: rules('Alvállalkozói munka', 'A nagy alvállalkozói számlákat az ügyvezető írja alá.'),
  help: {
    ladder: {
      rules: 'Az Ön szabályai, sorrendben',
      rulesDetail: 'Az első illeszkedő szabály nyer. Ha egy szabály jóváhagyója már nem hagyhat jóvá, a számla ott megáll.',
      learned: 'Korábbi döntések',
      learnedDetail: 'Ha egy ellenőrzött partner utolsó 3 döntése egyezik, a számla azt követi.',
      policy: 'A „Mindenhez kell jóváhagyás, hacsak egy szabály mást nem mond” kikapcsolva',
      policyDetail: 'Kikapcsolt állapotban ahhoz a számlához, amelyet a fentiek egyike sem helyezett el, nem kell jóváhagyás, és a lenti lépések kimaradnak.',
      fallback: 'Alapértelmezett jóváhagyó',
      fallbackDetail: 'Minden még el nem helyezett számlát megkap, amíg jóváhagyhat.',
      ai: 'Az AI, a jóváhagyói leírások alapján',
      aiDetail: 'Csak akkor választ személyt, ha legalább 70%-ban biztos, számlánként egy próbálkozással. A jóváhagyás alól soha nem ment fel.',
      needsYou: 'Ön osztja ki',
      needsYouDetail: 'Ami még mindig nincs elhelyezve, az az Áttekintésen vár.',
      footnote: 'A „nem kell jóváhagyás” csak szabályból, korábbi döntésekből vagy a kikapcsolt beállításból jöhet. Az AI-tól soha.',
    },
    alt: {
      rules:
        'A jóváhagyási beállítások Irányítás része: három sorszámozott, mondatként írt szabály, mindegyik fogantyúval, az Új szabály gomb, a Ha egyetlen szabály sem illeszkedik beállítások bekapcsolt kapcsolóval és alapértelmezett jóváhagyó nélkül, valamint a Szabályok alkalmazása a várakozó számlákra gomb. A számozott jelölők az alábbi listában leírt részekre mutatnak.',
      ladder:
        'Ábra arról, milyen sorrendben talál egy számla jóváhagyót: először az Ön szabályai sorrendben, aztán a partnerre vonatkozó korábbi döntések, aztán a beállítás kapcsolója (kikapcsolva nem kell jóváhagyás), aztán az alapértelmezett jóváhagyó, aztán az AI a jóváhagyói leírások alapján, végül az Áttekintés Rád vár listája, ahol Ön osztja ki. A „nem kell jóváhagyás” soha nem az AI-tól jön.',
    },
  },
}

// ── German ──────────────────────────────────────────────────────────────────

const de: Copy = {
  ui: {
    'approvals.settings.section_rules': 'Zuordnung',
    'approvals.settings.rules_hint': 'Wird der Reihe nach geprüft, die erste Übereinstimmung gilt.',
    'approvals.settings.reorder_rule': 'Regel neu anordnen',
    'approvals.settings.sentence_any': 'Jede Rechnung',
    'approvals.settings.sentence_partner': 'Eine Rechnung von {partner}',
    'approvals.settings.sentence_category': 'in {category}',
    'approvals.settings.sentence_above': 'über {min}',
    'approvals.settings.sentence_below': 'unter {max}',
    'approvals.settings.sentence_go_to': 'geht an {name}',
    'approvals.settings.sentence_no_approval': 'braucht keine Freigabe',
    'approvals.settings.add_rule': 'Regel anlegen',
    'approvals.settings.tail_title': 'Wenn keine Regel greift',
    'approvals.settings.default_needs_label': 'Alles braucht eine Freigabe, außer eine Regel sagt etwas anderes',
    'approvals.settings.default_needs_help': 'Ein „keine Freigabe nötig“ kann nur aus einer Regel kommen, die Sie schreiben.',
    'approvals.settings.fallback_label': 'Standard-Freigeber',
    'approvals.settings.fallback_help': 'Erhält jede Rechnung, die keine Regel zuordnet.',
    'approvals.settings.fallback_none': 'Niemand (nicht zugewiesen)',
    'approvals.settings.apply_rules': 'Regeln auf wartende Rechnungen anwenden',
    'approvals.settings.apply_rules_help': 'Neue Regeln ordnen nur Rechnungen zu, die nach ihnen eintreffen.',
    'approvals.settings.outcome_approver': 'Geht an einen Freigeber',
    'approvals.settings.outcome_no_approval': 'Braucht keine Freigabe',
    'approvals.overview.needs_you': 'Braucht Sie',
  },
  rules: rules('Subunternehmerleistungen', 'Große Subunternehmerrechnungen zeichnet der Geschäftsführer ab.'),
  help: {
    ladder: {
      rules: 'Ihre Regeln, der Reihe nach',
      rulesDetail: 'Die erste zutreffende Regel gilt. Eine Regel, deren Freigeber nicht mehr freigeben darf, hält die Rechnung dort an.',
      learned: 'Frühere Entscheidungen',
      learnedDetail: 'Stimmen die letzten 3 Entscheidungen zu einem verifizierten Partner überein, folgt die Rechnung ihnen.',
      policy: '„Alles braucht eine Freigabe, außer eine Regel sagt etwas anderes“ ist aus',
      policyDetail: 'Bei ausgeschaltetem Schalter braucht eine Rechnung, die nichts darüber zugeordnet hat, keine Freigabe, und die Schritte darunter entfallen.',
      fallback: 'Standard-Freigeber',
      fallbackDetail: 'Erhält jede noch nicht zugeordnete Rechnung, solange diese Person freigeben darf.',
      ai: 'Die KI, anhand Ihrer Freigeber-Beschreibungen',
      aiDetail: 'Wählt eine Person nur, wenn sie zu mindestens 70 % sicher ist, mit einem Versuch pro Rechnung. Sie verzichtet nie auf die Freigabe.',
      needsYou: 'Sie weisen zu',
      needsYouDetail: 'Was dann noch nicht zugeordnet ist, wartet in der Übersicht.',
      footnote: '„Keine Freigabe nötig“ kommt nur aus einer Regel, aus früheren Entscheidungen oder aus der ausgeschalteten Richtlinie. Nie von der KI.',
    },
    alt: {
      rules:
        'Der Abschnitt Zuordnung der Freigabe-Einstellungen: drei nummerierte Regeln als Sätze, jede mit einem Ziehgriff, die Schaltfläche Regel anlegen, die Einstellungen Wenn keine Regel greift mit eingeschaltetem Schalter und ohne Standard-Freigeber sowie die Schaltfläche Regeln auf wartende Rechnungen anwenden. Nummerierte Markierungen zeigen auf die Teile, die in der Liste darunter beschrieben sind.',
      ladder:
        'Diagramm der Reihenfolge, in der eine Rechnung ihren Freigeber findet: zuerst Ihre Regeln der Reihe nach, dann frühere Entscheidungen zum Partner, dann der Schalter der Richtlinie (aus heißt: keine Freigabe nötig), dann der Standard-Freigeber, dann die KI anhand Ihrer Freigeber-Beschreibungen und zuletzt die Liste Braucht Sie in der Übersicht, wo Sie zuweisen. „Keine Freigabe nötig“ kommt nie von der KI.',
    },
  },
}

export const approvalSetupCopy: Record<Locale, Copy> = { en, hu, de }
