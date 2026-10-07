Modus Instrument is the house UI system for insight and strategy work: dense, annotated instruments set on warm paper, in the Modus brand faces (Season Sans, with Season Serif for big headlines), with Modus violet as the one signal. Paper is the default theme; Ink is the dark theme for big screens in workshop rooms. Insight Center is its first product.

Build from the components in `components/bundle.js` (namespace `ModusInstrument`) and the tokens in `tokens.json`. Never hard-code a colour, size or radius that a token covers.

## Content fundamentals

- Write like an analyst briefing a client's leadership: short declarative sentences, numbers with units, no hype. "Claims start fast and finish slow." not "Unlock next-generation claims excellence."
- Headlines and section titles make a claim: "Investigation waits eight days for six hours of work." Navigation names the thing ("Where value leaks"). Don't open a title on a count ("Six opportunities to explore"); say what they add up to.
- Use "you" for the client and "we" for the team. Name the client as **[Prospect]** until one is confirmed.
- Buttons are a verb and an object: "Export brief", "Book the readout", "Reset to workshop values".
- End a chapter on a question for the reader's team, written for that chapter: "Which of these should the workshop test first?"
- Errors say what happened, why, what to do and whether anything was lost: "The research library timed out. Your filters and selections are kept — nothing was lost."
- Mark illustrative and unvalidated figures in place: "Illustrative data", "to validate", "[Benchmark source, year]". Never present a drafted AI answer as verified: AskPalette labels it "not yet reviewed by the team" until someone checks it.
- Sentence case everywhere except `label`-style annotations and tags, which are always uppercase. No emoji.

## Restraint

Each house device marks something. Used everywhere, it marks nothing, and the page reads as made by default rather than for this reader. So each one has its place:

- Two tones for the page's point of view only: the one `display-l` headline. Every other heading is one tone.
- A label over a heading only when it says something the heading and the bar don't: an ID and a status ("OPP-01 · Build"), a qualifier ("Illustrative data"). Never the section's name again.
- A FIG number only where the text refers to the figure ("see Fig 3.1").
- The dot grid behind the page's opening panel only.
- One big number per view. When several numbers relate, draw how they relate (blocks to scale, a timeline) instead of a row of stat tiles. A model's results, read together, are the exception.
- A caveat once, where it changes the reading: an evidence tag at the figure's foot, not the same sentence under every exhibit.
- Each chapter closes on its own question (ChapterClose), never the same band on every page.

## Visual foundations

### Colour

