# CLAUDE.md — Modus Instrument

Orientation and rules for anyone (person or AI) working on this project. This overrides defaults.

## What this is
Modus Instrument is the house UI foundation for Modus prototypes: one token file, two themes (Paper and Ink), Manrope, Modus violet as the signal, and a set of accessible components built on Base UI. It also carries the Insight Center patterns (insight and opportunity cards, value stream, service blueprint, capability matrix, ROI model, Ask palette) and a demo page. **All demo content is illustrative** — a sample commercial-claims engagement for an unnamed [Prospect].

It is the source of the Modus Instrument Design System artifact: https://claude.ai/artifact/34AemeyKUpp1dyAc4TDoKv

Code: https://github.com/mikemates/modus-instrument (backup and shared copy; the working copy is on Mike's Mac at `~/Projects/modus-instrument`).

## In one line
Every new prototype starts here and looks like Modus, not like a stock component kit.

## Stack
Vite 8 + React 19 + TypeScript + Tailwind v4 + Base UI (`@base-ui/react`) + Manrope (`@fontsource-variable/manrope`). To run it: `npm install && npm run dev`.

Follows Modus Experience Standards v0.1, except: the default UI foundation is Base UI + Modus Instrument tokens instead of shadcn-style components on Radix (DEC-001).

## Where things live
- `tokens/tokens.json` — the ONLY place colours, type, spacing, radii and shadows are defined, each with a usage note and a value per theme.
- `scripts/build-tokens.mjs` — generates `src/styles/tokens.css` (the app's Tailwind theme) and `src/styles/tokens.reference.css` (for the Design System bundle). Never edit either by hand; `npm run dev` and `npm run build` regenerate them.
- `design-system/assets/Logos/` — the official Modus Create logo SVGs (wordmark, glyph; black, white). `npm run logo` copies their geometry into `src/components/logo-paths.ts` for the `Logo` component; never edit that file or redraw the logo.
- `src/components/` — the foundation: Logo, Button, Label, Tag, Card, EvidenceMeter, StatTile, TextField, SegmentedTabs, Switch, Slider, ThemeToggle, Skeleton, EmptyState, ErrorState, Icons.
- `src/patterns/` — Insight Center patterns. `src/data/sample.ts` — illustrative content. `src/demo/App.tsx` — the demo page.
- `src/index.ts` — the public entry. Import from here, not from deep paths.
- `design-system/README.md` — the brand book (usage rules). `design-system/Cover.preview.html` — the Design System cover.
- `scripts/ds-spec.mjs` — the component catalogue (summary, when to use, avoid, preview) the Design System is built from.

## Rules for building
- Tokens only. Use the token utilities (`bg-panel`, `text-ink-2`, `text-statement`, `rounded-panel`, `border-hairline`, `bg-action`) — never a hex value or a one-off size for something a token covers.
- Every colour token has a value in Paper and Ink. Check contrast in both: text 4.5:1, large text, control edges and focus 3:1.
- The logo is always the `Logo` component in `color-logo` (black on Paper, white on Ink) — never recoloured, retyped or a PNG. One wordmark per page.
- Violet is the signal: one per exhibit. The primary button (`bg-action`) appears once per view.
- Build interactive UI on Base UI parts (keyboard, focus and ARIA come with them). Style its states with its data attributes (`data-checked`, `data-active`, `data-pressed`, `data-disabled`).
- Keep components React 18-compatible — the Design System previews run React 18. Avoid React 19-only APIs (`use`, form actions, `ref` as a plain prop).
- Every view handles default, loading, empty, error, success and disabled-with-a-reason states.
- Mark illustrative numbers and AI-drafted answers as such, in place.

## Changing the system
- New or changed component: export it from `src/index.ts`, add or update its entry in `scripts/ds-spec.mjs`, run `npm run ds:build`, then ask Claude to publish `design-system-dist/project/` to the Design System artifact (index file last).
- Token change: edit `tokens/tokens.json`, run `npm run ds:build`, republish. Log anything that changes how the system looks in DECISIONS.md.
- Logo files changed: replace them in `design-system/assets/Logos/`, run `npm run logo`, then `npm run ds:build`, and re-upload the SVGs to the Design System's Logos group (they are uploaded assets there, not files).
- New prototype: `npm run new -- ../<folder>` (add `--patterns` for Insight Center work).

## Ground rules
- Project memory: MEMORY.md indexes the notes in `memory/`. Read it at the start of a session; keep it current.
- The decision log is append-only. When a choice changes, mark the old one SUPERSEDED — never delete it.
- Flag unknowns as [Open question] / [Assumption] — never a confident guess.
- Keep these docs current: when a decision is made, log it and update the affected doc in the same pass.
- Git: files get written for you; you run one copy-paste command to save. Nobody runs git automatically.
