// Text and data for the roles illustrations (roles-and-permissions).
//
// `ui` holds the app's own labels, copied VERBATIM from
// aift-web/messages/<locale>.json and keyed by their message key. Hungarian
// ones are tegező because the app is. `help` holds the article's own words
// (diagram labels, alt text, the name a manager gives a custom role), magázó
// in Hungarian like every aift-help article.
//
// The member counts and the custom role are FICTIONAL.

import type { Locale } from '@/lib/i18n'

export const UI_KEYS = [
  'nav.workspace.settings',
  'settings.team.title',
  'settings.team.description',
  'settings.team.members_heading',
  'settings.team.invite_heading',
  'settings.team.pending_requests_heading',
  'settings.team.pending_invitations_heading',
  'settings.team.roles_heading',
  'settings.team.roles.description',
  'settings.team.roles.unconverted_note',
  'settings.team.roles.add_role',
  'settings.team.roles.col_role',
  'settings.team.roles.col_side',
  'settings.team.roles.col_based_on',
  'settings.team.roles.col_members',
  'settings.team.roles.col_actions',
  'settings.team.roles.system_role',
  'settings.team.roles.custom_role',
  'settings.team.roles.based_on_system',
  'settings.team.roles.view',
  'settings.team.roles.duplicate',
  'settings.team.roles.edit',
  'settings.team.roles.archive',
  'permissions.side.firm',
  'permissions.side.client',
  'settings.team.role_accountant_admin',
  'settings.team.role_accountant',
  'settings.team.role_client_owner',
  'settings.team.role_client_member',
  'permissions.source.role',
  'permissions.source.exception_grant',
  'permissions.source.exception_deny',
  'permissions.source.rule',
  'permissions.source.side_blocked',
] as const

export type UiKey = (typeof UI_KEYS)[number]

export type SystemRoleKey = 'accountant_admin' | 'accountant' | 'client_owner' | 'client_member'

export type RoleRow =
  | { system: true; key: SystemRoleKey; side: 'firm' | 'client'; members: number }
  | { system: false; name: string; base: SystemRoleKey; side: 'firm' | 'client'; members: number }

// The order list_workspace_roles returns: system roles first, then custom ones.
export function roleRows(customName: string): RoleRow[] {
  return [
    { system: true, key: 'accountant_admin', side: 'firm', members: 1 },
    { system: true, key: 'accountant', side: 'firm', members: 2 },
    { system: true, key: 'client_owner', side: 'client', members: 1 },
    { system: true, key: 'client_member', side: 'client', members: 3 },
    { system: false, name: customName, base: 'client_member', side: 'client', members: 1 },
  ]
}

type Copy = {
  ui: Record<UiKey, string>
  customRole: string
  help: {
    decision: {
      member: string
      memberDetail: string
      rule: string
      ruleDetail: string
      side: string
      sideDetail: string
      exception: string
      exceptionDetail: string
      role: string
      roleDetail: string
      footnote: string
    }
    alt: { decision: string; roles: string }
  }
}

// ── English ─────────────────────────────────────────────────────────────────

