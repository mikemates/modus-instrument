# Decision Log

Append-only. When something changes, mark the old entry SUPERSEDED (don't delete it).

## DEC-001 — Base UI + our own tokens as the default UI foundation [Experience]
**Status:** decided · **Date:** 2026-10-01
Replaces the Standards v0.1 default of shadcn-style components on Radix (a Starting point, so this is a logged deviation, not a breach). shadcn and HeroUI had started to feel fiddly and recognisably AI-generated. Base UI (`@base-ui/react`, from the Radix, Floating UI and MUI team) gives unstyled, accessible primitives — keyboard, focus management, ARIA — with no visual opinion, so 100% of the look comes from Modus Instrument tokens. Trade-off: no copy-paste styled kit; we maintain the styled layer ourselves (15 foundation components so far). Proposed for the next version of the Standards.

## DEC-002 — Visual direction: "Instrument on paper" [Brand]
**Status:** decided · **Date:** 2026-10-01
Direction A's dense, shared-border panels, annotated exhibits (FIG labels) and dot grid, set in Direction B's warm paper palette, type and colour treatment. Chosen by Mike from four directions on the Look & Feel canvas.

## DEC-003 — Manrope is the only typeface [Brand]
**Status:** decided · **Date:** 2026-10-01
Manrope (variable, 200–800, OFL) for display, body and labels. Body copy is sans, not serif. Uppercase tracked labels replace a monospace for annotations.

## DEC-004 — Modus violet roles [Brand]
**Status:** decided · **Date:** 2026-10-01
Violet 500 `#8135F9` is the signal (the one thing to look at, one per exhibit); violet 900 `#26035D` fills the primary action in Paper; violet 700 `#4D05C1` is violet text. Replaces the cobalt accent of Direction B. [Assumption] The ramp was sampled from the brand colour bar image — confirm exact hexes against the Modus brand guidelines.

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
**Status:** decided · **Date:** 2026-10-01 (logged 2026-10-02)
Mike asked for a default standard beyond the Insight Center. Every new Modus prototype, page or artifact starts on Modus Instrument: code projects through `npm run new -- ../<folder>` (`--patterns` for insight work), and Claude follows the `modus-ui-foundation` skill instead of init-prototype's shadcn/Radix default. The team plugin's own skills are unchanged for now.

## DEC-009 — The working copy lives on Mike's Mac [Engineering]
**Status:** decided · **Date:** 2026-10-01 (logged 2026-10-02)
Mike chose a folder on his Mac: `~/Projects/modus-instrument` is the working copy, and new projects go beside it in `~/Projects/`. Copies built in a Claude cloud session are scratch; the Mac copy wins when they differ.

## DEC-010 — One documented contrast exception: ink-3 on inset [Accessibility]
**Status:** decided · **Date:** 2026-10-01 (logged 2026-10-02)
In Paper, `color-ink-3` on `color-inset` measures 4.26:1, below the 4.5:1 text floor. No component puts text on inset, so the palette stays as it is and the rule lives in the token's usage note and the brand book: text on inset is `color-ink` or `color-ink-2` only. Every other text pair passes in both themes.

## DEC-011 — Backed up to GitHub [Engineering]
**Status:** decided · **Date:** 2026-10-02
Mike set up https://github.com/mikemates/modus-instrument as the backup and the place other projects pull from. The Mac copy stays the working copy (DEC-009); each save is pushed there. `package-lock.json` is committed on purpose so every machine and Vercel install the same versions.

## Open questions
- ~~[Open question] The official Modus logo asset~~ — resolved by DEC-007 (2026-10-02).
- [Open question] Exact Modus violet hexes — sampled from an image (DEC-004); confirm against the Modus Create brand guidelines.
- [Open question] Logo clear space and minimum size (DEC-007).
- [Open question] Brand stance: is the Insight Center a sub-brand, or a Modus Create product as the top-bar lockup shows now (DEC-007)?
- [Open question] Workshop photography for hero panels — hatched placeholders until then.
- ~~[Open question] Where this repo lives long-term~~ — resolved by DEC-011 (2026-10-02): https://github.com/mikemates/modus-instrument
- [Open question] Whether to fold `modus-ui-foundation` into the team plugin's init-prototype and experience-standards (DEC-008).
