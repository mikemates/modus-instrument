# Decision Log

Append-only. When something changes, mark the old entry SUPERSEDED (don't delete it).

## DEC-001 — Base UI + our own tokens as the default UI foundation [Experience]
**Status:** decided (now the default in Modus Experience Standards v0.2, DEC-026) · **Date:** 2026-10-01
Replaces the Standards v0.1 default of shadcn-style components on Radix (a Starting point, so this is a logged deviation, not a breach). shadcn and HeroUI had started to feel fiddly and recognisably AI-generated. Base UI (`@base-ui/react`, from the Radix, Floating UI and MUI team) gives unstyled, accessible primitives — keyboard, focus management, ARIA — with no visual opinion, so 100% of the look comes from Modus Instrument tokens. Trade-off: no copy-paste styled kit; we maintain the styled layer ourselves (15 foundation components so far). Proposed for the next version of the Standards.

## DEC-002 — Visual direction: "Instrument on paper" [Brand]
**Status:** decided (FIG labels and the dot grid now go only where they mark something, DEC-015) · **Date:** 2026-10-01
Direction A's dense, shared-border panels, annotated exhibits (FIG labels) and dot grid, set in Direction B's warm paper palette, type and colour treatment. Chosen by Mike from four directions on the Look & Feel canvas.

## DEC-003 — Manrope is the only typeface [Brand]
**Status:** decided · **Date:** 2026-10-01
Manrope (variable, 200–800, OFL) for display, body and labels. Body copy is sans, not serif. Uppercase tracked labels replace a monospace for annotations.

## DEC-004 — Modus violet roles [Brand]
**Status:** decided (primary-action role superseded) · **Date:** 2026-10-01
Violet 500 `#8135F9` is the signal (the one thing to look at, one per exhibit); violet 900 `#26035D` fills the primary action in Paper; violet 700 `#4D05C1` is violet text. Replaces the cobalt accent of Direction B. [Assumption] The ramp was sampled from the brand colour bar image — confirm exact hexes against the Modus brand guidelines.
Primary-action role replaced by DEC-014 because violet 900 read close to black on Paper; the button is violet 500 in both themes.

## DEC-005 — Two themes: Paper (default) and Ink [Experience]
**Status:** decided · **Date:** 2026-10-01
Paper is the light default; Ink is a dark theme for big screens and workshop rooms. Set with `data-theme` on `<html>`. Every colour token carries both values and every text pair is checked in both. In Ink the primary action is violet 500 with white text, hover `#6A24E0`.

## DEC-006 — One source of truth for tokens [Engineering]
**Status:** decided · **Date:** 2026-10-01
`tokens/tokens.json` generates the app's Tailwind theme and the Design System artifact's tokens. The Design System artifact is rebuilt from this repo (`npm run ds:build`), never edited separately, so the two can't drift.

## DEC-007 — The official Modus Create logo [Brand]
**Status:** decided · **Date:** 2026-10-02
Mike supplied the official SVGs (wordmark and glyph, black and white) in `design-system/assets/Logos/`. The `Logo` component draws that exact artwork (copied by `npm run logo`, never redrawn) in a new `color-logo` token — #000000 on Paper, #FFFFFF on Ink — so one component follows the theme. The TopBar lockup is now Modus Create wordmark · divider · product name, with the glyph alone on phones; the placeholder lens mark is retired from the bar. [Open question] Clear space and minimum size, to confirm against the brand guidelines. [Open question] Whether the Insight Center is a sub-brand still stands; the lockup treats it as a Modus Create product for now.

## DEC-008 — Modus Instrument is the default for all Modus work [Experience]
**Status:** decided (the team's skills follow it now, DEC-025) · **Date:** 2026-10-01 (logged 2026-10-02)
Mike asked for a default standard beyond the Insight Center. Every new Modus prototype, page or artifact starts on Modus Instrument: code projects through `npm run new -- ../<folder>` (`--patterns` for insight work), and Claude follows the `modus-ui-foundation` skill instead of init-prototype's shadcn/Radix default. The team plugin's own skills are unchanged for now.

## DEC-009 — The working copy lives on Mike's Mac [Engineering]
**Status:** decided · **Date:** 2026-10-01 (logged 2026-10-02)
Mike chose a folder on his Mac: `~/Projects/modus-instrument` is the working copy, and new projects go beside it in `~/Projects/`. Copies built in a Claude cloud session are scratch; the Mac copy wins when they differ.

## DEC-010 — One documented contrast exception: ink-3 on inset [Accessibility]
**Status:** decided (a second exception, ink-3 on signal-soft, added by DEC-019) · **Date:** 2026-10-01 (logged 2026-10-02)
In Paper, `color-ink-3` on `color-inset` measures 4.26:1, below the 4.5:1 text floor. No component puts text on inset, so the palette stays as it is and the rule lives in the token's usage note and the brand book: text on inset is `color-ink` or `color-ink-2` only. Every other text pair passes in both themes.

## DEC-011 — Backed up to GitHub [Engineering]
**Status:** decided · **Date:** 2026-10-02
Mike set up https://github.com/mikemates/modus-instrument as the backup and the place other projects pull from. The Mac copy stays the working copy (DEC-009); each save is pushed there. `package-lock.json` is committed on purpose so every machine and Vercel install the same versions.

## DEC-012 — Pages use the full width of the window [Experience]
**Status:** superseded by DEC-013 · **Date:** 2026-10-02
Mike likes how the reference sites use the whole browser. Replaces the 1440px content cap the first build used (never logged). Content now runs edge to edge inside fluid margins (`layout-gutter`: 16px on phones, a fixed 96px from 2400px wide) up to `layout-frame` (2400px); only panoramic displays reach the cap, where the page centres. Reading text and form fields keep `layout-measure` (620px); card galleries add columns (`mi-tiles`, cards at least `layout-tile`); exhibits take the extra room; the POV headline scales up to display-xl. The values are tokens (a new `layout` family), so the margins or the cap change in one place. Checked at 390, 1440, 1920, 2560 and 3440px in Paper and Ink, with no sideways scrolling.
Replaced by DEC-013 because it lost the composition's intentionality and flow (DEC-013 has the diagnosis).

## DEC-013 — One composed column that grows on big monitors [Experience]
**Status:** decided · **Date:** 2026-10-02
Replaces DEC-012. On seeing full width, Mike said it "lost some of its intentionality and flow". Diagnosis, from renders at 1710, 1920 and 2560px: (1) the POV headline lost its three-line stack and read as two sentences; (2) cards went from index cards (~315px) to wide strips (~670px), flattening the page's vertical rhythm; (3) proportions drifted with the window because some parts stayed fixed (text, rail, fields) while others stretched (cards, exhibits); (4) a bug stretched the search field to 620px. Mike chose, from three rendered options, to keep the original composition and let it grow: `layout-column` is 1440px on laptops and, from 1680px-wide windows, grows with 120px margins up to 1920px; `layout-hero` grows with it (64px → 85px) so the headline keeps its stack; galleries are back to fixed columns (3 on desktop); the TopBar is back to a full-bleed bar. Kept from DEC-012: reading text and form fields stop at `layout-measure` (620px); the inline Ask palette at 720px. Fixed: a field's own width class now wins over the measure. Checked at 390, 1280, 1440, 1470, 1710, 1920, 2560 and 3440px in Paper and Ink: laptops identical to the original, headline three lines at every desktop width, no sideways scroll, and the build matches the chosen render at 2560px.

## DEC-014 — The primary button is bright violet in Paper too [Brand]
**Status:** decided · **Date:** 2026-10-02
Mike asked for Paper's primary button colour to be as bright as Ink's. The variable was one token: Paper's `color-action` was violet 900 (#26035D), which reads close to black on warm paper, so the brand violet only appeared in small marks. `color-action` is now violet 500 (#8135F9) in both themes, and `color-action-hover` is #6A24E0 in both (one step darker). Checked: white text 5.5:1 on the button and 7.1:1 on hover; the focus ring keeps its 3px gap and 4.8:1 against the paper; rendered the hero, states and kit in Paper beside Ink at 1440px. Knock-on: the Design System cover used `color-action` for its dark slab, which would have matched the violet block beside it, so the slab now uses `color-violet-900` directly.

## DEC-015 — Restraint: each house device marks something [Brand] [Content]
**Status:** decided · **Date:** 2026-10-05
Mike asked to check the system against its first real use, a client hub built on it, and to fold what the hub learned back in (SOP D). The hub had just been scrubbed for signs of an AI-made prototype: devices applied by default, whatever the content. Several came from this system's own habits: the book asked for eyebrows, two-tone headlines and FIG labels throughout. Mike took the rules forward, then stepped through how the demo, the starter and the previews should show them (DEC-016, DEC-023).
- **Two tones for the page's point of view only:** the one display-l headline. Every other heading is one tone.
- **A label over a heading only when it adds something:** an ID and a status, or a qualifier ("Illustrative data"). Never the section's name again. Headlines and section titles make the claim; navigation names the thing.
- **FIG numbers only where the text refers to the figure.**
- **The dot grid behind the page's opening panel only.**
- **One big number per view.** When numbers relate, draw how (blocks to scale, a timeline) instead of a row of stat tiles. A model's results, read together, are the exception.
- **A caveat once, where it changes the reading:** an evidence tag at the figure's foot, not the same sentence under every exhibit.
- **Each chapter closes on its own question** (ChapterClose, DEC-021), not the same band on every page.
- **Where it lives:** a Restraint section in the book; the Label, Card, StatTile, Figure and Button entries and previews in the catalogue; the notes on display-l, display-m, title, label and figure-l.
- **Refines DEC-002:** the annotated, dotted look stays, with its devices where they mark something.

Checked: the catalogue's previews no longer show a FIG label, an eyebrow, a row of stat tiles or two filled buttons side by side.

## DEC-016 — The demo opens on claims and draws its lead time [Experience] [Content]
**Status:** decided · **Date:** 2026-10-05
Each question was rendered on the demo in Paper, Ink and on a phone, and Mike chose:
- **Section openers, A (claim only):** each section opens on its claim at display-m in one tone, with no label above it ("Investigation waits eight days for six hours of work."). The kit keeps its name, "Controls and states".
- **The hero's second column, B (lead time drawn):** one drawing replaces the numbers (`src/demo/LeadTime.tsx`). The value stream's steps are blocks to scale, work in violet and waiting in grey, the bottleneck's wait at full strength. Its title gives the total; screen readers hear one summary line. The panel keeps "Illustrative data" and the two-tone point of view.
- **Figures, A (no numbers):** nothing cites the demo's figures, so they carry no FIG number. Their evidence moves to the foot: an Illustrative tag and a one-line caption on the left, the source on the right. Figure gains `tag` and `caption` for this (DEC-021).
- **Also:** the comparison's "What this says" label is gone, and the build section ends on a ChapterClose ("Which of these should the workshop test first?").

Checked: the build matches the chosen renders pixel for pixel: the hero in Paper, Ink and on a phone, the openers, and the figures in Paper and Ink. On a phone the figure matches once moved by half a pixel, because the hero above it changed height. The kit moved up by its removed label and is otherwise the same.

## DEC-017 — Filled violet on every main action [Brand]
**Status:** decided · **Date:** 2026-10-05
The book had one primary button per view. In the hub, Mike asked for the filled violet on more of the actions a reader takes, and the rule that came out of it fits the system: filled violet means "you can act here".
- **Filled violet (`color-action`)** on each main action: the bar's, the hero's, each chapter's close. The RowMark that opens a row (DEC-020) is filled too.
- **Where two buttons sit together, only one is filled;** the other is secondary.
- **Second-tier links** (GoLink, DEC-020) stay in ink and turn violet on hover. Violet text, lines and rings still mark the one thing to look at in an exhibit.
- **Replaces** the book's "single primary button per view" (in the book, CLAUDE.md and the Button entry since the first build, never logged). DEC-014's colour stands.

## DEC-018 — Three interface type steps, and a guard against sizes that draw nothing [Brand] [Engineering]
**Status:** decided · **Date:** 2026-10-05
Two findings in the type. The book jumps from caption (12px) to body (14), body-l (16) and statement (20), so components reached for one-off sizes: 31 of them at 13, 15 and 17px across nine files, and 86 in the hub. And 46 Tailwind sizes (`text-sm`, `text-xs`, `text-base`, `text-lg`) sat in ten files drawing nothing: the token theme switches them off, so the text took its size from its parent.
- **Three interface steps:** `ui-s` 13px (links, legends, metadata, table cells, tabs), `ui-m` 15px (figure titles, row names, the product name), `ui-l` 17px (exhibit and group titles, set semibold). They take their line height from where they sit, as the one-off sizes did.
- **A `tag` style** for the words in a Tag (10.5px, 600, +6% tracking): what Tag already drew, now a token.
- **Swapped in, not redesigned:** every one-off size now uses its step, and the dead classes are gone. Mike chose to keep the look rather than give those places the sizes their class names suggested.
- **The guard:** `npm run tokens`, which `dev` and `build` run first, stops on a dead size class, names the file and line and lists the book's scale. New projects get it too.

Checked: the demo is the same pixel for pixel in Paper, Ink and on a phone after the swaps, the tag style and the removals, and so is every catalogue preview whose content didn't change.

## DEC-019 — Contrast notes and consistency [Accessibility] [Brand]
**Status:** decided · **Date:** 2026-10-05
The hub's accessibility check found small text in ink-3 on the violet highlight failing in Paper, where the tokens promised 4.6:1 on every surface.
- **A second exception:** in Paper, ink-3 is 4.47:1 on `color-signal-soft` over the ground (4.81:1 over a panel). Small text on signal-soft is ink, ink-2 (Label's `strong` tone) or signal-text. The notes on ink-3 and signal-soft and the book's Colour section say so. Extends DEC-010.
- **Tints by role:** violet, mist and sage each group one kind of content, always with a word or an icon too, and mean one thing per project. The book had named only OpportunityCard's two; sage was in the tokens but not the book.
- **Card padding:** InsightCard and Figure now use the book's 24px. They had 22px.

Checked: ink-3 in Paper is 5.01:1 on the ground, 5.42:1 on a panel, 4.63:1 on raised and about 4.8:1 on the tints, and 4.26:1 on inset (DEC-010). Everything passes in Ink. Signal-text on signal-soft is 7.1:1 or better. The two cards are 4px taller; nothing else moved.

## DEC-020 — The small kit, from the field [Experience]
**Status:** decided · **Date:** 2026-10-05
Pieces the hub built for itself, now in the system so other projects get them and they can't drift:
- **LinkButton:** a link drawn as a Button, sharing its classes. Base UI keeps links out of Button.
- **GoLink:** the second-tier action, words and an arrow in ink, violet on hover, with `back` and `current`.
- **ModeSwitch:** light and dark as one on/off switch, named "Dark mode" (on is Ink). A 60 × 32px pill cut to sit beside a small button: the same edge, hover fill and focus ring, 12px apart. The solid ink knob carries the current mode's icon. Sun and Moon join the icon set; ThemeToggle stays for settings panels.
- **AccordionList and RowMark:** closed rows with the name after a violet mark and a one-line preview, opening in place.
- **useFitSticky:** keeps a sticky side panel's last line in reach on short windows.
- **TopBar:** `badge`, a tag after the product name that marks the whole site ("Example", "Draft"), with `brandLabel` for screen readers. On phones a long product name wraps onto two lines. `context` only when the name doesn't say who it's for.

Checked: on a phone the bar's product name sits 1–2px differently; the demo is otherwise unchanged by the kit.

## DEC-021 — Reading patterns [Experience]
**Status:** decided · **Date:** 2026-10-05
How the hub's chapters open, close and show where you are, as patterns:
- **ChapterHeader:** the claim at display-m in one tone, then one sentence of intro at the reading measure.
- **ChapterClose:** a hairline, the chapter's question at title size, the main action (a LinkButton) and the way on (a GoLink). No band, no dots, no label.
- **SectionRail:** the sticky "On this page" index for a page people dip into. It is ChapterRail's look without the "Read · Reading now · Up next" words, which suit a walkthrough.
- **Figure's foot:** `tag` and `caption` join `source`, the tag and caption on the left and the source on the right. `fig` is optional, for figures the text cites.

Checked: the new previews render in Paper and Ink without errors.

## DEC-022 — A password page for new projects, as an option [Engineering] [Experience]
**Status:** decided · **Date:** 2026-10-05
`npm run new -- ../<folder> --gate` adds the entry page the hub uses. The build encrypts the site (AES-256-GCM, with a key made from the password by PBKDF2-SHA-256 at 600,000 rounds), so a shared link shows nothing without the password, on any host.
- **The password:** the command makes a fresh one (three groups of four letters and digits) and a salt, and prints it. Change it in `gate.config.mjs`, or with `SITE_PASSWORD` where the site is built. Anyone who can read the repository can read it, so keep the repository private.
- **The page:** plain HTML outside React, in the book's classes: the Modus wordmark, a "Preview" tag, the claim "Prepared for [Prospect].", the password with Show, "Remember on this device" and the violet button. Help line, contents list and footer are optional. Its words are in `src/gate/copy.ts`.
- **Where it lives:** `templates/gate/`, copied in only with `--gate`.

Checked: in a new project, an empty or wrong password keeps the site closed ("…Check it and try again."), the right one opens it, and Remember keeps it open after a reload. A plain project and one with patterns and the gate both typecheck and build.

## DEC-023 — New projects start calm and carry the rules [Experience]
**Status:** decided · **Date:** 2026-10-05
- **The starter page, A (one calm hero):** Mike chose it from three renders. One panel on the dot grid: the point of view in two tones ("Say the claim first. Then the evidence."), one paragraph, the main action and a secondary one, then an empty state that says what to build next. ThemeToggle sits in the header.
- **CLAUDE.md for new projects** carries the type scale, the violet rule and the restraint rules, plus a note on the gate when there is one.
- **JSON content:** new projects can import JSON (`resolveJsonModule`), as the hub does with its research file.
- **`Claude outputs/` is ignored:** the desktop app saves renders there while you work.

Checked: the starter matches the chosen render pixel for pixel in Paper, Ink and on a phone, apart from the product name, which comes from the folder's name.

## DEC-024 — Older accessibility and overflow failures, fixed [Accessibility]
**Status:** decided · **Date:** 2026-10-05
This round's check found three failures older than the round:
- **Sideways exhibits:** ValueStream, ServiceBlueprint and CapabilityMatrix scroll sideways but couldn't be reached by keyboard. Each is now a named region you can Tab to ("Value stream. Scroll sideways for more steps."), with the focus ring drawn inside it, as the hub's blueprint does.
- **Skeleton** had a name but no role. It is now a status ("Loading").
- **At 320px** the ROI model's "Reset to workshop values" pushed the page 3px sideways. It now wraps under its label when there's no room.
- **Previews** declare their language (`lang="en"`), as the cover does.

Checked:
- No accessibility violations (axe-core, WCAG 2.2 AA, contrast included) on the demo, the starter and the entry page, in Paper and Ink, on desktop and phone, nor on the 14 new or changed previews in both themes.
- No sideways scroll at 320, 390, 640, 768, 1024, 1280, 1440 and 1920px in both themes, on the demo, the starter and the entry page.
- No pixels changed by these fixes, on the demo or the previews.

## DEC-025 — The skills live here, as the prototype-foundations kit [Engineering] [Experience]
**Status:** decided (one install for everyone since DEC-029) · **Date:** 2026-10-05
Mike asked for a full audit of his custom skills ("make updates, consolidate, reinvent"). The audit found them out of date (init-prototype still started projects on Standards v0.1's shadcn default, against DEC-008), overlapping (three skills each explained previews and saves), and missing what real projects had taught: render checks, writing back from a cloud session, option rounds, controls that match their neighbours.
- **One source:** `kit/` holds the skills. Mike's own skills are updated from it with review cards; the team installs the same folder as the `prototype-foundations` plugin (`kit/.claude-plugin/plugin.json`, version 0.2.0).
- **Retired:** `init-prototype`. `modus-project-sop` starts projects now, with its coaching tone and the deploy checklist brought across.
- **New:** `render-checks`: serving a build, shots, comparison sheets, pixel-for-pixel proof (with the sub-pixel nudge and the set-back proof), the accessibility check and the sideways sweep. Every script was run against real builds.
- **Updated:**
  - `modus-project-sop`: the foundation questions (SOP A), production-grade by default, option rounds, the re-sync steps, working from a cloud session, the deploy checklist.
  - `modus-ui-foundation`: the default in Standards v0.2; controls in a row; what changes when another library was chosen.
  - `experience-standards`: v0.2 (DEC-026).
  - `ai-scrubber`: its house rules are the book's restraint rules (DEC-015); screenshots and sheets come from `render-checks`.
  - `git-workflow`: no git from a Cowork session; the checks before a save; one save line per repository.
  - `local-preview`: the password page; restart the preview after new source files.
  - `design-iteration-loop`: renders and proof from `render-checks`.
  - `memory-hygiene`: unchanged.
- **Changing a skill:** edit it in `kit/`, log it here, propose the card, bump the plugin's version and repackage (`kit/README.md`).
- **Tested before release:** a blind routing test (24 requests, judged on the skills' descriptions alone) and five dry runs: a client project on MUI, a teammate's first project, a visual change, a write-back from the cloud, and resuming an older project. What they found, all fixed in the kit:
  - Mike's home folder and GitHub account were written into commands a teammate would run, and nothing set up a new computer. Commands now use `<home>` and `<github>`, with Mike's as the values, and SOP A has a first-time step (git, Node, GitHub sign-in, the foundation's clone).
  - The write-back from the cloud was too loose to protect Mike's edits. It's now eleven steps: an untouched base copy, a three-way merge for anything he changed, guards on every write, deletions handed to him, a stop when his computer drops out.
  - Option shots overwrote each other (files were named by page only), and the one-view script couldn't set a theme. Both scripts are fixed and re-run on a real build.
  - A client's library would have been pulled onto Modus's look and stack. `modus-ui-foundation` now lists what always travels and what stays behind.
  - An older project's Standards line would have been bumped on resume. It now changes only when the project is brought up to that version.
  - States were required but never rendered. Each state now gets a way to be opened on purpose, then checked like a page.
  - Descriptions now name re-syncing, promoting work back into the design system, deploying, handing code to a client and the accessibility check, so the right skill loads.
  - One voice rule covered every page. Claim headlines now belong to pages that argue (insight, strategy, a point of view); tools and forms name the task. The skills and the new-project `CLAUDE.md` say so.
  - A second pass (routing again, the teammate again, and a consistency read of all nine skills against this repository) caught smaller gaps, also fixed: steps in the write-back that could still overwrite a late edit, a public-by-default GitHub repository, pasted lines that the Mac's shell would misread (`#` comments, `!` in a commit message), Vercel's Node and install behaviour described wrongly, and new projects copying this repository's `.gitignore`. New projects now get their own, the same list as `git-workflow`.

Refines DEC-008: the team's skills follow the foundation too.

## DEC-026 — Modus Experience Standards v0.2: Instrument by default, built to ship [Experience] [Engineering]
**Status:** decided · **Date:** 2026-10-05
Mike: Instrument should be the default, "however we need the ability to move between component libraries", guided by a Q&A with the operator; "we can get more opinionated about the component library / design system options as we go, but the philosophy should be set now." And: "we should always assume what we build should be to engineering standards"; the way he works should be able to "move into a production grade environment with little effort."
- **The default foundation** is Modus Instrument: Base UI primitives and our tokens on Vite, React, TypeScript and Tailwind v4 (a Starting point). This takes DEC-001 into the Standards.
- **The philosophy:** Instrument by default; move off it only for a reason the project can name; the floor travels with any library; the look is a chosen theme (ours or the client's), never a library's stock defaults; one component system per project, with at most one specialist library beside it, themed the same way; choose as if it will ship; log the choice (in DEC-001 on Instrument, otherwise in a DEC-002 that supersedes it).
- **The foundation questions,** one at a time at the start of a project (SOP A, step 2): whose brand; the client's design system; where the code goes next; what Instrument lacks; how long it lives.
- **Four outcomes:** Modus Instrument; Instrument with the client's tokens; the client's or the target stack's library at the versions engineering uses, with the client's theme (ours on Modus-branded work) and the floor and the checks unchanged; Instrument plus one specialist library.
- **Production-grade is a Standard:**
  - strict TypeScript, tests for logic, a build that stops on errors;
  - content apart from components, pinned dependencies and a declared Node version;
  - no secrets in the repository unless a logged decision accepts one (a prototype's shared password);
  - accessible from the first commit, and documented;
  - prototype shortcuts visible in the product and logged as assumptions.
- **Also a Standard now:** a region that scrolls sideways can be reached by keyboard (DEC-024).
- **New projects** say "Follows Modus Experience Standards v0.2", record their foundation answers in DEC-001, carry the engineering bar in their ground rules, and never commit `.env` files.

The Standards will name libraries as projects use them and log how they went.

## DEC-027 — Node 24 across the foundation and new projects [Engineering]
**Status:** decided (the audit findings it left are fixed, DEC-028) · **Date:** 2026-10-05
Mike: "i want the modern node and any other platform that still ticks the boxes for vercel and other common stack choices." This repository said Node 20, which reached end of life on 2026-04-30 and which Vercel stopped building with on 2026-10-01.
- **Node 24,** the long-term support version the hosts build with: Vercel's default (it doesn't build with 26 yet), the default on Netlify for new sites and on Cloudflare's Workers Builds since July 2026, and an AWS Lambda runtime. It's supported until 2028-04-30. Node 26 becomes the long-term support version on 2026-10-28; move when Vercel builds with it (`modus-project-sop`, SOP F).
- **Declared in two places:** `.nvmrc` is `24` (Netlify, Cloudflare and version managers read it) and `engines.node` is `24.x` (Vercel reads it, and it overrides the project's setting). New projects copy both.
- **The rest was already current:** Vite 8, React 19, TypeScript 7, Tailwind 4 and Base UI 1. Two patch updates came in: Vite 8.3.3 and its React plugin 6.1.2.
- **Install scripts:** npm 11, which comes with Node 24, warns about dependency install scripts nobody has approved, and npm 12 will block them. `allowScripts` in `package.json` approves the two this repository needs, by name: esbuild (it checks its binary after installing) and @parcel/watcher (under the Tailwind command line). New projects need none.
- **Run instructions:** the README's run block is one line, without `#` comments, which the Mac's shell would read as part of the command. New projects' READMEs name the Node version.

Checked on Node 24.21:
- A clean install. Tests, typecheck and build pass, and the demo's build is identical, file for file, to the one before the change.
- A new project, plain and with `--gate --patterns`, installs with no warnings and no reported vulnerabilities, typechecks and builds.
- `npm audit` finds nothing in what ships. It reports four high-severity findings in a development-only chain (braces, under the Tailwind command line's file watcher), older than this change; the only fix on offer downgrades the Tailwind command line.

Projects move to Node 24 at their next re-sync (SOP C), or sooner when they deploy before then.

## DEC-028 — The audit findings fixed by taking the newer file watcher [Engineering]
**Status:** decided · **Date:** 2026-10-05
DEC-027 left four high-severity `npm audit` findings: braces, through micromatch, through @parcel/watcher 2.5.1, which Tailwind's command line 4.3.3 pins exactly. npm's suggested fix, `npm audit fix --force`, would have downgraded the Tailwind command line. @parcel/watcher 2.6.0 has swapped micromatch for picomatch, so `overrides` in `package.json` now gives the Tailwind command line 2.6.0. The command line only uses the watcher for `--watch`, which nothing here runs.

Checked on Node 24.21: `npm audit` finds nothing, and a clean install has 65 packages instead of 72. Tests, typecheck and build pass, and the demo's build and the Design System's files are identical, file for file, to the ones before. Remove the override once Tailwind's command line takes 2.6 itself.

## DEC-029 — One install of the skills: the plugin, for Mike too [Engineering]
**Status:** decided · **Date:** 2026-10-05
DEC-025 updated Mike's own skills with review cards and gave the team the plugin. With both installed on his account, every skill showed up twice, and the plugin's copies were older. Mike asked to install them from a single place.
- **The plugin is the one install,** for Mike and the team alike, so everyone runs the same version.
- **To update:** edit the skill in `kit/`, bump `version`, repackage, then **Customize → Plugins**: **Remove** the old one and upload the new file. Review cards are retired for these skills; a card can't update a plugin's skills anyway.
- **On Mike's account:** the nine separate skills come out under **Customize → Skills**. Anthropic's own skills (docs, docx, pdf, pptx, xlsx and the rest) stay.

Refines DEC-025.

## Open questions
- ~~[Open question] The official Modus logo asset~~ — resolved by DEC-007 (2026-10-02).
- [Open question] Exact Modus violet hexes — sampled from an image (DEC-004); confirm against the Modus Create brand guidelines.
- [Open question] Logo clear space and minimum size (DEC-007).
- [Open question] Brand stance: is the Insight Center a sub-brand, or a Modus Create product as the top-bar lockup shows now (DEC-007)?
- [Open question] Workshop photography for hero panels — hatched placeholders until then.
- ~~[Open question] Where this repo lives long-term~~ — resolved by DEC-011 (2026-10-02): https://github.com/mikemates/modus-instrument
- ~~[Open question] Whether to fold `modus-ui-foundation` into the team plugin's init-prototype and experience-standards (DEC-008)~~ — resolved by DEC-025 (2026-10-05): the team gets it in the `prototype-foundations` plugin; init-prototype is retired.
- [Open question] ValueStream breaks a long step name inside the word ("Investigatio n") at the demo's width. Older than this round; left as it is for now.
- [Open question] Still to consider from field use: an evidence-tag component with a fixed vocabulary (Early context, To test, Illustrative); pinned stage headings for wide exhibits that scroll sideways; an optional legend on ServiceBlueprint.
- [Open question] New projects have no test runner yet; for now Vitest goes in when a project's first logic arrives (DEC-026). Should the template carry it from the start? And should `npm run build` run the typecheck (and the tests), so a deploy can't go out with a type error? Today they are separate checks before each save.
- ~~[Open question] Node: `.nvmrc` says 20 and `engines` says `>=20`, but Node 20 reached end of life in April 2026, Vercel stopped building with it on 2026-10-01 (`>=20` gets its newest, 24), and this repository's own tests need 22.18 or later (they import TypeScript). Raise both to 22, with `engines` pinned to `22.x` so local and Vercel match? Mike's Mac needs Node 22 first.~~ — resolved by DEC-027 (2026-10-05): Node 24, declared in `.nvmrc` and `engines`; the tests run on it.
- [Open question] The brand book's Restraint section still says every headline makes a claim. Add the tools-and-forms voice (DEC-025) at the next Design System publish.