- Set every page on `color-ground`; put content on `color-panel` with a 1px `color-hairline` edge. Use `color-raised` for selected tabs, hover fills and tags.
- Text: `color-ink` for primary, `color-ink-2` for descriptions and quotes, `color-ink-3` for labels and captions. All three pass 4.5:1 on ground, panel, raised and the tints in both themes. Two exceptions, in Paper: on `color-inset` and on `color-signal-soft`, small text is `color-ink` or `color-ink-2` (Label's `strong` tone), or `color-signal-text` on signal-soft.
- The two-tone headline (the point of view only): finish the sentence in `color-ink-3` ("Claims start fast and finish slow. <ink-3>21 of 22 days are waiting, not work.</ink-3>"). Hierarchy comes from value, not weight.
- `color-signal` (Modus violet 500) marks the one thing to look at: the bottleneck bar, the selected ring, the active tab, the current chapter. One signal per exhibit. Use `color-signal-text` when violet is text.
- Filled violet means "you can act here". `color-action` (violet 500 in both themes, with `color-on-action` text) fills each main action a reader can take: the one in the bar, the hero's, each chapter's close, and the mark that opens a row (RowMark). Hover steps down to `color-action-hover`. Where two buttons sit together, only one is filled; the other is `secondary`. Second-tier links (GoLink) stay in ink and turn violet on hover.
- `color-positive` and `color-negative` carry meaning only with an icon or a word. Pain points pair `color-negative` with the warning triangle.
- Neutral data marks use `color-mark`. `color-mark-soft` is only for decorative marks inside product-as-illustration panels.
- Tints: `color-tint-violet`, `color-tint-mist` and `color-tint-sage` each group one kind of content, always with a word or an icon too, and mean one thing per project. OpportunityCard heads Build-new with violet and Evolve-ways-of-working with mist. The `color-violet-*` ramp is for brand moments (CTA bands, covers), not UI states.

### Type

- Two faces, both Displaay's Season. Season Sans (`--font-body`, variable 300–900) sets everything: body at 400, labels and buttons at 600, figures at 400. Season Serif (`--font-display`, variable 300–900) sets only the three display steps, the big headlines, at 400; at smaller sizes it loses its character, so never use it below `display-m`. The POV headline sized with `layout-hero` takes `font-display` too.
- `display-xl` once per page for the thing's name; `display-l` for the POV headline; `display-m` for chapter and section claims; `title` for card headings and a chapter's closing question; `statement` for an insight; `body-l` for reading text at a 620px measure; `body` for UI; `caption` for sources.
- Three interface steps fill the gaps between caption and statement: `ui-s` (13px) for links, legends, metadata, table cells and tabs; `ui-m` (15px) for figure titles, row names and the product name; `ui-l` (17px) for exhibit and group titles, set semibold. They take their line height from where they sit. Use them, never a one-off size such as `text-[15px]`.
- `label` is the annotation voice (IDs, statuses, qualifiers, table heads): 10.5px, 600, +8% tracking, uppercase. It replaces a monospace; do not add one. A Tag sets its words in `tag`, a touch tighter.
- Tailwind's own size steps (`text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl` and up) are switched off by the theme, so they draw nothing. `npm run tokens`, which `dev` and `build` run first, stops on one and names the file and line.
- Figures: `figure-xl` for the one hero number, `figure-l` for stat tiles, `figure-m` in cards. Proportional digits for big numbers; `tabular` in tables and axes.

### Layout and structure

- Make structure visible: panels that share hairlines, a titled Figure around every exhibit, the 16px dot grid (`mi-dots`) behind the page's opening panel.
- A long page people walk through is chapters with a sticky ChapterRail; number chapters only because they are a real sequence. A long page people dip into gets a SectionRail ("On this page"). A chapter opens on its claim (ChapterHeader) and closes on its question, the main action and the way on (ChapterClose).
- Show the rows that matter first and keep the rest as closed rows that open in place (AccordionList), so the depth shows without the noise.
- Spacing is a 4px scale (`space-1` … `space-24`, the same as Tailwind's unit): 24px card padding, 20px grid gaps. The page column and its padding are `layout-column` and `layout-gutter` (below).
- The product or the data is the illustration. Use real exhibits (a value stream, a blueprint) instead of stock imagery, 3D or gradients. Photography is workshop documentary only; until it exists, use the hatched placeholder (`mi-hatch`) labelled with what goes there.

### Width

- Every page is one composed column, designed at 1440px and centred. Wrap page content in `mi-frame` (`layout-column`, padded by `layout-gutter`). Never run page content edge to edge: the composition is the point.
- On big monitors the whole column grows: 1440px on laptops; from 1680px-wide windows it grows with 120px margins, up to 1920px. Its proportions hold because the headline grows with it.
- The POV headline uses `layout-hero` (40px on phones, 64px on laptops, up to 85px) so it keeps its three-line stack, the consequence in `color-ink-3` closing it.
- Card galleries keep fixed column counts: one on phones, two on tablets, three on desktop. Cards stay index-card proportions; never stretch them into strips.
- Reading text and form fields stop at `layout-measure` (620px, `mi-measure`); the Ask palette at 720px.
- The TopBar is the one full-bleed element: a bar across the window with its own padding.
- From 1024px wide, the chapter or section rail keeps `layout-rail` (280px) beside the content.

### Corners, borders, elevation

- `radius-panel` (10px) for cards and panels, `radius-control` (8px) for inputs and list rows, `radius-tag` (4px) for tags and meters, `radius-pill` for buttons, tabs and switches.
- Elevation is a surface step plus a hairline, never a shadow. `shadow-overlay` is reserved for dialogs and the Ask palette.
- Highlight with a 2px `color-signal` ring or a `color-signal-soft` fill. Never a coloured left border.

### Motion

- Motion says what changed and where it went. 150ms ease-out for state changes (a hover fill, a colour); 300ms for something that travels (a switch's thumb, the fill sliding to the active tab, a step entering from the side the reader moved towards, about 20px); up to 500ms for a progress bar filling. A reveal rises 12px. Scroll-scrubbed progress for before → after stories.
- Hover shows what will move you: a row in a rail or list fills with `color-raised`, an arrow nudges 2px the way it points, a card that is one big link may lift 2px (still no shadow).
- Nothing loops, bounces or glows, and a screen is readable within 320ms.
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
- When numbers make up a whole (work and waiting in a lead time), draw the parts to scale as one bar rather than listing them.
- Wrap every exhibit in Figure: a title that says what it shows, and a foot with its evidence tag, a one-line caption and its source. Number it (FIG 3.1) only when the text refers to it.

## Logo

- The Modus Create logo comes in two forms: the **wordmark** (glyph + MODUS CREATE) and the **glyph** alone. The official files are in Logos: `MC_Black.svg`, `MC_White.svg`, `MC_Icon_Black.svg`, `MC_Icon_White.svg`.
- In code, use `Logo` (wordmark) or `Logo variant="glyph"`. It draws the official artwork in `color-logo` — black on Paper, white on Ink — and switches with the theme. Never redraw it, retype "Modus Create" in Season Sans as a stand-in, or export a PNG of it.
- Use one ink only: black or white, as supplied. Never violet, `color-ink-2`, a gradient, an outline or a shadow. Never stretch it; size it by height.
- Set it on `color-ground` or `color-panel`. On a violet block, a tint or a photo, use the white or black file that keeps it clearly legible, or leave it off.
- Product lockup (TopBar): wordmark at 18px tall, a 1px `color-hairline-strong` divider 20px tall, then the product name in Season Sans 600 at 15px (`ui-m`) — "Insight Center". Below 640px wide, the glyph (22px) replaces the wordmark and a long product name wraps onto two lines. A tag after the name (`badge`) marks the whole site, such as "Example" or "Draft".
- Sign-off: the glyph at 16px beside the footer line. One wordmark per page.
- [Open question] Clear space and minimum size: confirm against the Modus Create brand guidelines.

## Iconography

- A 14px-grid stroke set ships in the bundle as `ModusInstrument.Icons` (ArrowRight, ArrowUp, ArrowDown, Search, Warning, Star, Queue, BuildNew, Evolve, Info, Check, Close, ChevronDown, Sun, Moon) at 1.5px stroke, drawn in `currentColor`.
- For icons the set lacks, use Phosphor (regular weight, 14–16px) to match.
- `Icons.Mark` (a lens with a violet point) was a placeholder product mark. The Modus Create logo replaces it in the top bar; don't use it as a logo.

## Themes

- `data-theme="paper"` (default) and `data-theme="ink"` on `<html>`. Every colour token has a value in both. ModeSwitch (in a bar, beside a small button), ThemeToggle (where the words help) or `setTheme('ink')` switches them.
