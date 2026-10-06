---
name: "ai-scrubber"
description: "Use when a build looks AI-generated or templated, or before sharing it: audits any page, prototype, artifact or deck for AI design tells, then walks through fixes with rendered options."
---

# ai-scrubber

Find the patterns that make a build read as machine-made, then fix the ones that matter, with the person deciding each one. It works on any build: a coded prototype, a single HTML page or artifact, a deck, a document.

The person deciding is usually a designer, not an engineer. You do the measuring, building and rendering. They judge by eye, so show every visual option as a picture of the real thing, and ask for one decision at a time.

## The idea

A tell is a device applied by default: everywhere, at the same weight, whether or not the content needs it. One eyebrow can be right; thirty-six on one page is a template talking. So every instance gets the same test: **was this chosen for this content, or would it be here anyway?**

Each finding leaves by one of three doors:

- **Simplify** when the content or function isn't worth keeping: cut it, or say it once in the right place.
- **Bespoke** when it is worth keeping: re-express it so the form comes from the content.
- **Keep** when it has earned its place. Say why, so the next scrub doesn't flag it again.

Restraint isn't deletion. The aim is a build that reads as decided: fewer defaults, the same substance.

## How a scrub runs

### 1. Set up

- Establish what's being scrubbed (which pages, screens or slides) and how to see it rendered: a local production build, a dev server, a file, an exported deck. Ask only for what you can't find.
- Read the project's sources of truth first: its CLAUDE.md or README, its decision log and its design system's rules. Sorting findings depends on them. For a long decision log, read the titles and statuses first, then the entries your findings touch.
- Note what's fixed: brand colours and type, logged decisions, design-system rules. They aren't off limits, but they change who decides and how (step 4).

### 2. Measure

Run the measuring script (appendix A) on every main page at desktop and phone. One theme is enough for counting, since the structure rarely changes between themes; render options in both. To measure a second theme anyway, pass its URLs too (e.g. `?theme=paper`): theme variants of one page count once in the cross-page repeats. It counts what a machine can see: small labels per screen, eyebrows, lines under headings, tags, zero-padded numbers, FIG labels, icon-and-label pairs, arrow links, two-tone and count-led headings, sentences repeated on a page and across pages, "X, not Y" contrasts, em dashes, stock words, card grids and how alike they are, cards inside cards, big stat numbers, groups of three, pill buttons, textures and effects, the share of words in the main ink, fade-in on scroll, and a mode switch in the top bar.

Keep the output. Running it again after the changes gives the before and after. For a deck or a document, export it to HTML or images if you can; otherwise lean on the reading pass.

The numbers are prompts to look, not verdicts. Lines worth looking past:

- more than about six small labels on one screen, or eyebrows over most headings, or any eyebrow repeating the heading or the nav;
- any line under a heading that describes the page;
- more than three tags on one screen;
- FIG labels the text never refers to, or zero-padded numbers on things that aren't a real sequence (the script can't tell; check);
- a sentence said twice on a page, or on three or more pages;
- a card grid with one template and text lengths within about 15% of each other;
- cards inside cards, and threes in most groups;
- less than half of the words in the main ink;
- any glow, gradient text, frosted glass or fade-in on scroll.

### 3. Read

Look at the pages themselves (full-page shots at desktop and phone, with the `render-checks` skill) next to the copy source, and walk the catalogue below against them. Reading catches what counting can't: labels built on one formula, a page that describes itself, the same template on every page, even-handedness, and the missing human hand.

### 4. Sort

First group tells that share an element or a component into one finding: a chapter header's eyebrow, two-tone headline and count-led wording are one finding with one decision. Then decide three things for each finding.

- **Its door.** Is the content or function valuable to this reader? No: Simplify. Yes: Bespoke. Already right: Keep.
- **Its status.**
  - *Free:* fix it in the project.
  - *Decided:* a logged decision made it so. Name the decision. Changing it takes a new decision that supersedes the old one, never a quiet edit.
  - *House rule:* the design system prescribes it. Offer the project-level change and draft a proposal for the system; the person decides whether it goes upstream.
  - *Brand:* keep it and compensate elsewhere.
  - A finding can carry more than one status (set by a logged decision and built on a house rule); name each.
- **Its rank.** Visibility (the first screen of a main page, then the main reading path, then deep or expanded views) times spread (every page, then one page, then once). The top five to eight go in the report.

### 5. Report, then choose

Keep the report short. Lead with the ranked findings, one block each:

```
1. Six small labels on every feature card · Pricing (24 on one screen) · Free
   Reads as generated: the same label set on six identical cards.
   Simplify: name the parts once, as row heads beside the grid.
   Bespoke: let the sentences carry the structure, and set the question as a question.
   Recommend: Bespoke, because the parts matter to the reader but the labels don't.
```

Then two short lists: lower-priority findings, one line each, and what's earned, with why. End with the script's headline numbers, so the after has something to beat.

Then ask which findings to take forward: multi-select, up to four findings per question, with "(Recommended)" on the ones you'd do. Build options only for those.

### 6. Build the options

For each finding the person chose, build the options on the real content and render them. A described option costs a round; a picture settles it.

- **Coded project:** build each option behind a temporary switch (a query parameter or a small options file), shoot it at the key widths and in each theme (`render-checks`), and remove the switch and the losing options after the pick.
- **Single HTML file or artifact:** make one copy per option and shoot each.
- **Deck:** render the affected slides for each option.
- **Copy-only changes:** show the words before and after. No render needed.

