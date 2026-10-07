# CLAUDE.md — Modus Instrument

Orientation and rules for anyone (person or AI) working on this project. This overrides defaults.

## What this is
Modus Instrument is the house UI foundation for Modus prototypes: one token file, two themes (Paper and Ink), the brand fonts Season Sans and Season Serif, Modus violet as the signal, and a set of accessible components built on Base UI. It also carries the Insight Center patterns (insight and opportunity cards, value stream, service blueprint, capability matrix, ROI model, Ask palette) and a demo page. **All demo content is illustrative** — a sample commercial-claims engagement for an unnamed [Prospect].

It is the source of the Modus Instrument Design System artifact: https://claude.ai/artifact/34AemeyKUpp1dyAc4TDoKv

Code: https://github.com/mikemates/modus-instrument (backup and shared copy; the working copy is on Mike's Mac at `~/Projects/modus-instrument`).

## In one line
Every new prototype starts here and looks like Modus, not like a stock component kit.

## Stack
Vite 8 + React 19 + TypeScript + Tailwind v4 + Base UI (`@base-ui/react`) + the Season fonts (variable TTFs in `kit/brand-fonts`, loaded by `src/styles/fonts.css`, DEC-030), on Node 24 (`.nvmrc` and `engines`, DEC-027). To run it: `npm install && npm run dev`.

In `package.json`, `allowScripts` lets only esbuild and @parcel/watcher run install scripts (DEC-027), and `overrides` gives Tailwind's command line the newer file watcher until it takes 2.6 itself (DEC-028). Node and dependency updates follow SOP F in `modus-project-sop`.

Follows Modus Experience Standards v0.2, whose default foundation this is (DEC-026).

