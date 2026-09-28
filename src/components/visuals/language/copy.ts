// Which language the app shows, for the language article.
//
// The ladder is aift-web's own, verified against
//   src/i18n/pre-auth-locale.ts — resolvePreAuthLocale(), steps 2-6, plus
//   acceptLanguageToLocale() and ipCountryToLocale().
// Step 1, the `locale` cookie, is the caller's rather than that function's,
// which is why the source comment says "step 1 ... is the caller's
// responsibility". The article covers the cookie in a separate section; the
// diagram is the only place the whole order is shown at once.
//
// Two details the code settles and a paragraph tends to blur:
//   - `acceptLanguageToLocale` returns the first supported entry that is NOT
//     English, so an English browser preference never stops the ladder. That
//     is why an English-language browser in Hungary gets a Hungarian page.
//   - `ipCountryToLocale` maps HU -> hu and AT/DE -> de, and everything else,
//     Switzerland included, falls through to English.
//
// No app labels here: this is a diagram, not a screen.

import type { Locale } from '@/lib/i18n'

type Rung = { title: string; detail: string }
type Copy = { steps: Rung[]; footnote: string; alt: string }

const en: Copy = {
  steps: [
    {
      title: 'The language saved in this browser',
      detail:
        'Set the last time anyone picked a language here. It wins over everything below it, and over the language on your own account.',
    },
    {
      title: 'A language in the link you followed',
      detail: 'A link can carry one. An invitation email always does.',
    },
    {
      title: 'The language of the invitation you were sent',
      detail: 'The one the person inviting you was working in.',
    },
    {
      title: 'Your browser, if it asks for Hungarian or German',
      detail:
        'A browser asking for English is skipped, which is why an English-language browser in Hungary still gets a Hungarian page.',
    },
    {
      title: 'Where you are',
      detail: 'Hungary gives Magyar, Austria and Germany give Deutsch. Every other country, Switzerland included, falls through.',
    },
    { title: 'English', detail: 'When nothing above applies.' },
  ],
  footnote:
    'Saving on the Language tab writes your account AND this browser, which is why saving fixes a screen that disagrees with the setting.',
  alt: 'A ladder of six rungs: the language saved in this browser, a language in the link, the invitation, the browser preference, the country, and English last.',
}

const hu: Copy = {
  steps: [
    {
      title: 'Az ebben a böngészőben mentett nyelv',
      detail:
        'Akkor került ide, amikor legutóbb bárki nyelvet választott ezen a gépen. Minden alatta lévőt megelőz, és az Ön fiókján beállított nyelvet is.',
    },
    {
      title: 'A megnyitott hivatkozásban szereplő nyelv',
      detail: 'Egy hivatkozás hordozhat nyelvet; a meghívólevél mindig hordoz.',
    },
    {
      title: 'A kapott meghívó nyelve',
      detail: 'Az a nyelv, amelyen a meghívó fél dolgozott.',
    },
    {
      title: 'A böngésző nyelve, ha magyart vagy németet kér',
      detail:
        'Az angolt kérő böngészőt a rendszer átugorja, ezért kap magyar oldalt egy angol nyelvű böngésző is Magyarországon.',
    },
    {
      title: 'Az Ön tartózkodási helye',
      detail: 'Magyarország magyart, Ausztria és Németország németet ad. Minden más ország, Svájcot is beleértve, továbblép.',
    },
    { title: 'Angol', detail: 'Ha a fentiek közül egyik sem érvényes.' },
  ],
  footnote:
    'A Nyelv lapon történő mentés a fiókjába ÉS ebbe a böngészőbe is beírja a nyelvet, ezért oldja meg a mentés, ha a képernyő nem a beállítással egyezik.',
  alt: 'Hatfokú létra: az ebben a böngészőben mentett nyelv, a hivatkozás nyelve, a meghívó nyelve, a böngésző beállítása, az ország, végül az angol.',
}

const de: Copy = {
  steps: [
    {
      title: 'Die in diesem Browser gespeicherte Sprache',
      detail:
        'Sie stammt vom letzten Mal, als hier jemand eine Sprache gewählt hat. Sie geht allem darunter vor, auch der Sprache in Ihrem eigenen Konto.',
    },
    {
      title: 'Eine Sprache im Link, dem Sie gefolgt sind',
      detail: 'Ein Link kann eine mitbringen, eine Einladungsmail bringt immer eine mit.',
    },
    {
      title: 'Die Sprache der Einladung, die Sie erhalten haben',
      detail: 'Die Sprache, in der die einladende Person gearbeitet hat.',
    },
    {
      title: 'Ihr Browser, wenn er Ungarisch oder Deutsch verlangt',
      detail:
        'Ein Browser, der Englisch verlangt, wird übersprungen. Deshalb bekommt auch ein englischsprachiger Browser in Ungarn eine ungarische Seite.',
    },
    {
      title: 'Wo Sie sich befinden',
      detail: 'Ungarn ergibt Magyar, Österreich und Deutschland ergeben Deutsch. Jedes andere Land, auch die Schweiz, fällt durch.',
    },
    { title: 'Englisch', detail: 'Wenn nichts davon zutrifft.' },
  ],
  footnote:
    'Das Speichern auf der Registerkarte Sprache schreibt Ihr Konto UND diesen Browser. Deshalb behebt das Speichern einen Bildschirm, der nicht zur Einstellung passt.',
  alt: 'Eine Leiter mit sechs Stufen: die in diesem Browser gespeicherte Sprache, eine Sprache im Link, die Einladung, die Browser-Einstellung, das Land und zuletzt Englisch.',
}

export const languageCopy: Record<Locale, Copy> = { en, hu, de }