Usually that's Now, A (Simplify) and B (Bespoke). Add a second bespoke option when there are two good directions, and mark the one you recommend. Put each finding on one labelled sheet (`render-checks` has the sheet script): a title naming the finding, one line saying what the options share, then the panels, desktop and phone side by side. Keep sheets near half a megabyte, and in full colour when colour is part of the question.

### 7. Step through the decisions

Run the decisions like a wizard: one finding per step, the picture first, then one multiple-choice question. Small steps keep each choice easy, and showing the picture first means it's made by eye.

1. **One step per finding.** Show its sheet, then ask:
   - A header of 12 characters at most, such as `Step 2 of 6`; the question names the finding in plain words.
   - Your recommendation first, with "(Recommended)" at the end of its label; then the other options; then "Keep as is".
   - Each option's description says what changes for the reader, in one line, and any cost (a superseded decision, a departure from the design system).
   - For a copy change, put the before and after in the option's preview.
   - For a house rule, the options include where it goes: this project only, proposed for the design system, or both.
2. **Confirm.** Recap the picks in a short list (what changes, which decisions it supersedes, what goes upstream) and ask: "Build all (Recommended)", "Build some", "Not yet".

Use the AskUserQuestion tool where it exists; the person can always answer in their own words. Without it, ask one numbered multiple-choice question per message, recommended option first, and wait. Show sheets with SendUserFile where it exists; otherwise save them and give the path. If nobody is there to answer, stop after the report and the sheets.

### 8. Apply, check, log

- Build the picks. Remove every temporary switch and unchosen option.
- Check the build against the chosen render pixel for pixel (`render-checks`, with the sub-pixel nudge for leftover differences), then re-run the measuring script and show the before and after for the tells you touched.
- Re-check what the change could have moved: contrast, focus, keyboard, accessible names, sideways scroll (the accessibility check and the sweep in `render-checks`), and the states each view must handle.
- Log every pick as a decision: what was wrong, what changed, what you checked. Supersede; never delete.
- Gather house-rule picks into one proposal for the design system: the rule, the evidence (counts), the suggested new wording.

## The catalogue

Each tell, with the simplify move and the bespoke move. "Earned" says when it's right.

### Labels and scaffolding

- **Eyebrows over everything.** A small uppercase label above each heading, often repeating it or the nav ("FEATURES" over "Everything you need"). *Simplify:* cut; the heading does the job. *Bespoke:* give orientation to structure (one chapter marker, a running head, a contents list), or fold a needed word into the heading. *Earned:* a real category that readers scan a long list by.
- **Lines that describe the content.** A grey sentence under a heading explaining what follows ("Each one sets out…", "This section covers…"). *Simplify:* cut it, or replace it with the most important fact. *Bespoke:* let the content's first sentence do the introducing.
- **Report apparatus without a report.** FIG numbers nothing cites, "Fig 1.0" on a hero, section marks, zero-padded numbers (01, 02) on things that aren't a sequence. *Simplify:* drop the numbers and keep the titles. *Bespoke:* number only what the reader follows in order or cites; in a real report, refer to the figures in the text. *Earned:* real steps, stages and citations.
- **Tags on everything.** Status chips at every level; the same chip on every item. *Simplify:* say it once for the group. *Bespoke:* a convention readers already know, explained once: footnote markers, dashed lines for what's unconfirmed, a margin mark.
- **Icons that repeat their label.** A bulb for "idea", a flask for "test", a rocket for "launch", a shield for "security", sparkles for "AI"; icons in coloured tiles over every feature. *Simplify:* drop them. *Bespoke:* tell parts apart by form: a question set as a question, a quote as a quote, a test as steps. *Earned:* a recognised symbol that speeds scanning across many items.
- **An arrow on every link.** "Read more →" six times on a screen. *Simplify:* one forward link per section keeps the arrow; the rest are plain, specific links ("Read the quality brief"). *Bespoke:* make the row or card itself the target.
- **Interface narration.** "On this page", "At a glance", "Key takeaways", "Scroll to explore", "Names stay in place as you scroll". *Simplify:* cut. If a control needs explaining, fix the control.

### Copy