const en: Copy = {
  ui: {
    'nav.workspace.settings': 'Settings',
    'settings.team.title': 'Team management',
    'settings.team.description': 'Who can reach this workspace, plus the invitations and access requests waiting on you.',
    'settings.team.members_heading': 'Team members',
    'settings.team.invite_heading': 'Invite a new member',
    'settings.team.pending_requests_heading': 'Pending requests',
    'settings.team.pending_invitations_heading': 'Pending invitations',
    'settings.team.roles_heading': 'Roles',
    'settings.team.roles.description': 'A role is a set of permissions. The four system roles are what every workspace uses today. Duplicate one to make a custom role for this workspace.',
    'settings.team.roles.unconverted_note': 'Parts of the app that have not yet moved to permissions still behave like the base role. The permission list shows what is already enforced by permission.',
    'settings.team.roles.add_role': 'Add role',
    'settings.team.roles.col_role': 'Role',
    'settings.team.roles.col_side': 'Side',
    'settings.team.roles.col_based_on': 'Based on',
    'settings.team.roles.col_members': 'Members',
    'settings.team.roles.col_actions': 'Actions',
    'settings.team.roles.system_role': 'System role',
    'settings.team.roles.custom_role': 'Custom role',
    'settings.team.roles.based_on_system': 'System',
    'settings.team.roles.view': 'View',
    'settings.team.roles.duplicate': 'Duplicate',
    'settings.team.roles.edit': 'Edit',
    'settings.team.roles.archive': 'Archive',
    'permissions.side.firm': 'Firm',
    'permissions.side.client': 'Client',
    'settings.team.role_accountant_admin': 'Accountant Admin',
    'settings.team.role_accountant': 'Accountant',
    'settings.team.role_client_owner': 'Client Owner',
    'settings.team.role_client_member': 'Client Member',
    'permissions.source.role': 'From role',
    'permissions.source.exception_grant': 'Exception, added',
    'permissions.source.exception_deny': 'Exception, removed',
    'permissions.source.rule': 'Fixed by rule',
    'permissions.source.side_blocked': 'Not available on the client side',
  },
  customRole: 'Approver only',
  help: {
    decision: {
      member: 'Membership',
      memberDetail: 'Someone who is not a member of the workspace has no access at all.',
      rule: 'The fixed rules',
      ruleDetail: 'Connecting and disconnecting a bank and the NAV credentials follow the base role, never a permission.',
      side: 'The side',
      sideDetail: 'A firm-only permission is never available to someone on the client side.',
      exception: 'Exceptions',
      exceptionDetail: 'An exception on this member adds or takes away one permission.',
      role: 'The role',
      roleDetail: "Otherwise the member's role decides.",
      footnote: "The member's access page shows, for each permission, which of these decided it.",
    },
    alt: {
      decision:
        "Diagram of how AI Finance Team decides whether a member may do something: first membership, then the fixed rules for bank connections and NAV credentials, then the side (firm-only permissions are never available on the client side), then the member's exceptions, and last the role.",
      roles:
        'The Roles tab of Team management: the four system roles, Accountant Admin, Accountant, Client Owner and Client Member, with their side, member count and the View and Duplicate buttons, a custom role Approver only based on Client Member with View, Edit and Archive, and the Add role button. Numbered markers point to the parts described in the list below.',
    },
  },
}

// ── Hungarian ───────────────────────────────────────────────────────────────

