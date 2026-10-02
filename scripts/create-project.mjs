// Starts a new prototype on the Modus Instrument foundation.
//   npm run new -- ../northstar-pdp                 core: tokens, themes, Manrope, Base UI components
//   npm run new -- ../claims-pov --patterns         + Insight Center patterns and illustrative sample data
// Copies files only. Then: cd <folder> && npm install && npm run dev
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const withPatterns = args.includes('--patterns');
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
['tokens', 'scripts/build-tokens.mjs', 'src/components', 'src/lib', 'src/styles/base.css', 'src/styles/index.css', 'src/styles/tokens.css', 'vite.config.ts', 'tsconfig.json', '.nvmrc', '.gitignore'].forEach(copy);
if (withPatterns) ['src/patterns', 'src/data'].forEach(copy);

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

write('index.html', `<!doctype html>
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
import '@fontsource-variable/manrope';
import './styles/index.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
`);
write('src/App.tsx', `import { Button, Card, EmptyState, Icons, Label, Logo, StatTile, ThemeToggle } from './index';

// A blank page on the foundation. Replace freely; keep colours, type and radii on tokens.
export function App() {
  return (
    <div className="min-h-screen bg-ground text-ink">
      <header className="flex items-center justify-between border-b border-hairline px-4 py-3 sm:px-8 lg:px-16">
        <span className="flex items-center gap-3 whitespace-nowrap text-[15px] font-semibold">
          <Logo className="h-[18px]" />
          <span aria-hidden="true" className="h-5 w-px bg-hairline-strong" />
          ${title}
        </span>
        <ThemeToggle />
      </header>
      <main className="mi-frame flex flex-col gap-10 py-10">
        <Card as="section" className="mi-dots grid grid-cols-1 overflow-hidden lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-6 border-b border-hairline bg-panel/80 p-6 sm:p-10 lg:border-b-0 lg:border-r">
            <Label>Fig 1.0 — Headline</Label>
            <h1 className="m-0 text-[length:var(--layout-hero)] font-normal leading-[1.03] tracking-[-0.04em]">
              Say the claim first. <span className="text-ink-3">Then the evidence.</span>
            </h1>
            <p className="m-0 mi-measure text-body-l text-ink-2">This project starts on Modus Instrument: Paper and Ink themes, Manrope, and violet as the one signal.</p>
            <div className="flex flex-wrap gap-3">
              <Button iconEnd={<Icons.ArrowRight />}>Start here</Button>
              <Button variant="secondary">Secondary action</Button>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-6 bg-panel p-6 sm:p-10">
            <StatTile size="xl" label="The one number" value="42" unit="%" />
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
Vite + React 19 + TypeScript + Tailwind v4 + Base UI (\`@base-ui/react\`) on the Modus Instrument foundation. To run it: \`npm install && npm run dev\`.

Follows Modus Experience Standards v0.1, except: the default UI foundation is Base UI + Modus Instrument tokens instead of shadcn-style components on Radix (DEC-001).

## Design system
- Modus Instrument — the brand book, tokens and live components: https://claude.ai/artifact/34AemeyKUpp1dyAc4TDoKv (read its README before designing a screen).
- \`tokens/tokens.json\` is the only place colours, type, spacing, radii, shadows and layout values are defined. \`npm run tokens\` regenerates \`src/styles/tokens.css\`; never edit that file by hand.
- Use the token utilities (\`bg-panel\`, \`text-ink-2\`, \`text-statement\`, \`rounded-panel\`, \`border-hairline\`) — never a hex value or a one-off size for something a token covers.
- Two themes: Paper (default) and Ink (dark), set by \`data-theme\` on \`<html>\`. Check both.
- Violet is the signal: one per exhibit. The primary button is \`bg-action\`, one per view.
- Pages are one composed column: wrap content in \`mi-frame\` and never run it edge to edge. Reading text and fields stop at \`mi-measure\`.
- Build interactive UI from \`src/components\` (Base UI underneath) before hand-building anything.

## Ground rules
- The decision log is append-only. When a choice changes, mark the old one SUPERSEDED — never delete it.
- Flag unknowns as [Open question] / [Assumption] — never a confident guess.
- Every view handles default, loading, empty, error, success and disabled-with-a-reason states.
- Keep these docs current: when a decision is made, log it and update the affected doc in the same pass.
- Git: files get written for you; you run one copy-paste command to save. Nobody runs git automatically.
`);
write('DECISIONS.md', `# Decision Log

Append-only. When something changes, mark the old entry SUPERSEDED (don't delete it).

## DEC-001 — Base UI + Modus Instrument tokens as the UI foundation [Experience]
**Status:** decided · **Date:** ${today}
Started from the Modus Instrument foundation instead of shadcn-style components on Radix (the Standards v0.1 default, a Starting point). Base UI gives accessible, unstyled primitives (keyboard, focus, ARIA); the look comes entirely from Modus Instrument tokens, so it doesn't read as a stock component kit. Paper and Ink themes, Manrope, violet signal. Inherited from modus-instrument DEC-001.
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

- \`npm install\` — once, downloads the building blocks
- \`npm run dev\` — opens a private preview at http://localhost:5173
- \`npm run typecheck\` — spell-check for code
- \`npm run build\` — the version Vercel deploys

Colours, type and spacing live in \`tokens/tokens.json\`. Change them there; \`npm run dev\` regenerates the styles.
`);

console.log(`Created ${dest}${withPatterns ? ' (with Insight Center patterns)' : ''}.\nNext:\n  cd "${dest}"\n  npm install\n  npm run dev`);
