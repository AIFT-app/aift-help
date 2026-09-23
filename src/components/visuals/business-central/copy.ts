// Labels for the Business Central approval timeline. The `ui` entries are the
// app's own connection states, verbatim from aift-web messages/<locale>.json
// (settings.business_central.state_*, origin/main 2026-09-22). `help` is this
// article's own text: HU is formal.
import type { Locale } from '@/lib/i18n'

type Copy = {
  ui: {
    state_not_connected: string
    state_awaiting_microsoft: string
    state_awaiting_business_central: string
    state_connected: string
    state_error: string
  }
  help: {
    alt: string
    steps: {
      link: string
      linkDetail: string
      microsoft: string
      microsoftDetail: string
      register: string
      registerDetail: string
      error: string
    }
  }
}

const en: Copy = {
  ui: {
    state_not_connected: 'Not connected',
    state_awaiting_microsoft: 'Waiting for Microsoft approval',
    state_awaiting_business_central: 'Waiting for Business Central registration',
    state_connected: 'Connected',
    state_error: 'Error',
  },
  help: {
    alt: 'The two approvals: creating the approval link leaves the connection waiting for Microsoft; the Global Administrator approving leaves it waiting for the Business Central registration; someone with SUPER rights registering the application connects it.',
    steps: {
      link: 'You create the approval link',
      linkDetail: 'Copy it before you leave the page, and send it to whoever administers the Microsoft 365.',
      microsoft: 'A Microsoft Global Administrator approves',
      microsoftDetail: 'One minute, on a Microsoft page. Our sign-in works from here on, but Business Central still refuses.',
      register: 'Someone with SUPER rights registers the application in Business Central',
      registerDetail: 'By hand, per environment, with D365 BUS FULL ACCESS and the Company field left empty.',
      error: 'At any point something can fail. The page shows the code, and says when the fault is ours.',
    },
  },
}

const hu: Copy = {
  ui: {
    state_not_connected: 'Nincs összekötve',
    state_awaiting_microsoft: 'Microsoft-jóváhagyásra vár',
    state_awaiting_business_central: 'Business Central-regisztrációra vár',
    state_connected: 'Összekötve',
    state_error: 'Hiba',
  },
  help: {
    alt: 'A két jóváhagyás: a jóváhagyó link létrehozása után a kapcsolat a Microsoftra vár; a globális rendszergazda jóváhagyása után a Business Central-regisztrációra vár; a SUPER jogosultságú személy regisztrációja után létrejön a kapcsolat.',
    steps: {
      link: 'Létrehozza a jóváhagyó linket',
      linkDetail: 'Másolja ki, mielőtt elhagyja az oldalt, és küldje el annak, aki a Microsoft 365-öt adminisztrálja.',
      microsoft: 'Egy Microsoft globális rendszergazda jóváhagyja',
      microsoftDetail: 'Egy perc, a Microsoft oldalán. Innentől a bejelentkezésünk működik, de a Business Central még elutasít minden kérést.',
      register: 'Egy SUPER jogosultságú felhasználó regisztrálja az alkalmazást a Business Centralban',
      registerDetail: 'Kézzel, környezetenként, D365 BUS FULL ACCESS jogosultságkészlettel és üresen hagyott Company mezővel.',
      error: 'Bármelyik ponton elakadhat valami. Az oldal megmutatja a hibakódot, és jelzi, ha a hiba a mi oldalunkon van.',
    },
  },
}

const de: Copy = {
  ui: {
    state_not_connected: 'Nicht verbunden',
    state_awaiting_microsoft: 'Wartet auf Microsoft-Genehmigung',
    state_awaiting_business_central: 'Wartet auf Business-Central-Registrierung',
    state_connected: 'Verbunden',
    state_error: 'Fehler',
  },
  help: {
    alt: 'Die zwei Genehmigungen: nach dem Erstellen des Genehmigungslinks wartet die Verbindung auf Microsoft; nach der Genehmigung durch den globalen Administrator wartet sie auf die Business-Central-Registrierung; nach der Registrierung durch eine Person mit SUPER-Rechten ist sie verbunden.',
    steps: {
      link: 'Sie erstellen den Genehmigungslink',
      linkDetail: 'Kopieren Sie ihn, bevor Sie die Seite verlassen, und senden Sie ihn an die Person, die das Microsoft 365 verwaltet.',
      microsoft: 'Ein globaler Microsoft-Administrator genehmigt',
      microsoftDetail: 'Eine Minute, auf einer Microsoft-Seite. Ab hier funktioniert unsere Anmeldung, Business Central lehnt aber weiter ab.',
      register: 'Eine Person mit SUPER-Rechten registriert die Anwendung in Business Central',
      registerDetail: 'Von Hand, pro Umgebung, mit D365 BUS FULL ACCESS und leerem Feld Company.',
      error: 'An jedem Punkt kann etwas fehlschlagen. Die Seite zeigt den Code und sagt, wenn der Fehler bei uns liegt.',
    },
  },
}

export const bcCopy: Record<Locale, Copy> = { en, hu, de }
