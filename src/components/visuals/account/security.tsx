// The Security tab of the Account page, the recovery codes dialog, and the
// second sign-in step, for the language (Your Account) article.
//
// Rebuilt 1:1 from aift-web (origin/staging @ 08fb7e34, 2026-11-06), class for class:
//   account/layout.tsx + AccountSectionNav.tsx    the title, subtitle and tabs
//   account/security/page.tsx                      Section (heading column + body)
//   account/security/TwoFactorSection.tsx          the "on" rows and the codes dialog
//   account/security/PasskeysCard.tsx              the passkey list and Add a passkey
//   account/profile/PasswordForm.tsx + shared/PasswordInput.tsx  (first field only;
//     the screen is cropped there)
//   login/verify/VerifyForm.tsx + catalyst/auth-layout.tsx + shared/LanguagePicker.tsx
//
// WHY THESE SCREENS
//
//   The Security tab with two-factor sign-in on and two passkeys is the state
//   a careful user ends up in, and it shows all three ways in on one page.
//   The recovery codes dialog is the one moment that cannot be repeated (the
//   codes are shown once), so the article shows it rather than describes it.
//   "One more step" is what every sign-in looks like afterwards. The setup
//   dialog with its QR code is described in words instead: a scannable QR code
//   in a help article would add a dead entry to a reader's authenticator app.
//
// A server component: every control is in its resting state and the screens
// are `inert`. Fixture data (dates, counts, passkey names, codes) is fictional.
//
// ⚠️ DialogBody is `overflow-y-auto`, which clips on all four sides, so the
// dialog's markers sit beside short content (the button row, the checkbox
// label), never past the body's edge. The rows of the Security tab are
// `justify-between`, so their markers stand inside the headings and labels.

import { EyeIcon } from '@heroicons/react/20/solid'
import type { Locale } from '@/lib/i18n'
import { Badge } from '@/components/catalyst/badge'
import { Button } from '@/components/catalyst/button'
import { Checkbox, CheckboxField } from '@/components/catalyst/checkbox'
import { DialogActions, DialogBody } from '@/components/catalyst/dialog'
import { Field, FieldGroup, Fieldset, Label } from '@/components/catalyst/fieldset'
import { Heading } from '@/components/catalyst/heading'
import { Input } from '@/components/catalyst/input'
import { Text, TextLink } from '@/components/catalyst/text'
import { AppScreen, Figure, Pin } from '../kit'
import { accountCopy } from './copy'
import { RECOVERY_CODES, securityCopy } from './security-copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

// TwoFactorSection.tsx / PasskeysCard.tsx list markup, verbatim.
const LIST =
  'divide-y divide-zinc-950/5 rounded-lg border border-zinc-950/10 dark:divide-white/5 dark:border-white/10'
const ROW = 'flex items-center justify-between gap-4 px-4 py-3'
const ROW_TITLE = 'text-sm/6 font-medium text-zinc-950 dark:text-white'
const ROW_META = 'text-xs/5 text-zinc-500 dark:text-zinc-400'

/** "k7m2p9xq4w" → "k7m2p 9xq4w", TwoFactorSection.tsx formatRecoveryCode. */
function formatRecoveryCode(code: string): string {
  return `${code.slice(0, 5)} ${code.slice(5)}`
}

