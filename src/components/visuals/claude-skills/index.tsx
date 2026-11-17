// The "Claude skill for this company" section of Settings → AI & data, for
// the claude-skills article.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-11-17), class for class:
//   SettingsSection        src/components/settings/SettingsSection.tsx
//   WorkspaceSkillsSection src/components/workspace/WorkspaceSkillsSection.tsx
// The section only exists on a workspace with a published skill, and only for
// the accounting firm's side, so most readers can never open it to look: the
// figure is how they recognise it. One skill, its newest version not yet
// downloaded (so "New version" shows), one earlier version under the
// collapsed "Earlier versions" line. Labels come from ./copy.ts; the skill is
// fictional.

import type { Locale } from '@/lib/i18n'
import { Badge } from '@/components/catalyst/badge'
import { Button } from '@/components/catalyst/button'
import { Text } from '@/components/catalyst/text'
import { AppScreen, Figure } from '../kit'
import { LATEST, claudeSkillsCopy } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

const SCREEN_MIN_WIDTH = 720

export function ClaudeSkillsSectionFigure({ locale, children }: FigureProps) {
  const c = claudeSkillsCopy[locale]
  const ui = c.ui
  return (
    <Figure
      alt={c.help.alt}
      wide
      zoomable={locale}
      zoomWidth={SCREEN_MIN_WIDTH}
      art={
        <AppScreen minWidth={SCREEN_MIN_WIDTH}>
          {/* The page's content column is the crop; the section is the first one on the page. */}
          <div className="bg-white p-6">
            <section className="mt-10 first:mt-0">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-base/7 font-semibold text-zinc-950 dark:text-white">
                  {ui['settings.ai_data.skills_section_title']}
                </h2>
              </div>
              <Text className="mt-1">{ui['settings.ai_data.skills_section_desc']}</Text>
              <div className="mt-4">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="rounded-lg border border-zinc-950/10 p-4 dark:border-white/10">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0 space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm/6 font-semibold text-zinc-950 dark:text-white">{c.skill.title}</span>
                            <Badge color="blue">{ui['settings.ai_data.skills_new_version']}</Badge>
                          </div>
                          <p className="text-sm/6 text-zinc-600 dark:text-zinc-400">{c.skill.description}</p>
                          <p className="text-xs/5 text-zinc-500 dark:text-zinc-400">
                            {c.rendered.version} · {LATEST.size} · {c.skill.changeNote}
                          </p>
                        </div>
                        <Button type="button">{ui['settings.ai_data.skills_download']}</Button>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm/6 text-zinc-700 dark:text-zinc-300">
                      <p className="font-medium">{ui['settings.ai_data.skills_install_title']}</p>
                      <ol className="list-decimal space-y-1 pl-5">
                        <li>{ui['settings.ai_data.skills_install_step1']}</li>
                        <li>{ui['settings.ai_data.skills_install_step2']}</li>
                        <li>{ui['settings.ai_data.skills_install_step3']}</li>
                      </ol>
                      <p>
                        <a
                          href="#"
                          className="underline decoration-zinc-950/30 hover:decoration-zinc-950 dark:decoration-white/30 dark:hover:decoration-white"
                        >
                          {ui['settings.ai_data.skills_help_link']}
                        </a>
                      </p>
                    </div>

                    {/* Collapsed, as the page first shows it. */}
                    <details className="text-sm/6">
                      <summary className="cursor-pointer text-zinc-700 dark:text-zinc-300">{c.rendered.earlier}</summary>
                    </details>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}
