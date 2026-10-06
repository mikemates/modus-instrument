// Starts a new prototype on the Modus Instrument foundation.
//   npm run new -- ../northstar-pdp                 core: tokens, themes, Manrope, Base UI components
//   npm run new -- ../claims-pov --patterns         + Insight Center patterns and illustrative sample data
//   npm run new -- ../client-preview --gate         + a password entry page: the build encrypts the site, so a shared
//                                                     link shows nothing without the password, on any host
// Copies files only. Then: cd <folder> && npm install && npm run dev
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { randomBytes, randomInt } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const withPatterns = args.includes('--patterns');
const withGate = args.includes('--gate');
const target = args.find((a) => !a.startsWith('--'));
if (!target) {
  console.error('Tell me where to put it, e.g.  npm run new -- ../my-prototype');
  process.exit(1);
}
const dest = resolve(process.cwd(), target);
if (existsSync(dest) && readdirSync(dest).length) {
  console.error(`${dest} already has files in it. Pick an empty or new folder — nothing was copied.`);
  process.exit(1);
}
const slug = basename(dest).toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '') || 'prototype';
const title = slug.split('-').map((w) => w[0]?.toUpperCase() + w.slice(1)).join(' ');
const today = new Date().toISOString().slice(0, 10);
const src = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));

const copy = (p) => cpSync(join(root, p), join(dest, p), { recursive: true });
const write = (p, s) => { mkdirSync(dirname(join(dest, p)), { recursive: true }); writeFileSync(join(dest, p), s); };

mkdirSync(dest, { recursive: true });
['tokens', 'scripts/build-tokens.mjs', 'src/components', 'src/lib', 'src/styles/base.css', 'src/styles/index.css', 'src/styles/tokens.css', 'vite.config.ts', 'tsconfig.json', '.nvmrc'].forEach(copy);
if (withPatterns) ['src/patterns', 'src/data'].forEach(copy);

// A project's own .gitignore (the foundation's lists files only the foundation makes). Same list as the git-workflow skill.
write('.gitignore', `# Auto-downloaded building blocks and built output — no need to back these up
node_modules/
dist/
.vite/
*.tsbuildinfo

# Mac clutter
.DS_Store

# Secrets stay on your computer (keep an example file with blank values)
.env
.env.*
!.env.example

# Renders and files the Claude desktop app saves while you work — they stay on your computer
Claude outputs/

# Borrowed or unlicensed images — keep these local only
public/_incoming/
`);

// The password gate (--gate): the entry page, the build step that encrypts the site, and a fresh password and salt.
const fill = (text) => text.replaceAll('__TITLE__', title);
let password = '';
if (withGate) {
  const letters = 'abcdefghjkmnpqrstuvwxyz23456789';
  password = Array.from({ length: 3 }, () => Array.from({ length: 4 }, () => letters[randomInt(letters.length)]).join('')).join('-');
  const gateFile = (from, to = from) => write(to, fill(readFileSync(join(root, 'templates/gate', from), 'utf8')));
  write('gate.config.mjs', readFileSync(join(root, 'templates/gate/gate.config.mjs'), 'utf8')
    .replace('__PASSWORD__', password).replace('__SALT__', randomBytes(16).toString('base64')));
  ['scripts/gate-plugin.mjs', 'src/gate/main.ts', 'src/gate/crypto.ts', 'src/gate/view.ts', 'src/gate/copy.ts'].forEach((f) => gateFile(f));
  // Its own copy of the logo artwork: the entry page can't share modules with the encrypted site.
  write('src/gate/logo-paths.ts', readFileSync(join(root, 'src/components/logo-paths.ts'), 'utf8'));
  write('vite.config.ts', readFileSync(join(root, 'vite.config.ts'), 'utf8')
    .replace("import tailwindcss from '@tailwindcss/vite';", "import tailwindcss from '@tailwindcss/vite';\nimport { gatePlugin } from './scripts/gate-plugin.mjs';")
    .replace('plugins: [react(), tailwindcss()],', '// The password gate encrypts the site at build time and checks the password in dev (gate.config.mjs).\n  plugins: [react(), tailwindcss(), gatePlugin()],'));
}