// security/page.tsx Section.
function Section({ heading, description, pin, children }: { heading: string; description: string; pin: number; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-[14rem_1fr] sm:gap-10">
      <div>
        <h2 className="text-base font-semibold text-zinc-950 dark:text-white">
          {heading}
          <Pin n={pin} at="right" cancel="" />
        </h2>
        <Text className="mt-1">{description}</Text>
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

// ── The Security tab ────────────────────────────────────────────────────────

/** The screen ends just under the password section's first field and description (HU, the longest, measured 793px). */
const SECURITY_CLIP_HEIGHT = 808

function SecurityScreen({ locale }: { locale: Locale }) {
  const a = accountCopy[locale].account
  const s = securityCopy[locale]
  const tf = s.twoFactor
  const pk = s.passkeys
  return (
    <div className="bg-white p-6">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Heading>{a.title}</Heading>
        <Text className="mt-2">{a.subtitle}</Text>

        <div className="mt-8">
          <nav className="flex flex-wrap gap-x-6 gap-y-1 border-b border-zinc-200 dark:border-zinc-800">
            {a.tabs.map((label, i) => (
              <a
                key={label}
                href="#"
                className={
                  i === 1
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
            <Section heading={tf.section_heading} description={tf.section_description} pin={2}>
              <div className="flex flex-col gap-3">
                <ul className={LIST}>
                  <li className={ROW}>
                    <div className="min-w-0">
                      <p className={ROW_TITLE}>
                        {tf.authenticator} <Badge color="lime">{tf.on}</Badge>
                      </p>
                      <p className={ROW_META}>{s.setUpOn}</p>
                    </div>
                    <Button outline>{tf.remove}</Button>
                  </li>
                  <li className={ROW}>
                    <div className="min-w-0">
                      <p className={ROW_TITLE}>
                        {tf.codes_label}
                        <Pin n={3} at="right" cancel="" />
                      </p>
                      <p className={ROW_META}>{s.codesLeft}</p>
                    </div>
                    <Button outline>{tf.codes_new}</Button>
                  </li>
                </ul>
              </div>
            </Section>

            <Section heading={pk.section_heading} description={pk.section_description} pin={4}>
              <div className="flex flex-col gap-4">
                <ul className={LIST}>
                  {s.passkeyRows.map(([name, meta]) => (
                    <li key={name} className={ROW}>
                      <div className="min-w-0">
                        <p className={`truncate ${ROW_TITLE}`}>{name}</p>
                        <p className={ROW_META}>{meta}</p>
                      </div>
                      <Button outline>{pk.remove}</Button>
                    </li>
                  ))}
                </ul>
                <div>
                  <Button outline>{pk.add}</Button>
                </div>
              </div>
            </Section>

            <Section heading={s.password.section_heading} description={s.password.section_description} pin={5}>
              <form className="max-w-md">
                <Fieldset>
                  <FieldGroup>
                    <Field>
                      <Label>{s.password.current_label}</Label>
                      <span className="relative block">
                        <Input name="current_password" type="password" className="pr-10" readOnly />
                        <button
                          type="button"
                          aria-label="Show password"
                          aria-pressed={false}
                          tabIndex={0}
                          className="absolute inset-y-0 right-2 my-auto inline-flex size-7 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                        >
                          <EyeIcon className="size-4" />
                        </button>
                      </span>
                    </Field>
                  </FieldGroup>
                </Fieldset>
              </form>
            </Section>
          </div>
        </div>
      </div>
    </div>
  )
}

const SECURITY_ALT: Record<Locale, string> = {
  en: 'The Security tab of the Account page, with the tabs Profile, Security, Language and Notifications. Two-factor sign-in: Authenticator app, On, set up 2026-10-14, with Remove; Recovery codes, 9 of 10 unused, with New codes. Passkeys: iCloud Keychain and Google Password Manager, each with the date added, the date last used and Remove, then Add a passkey. Below them the Password section begins with Current password.',
  hu: 'A Fiók oldal Biztonság füle, a Profil, Biztonság, Nyelv és Értesítések fülekkel. Kétlépcsős azonosítás: Hitelesítő alkalmazás, Bekapcsolva, beállítva 2026-10-14-én, Eltávolítás gombbal; Helyreállító kódok, 10-ből 9 felhasználatlan, Új kódok gombbal. Passkeyk: iCloud Keychain és Google Password Manager, mindegyiknél a hozzáadás és az utolsó használat dátuma és az Eltávolítás gomb, alattuk a Passkey hozzáadása. Lent a Jelszó szakasz a Jelenlegi jelszó mezővel kezdődik.',
  de: 'Der Reiter Sicherheit der Seite Konto, mit den Reitern Profil, Sicherheit, Sprache und Benachrichtigungen. Zwei-Faktor-Anmeldung: Authenticator-App, Aktiv, eingerichtet am 2026-10-14, mit Entfernen; Wiederherstellungscodes, 9 von 10 unbenutzt, mit Neue Codes. Passkeys: iCloud Keychain und Google Password Manager, jeweils mit dem Datum des Hinzufügens, der letzten Verwendung und Entfernen, darunter Passkey hinzufügen. Darunter beginnt der Abschnitt Passwort mit Aktuelles Passwort.',
}

export function AccountSecurityFigure({ locale, children }: FigureProps) {
  return (
    <Figure
      alt={SECURITY_ALT[locale]}
      wide
      zoomable={locale}
      art={
        <AppScreen clipHeight={SECURITY_CLIP_HEIGHT}>
          <SecurityScreen locale={locale} />
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}

// ── The recovery codes dialog ───────────────────────────────────────────────

/** The dialog panel is sm:max-w-md (448px) inside a p-4 crop. */
const DIALOG_MIN_WIDTH = 480

function RecoveryCodesScreen({ locale }: { locale: Locale }) {
  const tf = securityCopy[locale].twoFactor
  return (
    <div className="bg-white p-4">
      {/* DialogPanel (catalyst/dialog.tsx, size md), without the backdrop and
          the centring wrapper: the crop is the panel. DialogTitle is Headless
          UI's, which throws outside a Dialog, so the title is the h2 Headless
          renders, class for class. The state is the one the dialog opens in:
          nothing ticked yet, so Done waits. */}
      <div className="mx-auto flex max-h-[calc(100vh-2rem)] w-full flex-col rounded-2xl bg-white p-6 shadow-xl sm:max-w-md dark:bg-zinc-900 dark:ring-1 dark:ring-white/10">
        <h2 className="shrink-0 text-base/6 font-semibold text-zinc-950 dark:text-white">
          {tf.codes_title}
          <Pin n={1} at="right" cancel="" />
        </h2>
        <DialogBody>
          <Text>{tf.codes_body}</Text>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1.5 rounded-lg border border-zinc-950/10 bg-zinc-50 p-4 font-mono text-sm/6 text-zinc-950 dark:border-white/10 dark:bg-white/5 dark:text-white">
            {RECOVERY_CODES.map((c) => (
              <span key={c}>{formatRecoveryCode(c)}</span>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            <Button outline>{tf.codes_copy}</Button>
            <Button outline>{tf.codes_download}</Button>
            <Pin n={2} at="right" cancel="-ml-3" />
          </div>
          <CheckboxField className="mt-5">
            <Checkbox checked={false} />
            <Label>
              {tf.codes_saved}
              <Pin n={3} at="right" cancel="" />
            </Label>
          </CheckboxField>
        </DialogBody>
        <DialogActions>
          <span className="text-xs/5 text-zinc-500 dark:text-zinc-400">{tf.codes_done_hint}</span>
          <Button disabled>{tf.done}</Button>
        </DialogActions>
      </div>
    </div>
  )
}

const CODES_ALT: Record<Locale, string> = {
  en: 'The Save your recovery codes dialog: If you lose your phone, these let you sign in. Each works once. This is the last time you see them. Ten example codes in two columns, Copy and Download (.txt), the unticked box I have saved the codes, and Done, which waits with the hint Tick that you saved them first.',
  hu: 'A Mentsd el a helyreállító kódjaidat ablak: Ha elveszíted a telefonodat, ezekkel tudsz belépni. Mindegyik egyszer használható. Most látod őket utoljára. Tíz példakód két oszlopban, Másolás és Letöltés (.txt), az üres Elmentettem a kódokat jelölőnégyzet, és a Kész gomb, amely addig nem nyomható, mellette: Előbb pipáld ki, hogy elmentetted őket.',
  de: 'Der Dialog Speichern Sie Ihre Wiederherstellungscodes: Wenn Sie Ihr Telefon verlieren, melden Sie sich damit an. Jeder Code gilt einmal. Sie sehen sie jetzt zum letzten Mal. Zehn Beispielcodes in zwei Spalten, Kopieren und Herunterladen (.txt), das leere Kästchen Ich habe die Codes gespeichert, und Fertig, das wartet, mit dem Hinweis Bestätigen Sie zuerst, dass Sie sie gespeichert haben.',
}

export function RecoveryCodesFigure({ locale, children }: FigureProps) {
  return (
    <Figure
      alt={CODES_ALT[locale]}
      wide
      zoomable={locale}
      zoomWidth={DIALOG_MIN_WIDTH}
      art={
        <AppScreen minWidth={DIALOG_MIN_WIDTH}>
          <RecoveryCodesScreen locale={locale} />
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}

// ── The second sign-in step ─────────────────────────────────────────────────

/** AuthLayout's card is max-w-sm (384px) inside lg:p-10 and the main's p-2. */
const VERIFY_MIN_WIDTH = 480

// AuthLayout's background haze, the five blobs at their resting frame
// (globals.css haze-drift-* at 0%: blur 70px, no movement). The app animates
// them; a help figure holds still.
const HAZE: React.CSSProperties[] = [
  { width: 620, height: 620, top: -200, left: -180, background: 'radial-gradient(circle, rgba(139,92,246,0.26) 0%, rgba(99,102,241,0.16) 50%, transparent 72%)' },
  { width: 540, height: 540, bottom: -160, right: -140, background: 'radial-gradient(circle, rgba(236,72,153,0.22) 0%, rgba(167,139,250,0.14) 50%, transparent 72%)' },
  { width: 460, height: 460, top: -100, right: -100, background: 'radial-gradient(circle, rgba(56,189,248,0.20) 0%, rgba(139,92,246,0.13) 55%, transparent 72%)' },
  { width: 400, height: 400, bottom: -80, left: -80, background: 'radial-gradient(circle, rgba(253,186,116,0.19) 0%, rgba(249,168,212,0.16) 55%, transparent 72%)' },
  { width: 320, height: 320, top: '40%', right: '6%', background: 'radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)' },
]

function VerifyScreen({ locale }: { locale: Locale }) {
  const s = securityCopy[locale]
  const v = s.verify
  const active = ['en', 'hu', 'de'].indexOf(locale)
  return (
    // AuthLayout's <main> and card frame. The app's min-h-dvh and pt-[14vh]
    // depend on the window; the crop uses the card's own height and 48px.
    <div className="flex flex-col bg-white p-2 dark:bg-zinc-950">
      <div className="relative flex grow items-start justify-center rounded-2xl p-6 lg:p-10 dark:bg-zinc-950" style={{ paddingTop: 48 }}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {HAZE.map((style, i) => (
            <div key={i} className="absolute" style={{ ...style, borderRadius: '50%', filter: 'blur(70px)' }} />
          ))}
        </div>

        <div className="relative w-full max-w-sm rounded-2xl bg-white/75 px-8 py-10 shadow-2xl ring-1 ring-zinc-950/[0.06] backdrop-blur-xl dark:bg-zinc-900/70 dark:ring-white/10">
          <div className="mb-6">
            {/* shared/LanguagePicker.tsx */}
            <div role="group" className="flex items-center justify-end gap-1.5 text-sm/6">
              {s.picker.map((label, i) => (
                <span key={label} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-600">
                      ·
                    </span>
                  )}
                  <button
                    type="button"
                    className={
                      i === active
                        ? 'rounded transition-colors font-semibold text-zinc-950 dark:text-white'
                        : 'rounded transition-colors text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
                    }
                  >
                    {label}
                  </button>
                </span>
              ))}
            </div>
          </div>

          <form className="w-full max-w-sm">
            <Heading>
              {v.heading}
              <Pin n={1} at="right" cancel="" />
            </Heading>
            <Text className="mt-2">{v.intro}</Text>

            <Field className="mt-8">
              <Label>{v.code_label}</Label>
              <Input name="code" inputMode="numeric" value="" readOnly />
            </Field>

            <Button type="button" color="dark/zinc" className="mt-8 w-full" disabled>
              {v.submit}
            </Button>

            <div className="mt-6 flex flex-col gap-2 text-sm/6">
              <TextLink href="#">
                {v.use_recovery}
                <Pin n={2} at="right" cancel="" />
              </TextLink>
              <TextLink href="#" className="text-zinc-500 dark:text-zinc-400">
                {v.sign_out}
              </TextLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const VERIFY_ALT: Record<Locale, string> = {
  en: 'The second sign-in step: One more step. Enter the 6-digit code from your authenticator app. An empty Code field, the Verify button, and under it the links No phone with you? Use a recovery code, and Sign out.',
  hu: 'A belépés második lépése: Még egy lépés. Írd be a hitelesítő alkalmazásod 6 jegyű kódját. Üres Kód mező, az Ellenőrzés gomb, alatta a Nincs nálad a telefonod? Helyreállító kódot használok és a Kijelentkezés link.',
  de: 'Der zweite Anmeldeschritt: Noch ein Schritt. Geben Sie den 6-stelligen Code aus Ihrer Authenticator-App ein. Ein leeres Feld Code, die Schaltfläche Prüfen, darunter die Links Telefon nicht dabei? Wiederherstellungscode verwenden und Abmelden.',
}

export function SecondStepFigure({ locale, children }: FigureProps) {
  return (
    <Figure
      alt={VERIFY_ALT[locale]}
      wide
      zoomable={locale}
      zoomWidth={VERIFY_MIN_WIDTH}
      art={
        <AppScreen minWidth={VERIFY_MIN_WIDTH}>
          <VerifyScreen locale={locale} />
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}
