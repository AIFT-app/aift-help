// Labels for the bank-connection timeline. The `ui` entries are the app's own
// status badges, verbatim from aift-web messages/<locale>.json
// (master_data.bank_accounts.connection_card.*). `rendered` holds a plural the
// app builds at runtime. `help` is this article's own text: HU is formal.
import type { Locale } from '@/lib/i18n'

type Copy = {
  ui: { status_active: string; status_expired: string; status_disconnected: string }
  rendered: { expiresIn: string }
  help: {
    alt: string
    steps: {
      connect: string
      connectDetail: string
      sync: string
      syncDetail: string
      warning: string
      warningDetail: string
      expired: string
      expiredDetail: string
      renew: string
      renewDetail: string
      disconnect: string
    }
  }
}

const en: Copy = {
  ui: { status_active: 'Active', status_expired: 'Expired', status_disconnected: 'Disconnected' },
  rendered: { expiresIn: 'Expires in 5 days' },
  help: {
    alt: 'The life of a bank connection: active and syncing, an amber warning seven days before the consent expires when automatic syncing stops, the expired state, and the renewal that makes it active again.',
    steps: {
      connect: 'You connect the bank',
      connectDetail: 'You choose how much history to import and authorise on your bank’s own page.',
      sync: 'Transactions arrive twice a day',
      syncDetail: 'Every account you ticked, attributed to the company you gave it.',
      warning: 'Seven days before the consent expires',
      warningDetail: 'The card turns amber, and automatic syncing stops at this point, not on the expiry date.',
      expired: 'The consent expires',
      expiredDetail: 'Nothing is lost: the transactions already imported stay as they are.',
      renew: 'You connect the same bank again',
      renewDetail: 'No question about history this time. Days missed while the consent was lapsed cannot be fetched from the bank; add them from a statement.',
      disconnect: 'Separately, at any time: the finance lead can disconnect an account.',
    },
  },
}

const hu: Copy = {
  ui: { status_active: 'Aktív', status_expired: 'Lejárt', status_disconnected: 'Lecsatlakoztatva' },
  rendered: { expiresIn: 'Lejár 5 nap múlva' },
  help: {
    alt: 'Egy bankkapcsolat élete: aktív és szinkronizál, a hozzájárulás lejárta előtt hét nappal borostyánsárga figyelmeztetés, ekkor leáll az automatikus szinkronizálás, majd a lejárt állapot és az újracsatlakozás, amely ismét aktívvá teszi.',
    steps: {
      connect: 'Összekapcsolja a bankot',
      connectDetail: 'Kiválasztja, mennyi előzményt kér, és a bank saját oldalán engedélyezi a hozzáférést.',
      sync: 'A tranzakciók naponta kétszer érkeznek',
      syncDetail: 'Minden bejelölt számláról, ahhoz a céghez rendelve, amelyet megadott hozzá.',
      warning: 'A hozzájárulás lejárta előtt hét nappal',
      warningDetail: 'A kártya borostyánsárgára vált, és az automatikus szinkronizálás már ekkor leáll, nem a lejárat napján.',
      expired: 'A hozzájárulás lejár',
      expiredDetail: 'Semmi nem vész el: a már beimportált tranzakciók változatlanok maradnak.',
      renew: 'Újra összekapcsolja ugyanazt a bankot',
      renewDetail: 'Ilyenkor nem kérdez rá az előzményekre. A lejárt időszak alatt kimaradt napokat a bank már nem adja vissza; ezeket kivonatból pótolhatja.',
      disconnect: 'Ettől függetlenül, bármikor: a pénzügyi vezető lecsatlakoztathat egy számlát.',
    },
  },
}

const de: Copy = {
  ui: { status_active: 'Aktiv', status_expired: 'Abgelaufen', status_disconnected: 'Getrennt' },
  rendered: { expiresIn: 'Läuft in 5 Tagen ab' },
  help: {
    alt: 'Das Leben einer Bankverbindung: aktiv und synchronisierend, sieben Tage vor Ablauf der Zustimmung eine bernsteinfarbene Warnung, ab der die automatische Synchronisierung stoppt, dann der abgelaufene Zustand und die erneute Verbindung, die sie wieder aktiv macht.',
    steps: {
      connect: 'Sie verbinden die Bank',
      connectDetail: 'Sie wählen, wie viel Historie importiert wird, und autorisieren auf der Seite Ihrer Bank.',
      sync: 'Transaktionen kommen zweimal täglich',
      syncDetail: 'Von jedem angehakten Konto, dem Unternehmen zugeordnet, das Sie dafür angegeben haben.',
      warning: 'Sieben Tage vor Ablauf der Zustimmung',
      warningDetail: 'Die Karte wird bernsteinfarben, und die automatische Synchronisierung stoppt bereits jetzt, nicht erst am Ablauftag.',
      expired: 'Die Zustimmung läuft ab',
      expiredDetail: 'Nichts geht verloren: die bereits importierten Transaktionen bleiben, wie sie sind.',
      renew: 'Sie verbinden dieselbe Bank erneut',
      renewDetail: 'Diesmal ohne Frage nach der Historie. Tage, die während der abgelaufenen Zustimmung fehlen, gibt die Bank nicht mehr heraus; ergänzen Sie sie aus einem Auszug.',
      disconnect: 'Davon unabhängig, jederzeit: die Finanzleitung kann ein Konto trennen.',
    },
  },
}

export const bankCopy: Record<Locale, Copy> = { en, hu, de }
