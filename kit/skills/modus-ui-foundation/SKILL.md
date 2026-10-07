---
name: "modus-ui-foundation"
description: "Modus Instrument, the Modus design system and default UI foundation: tokens, Paper (light) and Ink (dark) themes, Season Sans and Season Serif, violet signal, restraint rules, Base UI components. Use when designing, building or styling any Modus screen, page or artifact (unless the project chose another library through experience-standards), or when asked how Modus Instrument looks and works."
---

# modus-ui-foundation

Modus Instrument is the house look for everything Mike's team builds — coded prototypes, HTML artifacts, dashboards, POV sites, Insight Center — and the default UI foundation in Modus Experience Standards v0.2.

`modus-project-sop` runs the steps around it (intake, the foundation questions, git, Vercel). `experience-standards` sets the floor and the engineering bar: build so the work could move into production with little effort. `memory-hygiene` formats the decision log. `design-iteration-loop` handles feedback rounds. `local-preview` sets how to hand over run commands. `render-checks` proves a build. `ai-scrubber` checks a finished build for AI design tells before it's shared.

**Audience.** The person is usually an experience designer, not an engineer. Write the code yourself; hand them copy-paste commands for anything they run on their own computer (npm, git), each with what success looks like. Never run npm or git on their machine for them. When a visual change has more than one good answer, render the options first and let them pick (`modus-project-sop`, preference 5).

Paths use `<home>`, the person's home folder on their Mac (`/Users/mike` for Mike; `modus-project-sop` → *Key places*).

## Sources of truth (read before designing a screen)

1. **The Design System artifact** — https://claude.ai/artifact/34AemeyKUpp1dyAc4TDoKv. Read its `project/README.md` (Artifact `read` with that `path`): the brand book of usage rules, Restraint included. Its components, tokens and Logos are live there in both themes. Teammates need Mike to share it; if it won't open, the repo below stands in.
2. **The foundation repo** — `<home>/Projects/modus-instrument`, backed up at https://github.com/mikemates/modus-instrument. `tokens/tokens.json` is the only place colours, type, spacing, radii, shadows and layout values are defined. Its `CLAUDE.md`, `DECISIONS.md` and `MEMORY.md` hold the rules, the why and the traps. The official logo files are in `design-system/assets/Logos/`.

If the two ever disagree, the repo wins: the Design System is rebuilt from it.

## Starting a new coded prototype

1. Run SOP A of `modus-project-sop`: the intake, then the foundation questions from `experience-standards`. This section applies when the answer is Modus Instrument, the default; for another library, see *When another library was chosen* below.
2. Hand over the one create line that fits, then the install line, each on its own:
   - core foundation: `cd "<home>/Projects/modus-instrument" && npm run new -- ../<project-slug>`
   - with the Insight Center patterns: add `--patterns`; with a password entry page: add `--gate` (they combine)
   - then: `cd "<home>/Projects/<project-slug>" && npm install && npm run dev`
   It copies tokens, themes, the Season fonts, the Base UI components (Logo included), one calm starter page in the composed column with the Modus Create logo lockup, CLAUDE.md (the type, violet and restraint rules included), DECISIONS.md (DEC-001 logged), MEMORY.md with a `memory/` note, .gitignore and .nvmrc. Success: a page at http://localhost:5173 with the logo top-left, a Paper / Ink switch and one panel saying "Say the claim first. Then the evidence."
3. `--gate` is for anything shared outside the team: the build encrypts the site, so a link shows nothing without the password, on any host. The command prints a fresh password; it lives in `gate.config.mjs` (or `SITE_PASSWORD` where the site is built). Anyone who can read the repository can read it, so keep the repository private. The entry page's words are in `src/gate/copy.ts`.
4. If the foundation repo isn't on this computer, the person sets it up first (SOP A, step 0, in `modus-project-sop`). Without it, build the same structure by hand: Vite + React 19 + TypeScript + Tailwind v4 + `@base-ui/react` + the Season fonts from this plugin's `brand-fonts/` (loaded with `@font-face`), a tokens file generating a Tailwind `@theme`, and the values below.
5. Make sure a new project's CLAUDE.md says: *"Follows Modus Experience Standards v0.2."*, with any project deltas after it. (An older project keeps its version line until it's brought up to date.)

## Stack

