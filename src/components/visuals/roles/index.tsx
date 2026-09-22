// An app screen and a diagram for the roles-and-permissions article.
//
// The screen is rebuilt 1:1 from aift-web (origin/main, 2026-09-22), class for
// class, with the real Catalyst components from the help mirror:
//   the column    src/app/(app)/workspaces/[workspaceId]/settings/layout.tsx (max-w-3xl)
//   Team layout   settings/team/layout.tsx + src/components/settings/SettingsPageHeader.tsx
//                 + settings/team/_components/WorkspaceTeamTabs.tsx (all five
//                 tabs, as an accountant admin sees them)
//   Roles tab     settings/team/roles/page.tsx + roles/_components/RolesTable.tsx
// When one of those files changes, re-copy the markup here. Data comes from
// ./copy.ts and is fictional.

import clsx from 'clsx'
import type { Locale } from '@/lib/i18n'
import { Badge } from '@/components/catalyst/badge'
import { Button } from '@/components/catalyst/button'
import { Divider } from '@/components/catalyst/divider'
import { Heading } from '@/components/catalyst/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/catalyst/table'
import { Text } from '@/components/catalyst/text'
import { AppScreen, Figure, Pin } from '../kit'
import { StepList } from '../StepList'
import { roleRows, rolesCopy } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

const TEAM_TABS = [
  'members_heading',
  'invite_heading',
  'pending_requests_heading',
  'pending_invitations_heading',
  'roles_heading',
] as const
const ACTIVE_TAB = 'roles_heading'

function RolesTab({ locale }: { locale: Locale }) {
  const c = rolesCopy[locale]
  const ui = c.ui
  const r = (k: string) => ui[`settings.team.roles.${k}` as keyof typeof ui]
  const systemLabel = (key: string) => ui[`settings.team.role_${key}` as keyof typeof ui]
  return (
    <div className="mx-auto max-w-3xl">
      {/* SettingsPageHeader */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {ui['nav.workspace.settings']}
        </p>
        <Heading className="mt-1">{ui['settings.team.title']}</Heading>
        <Text className="mt-2">{ui['settings.team.description']}</Text>
        <Divider className="my-8" />
      </div>

      {/* WorkspaceTeamTabs */}
      <nav className="-mb-px flex flex-wrap gap-x-6 gap-y-1 border-b border-zinc-200 dark:border-zinc-700">
        {TEAM_TABS.map((tab) => (
          <a
            key={tab}
            aria-current={tab === ACTIVE_TAB ? 'page' : undefined}
            className={clsx(
              'whitespace-nowrap border-b-2 px-1 pb-3 text-sm font-medium transition-colors',
              tab === ACTIVE_TAB
                ? 'border-blue-600 text-zinc-950 dark:border-blue-500 dark:text-white'
                : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200',
            )}
          >
            {ui[`settings.team.${tab}`]}
          </a>
        ))}
        <Pin n={1} at="right" cancel="-ml-6" />
      </nav>

      <div className="mt-8">
        {/* roles/page.tsx */}
        <Text>{r('description')}</Text>
        <Text className="mt-2">{r('unconverted_note')}</Text>
        <div className="mt-4">
          {/* RolesTable */}
          <div className="flex justify-end">
            <Pin n={4} at="left" cancel="" />
            <Button type="button">{r('add_role')}</Button>
          </div>

          <Table className="mt-4">
            <TableHead>
              <TableRow>
                <TableHeader>{r('col_role')}</TableHeader>
                <TableHeader>{r('col_side')}</TableHeader>
                <TableHeader>{r('col_based_on')}</TableHeader>
                <TableHeader className="text-right">{r('col_members')}</TableHeader>
                <TableHeader className="text-right">
                  <span className="sr-only">{r('col_actions')}</span>
                </TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {roleRows(c.customRole).map((role, i) => (
                <TableRow key={role.system ? role.key : role.name}>
                  <TableCell>
                    <div className="font-medium text-zinc-950 dark:text-white">
                      {role.system ? systemLabel(role.key) : role.name}
                      {i === 0 ? <Pin n={2} at="right" cancel="" /> : null}
                      {!role.system ? <Pin n={3} at="right" cancel="" /> : null}
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      {role.system ? r('system_role') : r('custom_role')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge color="zinc">{ui[`permissions.side.${role.side}`]}</Badge>
                  </TableCell>
                  <TableCell className="text-zinc-500 dark:text-zinc-400">
                    {role.system ? r('based_on_system') : systemLabel(role.base)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{role.members}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button plain type="button">
                        {r('view')}
                      </Button>
                      {role.system ? (
                        <Button plain type="button">
                          {r('duplicate')}
                        </Button>
                      ) : (
                        <>
                          <Button plain type="button">
                            {r('edit')}
                          </Button>
                          <Button plain type="button">
                            {r('archive')}
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export function RolesTabFigure({ locale, children }: FigureProps) {
  return (
    <Figure
      alt={rolesCopy[locale].help.alt.roles}
      bleed
      wide
      zoomable={locale}
      art={
        <AppScreen>
          {/* The settings column (settings/layout.tsx: max-w-3xl, no padding of
              its own): cut 32px above and below, 16px at the sides. */}
          <div className="px-4 py-8">
            <RolesTab locale={locale} />
          </div>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}

// ── How access is decided (a diagram, not an app screen) ────────────────────

export function AccessDecisionFigure({ locale, children }: FigureProps) {
  const c = rolesCopy[locale]
  const ui = c.ui
  const d = c.help.decision
  return (
    <Figure
      alt={c.help.alt.decision}
      art={
        <StepList
          steps={[
            { title: d.member, detail: d.memberDetail },
            { title: d.rule, detail: d.ruleDetail, outcomes: [{ kind: 'text', label: ui['permissions.source.rule'] }] },
            { title: d.side, detail: d.sideDetail, outcomes: [{ kind: 'text', label: ui['permissions.source.side_blocked'] }] },
            {
              title: d.exception,
              detail: d.exceptionDetail,
              outcomes: [
                { kind: 'text', label: ui['permissions.source.exception_grant'] },
                { kind: 'text', label: ui['permissions.source.exception_deny'] },
              ],
            },
            { title: d.role, detail: d.roleDetail, outcomes: [{ kind: 'text', label: ui['permissions.source.role'] }] },
          ]}
          footnote={{ text: d.footnote }}
        />
      }
    >
      {children}
    </Figure>
  )
}