const hu: Copy = {
  ui: {
    'nav.workspace.settings': 'Beállítások',
    'settings.team.title': 'Csapatkezelés',
    'settings.team.description': 'Ki férhet hozzá ehhez a munkaterülethez, és milyen meghívók és hozzáférési kérések várnak rád.',
    'settings.team.members_heading': 'Csapattagok',
    'settings.team.invite_heading': 'Új tag meghívása',
    'settings.team.pending_requests_heading': 'Függőben lévő kérelmek',
    'settings.team.pending_invitations_heading': 'Függőben lévő meghívók',
    'settings.team.roles_heading': 'Szerepkörök',
    'settings.team.roles.description': 'A szerepkör jogosultságok együttese. A négy rendszerszerepkört használja ma minden munkaterület. Másolj le egyet, hogy egyedi szerepkört hozz létre ehhez a munkaterülethez.',
    'settings.team.roles.unconverted_note': 'Az alkalmazás azon részei, amelyek még nem álltak át a jogosultságokra, továbbra is az alapszerepkör szerint működnek. A lista azt mutatja, amit már jogosultság szabályoz.',
    'settings.team.roles.add_role': 'Új szerepkör',
    'settings.team.roles.col_role': 'Szerepkör',
    'settings.team.roles.col_side': 'Oldal',
    'settings.team.roles.col_based_on': 'Alapja',
    'settings.team.roles.col_members': 'Tagok',
    'settings.team.roles.col_actions': 'Műveletek',
    'settings.team.roles.system_role': 'Rendszerszerepkör',
    'settings.team.roles.custom_role': 'Egyedi szerepkör',
    'settings.team.roles.based_on_system': 'Rendszer',
    'settings.team.roles.view': 'Megtekintés',
    'settings.team.roles.duplicate': 'Másolás',
    'settings.team.roles.edit': 'Szerkesztés',
    'settings.team.roles.archive': 'Archiválás',
    'permissions.side.firm': 'Iroda',
    'permissions.side.client': 'Ügyfél',
    'settings.team.role_accountant_admin': 'Könyvelő admin',
    'settings.team.role_accountant': 'Könyvelő',
    'settings.team.role_client_owner': 'Ügyfél tulajdonos',
    'settings.team.role_client_member': 'Ügyfél tag',
    'permissions.source.role': 'Szerepkörből',
    'permissions.source.exception_grant': 'Kivétel, hozzáadva',
    'permissions.source.exception_deny': 'Kivétel, elvéve',
    'permissions.source.rule': 'Szabály rögzíti',
    'permissions.source.side_blocked': 'Ügyféloldalon nem elérhető',
  },
  customRole: 'Csak jóváhagyó',
  help: {
    decision: {
      member: 'Tagság',
      memberDetail: 'Aki nem tagja a munkaterületnek, semmihez nem fér hozzá.',
      rule: 'A rögzített szabályok',
      ruleDetail: 'A bank csatlakoztatása és leválasztása, valamint a NAV-hozzáférés az alapszerepkört követi, soha nem jogosultságot.',
      side: 'Az oldal',
      sideDetail: 'Irodai jogosultság soha nem érhető el az ügyféloldalon.',
      exception: 'Kivételek',
      exceptionDetail: 'A tagra beállított kivétel egy jogosultságot ad hozzá vagy vesz el.',
      role: 'A szerepkör',
      roleDetail: 'Egyébként a tag szerepköre dönt.',
      footnote: 'A tag hozzáférési oldala jogosultságonként mutatja, melyik döntött.',
    },
    alt: {
      decision:
        'Ábra arról, hogyan dönti el az AI Finance Team, hogy egy tag megtehet-e valamit: először a tagság, aztán a bankkapcsolatra és a NAV-hozzáférésre vonatkozó rögzített szabályok, aztán az oldal (irodai jogosultság soha nem érhető el az ügyféloldalon), aztán a tag kivételei, végül a szerepkör.',
      roles:
        'A Csapatkezelés Szerepkörök füle: a négy rendszerszerepkör, a Könyvelő admin, a Könyvelő, az Ügyfél tulajdonos és az Ügyfél tag, az oldalukkal, a tagok számával, valamint a Megtekintés és a Másolás gombbal, egy Ügyfél tag alapú Csak jóváhagyó egyedi szerepkör a Megtekintés, Szerkesztés és Archiválás gombbal, és az Új szerepkör gomb. A számozott jelölők az alábbi listában leírt részekre mutatnak.',
    },
  },
}

// ── German ──────────────────────────────────────────────────────────────────

