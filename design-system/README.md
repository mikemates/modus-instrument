Modus Instrument is the house UI system for insight and strategy work: dense, annotated instruments set on warm paper, in Manrope, with Modus violet as the one signal. Paper is the default theme; Ink is the dark theme for big screens in workshop rooms. Insight Center is its first product.

Build from the components in `components/bundle.js` (namespace `ModusInstrument`) and the tokens in `tokens.json`. Never hard-code a colour, size or radius that a token covers.

## Content fundamentals

- Write like an analyst briefing a client's leadership: short declarative sentences, numbers with units, no hype. "Claims start fast and finish slow." not "Unlock next-generation claims excellence."
- Headlines make a claim. Section titles name the thing ("Where value leaks").
- Use "you" for the client and "we" for the team. Name the client as **[Prospect]** until one is confirmed.
- Buttons are a verb and an object: "Export brief", "Book the readout", "Reset to workshop values".
- Errors say what happened, why, what to do and whether anything was lost: "The research library timed out. Your filters and selections are kept — nothing was lost."
- Mark illustrative and unvalidated figures in place: "Illustrative data", "to validate", "[Benchmark source, year]". Never present a drafted AI answer as verified: AskPalette labels it "not yet reviewed by the team" until someone checks it.
- Sentence case everywhere except `label`-style annotations, which are always uppercase. No emoji.

## Visual foundations

### Colour

- Set every page on `color-ground`; put content on `color-panel` with a 1px `color-hairline` edge. Use `color-raised` for selected tabs, hover fills and tags.
- Text: `color-ink` for primary, `color-ink-2` for descriptions and quotes, `color-ink-3` for labels and captions. All three pass 4.5:1 on ground, panel, raised and both tints in both themes. On `color-inset` use `color-ink` or `color-ink-2` only.
- Two-tone headlines: finish the sentence in `color-ink-3` ("Claims start fast and finish slow. <ink-3>21 of 22 days are waiting, not work.</ink-3>"). Hierarchy comes from value, not weight.
- `color-signal` (Modus violet 500) marks the one thing to look at: the bottleneck bar, the selected ring, the active tab, the current chapter. One signal per exhibit. Use `color-signal-text` when violet is text.
- `color-action` fills the single primary button per view, with `color-on-action` text. In Paper it is violet 900; in Ink it is violet 500.
- `color-positive` and `color-negative` carry meaning only with an icon or a word. Pain points pair `color-negative` with the warning triangle.
- Neutral data marks use `color-mark`. `color-mark-soft` is only for decorative marks inside product-as-illustration panels.
- Tints: `color-tint-violet` heads Build-new opportunities, `color-tint-mist` heads Evolve-ways-of-working ones. The `color-violet-*` ramp is for brand moments (CTA bands, covers), not UI states.

### Type

- One family: Manrope (`--font-body`, variable 200–800). Display at 400 with tight tracking; body at 400; labels and buttons at 600.
- `display-xl` once per page for the thing's name; `display-l` for the POV headline; `display-m` for chapter titles; `title` for card headings; `statement` for an insight; `body-l` for reading text at a 620px measure; `body` for UI; `caption` for sources.
- `label` is the annotation voice (FIG numbers, eyebrows, table heads): 10.5px, 600, +8% tracking, uppercase. It replaces a monospace; do not add one.
- Figures: `figure-xl` for the one hero number, `figure-l` for stat tiles, `figure-m` in cards. Proportional digits for big numbers; `tabular` in tables and axes.

### Layout and structure