- Vite + React 19 + TypeScript + Tailwind v4 (`@tailwindcss/vite`, no config file).
- **Base UI** (`@base-ui/react`) for every interactive primitive: Button, Field, Tabs, Switch, Slider, Toggle/ToggleGroup, Dialog, Popover, Menu, Select, Combobox, Tooltip. It brings keyboard, focus and ARIA; style its states with its data attributes (`data-checked`, `data-active`, `data-pressed`, `data-disabled`, `data-open`).
- Use the foundation's components before writing new ones, imported from `src/index.ts`: `Logo`, `Button`, `LinkButton` (a link drawn as a Button), `GoLink` (the second-tier "words and an arrow" link), `Card`, `Label`, `Tag`, `StatTile`, `EvidenceMeter`, `TextField`, `SegmentedTabs`, `Switch`, `Slider`, `ModeSwitch` (light/dark for a bar), `ThemeToggle`, `AccordionList` with `RowMark`, `Skeleton`, `EmptyState`, `ErrorState`, `Icons`, and `useFitSticky` for sticky side panels.
- Reading patterns: `TopBar` (with `badge` and `brandLabel`), `ChapterRail` (a walkthrough), `SectionRail` (a page people dip into), `ChapterHeader`, `ChapterClose`, `Figure`.
- Insight work adds: `InsightCard`, `OpportunityCard`, `AskPalette`, `ValueStream`, `ServiceBlueprint`, `CapabilityMatrix`, `HarveyBall`, `BenchmarkBars`, `RoiModel`.
- Keep components React 18-compatible (no `use`, form actions or `ref` as a plain prop) so they can be republished to the Design System.
- No stock component kits (shadcn, Radix, HeroUI, MUI) or icon sets (lucide) on an Instrument project. Another library comes in only through the foundation questions, logged in the project's decision log (see *When another library was chosen*).

## The look, in rules

**Restraint — each device marks something (DEC-015)**
Applied everywhere, a house device marks nothing and the page reads as generated. So:
- On pages that argue (insight, strategy, a point of view), a section opens on its claim, at display-m in one tone ("Investigation waits eight days for six hours of work."). No eyebrow repeating the bar or the rail; a label only for what the heading doesn't say: an ID and a status ("OPP-01 · Build"), a qualifier ("Illustrative data").
- Two tones only on the page's point-of-view headline.
- A FIG number only where the text refers to the figure.
- The dot grid behind the page's opening panel only.
- One big number per view. When numbers relate, draw how (blocks to scale, a timeline) instead of a row of stat tiles; a model's results, read together, are the exception.
- A caveat once, where it changes the reading: an evidence tag at the figure's foot, not the same sentence under every exhibit.
- Each chapter ends on its own question for the reader's team (ChapterClose), not the same band on every page.
- Before adding a device, ask what it marks on this page.

**Width — one composed column (DEC-013)**
- Every page is one composed column, designed at 1440px and centred. Wrap page content in `mi-frame` (`layout-column`: 1440px on laptops; from 1680px-wide windows it grows with 120px margins, up to 1920px). Never run page content edge to edge: a full-width version was tried and "lost its intentionality and flow". A dense working tool (a console, a big grid) may need the window's full width; that's a departure the project logs as `[Experience]`.
- The POV headline uses `text-[length:var(--layout-hero)]` (40px phones, 64px laptops, up to 85px) so it keeps its three-line stack as the column grows.
- Card galleries keep fixed column counts (1 / 2 / 3); cards stay index-card proportions, never wide strips.
- Reading text and form fields stop at `layout-measure` (620px, `mi-measure`); the Ask palette at 720px. A field's own width class (e.g. `w-60`) wins.
- The TopBar is the one full-bleed element. From 1024px the chapter or section rail keeps `layout-rail` (280px).
- Check every page as `render-checks` sets out (390 and 1440px in both themes, and the sideways sweep from 320px), plus 1920 and 2560px here, because the column and the hero grow with the window: headline still stacked, laptop view unchanged.

