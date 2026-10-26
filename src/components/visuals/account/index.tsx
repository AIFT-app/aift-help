// The Account page (Profile, Notifications) and the organization's Support
// access page, for the language (Your Account) and roles-and-permissions
// articles.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-10-26), class for class:
//   account/layout.tsx + AccountSectionNav.tsx   the title, subtitle and tabs
//   account/profile/page.tsx, AvatarForm.tsx, NameForm.tsx, JobTitleForm.tsx
//     (the first three sections; the password section is left out)
//   account/notifications/NotificationsForm.tsx + components/settings/SettingsPanel.tsx
//     (the first three sections, everything switched on)
//   organization-settings/layout.tsx + support-access/page.tsx, OrgPageHeader.tsx,
//     SupportAccessCard.tsx, SupportSessionLog.tsx (granted, one session in
//     progress, two ended)
//
// WHY THESE SCREENS
//
//   Profile shows the Account page itself: its three tabs and what "you"
//   means to the app (picture, name and greeting, job title). Notifications
//   shows the shape every email setting has: a section, a row, a switch.
//   Support access is a page about who can see a firm's data, and a picture of
//   a granted window with a session in it says more than a paragraph.
//
// The NOTIFICATIONS crop follows the approvals emails figure: the account
// column (max-w-3xl px-4) cut 32px above and below, no page header.
//
// A server component: every control is in its resting state, the forms have
// no actions, and the screens are `inert`.
//
// ⚠️ MARKERS sit inside headings or beside a control in a plain flex row. The
// support card and session rows are `justify-between`, where a pin would move
// the button, so those two markers stand on the row's heading or badges and
// the legend names the button.

import type { Locale } from '@/lib/i18n'
import { Avatar } from '@/components/catalyst/avatar'
import { Badge } from '@/components/catalyst/badge'
import { Button } from '@/components/catalyst/button'
import { Field, FieldGroup, Fieldset, Label } from '@/components/catalyst/fieldset'
import { Heading } from '@/components/catalyst/heading'
import { Input } from '@/components/catalyst/input'
import { Switch } from '@/components/catalyst/switch'
import { Text } from '@/components/catalyst/text'
import { AppScreen, Figure, Pin } from '../kit'
import { SESSION_PAST_LINES, SESSION_REASONS, SESSION_STAFF, accountCopy } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

// SettingsPanel.tsx PANELS.list, verbatim.
const PANEL_LIST =
  'divide-y divide-zinc-100 overflow-hidden rounded-xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-700'

// ── Profile ─────────────────────────────────────────────────────────────────