## Where things live
- `kit/brand-fonts/` — the Modus brand fonts, Season Sans and Season Serif. `tokens.json` lists the three variable files the app, the Design System and new projects use.
- `tokens/tokens.json` — the ONLY place colours, type, spacing, radii, shadows and layout values are defined, each with a usage note; colours carry a Paper and an Ink value.
- `scripts/build-tokens.mjs` — generates `src/styles/tokens.css` (the app's Tailwind theme) and `src/styles/tokens.reference.css` (for the Design System bundle). Never edit either by hand; `npm run dev` and `npm run build` regenerate them.
- `design-system/assets/Logos/` — the official Modus Create logo SVGs (wordmark, glyph; black, white). `npm run logo` copies their geometry into `src/components/logo-paths.ts` for the `Logo` component; never edit that file or redraw the logo.
- `src/components/` — the foundation: Logo, Button, LinkButton, GoLink, Label, Tag, Card, EvidenceMeter, StatTile, TextField, SegmentedTabs, Switch, Slider, ModeSwitch, ThemeToggle, AccordionList (with RowMark), Skeleton, EmptyState, ErrorState, Icons.
- `src/patterns/` — the reading patterns (TopBar, ChapterRail, SectionRail, ChapterHeader, ChapterClose, Figure) and the Insight Center patterns. `src/lib/useFitSticky.ts` keeps a sticky side panel's last line in reach on short windows.
- `src/data/sample.ts` — illustrative content. `src/demo/App.tsx` — the demo page.
- `templates/gate/` — the password entry page that `npm run new -- --gate` adds to a new project.
- `src/index.ts` — the public entry. Import from here, not from deep paths.
- `design-system/README.md` — the brand book (usage rules). `design-system/Cover.preview.html` — the Design System cover.
- `scripts/ds-spec.mjs` — the component catalogue (summary, when to use, avoid, preview) the Design System is built from.
- `kit/` — the source of the skills: everyone, Mike included, installs it as the `prototype-foundations` plugin (DEC-025, DEC-029). `kit/README.md` lists them.

## Rules for building
- Production-grade (Standards v0.2, DEC-026): strict types, tests for logic, the build as the gate, content apart from components, no hidden shortcuts. Typecheck, tests and build pass before every save.
- Tokens only. Use the token utilities (`bg-panel`, `text-ink-2`, `text-statement`, `rounded-panel`, `border-hairline`, `bg-action`) — never a hex value or a one-off size for something a token covers.
- One composed column: wrap page content in `mi-frame` (`layout-column`: 1440px on laptops, growing to 1920px on big monitors) and size the POV headline with `layout-hero` so it keeps its stack. Galleries keep fixed column counts; reading text and fields stop at `layout-measure`. Never run page content edge to edge (DEC-013).
- Every colour token has a value in Paper and Ink. Check contrast in both: text 4.5:1, large text, control edges and focus 3:1. In Paper, `ink-3` falls short on `inset` and `signal-soft`: use `ink-2` there (Label's `strong` tone).
- Type: Season Sans for everything; Season Serif only on the display steps (`text-display-xl`, `-l`, `-m`, which set it themselves) and on the POV headline, which takes `font-display` beside `layout-hero`. Never the serif below 44px (DEC-030). Tabular figures take the `tabular` utility, never Tailwind's `tabular-nums`, which leaves Season's spaces too wide.
- Type uses the token steps only (`text-body`, `text-ui-s`, `text-ui-m`, `text-ui-l`, `text-caption` and the rest). Tailwind's `text-xs`, `text-sm`, `text-base`, `text-lg` and `text-xl` and up are switched off by the theme and draw nothing; `npm run tokens` stops on them (DEC-018).
- The logo is always the `Logo` component in `color-logo` (black on Paper, white on Ink) — never recoloured, retyped or a PNG. One wordmark per page.
- Violet is the signal: one per exhibit. Filled violet (`bg-action`) means "you can act here": each main action (the bar's, the hero's, each chapter's close) and the RowMark that opens a row. Never two filled buttons side by side; second-tier links are GoLink, in ink (DEC-017).
- Restraint (book, Restraint; DEC-015): two tones on the POV headline only; a label over a heading only when it adds an ID, a status or a qualifier; FIG numbers only where the text cites them; the dot grid behind the opening panel only; one big number per view, and draw how numbers relate instead of a row of tiles; a caveat once, where it changes the reading; each chapter closes on its own question.
- Build interactive UI on Base UI parts (keyboard, focus and ARIA come with them). Style its states with its data attributes (`data-checked`, `data-active`, `data-pressed`, `data-disabled`).
- Keep components React 18-compatible — the Design System previews run React 18. Avoid React 19-only APIs (`use`, form actions, `ref` as a plain prop).
- Every view handles default, loading, empty, error, success and disabled-with-a-reason states.
- Mark illustrative numbers and AI-drafted answers as such, in place.

## Changing the system
- New or changed component: export it from `src/index.ts`, add or update its entry in `scripts/ds-spec.mjs`, run `npm run ds:build`, then ask Claude to publish `design-system-dist/project/` to the Design System artifact (index file last).
- Token change: edit `tokens/tokens.json`, run `npm run ds:build`, republish. Log anything that changes how the system looks in DECISIONS.md.
- Logo files changed: replace them in `design-system/assets/Logos/`, run `npm run logo`, then `npm run ds:build`, and re-upload the SVGs to the Design System's Logos group (they are uploaded assets there, not files).
- A rule or a way of working changed: update its skill in `kit/`, bump the plugin's version and repackage it; everyone reinstalls the new file (DEC-029).
- New prototype: `npm run new -- ../<folder>` (add `--patterns` for Insight Center work, `--gate` for a password entry page; the command prints the password).

## Ground rules
- Project memory: MEMORY.md indexes the notes in `memory/`. Read it at the start of a session; keep it current.
- The decision log is append-only. When a choice changes, mark the old one SUPERSEDED — never delete it.
- Flag unknowns as [Open question] / [Assumption] — never a confident guess.
- Keep these docs current: when a decision is made, log it and update the affected doc in the same pass.
- Git: in the Insight Center 2.0 Claude project, Claude saves to GitHub once the checks pass, then brings the Mac folder in line with it (DEC-032). Anywhere else, files get written for you and you run one copy-paste command to save (`git-workflow`).