- Make structure visible: panels that share hairlines, FIG labels on exhibits, the 16px dot grid (`mi-dots`) behind hero panels.
- Long pages are chapters with a sticky ChapterRail; number chapters only because they are a real sequence.
- Spacing is a 4px scale (`space-1` … `space-24`, the same as Tailwind's unit): 24px card padding, 20px grid gaps. The page column and its padding are `layout-column` and `layout-gutter` (below).
- The product or the data is the illustration. Use real exhibits (a value stream, a blueprint) instead of stock imagery, 3D or gradients. Photography is workshop documentary only; until it exists, use the hatched placeholder (`mi-hatch`) labelled with what goes there.

### Width

- Every page is one composed column, designed at 1440px and centred. Wrap page content in `mi-frame` (`layout-column`, padded by `layout-gutter`). Never run page content edge to edge: the composition is the point.
- On big monitors the whole column grows: 1440px on laptops; from 1680px-wide windows it grows with 120px margins, up to 1920px. Its proportions hold because the headline grows with it.
- The POV headline uses `layout-hero` (40px on phones, 64px on laptops, up to 85px) so it keeps its three-line stack, the consequence in `color-ink-3` closing it.
- Card galleries keep fixed column counts: one on phones, two on tablets, three on desktop. Cards stay index-card proportions; never stretch them into strips.
- Reading text and form fields stop at `layout-measure` (620px, `mi-measure`); the Ask palette at 720px.
- The TopBar is the one full-bleed element: a bar across the window with its own padding.
- From 1024px wide, the chapter rail keeps `layout-rail` (280px) beside the content.

### Corners, borders, elevation

- `radius-panel` (10px) for cards and panels, `radius-control` (8px) for inputs and list rows, `radius-tag` (4px) for tags and meters, `radius-pill` for buttons, tabs and switches.
- Elevation is a surface step plus a hairline, never a shadow. `shadow-overlay` is reserved for dialogs and the Ask palette.
- Highlight with a 2px `color-signal` ring or a `color-signal-soft` fill. Never a coloured left border.

### Motion

- 150–160ms ease-out for state changes; a 12px rise for reveals; scroll-scrubbed progress for before → after stories.
- Honour `prefers-reduced-motion` (base.css cuts motion to a fade) and offer a visible Site motion switch on long-scroll pages.

### States

Every view handles default, loading (Skeleton after ~400ms), empty (EmptyState with a next action), error (ErrorState that keeps input), success (inline confirmation such as "Added to the brief"), and disabled with a reason ("Disabled · needs data").

### Accessibility

- Focus ring: 2px solid `color-focus`, 3px offset, on every interactive element. It is at least 3:1 on every surface in both themes.
- Text 4.5:1, large text and control edges (`color-control-edge`) 3:1, in Paper and Ink.
- Status is never colour alone: evidence meters show the word, Harvey balls show shape, deltas show an arrow and a phrase.
- Every chart has a table view or labelled values, and hover readouts repeat what the table shows.

## Data visualisation

- One measure per chart and one axis. The story series is `color-signal`; everything else is `color-mark`.
- Bars are at most 24px thick with a 4px rounded data end; lines are 2px; gridlines are 1px `color-hairline`, solid.
- Label values at the bar tip; label a line's endpoint or its turning point (payback), not every point.
- Wrap every exhibit in Figure with a title, a FIG number and a source line.

## Logo

- The Modus Create logo comes in two forms: the **wordmark** (glyph + MODUS CREATE) and the **glyph** alone. The official files are in Logos: `MC_Black.svg`, `MC_White.svg`, `MC_Icon_Black.svg`, `MC_Icon_White.svg`.
- In code, use `Logo` (wordmark) or `Logo variant="glyph"`. It draws the official artwork in `color-logo` — black on Paper, white on Ink — and switches with the theme. Never redraw it, retype "Modus Create" in Manrope as a stand-in, or export a PNG of it.
- Use one ink only: black or white, as supplied. Never violet, `color-ink-2`, a gradient, an outline or a shadow. Never stretch it; size it by height.
- Set it on `color-ground` or `color-panel`. On a violet block, a tint or a photo, use the white or black file that keeps it clearly legible, or leave it off.
- Product lockup (TopBar): wordmark at 18px tall, a 1px `color-hairline-strong` divider 20px tall, then the product name in Manrope 600 at 15px — "Insight Center". Below 640px wide, the glyph (22px) replaces the wordmark.
- Sign-off: the glyph at 16px beside the footer line. One wordmark per page.
- [Open question] Clear space and minimum size: confirm against the Modus Create brand guidelines.

## Iconography

- A 14px-grid stroke set ships in the bundle as `ModusInstrument.Icons` (ArrowRight, Search, Warning, Star, Queue, BuildNew, Evolve, Info, Check, Close, ChevronDown) at 1.5px stroke, drawn in `currentColor`.
- For icons the set lacks, use Phosphor (regular weight, 14–16px) to match.
- `Icons.Mark` (a lens with a violet point) was a placeholder product mark. The Modus Create logo replaces it in the top bar; don't use it as a logo.

## Themes

- `data-theme="paper"` (default) and `data-theme="ink"` on `<html>`. Every colour token has a value in both. ThemeToggle or `setTheme('ink')` switches them.
