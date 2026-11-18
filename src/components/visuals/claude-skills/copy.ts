// Labels for the "Claude skill for this company" section of Settings → AI & data,
// verbatim from aift-web messages/<locale>.json (settings.ai_data.skills_*,
// origin/main 2026-11-17, workspace-claude-skills), keyed by message key so
// aift-ops/scripts/help-figure-copy-drift.py catches a change in the app.
// `rendered` holds the two strings the app fills in ({date}, {count}).
// `skill` is the fictional skill the figure shows (house rule: never a real
// customer). `help` is this article's own text.
import type { Locale } from '@/lib/i18n'

export const UI_KEYS = [
  'settings.ai_data.skills_section_title',
  'settings.ai_data.skills_section_desc',
  'settings.ai_data.skills_new_version',
  'settings.ai_data.skills_version',
  'settings.ai_data.skills_download',
  'settings.ai_data.skills_install_title',
  'settings.ai_data.skills_install_step1',
  'settings.ai_data.skills_install_step2',
  'settings.ai_data.skills_install_step3',
  'settings.ai_data.skills_help_link',
  'settings.ai_data.skills_earlier_versions',
] as const

export type UiKey = (typeof UI_KEYS)[number]

type Copy = {
  ui: Record<UiKey, string>
  rendered: { version: string; earlier: string }
  skill: { title: string; description: string; changeNote: string; earlierNote: string }
  help: { alt: string }
}

/** The version IS the date (workspace-claude-skills D3). Size as the app's sizeLabel prints it. */
export const LATEST = { date: '2026-11-17', size: '46 kB' }
export const EARLIER = { date: '2026-10-28' }

const en: Copy = {
  ui: {
    'settings.ai_data.skills_section_title': 'Claude skill for this company',
    'settings.ai_data.skills_section_desc': 'A custom skill that does this company\'s recurring bookkeeping task in your Claude. Always use the latest version.',
    'settings.ai_data.skills_new_version': 'New version',
    'settings.ai_data.skills_version': 'Version: {date}',
    'settings.ai_data.skills_download': 'Download',
    'settings.ai_data.skills_install_title': 'Install in claude.ai',
    'settings.ai_data.skills_install_step1': 'Settings → Capabilities: turn on “Run code in the cloud”.',
    'settings.ai_data.skills_install_step2': 'Plugins → Add → Upload plugin: choose the downloaded zip as it is, without unpacking it.',
    'settings.ai_data.skills_install_step3': 'In a new chat, upload the month’s files and ask for the task; the skill loads on its own.',
    'settings.ai_data.skills_help_link': 'Step-by-step guide in the help centre',
    'settings.ai_data.skills_earlier_versions': 'Earlier versions ({count})',
  },
  rendered: {
    version: `Version: ${LATEST.date}`,
    earlier: 'Earlier versions (1)',
  },
  skill: {
    title: 'Quillmoor sales side',
    description: 'Till closings, card settlements and delivery payouts as journal rows.',
    changeNote: 'Delivery payouts matched to commission invoices',
    earlierNote: 'First version',
  },
  help: { alt: 'The Claude skill for this company section: a card with the skill Quillmoor sales side, its version 2026-11-17, a New version badge and the Download button, then the three install steps for claude.ai, the link to this guide and a collapsed Earlier versions (1) line.' },
}