function ProfileScreen({ locale }: { locale: Locale }) {
  const c = accountCopy[locale]
  const p = c.profile
  const givenField = (
    <Field key="given">
      <Label>{p.given}</Label>
      <Input name="given_name" type="text" value="Anna" readOnly />
      <Text className="mt-1 text-xs">{p.givenHelp}</Text>
    </Field>
  )
  const familyField = (
    <Field key="family">
      <Label>{p.family}</Label>
      <Input name="family_name" type="text" value="Kovács" readOnly />
    </Field>
  )
  return (
    <div className="bg-white p-6">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Heading>{c.account.title}</Heading>
        <Text className="mt-2">{c.account.subtitle}</Text>

        <div className="mt-8">
          <nav className="flex flex-wrap gap-x-6 gap-y-1 border-b border-zinc-200 dark:border-zinc-800">
            {c.account.tabs.map((label, i) => (
              <a
                key={label}
                href="#"
                className={
                  i === 0
                    ? '-mb-px border-b-2 px-1 pb-3 text-sm font-medium transition-colors border-zinc-900 text-zinc-900 dark:border-white dark:text-white'
                    : '-mb-px border-b-2 px-1 pb-3 text-sm font-medium transition-colors border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
                }
              >
                {label}
              </a>
            ))}
            <Pin n={1} at="right" cancel="-ml-6" />
          </nav>
        </div>

        <div className="mt-10">
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-[14rem_1fr] sm:gap-10">
              <div>
                <h2 className="text-base font-semibold text-zinc-950 dark:text-white">{p.pictureHeading}</h2>
                <Text className="mt-1">{p.pictureDesc}</Text>
              </div>
              <div>
                <div className="flex items-center gap-5">
                  <Avatar initials="AK" alt="" className="size-20 bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300" />
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Button type="button" outline>
                        {p.upload}
                      </Button>
                      <Pin n={2} at="right" cancel="-ml-2" />
                    </div>
                    <Text className="text-xs">{p.hint}</Text>
                  </div>
                </div>
                <input type="file" className="sr-only" tabIndex={-1} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-[14rem_1fr] sm:gap-10">
              <div>
                <h2 className="text-base font-semibold text-zinc-950 dark:text-white">
                  {p.nameHeading}
                  <Pin n={3} at="right" cancel="" />
                </h2>
                <Text className="mt-1">{p.nameDesc}</Text>
              </div>
              <form>
                <Fieldset>
                  <FieldGroup>{p.familyFirst ? [familyField, givenField] : [givenField, familyField]}</FieldGroup>
                </Fieldset>
                <Text className="mt-4 text-sm">{p.preview}</Text>
                <Button type="button" className="mt-5">
                  {p.save}
                </Button>
              </form>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-[14rem_1fr] sm:gap-10">
              <div>
                <h2 className="text-base font-semibold text-zinc-950 dark:text-white">
                  {p.jobHeading}
                  <Pin n={4} at="right" cancel="" />
                </h2>
                <Text className="mt-1">{p.jobDesc}</Text>
              </div>
              <form className="max-w-md">
                <Fieldset>
                  <FieldGroup>
                    <Field>
                      <Label>{p.jobLabel}</Label>
                      <Input name="job_title" type="text" value={p.job} readOnly />
                      <Text className="mt-1 text-xs">{p.jobHelp}</Text>
                    </Field>
                  </FieldGroup>
                </Fieldset>
                <Button type="button" className="mt-5">
                  {p.jobSave}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const PROFILE_ALT: Record<Locale, string> = {
  en: 'The Profile tab of the Account page, with the tabs Profile, Language and Notifications. Profile picture shows the initials AK with Upload a picture; Name has First name Anna and Last name Kovács with the preview Display name: Anna Kovács · Greeting: Hi Anna; Job title reads Senior bookkeeper.',
  hu: 'A Fiók oldal Profil füle, a Profil, Nyelv és Értesítések fülekkel. A Profilképnél az AK monogram és a Kép feltöltése gomb; a Névnél Vezetéknév Kovács, Keresztnév Anna, az előnézet: Megjelenő név: Kovács Anna · Megszólítás: Szia Anna!; a Beosztás: Senior könyvelő.',
  de: 'Der Reiter Profil der Seite Konto, mit den Reitern Profil, Sprache und Benachrichtigungen. Beim Profilbild die Initialen AK mit Bild hochladen; beim Namen Vorname Anna und Nachname Kovács mit der Vorschau Anzeigename: Anna Kovács · Anrede: Hallo Anna; die Position lautet Senior-Buchhalterin.',
}

export function AccountProfileFigure({ locale, children }: FigureProps) {
  return (
    <Figure
      alt={PROFILE_ALT[locale]}
      wide
      zoomable={locale}
      art={
        <AppScreen>
          <ProfileScreen locale={locale} />
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}

// ── Notifications ───────────────────────────────────────────────────────────

function NotificationsScreen({ locale }: { locale: Locale }) {
  const c = accountCopy[locale].notifications
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex flex-col gap-10">
        {c.sections.map(([title, desc, rows], i) => (
          <section key={title}>
            <h2 className="text-base/7 font-semibold text-zinc-950 dark:text-white">
              {title}
              <Pin n={i + 1} at="right" cancel="" />
            </h2>
            <Text className="mt-1">{desc}</Text>
            <div className="mt-4">
              <div className={PANEL_LIST}>
                {rows.map(([rowTitle, rowDesc]) => (
                  <div key={rowTitle} className="flex items-start gap-4 px-6 py-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-zinc-950 dark:text-white">{rowTitle}</p>
                      <p className="mt-0.5 text-[13px] text-zinc-500 dark:text-zinc-400">{rowDesc}</p>
                    </div>
                    <Switch defaultChecked className="mt-0.5" />
                  </div>
                ))}
              </div>
            </div>
            {i === 2 ? <p className="mt-2 text-[13px] text-zinc-400 dark:text-zinc-500">{c.mute}</p> : null}
          </section>
        ))}
      </div>
    </div>
  )
}

const NOTIFICATIONS_ALT: Record<Locale, string> = {
  en: 'The top of the Notifications tab, every switch on: Weekly summary with Monday summary, Product announcements, and Messages with Unread message reminders and Missing receipts, followed by the note that a single conversation can be muted from the conversation itself.',
  hu: 'Az Értesítések fül teteje, minden kapcsoló bekapcsolva: Heti összefoglaló a Hétfői összefoglalóval, Termékújdonságok, és Üzenetek az Olvasatlan üzenet emlékeztetővel és a Hiányzó bizonylatokkal, alatta a megjegyzés, hogy egy beszélgetés magából a beszélgetésből is némítható.',
  de: 'Der obere Teil des Reiters Benachrichtigungen, alle Schalter an: Wochenübersicht mit der Montagsübersicht, Produktneuigkeiten, und Nachrichten mit der Erinnerung an ungelesene Nachrichten und Fehlende Belege, darunter der Hinweis, dass sich eine einzelne Unterhaltung in der Unterhaltung selbst stummschalten lässt.',
}

export function AccountNotificationsFigure({ locale, children }: FigureProps) {
  return (
    <Figure
      alt={NOTIFICATIONS_ALT[locale]}
      wide
      zoomable={locale}
      art={
        <AppScreen>
          <NotificationsScreen locale={locale} />
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}

// ── Support access ──────────────────────────────────────────────────────────

function PastSession({ role, end, line, reason }: { role: string; end: string; line: string; reason: string }) {
  return (
    <li className="border-t border-zinc-100 pt-4 first:border-0 first:pt-0 dark:border-zinc-800">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{SESSION_STAFF}</span>
        <Badge color="zinc">{role}</Badge>
        <Badge color="zinc">{end}</Badge>
      </div>
      <Text className="mt-1 text-sm">{line}</Text>
      <Text className="mt-1 text-sm italic">{reason}</Text>
    </li>
  )
}

function SupportScreen({ locale }: { locale: Locale }) {
  const c = accountCopy[locale].support
  return (
    <div className="bg-white p-6">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{c.eyebrow}</p>
            <Heading className="mt-1">{c.heading}</Heading>
            <Text className="mt-2">{c.description}</Text>
          </div>

          <div className="mt-8 space-y-6">
            <div className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-700">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{c.status}</h2>
                    <Badge color="emerald">{c.granted}</Badge>
                    <Pin n={1} at="right" cancel="-ml-2" />
                  </div>
                  <Text className="mt-2">{c.grantedHelp}</Text>
                  <Text className="mt-1 text-xs">{c.grantedBy}</Text>
                  <Text className="mt-1 text-xs">{c.activeCount}</Text>
                </div>
                <Button outline>{c.close}</Button>
              </div>
            </div>
            <div className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-700">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{c.whatTitle}</h2>
              <Text className="mt-2">{c.whatBody}</Text>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
                {c.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <section className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-700">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{c.activeTitle}</h2>
              <ul className="mt-4 space-y-4">
                <li className="flex flex-wrap items-start justify-between gap-4 border-t border-zinc-100 pt-4 first:border-0 first:pt-0 dark:border-zinc-800">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{SESSION_STAFF}</span>
                      <Badge color="emerald">{c.inProgress}</Badge>
                      <Badge color="zinc">{c.roleOwner}</Badge>
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">{c.mirror}</span>
                      <Pin n={2} at="right" cancel="-ml-2" />
                    </div>
                    <Text className="mt-1 text-sm">{c.lineActive}</Text>
                    <Text className="mt-1 text-sm italic">{SESSION_REASONS.active}</Text>
                  </div>
                  <Button outline>{c.endSession}</Button>
                </li>
              </ul>
            </section>
            <section className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-700">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {c.historyTitle}
                <Pin n={3} at="right" cancel="" />
              </h2>
              <Text className="mt-2">{c.historyHelp}</Text>
              <ol className="mt-4 space-y-4">
                <PastSession role={c.roleAcc} end={c.endStaff} line={SESSION_PAST_LINES.staff} reason={SESSION_REASONS.staff} />
                <PastSession role={c.roleAcc} end={c.endExpired} line={SESSION_PAST_LINES.expired} reason={SESSION_REASONS.expired} />
              </ol>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

const SUPPORT_ALT: Record<Locale, string> = {
  en: 'The Support access page: access Granted until 2027-03-02 10:15 by kata.molnar@example.com, one session in progress, and Close support access. Under What support access means, four points. Active now: Bence Tóth, In progress, Finance lead, acting with Anna Kovács’s access, in Gearmont Kft. from 09:12 to 17:12, with his reason and End session. History: two ended sessions, one Ended by AIFT and one Ended automatically.',
  hu: 'Az Ügyfélszolgálati hozzáférés oldal: a hozzáférés Engedélyezve 2027-03-02 10:15-ig, engedélyezte kata.molnar@example.com, egy futó munkamenettel, és a Hozzáférés lezárása gomb. A Mit jelent az ügyfélszolgálati hozzáférés alatt négy pont. Most aktív: Bence Tóth, Folyamatban, Pénzügyi vezető, Anna Kovács hozzáférésével, a Gearmont Kft.-ben 9:12-től 17:12-ig, indoklással és Munkamenet lezárása gombbal. Előzmények: két lezárt munkamenet, az egyiket Az AIFT zárta le, a másik Automatikusan lezárult.',
  de: 'Die Seite Support-Zugriff: Zugriff Erteilt bis 2027-03-02 10:15 von kata.molnar@example.com, eine laufende Sitzung, und Support-Zugriff beenden. Unter Was Support-Zugriff bedeutet vier Punkte. Jetzt aktiv: Bence Tóth, Läuft, Finanzleitung, mit den Rechten von Anna Kovács, in Gearmont Kft. von 09:12 bis 17:12, mit Begründung und Sitzung beenden. Verlauf: zwei beendete Sitzungen, eine Von AIFT beendet, eine Automatisch beendet.',
}

export function SupportAccessFigure({ locale, children }: FigureProps) {
  return (
    <Figure
      alt={SUPPORT_ALT[locale]}
      wide
      zoomable={locale}
      art={
        <AppScreen>
          <SupportScreen locale={locale} />
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}
