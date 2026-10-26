// Strings for the account and support-access figures: what the app RENDERS,
// read from aift-web messages (origin/main, 2026-10-26) and, for the strings it
// builds from data (the name preview, dates, session lines), off throwaway
// aift-web pages rendering the real components with the same fixtures.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-10-26):
//   src/app/(app)/account/layout.tsx, AccountSectionNav.tsx
//   src/app/(app)/account/profile/{page,AvatarForm,NameForm,JobTitleForm}.tsx
//   src/app/(app)/account/notifications/NotificationsForm.tsx
//   src/app/(app)/organization-settings/{layout,support-access/page}.tsx
//   src/app/(app)/organization-settings/_components/OrgPageHeader.tsx
//   src/app/(app)/organization-settings/support-access/_components/{SupportAccessCard,SupportSessionLog}.tsx
// Fixture data is fictional.
import type { Locale } from '@/lib/i18n'

export const accountCopy = {
  "en": {
    "account": {
      "title": "Account",
      "subtitle": "Manage your profile, language and email preferences.",
      "tabs": [
        "Profile",
        "Language",
        "Notifications"
      ]
    },
    "profile": {
      "pictureHeading": "Profile picture",
      "pictureDesc": "Shown next to your name across AI Finance Team.",
      "upload": "Upload a picture",
      "hint": "PNG, JPG or WebP, up to 2 MB. We crop it to a square and store a smaller copy.",
      "nameHeading": "Name",
      "nameDesc": "How your name appears, and how we address you in emails.",
      "given": "First name",
      "family": "Last name",
      "givenHelp": "This is how we will address you. Write it the way you like, for example: Timi.",
      "preview": "Display name: Anna Kovács · Greeting: Hi Anna,",
      "save": "Save",
      "familyFirst": false,
      "jobHeading": "Job title",
      "jobDesc": "Shown next to your name to everyone you work with.",
      "jobLabel": "Job title",
      "jobHelp": "For example: Senior bookkeeper, Payroll specialist, Managing partner.",
      "jobSave": "Save",
      "job": "Senior bookkeeper"
    },
    "notifications": {
      "sections": [
        [
          "Weekly summary",
          "What was handled and what is waiting, across all your workspaces.",
          [
            [
              "Monday summary",
              "Arrives Mondays at 08:00."
            ]
          ]
        ],
        [
          "Product announcements",
          "Occasional news about what shipped in AI Finance Team.",
          [
            [
              "Product announcements",
              "New features and improvements, sent occasionally."
            ]
          ]
        ],
        [
          "Messages",
          "Reminders about conversations with your clients.",
          [
            [
              "Unread message reminders",
              "An email when a message to you stays unread, at most one per conversation per 10 minutes."
            ],
            [
              "Missing receipts",
              "When the books are missing a document from you: at most one email per day, with a Monday summary."
            ]
          ]
        ]
      ],
      "mute": "You can mute a single conversation from the conversation itself."
    },
    "support": {
      "eyebrow": "Organization settings",
      "heading": "Support access",
      "description": "Control whether AIFT support staff can open your clients’ workspaces, and see every session they have had.",
      "status": "Support access",
      "granted": "Granted",
      "grantedHelp": "AIFT support staff can open a time-limited session in your workspaces until 2027-03-02 10:15. Every session is listed below.",
      "grantedBy": "Granted by kata.molnar@example.com on 2026-03-02 10:15.",
      "activeCount": "Sessions in progress right now: 1.",
      "close": "Close support access",
      "whatTitle": "What support access means",
      "whatBody": "When you grant support access, an AIFT staff member can open a session in one of your workspaces to investigate a problem.",
      "points": [
        "They work under their own name. Every change they make is recorded against them, in the same history you already see on each record.",
        "Each session is time-limited and ends on its own. Granting access does not put anyone in your workspaces permanently.",
        "Every session is listed below with who, which workspace, and why. Before, during and after.",
        "You can end a single session, or close support access entirely, at any time."
      ],
      "activeTitle": "Active now",
      "inProgress": "In progress",
      "roleOwner": "Finance lead",
      "roleAcc": "Accountant",
      "mirror": "acting with Anna Kovács’s access",
      "lineActive": "Gearmont Kft. · started 2026-10-26 09:12 · ends 2026-10-26 17:12",
      "endSession": "End session",
      "historyTitle": "History",
      "historyHelp": "Every support session, including the ones that have ended.",
      "endStaff": "Ended by AIFT",
      "endExpired": "Ended automatically"
    }
  },
  "hu": {
    "account": {
      "title": "Fiók",
      "subtitle": "Kezeld a profilodat, a nyelvet és az e-mail-értesítéseket.",
      "tabs": [
        "Profil",
        "Nyelv",
        "Értesítések"
      ]
    },
    "profile": {
      "pictureHeading": "Profilkép",
      "pictureDesc": "Ez jelenik meg a neved mellett az AI Finance Teamben.",
      "upload": "Kép feltöltése",
      "hint": "PNG, JPG vagy WebP, legfeljebb 2 MB. Négyzet alakúra vágjuk, és kisebb méretben tároljuk.",
      "nameHeading": "Név",
      "nameDesc": "Így jelenik meg a neved, és így szólítunk az e-mailekben.",
      "given": "Keresztnév",
      "family": "Vezetéknév",
      "givenHelp": "Így szólítunk majd. Írd be, ahogy szeretnéd, például: Timi.",
      "preview": "Megjelenő név: Kovács Anna · Megszólítás: Szia Anna!",
      "save": "Mentés",
      "familyFirst": true,
      "jobHeading": "Beosztás",
      "jobDesc": "A neved mellett jelenik meg mindenkinek, akivel együtt dolgozol.",
      "jobLabel": "Beosztás",
      "jobHelp": "Például: Senior könyvelő, Bérszámfejtő, Ügyvezető partner.",
      "jobSave": "Mentés",
      "job": "Senior könyvelő"
    },
    "notifications": {
      "sections": [
        [
          "Heti összefoglaló",
          "Mi került a helyére és mi vár rád, az összes munkaterületeden.",
          [
            [
              "Hétfői összefoglaló",
              "Hétfőnként 8:00-kor érkezik."
            ]
          ]
        ],
        [
          "Termékújdonságok",
          "Időnkénti hírlevél arról, mi került az AI Finance Teambe.",
          [
            [
              "Termékújdonságok",
              "Új funkciók és fejlesztések, alkalmanként."
            ]
          ]
        ],
        [
          "Üzenetek",
          "Emlékeztetők az ügyfeleiddel folytatott beszélgetésekről.",
          [
            [
              "Olvasatlan üzenet emlékeztető",
              "E-mail, ha egy neked írt üzenet olvasatlan marad, beszélgetésenként legfeljebb 10 percenként egy."
            ],
            [
              "Hiányzó bizonylatok",
              "Ha a könyveléshez dokumentum hiányzik tőled: naponta legfeljebb egy e-mail, hétfőn összefoglaló."
            ]
          ]
        ]
      ],
      "mute": "Egy-egy beszélgetést magából a beszélgetésből tudsz némítani."
    },
    "support": {
      "eyebrow": "Szervezeti beállítások",
      "heading": "Ügyfélszolgálati hozzáférés",
      "description": "Itt szabályozhatod, hogy az AIFT munkatársai megnyithatják-e az ügyfeleid munkaterületeit, és itt látod az összes eddigi belépést.",
      "status": "Ügyfélszolgálati hozzáférés",
      "granted": "Engedélyezve",
      "grantedHelp": "Az AIFT munkatársai 2027-03-02 10:15 időpontig indíthatnak időben korlátozott munkamenetet a munkaterületeiden. Minden munkamenet szerepel az alábbi listában.",
      "grantedBy": "Engedélyezte: kata.molnar@example.com, ekkor: 2026-03-02 10:15.",
      "activeCount": "Jelenleg futó munkamenetek: 1.",
      "close": "Hozzáférés lezárása",
      "whatTitle": "Mit jelent az ügyfélszolgálati hozzáférés",
      "whatBody": "Ha engedélyezed az ügyfélszolgálati hozzáférést, az AIFT egyik munkatársa munkamenetet indíthat az egyik munkaterületeden, hogy megvizsgáljon egy problémát.",
      "points": [
        "Saját nevében dolgozik. Minden módosítás hozzá kötve rögzül, ugyanabban az előzményben, amelyet te is látsz az egyes tételeknél.",
        "Minden munkamenet időben korlátozott, és magától véget ér. Az engedélyezéssel senki nem kerül tartósan a munkaterületeidre.",
        "Minden munkamenet szerepel az alábbi listában: ki, melyik munkaterületen és milyen okból. Előtte, közben és utána is.",
        "Bármikor lezárhatsz egyetlen munkamenetet, vagy megszüntetheted az ügyfélszolgálati hozzáférést teljesen."
      ],
      "activeTitle": "Most aktív",
      "inProgress": "Folyamatban",
      "roleOwner": "Pénzügyi vezető",
      "roleAcc": "Könyvelő",
      "mirror": "Anna Kovács hozzáférésével",
      "lineActive": "Gearmont Kft. · kezdés: 2026-10-26 09:12 · vége: 2026-10-26 17:12",
      "endSession": "Munkamenet lezárása",
      "historyTitle": "Előzmények",
      "historyHelp": "Az összes ügyfélszolgálati munkamenet, a már lezártakkal együtt.",
      "endStaff": "Az AIFT zárta le",
      "endExpired": "Automatikusan lezárult"
    }
  },
  "de": {
    "account": {
      "title": "Konto",
      "subtitle": "Verwalten Sie Ihr Profil, die Sprache und Ihre E-Mail-Benachrichtigungen.",
      "tabs": [
        "Profil",
        "Sprache",
        "Benachrichtigungen"
      ]
    },
    "profile": {
      "pictureHeading": "Profilbild",
      "pictureDesc": "Wird neben Ihrem Namen im AI Finance Team angezeigt.",
      "upload": "Bild hochladen",
      "hint": "PNG, JPG oder WebP, bis zu 2 MB. Wir schneiden es quadratisch zu und speichern eine kleinere Kopie.",
      "nameHeading": "Name",
      "nameDesc": "Wie Ihr Name erscheint und wie wir Sie in E-Mails ansprechen.",
      "given": "Vorname",
      "family": "Nachname",
      "givenHelp": "So sprechen wir Sie an. Schreiben Sie ihn so, wie Sie möchten.",
      "preview": "Anzeigename: Anna Kovács · Anrede: Hallo Anna,",
      "save": "Speichern",
      "familyFirst": false,
      "jobHeading": "Position",
      "jobDesc": "Wird neben Ihrem Namen für alle angezeigt, mit denen Sie zusammenarbeiten.",
      "jobLabel": "Position",
      "jobHelp": "Zum Beispiel: Senior-Buchhalter, Lohnbuchhalterin, Geschäftsführender Partner.",
      "jobSave": "Speichern",
      "job": "Senior-Buchhalterin"
    },
    "notifications": {
      "sections": [
        [
          "Wochenübersicht",
          "Was erledigt wurde und was wartet, über alle Ihre Arbeitsbereiche.",
          [
            [
              "Montagsübersicht",
              "Kommt montags um 08:00."
            ]
          ]
        ],
        [
          "Produktneuigkeiten",
          "Gelegentliche Neuigkeiten darüber, was im AI Finance Team erschienen ist.",
          [
            [
              "Produktneuigkeiten",
              "Neue Funktionen und Verbesserungen, gelegentlich."
            ]
          ]
        ],
        [
          "Nachrichten",
          "Erinnerungen zu Unterhaltungen mit Ihren Mandanten.",
          [
            [
              "Erinnerung an ungelesene Nachrichten",
              "Eine E-Mail, wenn eine Nachricht an Sie ungelesen bleibt, höchstens eine pro Unterhaltung pro 10 Minuten."
            ],
            [
              "Fehlende Belege",
              "Wenn der Buchhaltung ein Beleg von Ihnen fehlt: höchstens eine E-Mail pro Tag, montags eine Übersicht."
            ]
          ]
        ]
      ],
      "mute": "Einzelne Unterhaltungen können Sie in der Unterhaltung selbst stummschalten."
    },
    "support": {
      "eyebrow": "Organisationseinstellungen",
      "heading": "Support-Zugriff",
      "description": "Legen Sie fest, ob AIFT-Mitarbeitende die Arbeitsbereiche Ihrer Mandanten öffnen dürfen, und sehen Sie jede bisherige Sitzung.",
      "status": "Support-Zugriff",
      "granted": "Erteilt",
      "grantedHelp": "AIFT-Mitarbeitende können bis 2027-03-02 10:15 eine zeitlich begrenzte Sitzung in Ihren Arbeitsbereichen öffnen. Jede Sitzung steht unten in der Liste.",
      "grantedBy": "Erteilt von kata.molnar@example.com am 2026-03-02 10:15.",
      "activeCount": "Derzeit laufende Sitzungen: 1.",
      "close": "Support-Zugriff beenden",
      "whatTitle": "Was Support-Zugriff bedeutet",
      "whatBody": "Wenn Sie Support-Zugriff erteilen, kann eine AIFT-Mitarbeiterin oder ein AIFT-Mitarbeiter eine Sitzung in einem Ihrer Arbeitsbereiche öffnen, um ein Problem zu untersuchen.",
      "points": [
        "Die Person arbeitet unter ihrem eigenen Namen. Jede Änderung wird ihr zugeordnet, im selben Verlauf, den Sie ohnehin an jedem Beleg sehen.",
        "Jede Sitzung ist zeitlich begrenzt und endet von selbst. Mit dem Zugriff wird niemand dauerhaft in Ihre Arbeitsbereiche aufgenommen.",
        "Jede Sitzung steht unten mit Person, Arbeitsbereich und Begründung. Davor, währenddessen und danach.",
        "Sie können jederzeit eine einzelne Sitzung beenden oder den Support-Zugriff ganz schließen."
      ],
      "activeTitle": "Jetzt aktiv",
      "inProgress": "Läuft",
      "roleOwner": "Finanzleitung",
      "roleAcc": "Buchhaltung",
      "mirror": "mit den Rechten von Anna Kovács",
      "lineActive": "Gearmont Kft. · Beginn 2026-10-26 09:12 · Ende 2026-10-26 17:12",
      "endSession": "Sitzung beenden",
      "historyTitle": "Verlauf",
      "historyHelp": "Alle Support-Sitzungen, auch die bereits beendeten.",
      "endStaff": "Von AIFT beendet",
      "endExpired": "Automatisch beendet"
    }
  }
} as const

export type AccountCopy = (typeof accountCopy)[Locale]


/** The support sessions, the same in every locale (staff write the reasons). */
export const SESSION_STAFF = 'Bence Tóth'
export const SESSION_REASONS = {
  active: 'Ticket 4821: the October bank statements do not show for Anna.',
  staff: 'Ticket 4790: a payment file failed to download.',
  expired: 'Ticket 4702: matching suggestions stopped arriving.',
}
export const SESSION_PAST_LINES = {
  staff: 'Quillmoor Kft. · 2026-10-14 14:40 → 2026-10-14 15:25',
  expired: 'Reamwell Kft. · 2026-09-30 09:05 → 2026-09-30 17:05',
}