- **Two-tone headlines everywhere.** A claim plus a grey consequence ("Build faster. Ship smarter."). *Simplify:* one tone. *Bespoke:* keep one, where the second clause is a real consequence (the page's point of view), and give the other headlines their own shapes.
- **Headlines that lead with a count.** "Six opportunities to explore", "Three simple steps". *Simplify:* lead with the claim. *Bespoke:* if the number matters, make it a fact with stakes.
- **The same sentence again.** One caveat under every figure; one next-step line on every page. *Simplify:* say it once, where it changes how the reader reads the claim. *Bespoke:* make it a visible convention (how unconfirmed things are drawn), explained once.
- **Contrast pairs and rhythm.** "X, not Y", "Not just A, but B", "It isn't X. It's Y.", "Eight stages, eight handoffs." *Simplify:* state the positive claim. *Earned:* the one place where the contrast is the insight.
- **Everything in threes.** Three features, three steps, three stats, three tiers. *Simplify:* use the real number. *Bespoke:* break the symmetry: one lead item, the rest supporting.
- **Em dashes as the house punctuation.** *Simplify:* full stops, commas and colons.
- **Stock words and openers.** Seamless, unlock, elevate, leverage, robust, delve, streamline, empower, actionable; "In today's…", "Whether you're…", "Let's dive in". *Simplify:* concrete verbs and nouns from the reader's world.
- **Labels on one formula.** Every label a wh-phrase ("What we heard", "How it works", "Why it matters"), or every title verb + object. Each is fine alone; a screenful reads as a template. *Simplify:* drop the labels the content makes obvious. *Bespoke:* vary them by job.
- **Even-handedness.** Every claim hedged the same way, every item the same length, every list balanced. *Simplify:* let important items run longer and minor ones shrink. *Bespoke:* state a point of view and show its evidence once.

### Layout

- **Look-alike card grids.** Three or six identical cards: one template, one length. *Simplify:* a list or a table, with labels once as column or row heads. *Bespoke:* give the one that matters room and its own form; the rest recede.
- **Boxes in boxes.** Tinted wells in cards in panels. *Simplify:* one level of container; group with space and rules. *Bespoke:* separate by type and alignment.
- **Numbered step strips.** 01 → 02 → 03 with arrow chips. *Simplify:* one sentence. *Bespoke:* if it's a real sequence, show its real shape: durations, who acts, what changes hands.
- **Hero stat tiles.** Big number, small label, footnote, in threes. *Simplify:* put the numbers in the sentence that uses them. *Bespoke:* draw how they relate, with sources.
- **One template for every page.** Eyebrow, headline, intro, exhibit, caption and a closing band, every time. *Simplify:* drop what each page doesn't need. *Bespoke:* let each page's job pick its shape: a comparison is a table, a process a sequence, a decision ends on a question.
- **Template chrome.** Logo, pill nav, theme toggle and an accent pill button; a centred hero with two buttons; a logo strip; testimonial cards; three-tier pricing with "Most popular"; an FAQ accordion; a four-column footer. *Simplify:* remove what this reader doesn't need (a theme toggle rarely belongs in the top bar). *Bespoke:* navigation built from the content's own structure.
- **The same closing band on every page.** *Simplify:* one persistent action and a plain "next" link. *Bespoke:* end each page on its own question or decision.

### Surface and motion

- **The default palette.** A near-black or white ground, one violet, indigo or blue accent, and a ladder of greys for hierarchy. If it's the brand, keep it and raise the bar elsewhere. Watch the share of words in the main ink.
- **Effects.** Gradient text, glows, frosted glass, blurred blobs, dot or grid textures, noise. *Simplify:* remove them. *Bespoke:* texture that carries meaning, such as a faint drawing of the real structure.
- **Motion by default.** Fade-up on scroll, hover lift on every card, nudging arrows, numbers that count up. *Simplify:* no entrance motion; hover changes only what's clickable.
- **One shape for everything.** The same radius, hairline and shadow on every element. *Bespoke:* vary by role, so structure, controls and content look different.

### What's missing: a human hand

Generated work is evenly polished; made work shows that someone chose. Look for what's absent: named people, real photos, real artefacts, specific numbers with sources, an opinion, anything uneven. The bespoke move here is often to add, never to invent: a named author and a short signed note, documentary photos of real work, a real sketch or sample output, a specific number with its source, a plainly stated point of view.

### In decks and documents

Decks: an agenda slide, "Key takeaways", every slide a title over three icon bullets, big-number slides, quotes with no name, emoji bullets, one layout for every slide, a "Thank you" closer. Documents: a bold lead-in on every bullet, a heading on every paragraph, a summary that repeats the intro, "In conclusion". The same three doors apply.

## Making it bespoke

Bespoke means specific to this content, not decorated. Moves that travel:

- **Start from the reader's job.** To compare, a table; to follow, a sequence with real durations; to see how numbers relate, a small drawing; to trust, evidence and names; to decide, a question with options.
- **Put the structure in the language.** Fixed sentence frames ("We heard… We think… We'd test it by…") can replace a set of labels.
- **Make one thing matter.** Break symmetry on purpose: one item leads, the rest support.
- **Use conventions people already read.** Footnotes, dashed for proposed, margin notes, running heads, a contents list, instead of a new system of chips and colours.
- **Show real people and things.** Never invent them.
- **Stay inside the design system.** No new fonts, colours or effects unless it allows them. If the system itself produces the tell, propose a change to the system.
- **Don't swap one template for another.** Turning every eyebrow into a margin note is the same tell in new clothes. Vary by job.

## Guardrails

- **Move, don't lose.** Evidence, provenance, a caveat the reader needs and accessible names get relocated or merged, never dropped. When a visible label goes, keep its meaning for screen readers if it was the only name.
- **Never fabricate a human touch.** No invented quotes, names, photos, numbers or testimonials.
- **Keep the floor.** Contrast, focus, keyboard, status never by colour alone, reduced motion, no sideways scroll, every state handled.
- **Respect decisions.** Name the decision a finding touches before proposing a change. A change supersedes it through the log.
- **House rules go upstream.** A project-only departure is logged as one.
- **Don't chase zero.** A few labels, a real sequence, one two-tone headline can all be right.
- **Track wording changes the way the project does** (a change log, a content check).
- **Nothing is applied without the person's pick.**

## In Modus projects

Resume the project with SOP B of `modus-project-sop` first: that's where its CLAUDE.md, decision log and memory notes get read. Then these specifics apply.

- **House rules today.** Since its DEC-015, Modus Instrument's book has a Restraint section: a label over a heading only for an ID, a status or a qualifier; two tones only for the page's point of view; FIG numbers only where the text cites them; the dot grid behind the opening panel only; one big number per view, drawing how numbers relate; a caveat once; each chapter's own closing question. A tell that breaks one of these is Free: the project has drifted from the book. A tell the book itself still produces is House rule: offer the project-level change and collect the proposal for SOP D. Read the Design System README first (`modus-ui-foundation` says how) in case the rules have moved again. Nothing changes in the foundation until Mike picks it.
- **The brand stays.** On Instrument: violet, Manrope, Paper and Ink; on a client's library, their theme. Bespoke works inside it.
- **Option rounds his way.** The real content behind a temporary `?name=` switch; 1440px in each theme the project has, plus a phone; labelled sheets of about half a megabyte; after the pick, remove the switch and the unchosen options and check the build against the pick pixel for pixel. `render-checks` holds the tools and the traps, such as the password key and sticky bars in full-page shots.
- **Decisions.** Each pick is a `DEC-0NN` entry tagged `[Experience]` or `[Content]`, superseding rather than deleting, with CLAUDE.md updated in the same pass (`memory-hygiene`). Research wording changes go through the project's change log if it has one.
- **His Mac copy wins.** If options are built in a cloud copy, write back as `modus-project-sop` says under *Working from a cloud session*: a fresh staging folder, checksums before and after, time guards.
- **Never run git in their folders.** Finish with the preview line and the save line (`local-preview`, `git-workflow`).

## Appendix A · The measuring script

Write it to a scratch folder outside the project and run it against the rendered pages. It needs Playwright, which is preinstalled in Claude's cloud sessions; otherwise run `npm i playwright` in that scratch folder.

```bash
node scrub-measure.mjs --phone --out before.json "http://localhost:4173/" "http://localhost:4173/pricing"
node scrub-measure.mjs --init key.js --wait "#root main" --phone --out before.json URL...   # a password-gated build
node scrub-measure.mjs "file:///path/to/page.html"                                        # a single file
```

It prints one column per page and writes the texts behind every count to the JSON, so each finding can be found again.

```js
// ai-scrubber: counts AI design tells on rendered pages, so every round has a before and an after.
// Usage: node scrub-measure.mjs [--init key.js] [--wait "css"] [--phone] [--out tells.json] URL [URL...]
//   --init   a script run before each page loads (e.g. one that sets a password key in localStorage)
//   --wait   a selector to wait for before measuring (e.g. "#root main")
//   --phone  also measure at 390 × 844 (desktop is 1440 × 900)
// URLs can be http(s):// or file:// (a single HTML file or an exported deck page).
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let pw;
for (const p of ['playwright', '/opt/npm-tools/node_modules/playwright']) { try { pw = require(p); break; } catch {} }
if (!pw) { console.error('Playwright not found. In a scratch folder outside the project: npm i playwright'); process.exit(1); }

const args = process.argv.slice(2), urls = [], opt = { phone: false, out: 'tells.json' };
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--init') opt.init = fs.readFileSync(args[++i], 'utf8');
  else if (args[i] === '--wait') opt.wait = args[++i];
  else if (args[i] === '--out') opt.out = args[++i];
  else if (args[i] === '--phone') opt.phone = true;
  else urls.push(args[i]);
}

// Runs inside the page. Returns counts plus the texts behind them, so every finding can be located.
function measure() {
  const H = innerHeight, all = [...document.querySelectorAll('body *')].filter((e) => !e.closest('svg, script, style, noscript, template'));
  const st = (e, p) => getComputedStyle(e, p), px = (v) => parseFloat(v) || 0;
  const box = (e) => { const r = e.getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height }; };
  const cvs = document.createElement('canvas'); cvs.width = cvs.height = 1;
  const g = cvs.getContext('2d', { willReadFrequently: true }), memo = {};
  const rgba = (c) => (memo[c] ||= (g.clearRect(0, 0, 1, 1), (g.fillStyle = '#000'), (g.fillStyle = c), g.fillRect(0, 0, 1, 1), [...g.getImageData(0, 0, 1, 1).data].map((v, i) => (i === 3 ? v / 255 : v))));
  const opaque = (c) => rgba(c)[3] > 0.05;
  const groundOf = (e) => { for (let a = e; a; a = a.parentElement) { const c = st(a).backgroundColor; if (opaque(c)) return c; } return 'rgb(255, 255, 255)'; };
  const shown = (e) => {
    const r = e.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return false;
    if (e.checkVisibility && !e.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true, opacityProperty: true, visibilityProperty: true })) return false;
    for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) {
      if (!/hidden|clip/.test(st(a).overflow)) continue;
      const q = a.getBoundingClientRect(); if (q.height < 1 || q.width < 1 || r.bottom <= q.top || r.top >= q.bottom) return false;
    }
    return true;
  };
  const inViewX = (e) => { const r = e.getBoundingClientRect(); for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) { if (!/auto|scroll|hidden|clip/.test(st(a).overflowX)) continue; const q = a.getBoundingClientRect(); if (r.right <= q.left || r.left >= q.right) return false; } return true; };
  const chromeSel = 'nav, footer, [role=navigation], [role=contentinfo], [role=banner]';
  const topHeaders = [...document.querySelectorAll('header')].filter((h) => !h.parentElement.closest('main, article, section, aside, dialog, [role=main]'));
  const chrome = (e) => !!e.closest(chromeSel) || topHeaders.some((h) => h.contains(e));
  const txt = (e) => (e?.innerText ?? e?.textContent ?? '').trim();
  const own = (e) => [...e.childNodes].filter((n) => n.nodeType === 3).map((n) => n.data).join(' ').replace(/\s+/g, ' ').trim();
  const words = (t) => t.toLowerCase().replace(/[^a-z0-9’' ]/g, ' ').split(/\s+/).filter((w) => w.length > 2 && !/^(the|and|for|with|our|your|are|this|that|what|how|its|it’s)$/.test(w));
  const isBox = (e) => {
    const s = st(e), b = box(e); if (b.w * b.h < 6000) return false;
    const edges = ['Top', 'Right', 'Bottom', 'Left'].filter((k) => px(s[`border${k}Width`]) >= 0.5 && s[`border${k}Style`] !== 'none').length;
    return edges >= 3 || (opaque(s.backgroundColor) && !!e.parentElement && s.backgroundColor !== groundOf(e.parentElement));
  };
  const isCard = (e) => isBox(e) && px(st(e).borderTopLeftRadius) >= 4;
  const tally = (list, n = 12) => Object.entries(list.reduce((m, t) => ((m[t] = (m[t] || 0) + 1), m), {})).sort((a, b) => b[1] - a[1]).slice(0, n);
  const perScreen = (ys) => { ys.sort((a, b) => a - b); let best = 0; for (let i = 0, j = 0; i < ys.length; i++) { while (ys[i] - ys[j] >= H) j++; best = Math.max(best, i - j + 1); } return best; };
  const cv = (v) => { const m = v.reduce((a, b) => a + b, 0) / v.length; return m ? Math.sqrt(v.reduce((a, b) => a + (b - m) ** 2, 0) / v.length) / m : 0; };

  const seen = all.filter(shown), content = seen.filter((e) => !chrome(e)), contentSet = new Set(content);
  const parents = new Set(content.map((e) => e.parentElement).filter(Boolean));
  const navTexts = new Set(seen.filter((e) => chrome(e) && e.matches('a, button')).map((e) => txt(e).toLowerCase()));

  // Small uppercase labels: the annotation voice (eyebrows, kickers, part names, table heads).
  const labels = content.filter((e) => {
    const t = own(e), s = st(e), f = px(s.fontSize);
    if (t.length < 2 || t.length > 60 || f > 13.5 || !/[a-z]/i.test(t)) return false;
    const upper = s.textTransform === 'uppercase' || (t === t.toUpperCase() && /[A-Z]{3}/.test(t));
    return upper && (s.textTransform === 'uppercase' || px(s.letterSpacing) / f >= 0.03);
  });
  const labelSet = new Set(labels);
  const isNumber = (e) => /^[~≈<>+−-]?\s*\d/.test(own(e)) && own(e).length <= 14;
  let headings = content.filter((e) => !labelSet.has(e) && !isNumber(e) && (e.matches('h1, h2, h3, h4, h5, h6, [role=heading]') || (px(st(e).fontSize) >= 20 && own(e).length >= 3)));
  headings = headings.filter((h) => !headings.some((o) => o !== h && o.contains(h)));

  // Eyebrows: a label sitting just above a heading. Restating: its words are already in the heading or the nav.
  const eyebrows = [], restating = [];
  for (const l of labels) {
    const a = box(l);
    const h = headings.filter((x) => !x.contains(l)).map((x) => [x, box(x)])
      .filter(([, b]) => b.y >= a.y + a.h - 2 && b.y - (a.y + a.h) <= 40 && a.x < b.x + b.w && a.x + a.w > b.x)
      .sort((p, q) => p[1].y - q[1].y)[0];
    if (!h) continue;
    eyebrows.push(own(l));
    const lw = words(own(l)), hw = new Set(words(txt(h[0])));
    const shared = lw.filter((w) => hw.has(w) || hw.has(w.replace(/s$/, '')) || hw.has(`${w}s`)).length;
    if (lw.length && shared >= Math.max(1, lw.length / 2)) restating.push(`${own(l)} → heading: ${txt(h[0]).replace(/\s+/g, ' ').slice(0, 60)}`);
    else if (navTexts.has(own(l).toLowerCase())) restating.push(`${own(l)} → a navigation link`);
  }

  // Lines of smaller text right under a heading; the meta ones describe the page instead of adding to it.
  const meta = /\b(this (page|section|chapter|view|deck)|below|each (one|of these)|sets out|you['’]ll (find|see|learn)|we['’]ll (cover|walk|look)|here['’]s|at a glance|on this page)\b/i;
  const blocks = content.filter((e) => own(e).length >= 30);
  const contextLines = [];
  for (const h of headings) {
    const b = box(h), f = px(st(h).fontSize);
    const p = blocks.find((x) => { if (h.contains(x) || x.contains(h)) return false; const c = box(x); return c.y >= b.y + b.h - 2 && c.y - (b.y + b.h) <= 36 && c.x < b.x + b.w && c.x + c.w > b.x && px(st(x).fontSize) < f; });
    if (p && !contextLines.includes(txt(p))) contextLines.push(txt(p));
  }

  const linkLike = content.filter((e) => e.matches('a, button, [role=button]'));
  const arrows = linkLike.filter((e) => /[→⟶➝➔➜↗›»]|->/.test(txt(e)) || (e.lastElementChild?.matches('svg') && txt(e)) || /[→›»↗]/.test(st(e, '::after').content)).map(txt);
  const tagEls = content.filter((e) => {
    const t = own(e), s = st(e), b = box(e);
    if (!t || t.length > 30 || t.split(' ').length > 4 || px(s.fontSize) > 12.5 || b.w > 260 || b.h > 32 || px(s.borderTopLeftRadius) < 2) return false;
    return (px(s.borderTopWidth) >= 0.5 && s.borderTopStyle !== 'none') || (opaque(s.backgroundColor) && s.backgroundColor !== groundOf(e.parentElement));
  });
  const numbered = content.map(own).filter((t) => /^\s*0\d\b|^\s*(step|phase)\s+\d+\b/i.test(t));
  const figRe = /\bfig(?:ure)?\.?\s*\d+(?:\.\d+)?/gi;
  const figs = content.flatMap((e) => own(e).match(figRe) || []);
  const figRefs = (content.filter((e) => e.matches('p') && txt(e).length >= 60).map(txt).join(' ').match(figRe) || []).length;
  const firstNode = (e) => [...e.childNodes].find((n) => n.nodeType === 1 || (n.nodeType === 3 && n.data.trim()));
  const icon = (n) => n?.nodeType === 1 && n.matches('svg, img, i, [class*=icon]') && box(n).w > 0 && box(n).w <= 28 && box(n).h <= 28;
  const iconLabels = content.filter((e) => icon(firstNode(e)) && txt(e).length >= 2 && txt(e).length <= 40).map((e) => txt(e).replace(/\s+/g, ' '));
  const iconTiles = content.filter((e) => { const b = box(e); return e.children.length === 1 && e.firstElementChild.matches('svg, img') && b.w >= 24 && b.w <= 72 && b.h <= 72 && opaque(st(e).backgroundColor) && st(e).backgroundColor !== groundOf(e.parentElement); }).length;
  const bigNumbers = content.filter((e) => { const t = own(e); return px(st(e).fontSize) >= 28 && t.length <= 14 && /^[~≈<>+−-]?\s*\d/.test(t); }).map(own);

  // Card grids: three or more same-width rounded boxes side by side, and how alike they are.
  const cardGroups = [];
  for (const parent of parents) {
    const kids = [...parent.children].filter((k) => contentSet.has(k) && isCard(k));
    if (kids.length < 3) continue;
    const ws = kids.map((k) => box(k).w).sort((a, b) => a - b), med = ws[Math.floor(ws.length / 2)];
    const ks = kids.filter((k) => Math.abs(box(k).w - med) / med <= 0.03);
    if (ks.length < 3) continue;
    const skeleton = (k) => [...k.children].map((c) => c.tagName).join('.');
    cardGroups.push({ cards: ks.length, sameTemplate: `${Math.round((tally(ks.map(skeleton))[0][1] / ks.length) * 100)}%`, lengthSpread: +cv(ks.map((k) => txt(k).length)).toFixed(2), first: txt(ks[0]).split('\n')[0].slice(0, 50) });
  }
  const cards = new Set(content.filter(isCard));
  const depth = (e) => { let d = 0; for (let a = e.parentElement; a; a = a.parentElement) if (cards.has(a)) d++; return d; };
  const depths = [...cards].filter((c) => !c.closest('figure, table, [role=figure], [role=img], [role=table]')).map(depth);

  const twoTone = headings.filter((h) => {
    const by = {}, w = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
    for (let n; (n = w.nextNode());) { const t = n.data.trim(), c = st(n.parentElement).color; if (t) by[c] = (by[c] || 0) + t.length; }
    return Object.values(by).filter((n) => n >= 8).length >= 2;
  }).map((h) => txt(h).replace(/\s+/g, ' '));
  const titles = [...new Set([...headings, ...content.filter((e) => { const t = own(e), n = t.split(' ').length; return n >= 3 && n <= 14 && px(st(e).fontWeight) >= 500 && px(st(e).fontSize) >= 13 && !e.closest('p, li, a, button'); })])];
  const countLed = titles.map((h) => txt(h).replace(/\s+/g, ' ')).filter((t) => t.split(/(?<=[.!?])\s+/).some((part) => part.split(' ').length >= 3 && /^(\d{1,3}(?![\d,.])|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\b/i.test(part)));

  // Sibling groups (grid or row children, list items) by size: does three dominate?
  const sizes = [];
  for (const parent of parents) {
    const s = st(parent);
    if (!(parent.matches('ul, ol') || s.display.includes('grid') || (s.display.includes('flex') && !s.flexDirection.startsWith('column')))) continue;
    const kids = [...parent.children].filter((k) => contentSet.has(k) && txt(k).length > 15);
    if (kids.length >= 2 && kids.length <= 12 && kids.every((k) => k.tagName === kids[0].tagName)) sizes.push(kids.length);
  }

  const pills = linkLike.filter((e) => { const b = box(e), s = st(e); return b.h >= 24 && b.h <= 64 && px(s.borderTopLeftRadius) >= b.h / 2 - 1 && (opaque(s.backgroundColor) || px(s.borderTopWidth) > 0); });
  const sat = (c) => { const [r, gr, b] = rgba(c).slice(0, 3).map((v) => v / 255), mx = Math.max(r, gr, b), mn = Math.min(r, gr, b), l = (mx + mn) / 2; return mx === mn ? 0 : (mx - mn) / (1 - Math.abs(2 * l - 1)); };
  const effects = { pattern: 0, gradientFill: 0, gradientText: 0, glow: 0, glass: 0 };
  for (const e of seen) for (const pseudo of [null, '::before', '::after']) {
    const s = st(e, pseudo), b = box(e);
    if (pseudo && (s.content === 'none' || s.content === 'normal')) continue;
    const clipText = s.backgroundClip === 'text' || s.webkitBackgroundClip === 'text';
    if (/gradient/.test(s.backgroundImage) && !clipText) { if ((s.backgroundSize.match(/[\d.]+px/g) || []).some((v) => px(v) <= 48)) effects.pattern++; else if (b.w * b.h > 20000) effects.gradientFill++; }
    if (pseudo) continue;
    if (clipText && /gradient/.test(s.backgroundImage)) effects.gradientText++;
    if (s.boxShadow !== 'none' && !e.closest('dialog, [role=dialog]') && (s.boxShadow.match(/-?[\d.]+px/g) || []).map(px)[2] >= 24) effects.glow++;
    if (/blur/.test(s.backdropFilter || '')) effects.glass++;
  }
  const modeSwitch = seen.some((e) => chrome(e) && e.matches('button, [role=switch], input') && /dark|light|theme|mode/i.test(`${e.getAttribute('aria-label') || ''} ${e.title} ${txt(e)}`));

  // How much of the text is in the main (highest-contrast) colour, and how much in greys.
  const ink = {}, tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n; (n = tw.nextNode());) { const p = n.parentElement, t = n.data.trim(); if (t && contentSet.has(p)) ink[st(p).color] = (ink[st(p).color] || 0) + t.length; }
  const total = Object.values(ink).reduce((a, b) => a + b, 0) || 1;
  const lum = (c) => { const [r, gr, b] = rgba(c).slice(0, 3).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * gr + 0.0722 * b; };
  const ground = groundOf(document.querySelector('main') || document.body);
  const contrast = (c) => { const [x, y] = [lum(c), lum(ground)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  const mainInk = Object.keys(ink).filter((c) => ink[c] / total >= 0.05).sort((a, b) => contrast(b) - contrast(a))[0];

  // The page's own words, read with the chrome hidden, for the copy checks.
  const hide = seen.filter((e) => chrome(e) && !(e.parentElement && chrome(e.parentElement)));
  const was = hide.map((e) => e.style.display); hide.forEach((e) => (e.style.display = 'none'));
  const text = document.body.innerText; hide.forEach((e, i) => (e.style.display = was[i]));

  return {
    length: document.documentElement.scrollHeight, text, modeSwitch,
    counts: {
      labels: labels.length, labelsPerScreen: perScreen(labels.filter(inViewX).map((e) => box(e).y)), headings: headings.length, eyebrows: eyebrows.length,
      eyebrowsRestating: restating.length, contextLines: contextLines.length, metaLines: contextLines.filter((t) => meta.test(t)).length,
      tags: tagEls.length, tagsPerScreen: perScreen(tagEls.filter(inViewX).map((e) => box(e).y)), zeroPadded: numbered.length, figLabels: figs.length, figRefsInText: figRefs,
      iconLabels: iconLabels.length, iconTiles, arrowLinks: arrows.length, twoToneHeadings: twoTone.length, countLedHeadings: countLed.length,
      cardGroups: cardGroups.length, cardsInCards: depths.filter((d) => d >= 1).length, cardsThreeDeep: depths.filter((d) => d >= 2).length,
      bigNumbers: bigNumbers.length, siblingGroups: sizes.length, groupsOfThree: sizes.filter((n) => n === 3).length,
      pillButtons: pills.length, accentPills: pills.filter((e) => sat(st(e).backgroundColor) >= 0.45).length, ...effects,
      mainInkShare: Math.round(((ink[mainInk] || 0) / total) * 100),
    },
    examples: {
      labels: tally(labels.map(own), 40), eyebrows: tally(eyebrows, 20), restating, contextLines, metaLines: contextLines.filter((t) => meta.test(t)),
      tags: tally(tagEls.map(own)), numbered: tally(numbered), figs: tally(figs), iconLabels: tally(iconLabels), arrows: tally(arrows), twoTone, countLed,
      cardGroups, bigNumbers, inkColours: Object.entries(ink).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([c, n]) => `${c} ${Math.round((n / total) * 100)}%${c === mainInk ? ' (main)' : ''}`),
    },
  };
}

// Copy checks run on the page's text, outside the browser.
const vocab = /\b(seamless(ly)?|unlock|empower|elevate|leverage|robust|delve|streamline|cutting[- ]edge|game[- ]chang\w*|supercharge|effortless(ly)?|revolutioni[sz]e|next[- ]level|harness|holistic|synerg\w*|actionable|transformative|reimagine|at scale|in today['’]s|whether you['’]re|look no further|dive in|the bottom line|key takeaways?|why it matters)\b/gi;
const pairs = [/[,;:—]\s+not\s+(?:a|an|the|just|only|yet|merely)?\s*[\w’'-]+/gi, /\bnot\s+(?:just|only|merely)\b[^.!?]{0,80}?\bbut\b/gi, /\b(?:isn['’]t|aren['’]t|is not|are not)\b[^.!?]{0,80}[.!?]\s+(?:it['’]s|they['’]re|this is|that['’]s)\b/gi, /\bmore than (?:just )?an?\b/gi];
const split = (t) => t.split('\n').flatMap((l) => l.split(/(?<=[.!?])\s+(?=[A-Z0-9"“‘(])/)).map((s) => s.trim()).filter(Boolean);
const norm = (s) => s.toLowerCase().replace(/[“”"‘’']/g, "'").replace(/^(then|and|but|so)\s+/, '').replace(/[.!?:;,]+$/, '').replace(/\s+/g, ' ');
const repeats = (list, min) => Object.entries(list.reduce((m, s) => ((m[norm(s)] = (m[norm(s)] || 0) + 1), m), {})).filter(([, n]) => n >= min).sort((a, b) => b[1] - a[1]);
function copyChecks(text) {
  const all = split(text), sentences = all.filter((s) => /[.!?]$/.test(s) && s.split(' ').length >= 6);
  const phrases = all.filter((s) => { const n = s.split(' ').length; return n >= 2 && n <= 5 && /[a-z]/i.test(s); });
  const pairHits = pairs.flatMap((re) => text.match(re) || []), stock = text.match(vocab) || [];
  return {
    counts: { repeatedSentences: repeats(sentences, 2).length, repeatedPhrases: repeats(phrases, 3).length, contrastPairs: pairHits.length, emDashes: (text.match(/—|\s–\s/g) || []).length, stockWords: stock.length, emoji: (text.match(/\p{Extended_Pictographic}/gu) || []).length },
    examples: { repeatedSentences: repeats(sentences, 2).slice(0, 10), repeatedPhrases: repeats(phrases, 3).slice(0, 10), contrastPairs: pairHits.slice(0, 10), stockWords: [...new Set(stock.map((w) => w.toLowerCase()))] },
    sentences: sentences.map(norm),
  };
}

const browser = await pw.chromium.launch();
const views = [{ name: 'desktop', width: 1440, height: 900 }, ...(opt.phone ? [{ name: 'phone', width: 390, height: 844 }] : [])];
const results = [];
const hiddenText = () => [...document.querySelectorAll('main *, [role=main] *, body > div *')].filter((e) => e.innerText?.trim() && getComputedStyle(e).opacity < 0.1).length;
for (const v of views) for (const url of urls) {
  const ctx = await browser.newContext({ viewport: { width: v.width, height: v.height } });
  if (opt.init) await ctx.addInitScript(opt.init);
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  if (opt.wait) await page.waitForSelector(opt.wait, { timeout: 15000 });
  await page.waitForTimeout(400);
  const before = await page.evaluate(hiddenText);
  for (let y = 0, end = await page.evaluate(() => document.documentElement.scrollHeight); y < end; y += v.height * 0.8) { await page.evaluate((t) => scrollTo(0, t), y); await page.waitForTimeout(60); }
  await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(400);
  const after = await page.evaluate(hiddenText);
  const m = await page.evaluate(measure), c = copyChecks(m.text);
  results.push({ url, view: v.name, length: m.length, modeSwitchInBar: m.modeSwitch, counts: { ...m.counts, ...c.counts, scrollReveal: Math.max(0, before - after) }, examples: { ...m.examples, ...c.examples }, sentences: c.sentences });
  await ctx.close();
}
await browser.close();

// Sentences that recur across pages (desktop), e.g. the same caveat under every figure.
const where = {};
for (const r of results.filter((x) => x.view === 'desktop')) for (const s of new Set(r.sentences)) (where[s] ||= new Set()).add(r.url.replace(/\?[^#]*/, '')); // ?theme=… variants are one page
const acrossPages = Object.entries(where).map(([s, p]) => [s, [...p]]).filter(([, p]) => p.length >= 2).sort((a, b) => b[1].length - a[1].length);
fs.writeFileSync(opt.out, JSON.stringify({ acrossPages, results: results.map(({ sentences, ...r }) => r) }, null, 2));

const rows = [
  ['Labels and scaffolding'], ['labels', 'Small uppercase labels'], ['labelsPerScreen', '  most on one screen'], ['headings', 'Headings'], ['eyebrows', 'Eyebrows over headings'],
  ['eyebrowsRestating', '  repeating heading or nav'], ['contextLines', 'Lines under headings'], ['metaLines', '  describing the page'], ['tags', 'Tags and chips'],
  ['tagsPerScreen', '  most on one screen'], ['zeroPadded', 'Zero-padded numbers'], ['figLabels', 'FIG labels'], ['figRefsInText', '  referred to in text'],
  ['iconLabels', 'Icon + label pairs'], ['iconTiles', 'Icons in coloured tiles'], ['arrowLinks', 'Links with arrows'],
  ['Copy'], ['twoToneHeadings', 'Two-tone headings'], ['countLedHeadings', 'Headings led by a count'], ['repeatedSentences', 'Sentences said twice'],
  ['repeatedPhrases', 'Phrases said 3+ times'], ['contrastPairs', '"X, not Y" contrasts'], ['emDashes', 'Em dashes'], ['stockWords', 'Stock AI words'], ['emoji', 'Emoji'],
  ['Layout'], ['cardGroups', 'Grids of look-alike cards'], ['cardsInCards', 'Cards inside cards'], ['cardsThreeDeep', '  three deep'], ['bigNumbers', 'Big stat numbers'],
  ['groupsOfThree', 'Groups of exactly three'], ['siblingGroups', '  of all groups'], ['pillButtons', 'Pill buttons'], ['accentPills', '  filled with the accent'],
  ['Surface and motion'], ['pattern', 'Dot or grid textures'], ['gradientFill', 'Gradient fills'], ['gradientText', 'Gradient text'], ['glow', 'Glows and soft shadows'],
  ['glass', 'Frosted glass'], ['mainInkShare', '% of words in main ink'], ['scrollReveal', 'Fade-in on scroll'],
];
const name = (u) => (u.includes('#') ? u.split('#')[1] : u.replace(/^\w+:\/\/[^/]*/, '')).slice(-14) || '/';
for (const v of views) {
  const rs = results.filter((r) => r.view === v.name);
  console.log(`\n${`${v.name} · ${v.width}px`.padEnd(28)}${rs.map((r) => name(r.url).padStart(15)).join('')}`);
  for (const [k, label] of rows) console.log(label ? label.padEnd(28) + rs.map((r) => String(r.counts[k]).padStart(15)).join('') : `-- ${k}`);
  console.log('Mode switch in the bar'.padEnd(28) + rs.map((r) => (r.modeSwitchInBar ? 'yes' : 'no').padStart(15)).join(''));
  console.log('Page length (px)'.padEnd(28) + rs.map((r) => String(r.length).padStart(15)).join(''));
}
console.log(`\nSentences repeated across pages: ${acrossPages.length}`);
for (const [s, p] of acrossPages.slice(0, 8)) console.log(`  on ${p.length} pages: "${s.slice(0, 90)}"`);
console.log(`\nThe texts behind every count are in ${opt.out}`);
```

Screenshots and comparison sheets come from the `render-checks` skill.
