#!/usr/bin/env node
/**
 * Verify a Catalyst mirror against .catalyst-manifest.json.
 *
 * WHY THIS FILE IS IN THE PUBLIC REPO. It is the whole point of the design.
 * The drift check used to run in aift-help and check out the PRIVATE aift-web
 * with a fine-grained PAT (`AIFT_WEB_READ_TOKEN`) stored as a secret on this
 * public repository. GitHub's own guidance is explicit that anyone with write
 * access to a repo can read its secrets by modifying a workflow — so a
 * documentation contributor, or a compromised third-party action, was one edit
 * away from reading private production source.
 *
 * The fix is to stop needing the token at all. aift-web publishes a MANIFEST of
 * sha256 hashes into aift-help (public), and both sides verify against it:
 *
 *   aift-help CI  → hashes its own mirrored files vs the manifest. No token.
 *   aift-web  CI  → checks out aift-help (PUBLIC, no token) and hashes its own
 *                   Catalyst source vs the same manifest.
 *
 * Neither side can pass alone by tampering: editing a component in aift-help
 * and updating the manifest to match will make the aift-web side fail, because
 * the manifest then no longer describes aift-web's source. One implementation,
 * two directions, zero secrets.
 *
 * A hash manifest is safe to publish — sha256 of a file already published in
 * this repo reveals nothing new. The app-coupled names were already public in
 * the old workflow YAML.
 *
 * Usage:
 *   node scripts/verify-catalyst-manifest.mjs --root <repo-root> --side help|web
 *                                             [--manifest <path>]
 *
 * PRD: aift-ops/specs/help-ci-trust-boundary.md
 */

import { createHash } from 'node:crypto'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { resolve, join } from 'node:path'

const argv = process.argv.slice(2)
const arg = (name, fallback = null) => {
  const i = argv.indexOf(`--${name}`)
  return i !== -1 && argv[i + 1] ? argv[i + 1] : fallback
}

const root = arg('root')
const side = arg('side')

if (!root || !['help', 'web'].includes(side)) {
  console.error('usage: verify-catalyst-manifest.mjs --root <dir> --side help|web [--manifest <path>]')
  process.exit(2)
}

const CATALYST_DIR = 'src/components/catalyst'
const MANIFEST_REL = `${CATALYST_DIR}/.catalyst-manifest.json`
const manifestPath = arg('manifest', join(root, MANIFEST_REL))

if (!existsSync(manifestPath)) {
  console.error(`✗ manifest not found: ${manifestPath}`)
  console.error('  → Run aift-ops/scripts/sync-catalyst-to-help.sh and commit the result.')
  process.exit(1)
}

let manifest
try {
  manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'))
} catch (err) {
  console.error(`✗ manifest is not valid JSON: ${err.message}`)
  process.exit(1)
}

const files = manifest.files ?? {}
const appCoupled = manifest.appCoupled ?? []
const sha256 = (p) => createHash('sha256').update(readFileSync(p)).digest('hex')

const problems = []

// ── 1. every manifested file exists here and hashes identically ──────────────
for (const [rel, expected] of Object.entries(files)) {
  const abs = resolve(root, rel)
  if (!existsSync(abs)) {
    problems.push(`missing: ${rel}`)
    continue
  }
  const actual = sha256(abs)
  if (actual !== expected) {
    problems.push(`content differs: ${rel}\n      manifest ${expected.slice(0, 16)}…  actual ${actual.slice(0, 16)}…`)
  }
}

// ── 2. no unmanifested component is hiding in the Catalyst directory ─────────
// On BOTH sides. In aift-help an extra file is an unmirrored local edit; in
// aift-web it is a new component that was never synced outward — both are drift,
// they just point in opposite directions. App-coupled files are the documented
// exception: aift-web owns them and aift-help must never carry them (§3).
const catalystAbs = resolve(root, CATALYST_DIR)
if (existsSync(catalystAbs)) {
  const present = readdirSync(catalystAbs).filter((f) => /\.(ts|tsx)$/.test(f))
  for (const f of present) {
    const rel = `${CATALYST_DIR}/${f}`
    if (rel in files) continue
    if (appCoupled.includes(f)) continue
    problems.push(
      `unmanifested component: ${rel}` +
        (side === 'web'
          ? '\n      → present in aift-web but never synced to aift-help'
          : '\n      → present in aift-help but not in the manifest'),
    )
  }
}

// ── 3. aift-help must not carry the app-coupled components ───────────────────
// They import app-only modules (LanguagePicker, next-intl) and broke the help
// build when synced (aift-help PR #42). aift-web legitimately has them.
if (side === 'help') {
  for (const f of appCoupled) {
    if (existsSync(resolve(root, CATALYST_DIR, f))) {
      problems.push(`app-coupled component must not exist in aift-help: ${CATALYST_DIR}/${f}`)
    }
  }
}

const label = side === 'help' ? 'aift-help mirror' : 'aift-web source'

if (problems.length > 0) {
  console.error(`\n✗ Catalyst drift detected — ${label} does not match the manifest\n`)
  for (const p of problems) console.error(`    ${p}`)
  console.error(
    '\n  Fix:\n' +
      '    1. cd into your local AIFT-app workspace\n' +
      '    2. ./aift-ops/scripts/sync-catalyst-to-help.sh\n' +
      '    3. Commit the result in aift-help (components AND .catalyst-manifest.json)\n',
  )
  process.exit(1)
}

console.log(
  `✓ ${label} matches the manifest — ${Object.keys(files).length} file(s), ` +
    `${appCoupled.length} app-coupled excluded`,
)