const de: Copy = {
  ui: {
    'nav.workspace.settings': 'Einstellungen',
    'settings.team.title': 'Teamverwaltung',
    'settings.team.description': 'Wer auf diesen Arbeitsbereich zugreifen kann, sowie offene Einladungen und Zugriffsanfragen.',
    'settings.team.members_heading': 'Teammitglieder',
    'settings.team.invite_heading': 'Neues Mitglied einladen',
    'settings.team.pending_requests_heading': 'Ausstehende Anfragen',
    'settings.team.pending_invitations_heading': 'Ausstehende Einladungen',
    'settings.team.roles_heading': 'Rollen',
    'settings.team.roles.description': 'Eine Rolle ist ein Satz von Berechtigungen. Die vier Systemrollen nutzt heute jeder Arbeitsbereich. Duplizieren Sie eine, um eine eigene Rolle für diesen Arbeitsbereich anzulegen.',
    'settings.team.roles.unconverted_note': 'Teile der Anwendung, die noch nicht auf Berechtigungen umgestellt sind, verhalten sich weiterhin wie die Basisrolle. Die Liste zeigt, was bereits per Berechtigung durchgesetzt wird.',
    'settings.team.roles.add_role': 'Rolle hinzufügen',
    'settings.team.roles.col_role': 'Rolle',
    'settings.team.roles.col_side': 'Seite',
    'settings.team.roles.col_based_on': 'Basiert auf',
    'settings.team.roles.col_members': 'Mitglieder',
    'settings.team.roles.col_actions': 'Aktionen',
    'settings.team.roles.system_role': 'Systemrolle',
    'settings.team.roles.custom_role': 'Eigene Rolle',
    'settings.team.roles.based_on_system': 'System',
    'settings.team.roles.view': 'Anzeigen',
    'settings.team.roles.duplicate': 'Duplizieren',
    'settings.team.roles.edit': 'Bearbeiten',
    'settings.team.roles.archive': 'Archivieren',
    'permissions.side.firm': 'Kanzlei',
    'permissions.side.client': 'Mandant',
    'settings.team.role_accountant_admin': 'Buchhalter-Admin',
    'settings.team.role_accountant': 'Buchhalter',
    'settings.team.role_client_owner': 'Mandant (Inhaber)',
    'settings.team.role_client_member': 'Mandant (Mitarbeiter)',
    'permissions.source.role': 'Aus der Rolle',
    'permissions.source.exception_grant': 'Ausnahme, hinzugefügt',
    'permissions.source.exception_deny': 'Ausnahme, entzogen',
    'permissions.source.rule': 'Durch Regel festgelegt',
    'permissions.source.side_blocked': 'Auf Mandantenseite nicht verfügbar',
  },
  customRole: 'Nur Freigeber',
  help: {
    decision: {
      member: 'Mitgliedschaft',
      memberDetail: 'Wer nicht Mitglied des Arbeitsbereichs ist, hat keinerlei Zugriff.',
      rule: 'Die festen Regeln',
      ruleDetail: 'Das Verbinden und Trennen einer Bank und die NAV-Zugangsdaten folgen der Basisrolle, nie einer Berechtigung.',
      side: 'Die Seite',
      sideDetail: 'Eine Kanzlei-Berechtigung ist auf Mandantenseite nie verfügbar.',
      exception: 'Ausnahmen',
      exceptionDetail: 'Eine Ausnahme für dieses Mitglied fügt eine Berechtigung hinzu oder entzieht sie.',
      role: 'Die Rolle',
      roleDetail: 'Sonst entscheidet die Rolle des Mitglieds.',
      footnote: 'Die Zugriffsseite des Mitglieds zeigt für jede Berechtigung, was davon entschieden hat.',
    },
    alt: {
      decision:
        'Diagramm, wie AI Finance Team entscheidet, ob ein Mitglied etwas darf: zuerst die Mitgliedschaft, dann die festen Regeln für Bankverbindungen und NAV-Zugangsdaten, dann die Seite (Kanzlei-Berechtigungen sind auf Mandantenseite nie verfügbar), dann die Ausnahmen des Mitglieds und zuletzt die Rolle.',
      roles:
        'Der Tab Rollen der Teamverwaltung: die vier Systemrollen Buchhalter-Admin, Buchhalter, Mandant (Inhaber) und Mandant (Mitarbeiter) mit ihrer Seite, der Zahl der Mitglieder und den Schaltflächen Anzeigen und Duplizieren, eine eigene Rolle Nur Freigeber auf Basis von Mandant (Mitarbeiter) mit Anzeigen, Bearbeiten und Archivieren, und die Schaltfläche Rolle hinzufügen. Nummerierte Markierungen zeigen auf die Teile, die in der Liste darunter beschrieben sind.',
    },
  },
}

export const rolesCopy: Record<Locale, Copy> = { en, hu, de }