**Logo — Modus Create**
- Two forms: the wordmark (glyph + MODUS CREATE) and the glyph alone. Official files: `MC_Black.svg`, `MC_White.svg`, `MC_Icon_Black.svg`, `MC_Icon_White.svg`.
- In code, always the `Logo` component (`variant="wordmark"` default, or `"glyph"`). It draws the official artwork in `color-logo` — black on Paper, white on Ink — and follows the theme. Size it with a height class; the width follows.
- Never redraw it, retype "Modus Create" in Season Sans as a stand-in, recolour it (no violet, no ink-2, no gradient, outline or shadow), stretch it, or use a PNG.
- Set it on `ground` or `panel`. Product lockup (TopBar): wordmark 18px tall · a 1px `hairline-strong` divider 20px tall · the product name in Season Sans 600 at 15px (`ui-m`). Below 640px the glyph (22px) replaces the wordmark and a long name wraps onto two lines. A `badge` tag after the name marks the whole site ("Example", "Draft"). Footer sign-off: the glyph at 16px. One wordmark per page.
- If the logo files change, `npm run logo` in the foundation repo copies the new artwork into the component.

**Colour (tokens, never hex in components)**
- Page on `ground`; content on `panel` with a 1px `hairline` edge; `raised` for hover, selected tabs, tags.
- Text: `ink` primary, `ink-2` descriptions, `ink-3` labels and captions. Two exceptions in Paper, where ink-3 falls under 4.5:1: on `inset`, and on `signal-soft`. There, small text is `ink` or `ink-2` (Label's `strong` tone), or `signal-text` on signal-soft.
- `signal` (Modus violet 500) marks the ONE thing to look at per exhibit — the bottleneck, the selected item, the active tab. `signal-text` when violet is text.
- Filled violet means "you can act here" (DEC-017). `action` is violet 500 in both themes (DEC-014) and fills each main action: the bar's, the hero's, each chapter's close, and the `RowMark` that opens a row. Where two buttons sit together only one is filled; the other is `secondary`. Second-tier links are `GoLink`: ink, violet on hover.
- `positive` / `negative` only with an icon or a word. Neutral data is `mark`.
- Tints: `tint-violet`, `tint-mist` and `tint-sage` each group one kind of content, always with a word or an icon too, and mean one thing per project (OpportunityCard: violet heads Build-new, mist Evolve-ways-of-working). The violet ramp is for brand moments, not UI states.
- No gradients, glows, stock 3D, emoji, or coloured left-border cards.

**Type — Season Sans, with Season Serif on big headlines (DEC-030)**
- Season Sans (`--font-body`) sets everything. Season Serif (`--font-display`) sets only the display steps and the POV headline (`font-display` beside `layout-hero`); never below 44px.
- display-xl 104/0.95, display-l 64/1.03, display-m 44/1.08 — Season Serif 400, tracking −0.025, −0.02, −0.015em.
- title 26/1.15 500 (−0.015em), statement 20/1.3 500 (−0.01em), body-l 16/1.6, body 14/1.55, caption 12/1.45.
- Interface steps: `ui-s` 13px (links, legends, metadata, table cells, tabs), `ui-m` 15px (figure titles, row names, the product name), `ui-l` 17px (exhibit and group titles, set semibold). They take their line height from where they sit. Never a one-off size such as `text-[15px]`.
- Tailwind's own `text-xs`, `text-sm`, `text-base`, `text-lg` and `text-xl` and up are switched off by the token theme and draw nothing. `npm run tokens` (run first by `dev` and `build`) stops on them and names the file and line.
- label 10.5px, 600, +0.08em, uppercase — the annotation voice for IDs, statuses, qualifiers and table heads. It replaces monospace. A Tag's words use `tag` (10.5px, 600, +0.06em).
- Figures: figure-xl 88, figure-l 40, figure-m 26, weight 400. The `tabular` utility in tables and axes, never Tailwind's `tabular-nums`: with Season, only `tabular` keeps the spaces narrow.
- The two-tone headline, for the point of view only: the claim in `ink`, its consequence in `ink-3`.

**Structure**
- Make structure visible: panels sharing hairlines, a titled Figure around every exhibit, the 16px dot grid behind the opening panel.
- A long page people walk through has a sticky ChapterRail; one people dip into has a SectionRail ("On this page"). ChapterHeader opens a chapter on its claim; ChapterClose ends it on its question, the main action (LinkButton) and the way on (GoLink).
- Show the rows that matter and keep the rest as closed AccordionList rows that open in place.
- Controls in a row take their neighbour's measurements: beside a small button, a 32px pill (`h-8`) with the `control-edge` border, the raised hover fill, the same focus ring and a 12px gap (`space-3`). Use the pattern that fits the job (a Switch for on/off) and render it beside its neighbour in both themes before handing it over.
- 4px spacing scale; 24px card padding, 20px gaps. The column's padding is `layout-gutter` (16px phones, 64px from 1280px).
- Radii: panel 10px, control 8px, tag 4px, pill for buttons, tabs, switches.
- Elevation is a surface step plus a hairline; a shadow only for dialogs and palettes.
- The data or the product is the illustration. Photos are documentary only; otherwise a labelled hatched placeholder.

**Data visualisation**
- One measure, one axis. The story series in `signal`, the rest in `mark`. Bars ≤24px with a 4px rounded end; 1px solid `hairline` gridlines.
- Label values at the tip; label a line's endpoint or turning point only. Every chart has a table view or labelled values.
- When numbers make up a whole (work and waiting in a lead time), draw the parts to scale as one bar.
- Wrap every exhibit in `Figure`: a title that says what it shows, and a foot with its evidence `tag`, a one-line `caption` and the `source`. `fig` (a FIG number) only when the text cites it.

**Themes**
- Paper (default, light) and Ink (dark) via `data-theme` on `<html>`. Every colour token has both values. Check every screen in both.
- In a bar, beside a small button, switch them with `ModeSwitch`; `ThemeToggle` where the words help, such as a settings panel.

## The floor (from experience-standards, applied here)

- Every view: default, loading (Skeleton after ~400ms), empty (with a next action), error (what happened, whether anything was lost, how to recover; input kept), success, disabled with a reason.
- Focus ring: 2px solid `focus`, 3px offset, on everything interactive. Text 4.5:1; large text, control edges and focus 3:1 — in both themes.
- Status never by colour alone. Respect `prefers-reduced-motion`. No horizontal page scroll; wide exhibits scroll inside their panel, as a named region you can Tab to (`tabIndex={0}`, `role="region"`, an `aria-label` ending "Scroll sideways for more …").
- Copy on pages that argue (insight, strategy, a point of view): an analyst briefing leadership — short, declarative, numbers with units; headlines and section titles make a claim. In tools and forms (settings, consoles, admin): operational — headings name the task ("Notification settings"), labels name things, no claim headline. Navigation names the thing. Buttons are verb + object. Mark illustrative figures and AI-drafted answers in place ("Illustrative data", "not yet reviewed by the team"). Placeholder client name: [Prospect].

## Outside a coded project (HTML artifacts, one-off pages)

Use the same tokens as CSS variables, the Season fonts, and the rules above, Restraint included. For the logo, inline the official SVG's paths (from the foundation repo's `design-system/assets/Logos/` or the Design System's Logos) with `fill="currentColor"` and `color: var(--color-logo)`; never retype or redraw it. For the fonts, publish `SeasonSansUprightsVF.ttf`, `SeasonSansItalicsVF.ttf` and `SeasonSerifUprightsVF.ttf` beside the page, from this plugin's `brand-fonts/` folder (or the foundation's `kit/brand-fonts/`), with an `@font-face` each (`font-weight: 300 900`); family names `"Season Sans"` and `"Season Serif"`. Never substitute another face for the brand fonts. For width, give the page wrapper `width:100%; max-width:var(--layout-column); margin-inline:auto; padding-inline:var(--layout-gutter)`.

```css
:root,[data-theme="paper"]{--color-ground:#f8f6f1;--color-panel:#fdfcfa;--color-raised:#efece5;--color-inset:#e9e5dc;--color-hairline:#e5e0d5;--color-hairline-strong:#d3ccbe;--color-control-edge:#8e877a;--color-ink:#1c1b18;--color-ink-2:#57534b;--color-ink-3:#6b665c;--color-signal:#8135f9;--color-signal-text:#4d05c1;--color-signal-soft:rgba(129,53,249,.08);--color-signal-line:rgba(129,53,249,.40);--color-on-signal:#ffffff;--color-action:#8135f9;--color-action-hover:#6a24e0;--color-on-action:#ffffff;--color-focus:#8135f9;--color-mark:#8e877a;--color-mark-soft:#d3ccbe;--color-dot:rgba(28,27,24,.09);--color-positive:#2a6e47;--color-negative:#a83b28;--color-tint-violet:#f2ecfe;--color-tint-mist:#eaf0f6;--color-tint-sage:#ebf1ec;--color-logo:#000000;--color-violet-900:#26035d;--color-violet-800:#370485;--color-violet-700:#4d05c1;--color-violet-500:#8135f9;--color-violet-300:#c09bfb;--color-violet-100:#e3d7fd;--radius-tag:4px;--radius-control:8px;--radius-panel:10px;--radius-pill:999px;--shadow-overlay:0 24px 64px rgba(28, 27, 24, 0.16);--font-body:"Season Sans","Helvetica Neue",Arial,sans-serif;--font-display:"Season Serif",Georgia,serif;--layout-column:clamp(1440px,calc(100vw - 240px),1920px);--layout-gutter:clamp(16px,5vw,64px);--layout-measure:620px;--layout-rail:280px;--layout-hero:clamp(40px,5vw,max(64px,min((100vw - 240px) / 22.5,85px)))}
[data-theme="ink"]{--color-ground:#0e0c12;--color-panel:#15131b;--color-raised:#1e1b26;--color-inset:#110f16;--color-hairline:#2a2634;--color-hairline-strong:#3b3648;--color-control-edge:#6f6882;--color-ink:#f2f0f6;--color-ink-2:#ada8ba;--color-ink-3:#918ba0;--color-signal:#9a63ff;--color-signal-text:#c09bfb;--color-signal-soft:rgba(154,99,255,.12);--color-signal-line:rgba(154,99,255,.45);--color-on-signal:#0e0c12;--color-action:#8135f9;--color-action-hover:#6a24e0;--color-on-action:#ffffff;--color-focus:#c09bfb;--color-mark:#77708a;--color-mark-soft:#3b3648;--color-dot:rgba(255,255,255,.07);--color-positive:#5cc98f;--color-negative:#f2826f;--color-tint-violet:#251b3d;--color-tint-mist:#18212c;--color-tint-sage:#18241d;--color-logo:#ffffff;--shadow-overlay:0 24px 64px rgba(0, 0, 0, 0.50);color-scheme:dark}
```

If these ever differ from the foundation's `tokens/tokens.json` or the Design System, those win — re-read them. Inside a project, its own `tokens/tokens.json` is the source. A project behind the foundation (missing a step the book names) uses its nearest existing token and notes the gap for its next re-sync; never copy foundation tokens in piecemeal.

## When another library was chosen

When the foundation questions picked the client's library or the stack engineering will keep:
- **What always travels:** the floor and the engineering bar (`experience-standards`), the decision log and docs, the checks (`render-checks`), options first for visual choices, and the preview and save lines.
- **The look is a chosen theme, never the library's stock defaults:** the client's own theme on client-branded work; our token values mapped onto the library's theme on Modus-branded work. Keep it in one place.
- **Match the stack engineering will keep:** their library and React versions, their theme file, their conventions. Until they arrive, log the gap as an `[Assumption]`.
- **What stays behind on client-branded work:** the Season fonts, the violet rules, Paper and Ink, the composed column and the Modus logo. The restraint principle still holds (each device marks something), in the client's vocabulary.
- Log every departure from this skill as an `[Experience]` decision in the project.

## Changing the system itself

- Change tokens in `<home>/Projects/modus-instrument/tokens/tokens.json` (both themes, a usage note, contrast checked), components in its `src/`. A new component is exported from `src/index.ts` and gets an entry in `scripts/ds-spec.mjs` whose preview models the book's rules and uses only classes that appear in `src/`; a new source file with exported types also goes on `srcFiles` in `scripts/build-design-system.mjs`.
- Then `npm run ds:build` and republish `design-system-dist/project/` to the Design System artifact: `read` the artifact's url first (reading one of its files isn't enough), send only the changed files, with `project/design-system.json` (every key kept, `lastChange` updated) in the same last call; `components/index.d.ts` goes as `text/plain`. The repo's `memory/design-system-publishing.md` lists the traps.
- For a visual change Mike will judge by eye, render the options first and let him pick before wiring one in; a single on-system answer or a precise value goes straight in, with a before/after. For a batch, step through one question per decision, then confirm the set.
- Log anything that changes how the system looks in its DECISIONS.md, append-only. When a rule or a way of working changes, update its skill in the repo's `kit/` too: it's the source of the `prototype-foundations` plugin that everyone installs.
- A project that departs from these rules logs the departure as an `[Experience]` decision in its own DECISIONS.md, with the reason. A departure another project would need goes back to the foundation (Mike's SOP D); projects then re-sync from it (SOP C).

## Open items to respect

- Violet hexes were sampled from the brand colour bar — [Assumption] until confirmed against Modus Create brand guidelines.
- Logo clear space and minimum size — [Open question] until confirmed against the brand guidelines.
