#!/usr/bin/env node
// Fails when an em dash (U+2014) appears in help article copy.
//
// House style (PRD: copy-em-dash-to-hyphen): help articles use a hyphen, not an
// em dash. Scans content/**/*.mdx and ignores:
//   - fenced code blocks (``` / ~~~) and inline `code` spans
//   - a table cell whose entire content is the dash, the placeholder for
//     "not applicable" in permission and comparison tables
//
// The dash is built from its code point so this file itself stays dash-free.
// Dependency-free so it runs on the bare runner node.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), '..'));
const contentDir = path.join(root, 'content');
const EM = String.fromCharCode(0x2014);
const PLACEHOLDER_CELL = new RegExp('\\|(\\s*)' + EM + '(\\s*)(?=\\|)', 'g');

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else if (entry.name.endsWith('.mdx')) out.push(p);
  }
  return out;
}

const violations = [];
for (const file of walk(contentDir).sort()) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  let fence = null;
  lines.forEach((line, i) => {
    const m = line.match(/^\s*(```+|~~~+)/);
    if (m) {
      if (fence === null) fence = m[1][0];
      else if (m[1][0] === fence) fence = null;
      return;
    }
    if (fence !== null || !line.includes(EM)) return;
    const stripped = line.replace(/`[^`]*`/g, '').replace(PLACEHOLDER_CELL, '|$1$2');
    if (stripped.includes(EM)) {
      violations.push(`${path.relative(root, file)}:${i + 1}: ${line.trim().slice(0, 120)}`);
    }
  });
}

if (violations.length) {
  console.error(`Found ${violations.length} em dash(es) in help article copy. Use a hyphen (" - ") instead:\n`);
  for (const v of violations) console.error(`  ${v}`);
  process.exit(1);
}
console.log('check:dashes OK: no em dashes in content/**/*.mdx copy.');