const hu: Copy = {
  ui: {
    'settings.ai_data.skills_section_title': 'Claude-skill ehhez a céghez',
    'settings.ai_data.skills_section_desc': 'Egyedi skill, amely a cég ismétlődő könyvelési feladatát a te Claude-odban végzi el. Mindig a legfrissebb verziót használd.',
    'settings.ai_data.skills_new_version': 'Új verzió',
    'settings.ai_data.skills_version': 'Verzió: {date}',
    'settings.ai_data.skills_download': 'Letöltés',
    'settings.ai_data.skills_install_title': 'Telepítés a claude.ai-ban',
    'settings.ai_data.skills_install_step1': 'Beállítások → Capabilities: kapcsold be a „Run code in the cloud” opciót.',
    'settings.ai_data.skills_install_step2': 'Plugins → Add → Upload plugin: válaszd ki a letöltött zipet, kicsomagolás nélkül.',
    'settings.ai_data.skills_install_step3': 'Új beszélgetésben töltsd fel a hónap fájljait, és kérd a feladatot; a skill magától betöltődik.',
    'settings.ai_data.skills_help_link': 'Részletes útmutató a súgóban',
    'settings.ai_data.skills_earlier_versions': 'Korábbi verziók ({count})',
  },
  rendered: {
    version: `Verzió: ${LATEST.date}`,
    earlier: 'Korábbi verziók (1)',
  },
  skill: {
    title: 'Quillmoor értékesítési oldal',
    description: 'Kasszazárások, kártyás elszámolások és kiszállítási kifizetések naplósorai.',
    changeNote: 'Kiszállítási kifizetések párosítása a jutalékszámlákkal',
    earlierNote: 'Első verzió',
  },
  help: { alt: 'A Claude-skill ehhez a céghez szakasz: egy kártya a Quillmoor értékesítési oldal skillel, a 2026-11-17-es verzióval, az Új verzió jelzéssel és a Letöltés gombbal, alatta a claude.ai-os telepítés három lépése, a hivatkozás erre az útmutatóra és az összecsukott Korábbi verziók (1) sor.' },
}

const de: Copy = {
  ui: {
    'settings.ai_data.skills_section_title': 'Claude-Skill für dieses Unternehmen',
    'settings.ai_data.skills_section_desc': 'Ein individueller Skill, der die wiederkehrende Buchhaltungsaufgabe dieses Unternehmens in Ihrem Claude erledigt. Verwenden Sie immer die neueste Version.',
    'settings.ai_data.skills_new_version': 'Neue Version',
    'settings.ai_data.skills_version': 'Version: {date}',
    'settings.ai_data.skills_download': 'Herunterladen',
    'settings.ai_data.skills_install_title': 'Installation in claude.ai',
    'settings.ai_data.skills_install_step1': 'Einstellungen → Capabilities: Aktivieren Sie „Run code in the cloud“.',
    'settings.ai_data.skills_install_step2': 'Plugins → Add → Upload plugin: Wählen Sie die heruntergeladene ZIP-Datei unverändert aus, ohne sie zu entpacken.',
    'settings.ai_data.skills_install_step3': 'Laden Sie in einem neuen Chat die Dateien des Monats hoch und bitten Sie um die Aufgabe; der Skill wird automatisch geladen.',
    'settings.ai_data.skills_help_link': 'Ausführliche Anleitung im Hilfe-Center',
    'settings.ai_data.skills_earlier_versions': 'Frühere Versionen ({count})',
  },
  rendered: {
    version: `Version: ${LATEST.date}`,
    earlier: 'Frühere Versionen (1)',
  },
  skill: {
    title: 'Quillmoor Verkaufsseite',
    description: 'Kassenabschlüsse, Kartenzahlungen und Lieferdienst-Auszahlungen als Buchungen.',
    changeNote: 'Lieferdienst-Auszahlungen mit Provisionsrechnungen abgeglichen',
    earlierNote: 'Erste Version',
  },
  help: { alt: 'Der Abschnitt Claude-Skill für dieses Unternehmen: eine Karte mit dem Skill Quillmoor Verkaufsseite, der Version 2026-11-17, dem Hinweis Neue Version und der Schaltfläche Herunterladen, darunter die drei Installationsschritte für claude.ai, der Link zu dieser Anleitung und die zugeklappte Zeile Frühere Versionen (1).' },
}

export const claudeSkillsCopy: Record<Locale, Copy> = { en, hu, de }