// Public entry: the same exports as the foundation, minus what wasn't copied
const entry = readFileSync(join(root, 'src/index.ts'), 'utf8').split('\n')
  .filter((l) => withPatterns || !/\.\/(patterns|data)\//.test(l)).join('\n');
write('src/index.ts', entry);

const pick = (o, keys) => Object.fromEntries(keys.map((k) => [k, o[k]]));
write('package.json', JSON.stringify({
  name: slug, private: true, version: '0.1.0', type: 'module',
  engines: src.engines,
  scripts: { tokens: 'node scripts/build-tokens.mjs', dev: 'npm run tokens && vite', build: 'npm run tokens && vite build', preview: 'vite preview', typecheck: 'tsc --noEmit' },
  dependencies: pick(src.dependencies, ['@base-ui/react', '@fontsource-variable/manrope', 'clsx', 'react', 'react-dom']),
  devDependencies: pick(src.devDependencies, ['@tailwindcss/vite', '@types/react', '@types/react-dom', '@vitejs/plugin-react', 'tailwindcss', 'typescript', 'vite']),
}, null, 2) + '\n');

write('index.html', withGate ? `<!doctype html>
<html lang="en" data-theme="paper">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="robots" content="noindex, nofollow" />
    <meta name="description" content="A private preview by Modus Create. Password required." />
  </head>
  <body>
    <!-- The entry page asks for the password, then opens the encrypted site into #root (gate.config.mjs). -->
    <div id="gate"></div>
    <div id="root"></div>
    <script type="application/json" id="gate-config">{}</script>
    <script type="module" src="/src/gate/main.ts"></script>
    <noscript>This site needs JavaScript to open.</noscript>
  </body>
</html>
` : `<!doctype html>
<html lang="en" data-theme="paper">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`);
write('src/main.tsx', `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
${withGate ? '// Styles and fonts load in the entry page (src/gate/main.ts), which runs first.' : "import '@fontsource-variable/manrope';\nimport './styles/index.css';"}
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
`);
write('src/App.tsx', `import { Button, Card, EmptyState, Icons, Logo, ThemeToggle } from './index';

// A blank page on the foundation. Replace freely; keep colours, type and radii on tokens.
export function App() {
  return (
    <div className="min-h-screen bg-ground text-ink">
      <header className="flex items-center justify-between border-b border-hairline px-4 py-3 sm:px-8 lg:px-16">
        <span className="flex items-center gap-3 whitespace-nowrap text-ui-m font-semibold">
          <Logo className="h-[18px]" />
          <span aria-hidden="true" className="h-5 w-px bg-hairline-strong" />
          ${title}
        </span>
        <ThemeToggle />
      </header>
      <main className="mi-frame flex flex-col gap-10 py-10">
        <Card as="section" className="mi-dots flex flex-col gap-6 p-6 sm:p-10">
          <h1 className="m-0 max-w-[16ch] text-[length:var(--layout-hero)] font-normal leading-[1.03] tracking-[-0.04em]">
            Say the claim first. <span className="text-ink-3">Then the evidence.</span>
          </h1>
          <p className="m-0 mi-measure text-body-l text-ink-2">This project starts on Modus Instrument: Paper and Ink themes, Manrope, and violet as the one signal.</p>
          <div className="flex flex-wrap gap-3">
            <Button iconEnd={<Icons.ArrowRight />}>Start here</Button>
            <Button variant="secondary">Secondary action</Button>
          </div>
        </Card>
        <EmptyState title="Nothing here yet." description="Add the first screen. Every view needs its loading, empty and error states too." />
      </main>
    </div>
  );
}
`);

write('CLAUDE.md', `# CLAUDE.md — ${title}

Orientation and rules for anyone (person or AI) working on this project. This overrides defaults.

## What this is
[Open question] One paragraph: the idea and who it's for. If it uses made-up data, say so plainly.

## In one line
[Open question] The core goal — what "working" looks like.

## Stack
Vite + React 19 + TypeScript + Tailwind v4 + Base UI (\`@base-ui/react\`) on the Modus Instrument foundation. To run it: \`npm install && npm run dev\`.${withGate ? `

The site sits behind a password (\`gate.config.mjs\`): the build encrypts it, and the entry page (\`src/gate/\`) opens it. Never import the site's modules from \`src/gate/\`. Anyone who can open the repository can read the password, so keep it private.` : ''}

Follows Modus Experience Standards v0.2.

## Design system
- Modus Instrument — the brand book, tokens and live components: https://claude.ai/artifact/34AemeyKUpp1dyAc4TDoKv (read its README before designing a screen).
- \`tokens/tokens.json\` is the only place colours, type, spacing, radii, shadows and layout values are defined. \`npm run tokens\` regenerates \`src/styles/tokens.css\`; never edit that file by hand.
- Use the token utilities (\`bg-panel\`, \`text-ink-2\`, \`text-statement\`, \`rounded-panel\`, \`border-hairline\`) — never a hex value or a one-off size for something a token covers.
- Two themes: Paper (default) and Ink (dark), set by \`data-theme\` on \`<html>\`. Check both.
- Type: the book's scale only — \`text-caption\` 12px, \`text-ui-s\` 13px, \`text-body\` 14px, \`text-ui-m\` 15px, \`text-body-l\` 16px, \`text-ui-l\` 17px, then statement, title and display. Tailwind's \`text-xs\`/\`sm\`/\`base\`/\`lg\` do nothing here, and the build stops on them.
- Violet: filled violet means "you can act here" — every main action is a \`bg-action\` button (LinkButton when it goes somewhere), and accordion rows carry the violet mark; second-tier links (GoLink) stay in ink. Violet text, lines and rings mark the one thing to look at in an exhibit.
- Voice: on pages that argue (insight, strategy, a point of view), headlines make a claim; in tools and forms, headings name the task and labels name things.
- Restraint, so it doesn't read as generated: on pages that argue, a section opens on its claim, with no eyebrow repeating the nav; two tones only on the point-of-view headline; one number per view, and draw how numbers relate rather than tiling them; a FIG number only when the text refers to it; the dot grid behind the opening panel only; a caveat once, where it changes the reading; a chapter ends on its own question.
- Pages are one composed column: wrap content in \`mi-frame\` and never run it edge to edge. Reading text and fields stop at \`mi-measure\`.
- Build interactive UI from \`src/components\` (Base UI underneath) before hand-building anything.

## Ground rules
- Production-grade (Modus Experience Standards v0.2): build as if this could move into production with little effort. Strict types, tests for any logic, the build as the gate, content apart from components, shortcuts visible and logged. The typecheck (and the tests, once there's logic) pass before every save.
- The decision log is append-only. When a choice changes, mark the old one SUPERSEDED — never delete it.
- Flag unknowns as [Open question] / [Assumption] — never a confident guess.
- Every view handles default, loading, empty, error, success and disabled-with-a-reason states.
- Keep these docs current: when a decision is made, log it and update the affected doc in the same pass.
- Git: files get written for you; you run one copy-paste command to save. Nobody runs git automatically.
`);
write('DECISIONS.md', `# Decision Log

Append-only. When something changes, mark the old entry SUPERSEDED (don't delete it).

## DEC-001 — Modus Instrument as the UI foundation [Experience]
**Status:** decided · **Date:** ${today}
The default foundation in Modus Experience Standards v0.2: Base UI primitives (keyboard, focus, ARIA), with the look entirely from Modus Instrument tokens, so it doesn't read as a stock component kit. Paper and Ink themes, Manrope, violet signal. Built to the Standards' engineering bar, so it could move into production with little effort.
[Open question] Record the answers to the foundation questions here: whose brand, the client's design system, where the code goes next, anything Instrument lacks, how long it lives.
`);
write('MEMORY.md', `# Memory Index

- [Design system](memory/design-system.md) — where this project's look comes from
- [Decision log](DECISIONS.md) — settled choices; read before proposing a change
`);
write('memory/design-system.md', `---
name: design-system
description: Where this project's look comes from and where to change it; read before designing a screen.
metadata:
  type: reference
---

This project starts on Modus Instrument (copied ${today} from ~/Projects/modus-instrument). Brand book, tokens, components and logos: https://claude.ai/artifact/34AemeyKUpp1dyAc4TDoKv
**Why it matters:** the look is shared across Modus work, so it is changed at the source, not per project.
**What to do about it:** read the Design System README before designing a screen. A change this project needs is logged in DECISIONS.md as an [Experience] decision.
`);
write('README.md', `# ${title}

Built on Modus Instrument.

- Needs the Node version in \`.nvmrc\`.
- \`npm install\` — once, downloads the building blocks
- \`npm run dev\` — opens a private preview at http://localhost:5173
- \`npm run typecheck\` — spell-check for code
- \`npm run build\` — the version Vercel deploys

Colours, type and spacing live in \`tokens/tokens.json\`. Change them there; \`npm run dev\` regenerates the styles.
${withGate ? '\nThe site sits behind a password, set in \`gate.config.mjs\` (or \`SITE_PASSWORD\` where it is built). Change it there, rebuild, and send the new one; keep the repository private.\n' : ''}`);

const extras = [withPatterns && 'Insight Center patterns', withGate && 'a password gate'].filter(Boolean).join(' and ');
console.log(`Created ${dest}${extras ? ` (with ${extras})` : ''}.`);
if (withGate) console.log(`The password is ${password}. Change it in gate.config.mjs; keep the repository private.`);
console.log(`Next:\n  cd "${dest}"\n  npm install\n  npm run dev`);
