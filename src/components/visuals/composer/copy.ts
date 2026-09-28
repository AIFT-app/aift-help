// Labels for the message-composer figure, keyed by aift-web message key.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-09-28):
//   src/app/(app)/_components/SubjectCommentsPanel.tsx  (the composer block)
//   src/app/(app)/_components/ChipEditor.tsx            (the editor + chips)
import type { Locale } from '@/lib/i18n'

export const UI_KEYS = [
  'comments.thread.suggested_label',
  'comments.thread.use_template',
  'comments.thread.draft_ai',
  'comments.thread.send',
  'comments.thread.reply_placeholder',
  'comments.templates.placeholder_hint',
  'comments.templates.invoice.tax_id_mismatch.label',
  'comments.templates.invoice.date_unclear.label',
] as const

export type UiKey = (typeof UI_KEYS)[number]

/**
 * The two placeholder tokens in the tax-ID template's body. ChipEditor turns
 * every `{token}` into a chip carrying the token NAME, not a value - which is
 * the whole point of the figure: from the dropdown they arrive unfilled, and
 * nothing stops you sending them like that.
 */
export const CHIPS = ['tax_id_on_invoice', 'tax_id_on_file'] as const

type Copy = {
  ui: Record<UiKey, string>
  /** The template body split around its two chips, as ChipEditor renders it. */
  body: { lead: string; mid: string; tail: string }
  help: { alt: string }
}

const en: Copy = {
  ui: {
    'comments.thread.suggested_label': "Suggested:",
    'comments.thread.use_template': "Use a template…",
    'comments.thread.draft_ai': "Draft with AI",
    'comments.thread.send': "Send",
    'comments.thread.reply_placeholder': "Write a reply…",
    'comments.templates.placeholder_hint': "Click each placeholder chip to replace it.",
    'comments.templates.invoice.tax_id_mismatch.label': "Tax ID mismatch",
    'comments.templates.invoice.date_unclear.label': "Date unclear",
  },
  body: {
    lead: "The tax ID on this invoice (",
    mid: ") doesn't match our file (",
    tail: "). Is this for the right company?",
  },
  help: { alt: "The message composer. A row of blue Suggested chips sits above a dropdown reading Use a template and an outlined Draft with AI button. Below them the editor holds a template whose two placeholders are grey chips showing their token names, with the hint to click each one on the left and a dark Send button on the right." },
}

const hu: Copy = {
  ui: {
    'comments.thread.suggested_label': "Javasolt:",
    'comments.thread.use_template': "Sablon használata…",
    'comments.thread.draft_ai': "Fogalmazás AI-jal",
    'comments.thread.send': "Küldés",
    'comments.thread.reply_placeholder': "Írj választ…",
    'comments.templates.placeholder_hint': "Kattints minden helyőrző chipre, hogy kicseréld.",
    'comments.templates.invoice.tax_id_mismatch.label': "Adószám eltérés",
    'comments.templates.invoice.date_unclear.label': "Dátum nem egyértelmű",
  },
  body: {
    lead: "A számlán szereplő adószám (",
    mid: ") nem egyezik az általunk nyilvántartott adatokkal (",
    tail: "). Ez a megfelelő céghez tartozik?",
  },
  help: { alt: "Az üzenetszerkesztő. Fent kék Javasolt chipek sora, alattuk egy Sablon használata legördülő menü és egy körvonalas Fogalmazás AI-jal gomb. Ezek alatt a szerkesztőben egy sablon, amelynek két helyőrzője szürke chipként, a jelölő nevével látszik, balra a chipek cseréjére felszólító megjegyzés, jobbra a sötét Küldés gomb." },
}

const de: Copy = {
  ui: {
    'comments.thread.suggested_label': "Vorschlag:",
    'comments.thread.use_template': "Vorlage verwenden…",
    'comments.thread.draft_ai': "Mit KI entwerfen",
    'comments.thread.send': "Senden",
    'comments.thread.reply_placeholder': "Antwort schreiben…",
    'comments.templates.placeholder_hint': "Klicken Sie auf jeden Platzhalter-Chip, um ihn zu ersetzen.",
    'comments.templates.invoice.tax_id_mismatch.label': "Steuernummer stimmt nicht",
    'comments.templates.invoice.date_unclear.label': "Datum unklar",
  },
  body: {
    lead: "Die Steuernummer auf dieser Rechnung (",
    mid: ") stimmt nicht mit unserer Datei (",
    tail: ") überein. Gehört das zum richtigen Unternehmen?",
  },
  help: { alt: "Der Nachrichteneditor. Oben eine Reihe blauer Vorschlag-Chips, darunter ein Auswahlfeld Vorlage verwenden und eine umrandete Schaltfläche Mit KI entwerfen. Darunter enthält der Editor eine Vorlage, deren zwei Platzhalter als graue Chips mit ihren Token-Namen erscheinen, links der Hinweis, jeden Chip zu ersetzen, rechts die dunkle Schaltfläche Senden." },
}

export const composerCopy: Record<Locale, Copy> = { en, hu, de }
