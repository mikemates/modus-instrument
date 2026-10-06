---
name: "render-checks"
description: "Render a web build to show options or prove what changed: screenshots at set widths and themes, labelled comparison sheets, pixel-for-pixel comparisons against a chosen render or the previous build (including a check that tells a real change from a sub-pixel shift), an accessibility check (axe-core, WCAG 2.2 AA) and a sideways-scroll sweep. Use when laying out design options side by side, running an accessibility check, confirming a build matches the chosen option, verifying that a refactor or re-sync changed nothing it shouldn't, checking every state of a screen, or before calling a visual change done."
---

# render-checks

Pictures settle visual choices; measurements prove a build. This skill holds the tools for both and the traps that cost time. It runs in Claude's cloud workspace, where Playwright and Chromium are preinstalled (require Playwright from `/opt/npm-tools/node_modules` if a plain `require` fails). Anywhere else, run `npm i playwright` in a scratch folder outside the project.

Write the scripts below into a scratch folder outside the project (`$SCRATCH` in the commands), and keep their output there too; nothing they make goes into the project.

## 1. Serve the build

- Render the production build, not the dev server: `npm run build`, then serve `dist` in the background and check it answers before rendering:
  ```bash
  (nohup npx vite preview --port 4173 --strictPort > "$SCRATCH/preview-4173.log" 2>&1 &); sleep 3; curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4173/
  ```
- A running preview serves a new build without a restart, but it doesn't always survive a pause between turns: curl it again before every round.
- Stop it in a command of its own: `pkill -f "[v]ite preview"`. A pattern that also matches the shell's own command line kills that shell (exit 144, no output).
- **The build from before.** To compare with the version before a round, copy the project to a second folder (leave out `node_modules` and `dist`), link its `node_modules` (`ln -s`), build it, and serve it on another port (4174). Keep it until the round is checked: it's also how you find out whether a failure is older than the round.
- **A password-protected build** (the Modus password gate): open each browser context with the key already remembered, so checks land past the password. Make `key.js` once with the script below; the salt and iterations are in `gate.config.mjs`, and the storage key is in `src/gate/main.ts`. Wait for the app's root (`--wait "#root main"`) before measuring. To check the entry page itself, leave the key out.

```js
// For a site behind the Modus password gate: writes key.js, which a browser context runs first (addInitScript)
// so checks land past the password. Read the salt, iterations and storage key from gate.config.mjs and src/gate/main.ts.
// Usage: node make-key.mjs <password> <salt-base64> <iterations> <storage-key> > key.js
import { pbkdf2Sync } from 'node:crypto';
const [password, salt, iterations, store] = process.argv.slice(2);
const key = pbkdf2Sync(password, Buffer.from(salt, 'base64'), Number(iterations), 32, 'sha256').toString('base64');
console.log(`localStorage.setItem(${JSON.stringify(store)}, ${JSON.stringify(JSON.stringify({ salt, key }))});`);
```

## 2. Shoot

- **Full-page shots from the top.** Taken after scrolling, they draw sticky bars in the middle of the page; use a viewport shot for a scrolled view.
- **Widths, the same everywhere:**
  - options and before/after: 1440 × 900 and a phone (390 × 844), in each theme the project has;
  - the final check adds 1920 and 2560 where the layout grows with the window (Modus Instrument's column and hero do);
  - the sideways sweep runs from 320 to 1920px.
- **Themes:** shoot each theme the project has, set the way the project sets it. Modus Instrument: `data-theme` on `<html>` after load, or a query parameter when the app reads one (`--theme-param theme`); otherwise the app may set its own theme back. Another library: its own switch, through `--theme-param` or an `--init` script. A project with one theme gets one.
- **Wait for fonts** (`document.fonts.ready`) and use reduced motion, so shots are stable.
- **An element shot** (`--clip`): scroll it into view first, and add `scrollY` to its top if you compute a clip box yourself.

Several pages, both themes, desktop and phone:

```js
// Full-page shots of several pages in each theme at desktop and phone, for before/after comparisons.
// Usage: node shoot-all.mjs <out-dir> [--themes paper,ink] [--theme-param theme] [--views desktop:1440x900,phone:390x844]
//          [--init key.js] [--wait css] URL...
//   Themes are set on <html data-theme> after load, or with --theme-param as a query parameter (for apps that read it).
//   Files are named <page>[_<query>]-<theme>-<view>.png, so /?hero=a and /?hero=b don't overwrite each other.
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let pw;
for (const p of ['playwright', '/opt/npm-tools/node_modules/playwright']) { try { pw = require(p); break; } catch {} }
const args = process.argv.slice(2), out = args.shift(), urls = [], o = { themes: 'paper,ink', views: 'desktop:1440x900,phone:390x844' };
for (let i = 0; i < args.length; i++) { if (args[i].startsWith('--')) o[args[i].slice(2)] = args[++i]; else urls.push(args[i]); }
fs.mkdirSync(out, { recursive: true });
const init = o.init ? fs.readFileSync(o.init, 'utf8') : null;
const name = (s) => {
  const u = new URL(s); if (o['theme-param']) u.searchParams.delete(o['theme-param']);
  const page = u.hash.replace(/^#\/?/, '') || u.pathname.replace(/^\/|\/$/g, '') || 'home';
  const q = [...u.searchParams].map(([k, v]) => `${k}-${v}`).join('_');
  return (q ? `${page}_${q}` : page).replace(/[^\w-]+/g, '-');
};
const views = o.views.split(',').map((v) => { const [label, size] = v.split(':'); const [width, height] = size.split('x').map(Number); return [label, { width, height }]; });
const browser = await pw.chromium.launch();
for (const [view, vp] of views) for (const theme of o.themes.split(',')) for (const url of urls) {
  const ctx = await browser.newContext({ viewport: vp, reducedMotion: 'reduce' });
  if (init) await ctx.addInitScript(init);
  const page = await ctx.newPage();
  const u = new URL(url); if (o['theme-param']) u.searchParams.set(o['theme-param'], theme);
  await page.goto(u.toString(), { waitUntil: 'networkidle' });
  if (o.wait) await page.waitForSelector(o.wait, { timeout: 15000 });
  if (!o['theme-param']) await page.evaluate((t) => { document.documentElement.dataset.theme = t; }, theme);
  await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(500);
  await page.screenshot({ path: `${out}/${name(url)}-${theme}-${view}.png`, fullPage: true });
  await ctx.close();
}
await browser.close();
console.log(`shots in ${out}`);
```

One view, or one element:

```bash
node shoot.mjs URL now-desktop.png --theme ink --clip "css of the element" --hide "css of a sticky bar"
node shoot.mjs URL now-phone.png --width 390 --height 844 --full
```

```js
// Screenshot one view. Usage: node shoot.mjs URL out.png [--width 1440] [--height 900] [--theme paper|ink] [--theme-param theme]
//                                                  [--init key.js] [--wait css] [--clip css] [--hide css] [--full]
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let pw;
for (const p of ['playwright', '/opt/npm-tools/node_modules/playwright']) { try { pw = require(p); break; } catch {} }
const [url, out, ...rest] = process.argv.slice(2), o = { width: 1440, height: 900 };
for (let i = 0; i < rest.length; i++) { const k = rest[i].slice(2); o[k] = k === 'full' ? true : rest[++i]; }
const browser = await pw.chromium.launch();
const ctx = await browser.newContext({ viewport: { width: +o.width, height: +o.height }, reducedMotion: 'reduce' });
if (o.init) await ctx.addInitScript(fs.readFileSync(o.init, 'utf8'));
const page = await ctx.newPage();
const u = new URL(url); if (o.theme && o['theme-param']) u.searchParams.set(o['theme-param'], o.theme);
await page.goto(u.toString(), { waitUntil: 'networkidle' });
if (o.wait) await page.waitForSelector(o.wait, { timeout: 15000 });
if (o.theme && !o['theme-param']) await page.evaluate((t) => { document.documentElement.dataset.theme = t; }, o.theme);
if (o.hide) await page.addStyleTag({ content: `${o.hide}{visibility:hidden!important}` }); // e.g. a sticky bar over a clipped element
await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(500);
if (o.clip) { const el = page.locator(`${o.clip} >> visible=true`).first(); await el.scrollIntoViewIfNeeded(); await page.waitForTimeout(300); await el.screenshot({ path: out }); }
else await page.screenshot({ path: out, fullPage: !!o.full });
await browser.close();
```

## 3. Compare pixel for pixel

Compare a build with the render that was chosen, or with the build from before. Any difference must be an intended change, and the decision log names it.

```python
# Compare two folders of screenshots with the same file names: identical, a size change, or the box that differs.
# Usage: python3 compare.py before/ after/
import os, sys
from PIL import Image, ImageChops
a_dir, b_dir = sys.argv[1], sys.argv[2]
for f in sorted(os.listdir(a_dir)):
    if not f.endswith('.png') or not os.path.exists(os.path.join(b_dir, f)): continue
    a, b = (Image.open(os.path.join(d, f)).convert('RGB') for d in (a_dir, b_dir))
    if a.size != b.size:
        h = min(a.height, b.height)
        first = next((y for y in range(h) if ImageChops.difference(a.crop((0, y, a.width, y + 1)), b.crop((0, y, b.width, y + 1))).getbbox()), None)
        print(f'{f:40s} size {a.size} -> {b.size}, first differing row {first}')
        continue
    d = ImageChops.difference(a, b); box = d.getbbox()
    px = d.get_flattened_data() if hasattr(d, 'get_flattened_data') else d.getdata()
    print(f'{f:40s} ' + ('identical' if box is None else f'differs in {box}, {sum(1 for p in px if max(p) > 0)} px'))
```

- **A size change** means something above moved: compare the part above the first differing row, then the part below with the offset.
- **A sub-pixel shift:** when content above a block changes height by a fraction of a pixel, its text anti-aliases differently with nothing else changed. Prove it with the nudge script: one of 64 small offsets matches exactly. Shoot the reference and the nudges with the same page setup (the same injected styles).
- **Prove an intended change is the only one:** set that one change back with an injected style (for example the old padding) and compare again; the pages should then match exactly.
- **When pixels can't say why,** compare every element's top, height, font size and line height between the two builds in the DOM, to find what moved.

```js
// Proves a difference is only a sub-pixel shift: re-shoots a view with an extra k/64 px pushed in by a CSS template,
// for k = 0…63, and reports the values of k at which it matches the reference shot exactly.
// Usage: node nudge.mjs <url> <reference.png> --css "main{padding-top:calc(40px + {k}px/64)!important}"
//          [--clip css] [--crop-height 260] [--width 1440] [--height 900] [--theme ink] [--theme-param theme] [--init key.js] [--wait css]
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let pw;
for (const p of ['playwright', '/opt/npm-tools/node_modules/playwright']) { try { pw = require(p); break; } catch {} }
const [url, ref, ...rest] = process.argv.slice(2), o = { width: 1440, height: 900 };
for (let i = 0; i < rest.length; i++) o[rest[i].slice(2)] = rest[++i];
const want = fs.readFileSync(ref);
const browser = await pw.chromium.launch();
const ctx = await browser.newContext({ viewport: { width: +o.width, height: +o.height }, reducedMotion: 'reduce' });
if (o.init) await ctx.addInitScript(fs.readFileSync(o.init, 'utf8'));
const hits = [];
for (let k = 0; k < 64; k++) {
  const page = await ctx.newPage();
  const u = new URL(url); if (o.theme && o['theme-param']) u.searchParams.set(o['theme-param'], o.theme);
  await page.goto(u.toString(), { waitUntil: 'networkidle' });
  if (o.wait) await page.waitForSelector(o.wait, { timeout: 15000 });
  if (o.theme && !o['theme-param']) await page.evaluate((t) => { document.documentElement.dataset.theme = t; }, o.theme);
  await page.addStyleTag({ content: o.css.replaceAll('{k}', String(k)) });
  await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(150);
  let shot;
  if (o.clip) {
    const el = page.locator(`${o.clip} >> visible=true`).first(); await el.scrollIntoViewIfNeeded();
    const b = await el.boundingBox(), y = await el.evaluate((e) => e.getBoundingClientRect().top + scrollY);
    shot = await page.screenshot({ clip: { x: b.x, y, width: b.width, height: o['crop-height'] ? Math.min(+o['crop-height'], b.height) : b.height }, fullPage: true });
  } else shot = await page.screenshot({ fullPage: true });
  if (Buffer.compare(shot, want) === 0) hits.push(k);
  await page.close();
}
await browser.close();
console.log(hits.length ? `Matches the reference exactly at k = ${hits.join(', ')} (in 64ths of a pixel): only a sub-pixel shift.` : 'No nudge matches: the difference is real.');
```

## 4. Comparison sheets

Show options as one labelled sheet per decision: a title naming it, one line saying what the options share, then the panels, desktop and phone side by side. Keep sheets at about 0.2–0.7 MB, in full colour when colour is part of the question (a 256-colour palette greys violet text).

```bash
python3 sheet.py cards.png "Feature cards" "All three keep the same content." "Now=now.png" "A · Simplify=a.png" "B · Bespoke (Recommended)=b.png"
```

```python
# Labelled comparison sheet: panels in rows, each row at one height. Usage:
# python3 sheet.py out.png "Title" "What the options share" "Now=now.png" "A · Simplify=a.png" "B · Bespoke (Recommended)=b.png" [--cols 3] [--width 2000] [--palette]
import sys
from PIL import Image, ImageDraw, ImageFont
args = sys.argv[1:]
opt = lambda k, d: args[args.index(k) + 1] if k in args else d
cols, width, palette = int(opt('--cols', 3)), int(opt('--width', 2000)), '--palette' in args
pos = [a for i, a in enumerate(args) if not a.startswith('--') and (i == 0 or args[i - 1] not in ('--cols', '--width'))]
out, title, sub, panels = pos[0], pos[1], pos[2], [p.split('=', 1) for p in pos[3:]]
def font(size, bold=False):
    for f in (['DejaVuSans-Bold.ttf', 'Arial Bold.ttf', 'Helvetica.ttc'] if bold else ['DejaVuSans.ttf', 'Arial.ttf', 'Helvetica.ttc']):
        try: return ImageFont.truetype(f, size)
        except OSError: pass
    return ImageFont.load_default(size=size)
pad, gap, ft, fs, fl = 40, 28, font(34, True), font(22), font(24, True)
d0 = ImageDraw.Draw(Image.new('RGB', (1, 1)))
lines, line = [], ''
for w in sub.split():
    if d0.textlength(f'{line} {w}'.strip(), font=fs) > width - 2 * pad: lines.append(line); line = w
    else: line = f'{line} {w}'.strip()
lines.append(line)
imgs = [Image.open(p).convert('RGB') for _, p in panels]
rows, placed = [list(range(i, min(i + cols, len(imgs)))) for i in range(0, len(imgs), cols)], []
y = pad + 50 + len(lines) * 30 + 20
for r in rows:  # one height per row, so a phone shot sits beside a desktop shot at the same height
    h = min((width - 2 * pad - gap * (len(r) - 1)) / sum(imgs[i].width / imgs[i].height for i in r), 1500)
    x = pad
    for i in r:
        w = round(imgs[i].width * h / imgs[i].height)
        placed.append((panels[i][0], imgs[i].resize((w, round(h)), Image.LANCZOS), x, y)); x += w + gap
    y += 40 + round(h) + gap
sheet = Image.new('RGB', (width, y - gap + pad), (38, 38, 42)); d = ImageDraw.Draw(sheet)
d.text((pad, pad), title, font=ft, fill=(245, 245, 247))
for i, l in enumerate(lines): d.text((pad, pad + 52 + i * 30), l, font=fs, fill=(200, 200, 206))
for label, im, x, top in placed:
    d.text((x, top), label, font=fl, fill=(245, 245, 247)); sheet.paste(im, (x, top + 40))
if palette: sheet = sheet.quantize(256)  # only when it runs large and colour isn't the question
sheet.save(out, optimize=True)
print(out, sheet.size)
```

## 5. Accessibility check

No checker is preinstalled: run `npm i axe-core` in the scratch folder. Check every touched page in each theme on desktop and phone, the entry page included. axe can't measure contrast over a texture or a dot grid ("needs review"): work those out from the token values. When it finds a failure, check the build from before: a failure older than the round gets its own fix and its own log entry.

```js
// WCAG 2.2 AA check with axe-core, desktop and phone, in each theme. Install once, in a scratch folder: npm i axe-core
// Usage: node axe-check.mjs [--themes paper,ink] [--theme-param theme] [--init key.js] [--wait css] URL...
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let pw;
for (const p of ['playwright', '/opt/npm-tools/node_modules/playwright']) { try { pw = require(p); break; } catch {} }
const axe = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const args = process.argv.slice(2), urls = [], o = { themes: 'paper,ink' };
for (let i = 0; i < args.length; i++) { if (args[i].startsWith('--')) o[args[i].slice(2)] = args[++i]; else urls.push(args[i]); }
const init = o.init ? fs.readFileSync(o.init, 'utf8') : null;
const browser = await pw.chromium.launch();
let failures = 0;
for (const [view, vp] of [['desktop', { width: 1440, height: 900 }], ['phone', { width: 390, height: 844 }]]) for (const theme of o.themes.split(',')) for (const url of urls) {
  const ctx = await browser.newContext({ viewport: vp, reducedMotion: 'reduce' });
  if (init) await ctx.addInitScript(init);
  const page = await ctx.newPage();
  const u = new URL(url); if (o['theme-param']) u.searchParams.set(o['theme-param'], theme);
  await page.goto(u.toString(), { waitUntil: 'networkidle' });
  if (o.wait) await page.waitForSelector(o.wait, { timeout: 15000 });
  if (!o['theme-param']) await page.evaluate((t) => { document.documentElement.dataset.theme = t; }, theme);
  await page.waitForTimeout(400);
  await page.addScriptTag({ content: axe });
  const v = await page.evaluate(async () => (await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } })).violations
    .map((x) => `${x.id} ×${x.nodes.length}: ${x.nodes.slice(0, 2).map((n) => n.target.join(' ')).join(' | ')}`));
  failures += v.length;
  console.log(`${view.padEnd(7)} ${theme.padEnd(5)} ${url}  ${v.length ? '\n  ' + v.join('\n  ') : 'no violations'}`);
  await ctx.close();
}
await browser.close();
process.exitCode = failures ? 1 : 0;
```

## 6. Every state, not just the first load

A page opens in its default state, so a check of its URL proves only that one. Give each state a way to be opened on purpose (a labelled stub that can be set to slow, failing, empty or read-only, through a query parameter such as `?state=error`), then shoot, compare and run the accessibility check on each state's URL like any other page. The stub's switch stays, labelled, while the service is a stub, and is logged as an `[Assumption]`; the temporary option switch (`?name=`) is the one that comes out after a pick.

Check that focus lands where the standards say: after submitting a form with a mistake, the first problem field has focus (`await page.evaluate(() => document.activeElement?.id)`); after closing a dialog, its trigger does.

## 7. Sideways-scroll sweep

Every touched page at 320, 390, 640, 768, 1024, 1280, 1440 and 1920px in each theme. The script names the element that pushes the page wide (one with no clipping parent).

```js
// Sideways-scroll sweep: each URL at 320–1920px in each theme. Names the element that pushes the page wide.
// Usage: node sweep.mjs [--themes paper,ink] [--theme-param theme] [--init key.js] [--wait css] URL...
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let pw;
for (const p of ['playwright', '/opt/npm-tools/node_modules/playwright']) { try { pw = require(p); break; } catch {} }
const args = process.argv.slice(2), urls = [], o = { themes: 'paper,ink' };
for (let i = 0; i < args.length; i++) { if (args[i].startsWith('--')) o[args[i].slice(2)] = args[++i]; else urls.push(args[i]); }
const init = o.init ? fs.readFileSync(o.init, 'utf8') : null;
const widths = [320, 390, 640, 768, 1024, 1280, 1440, 1920];
const browser = await pw.chromium.launch();
const found = [];
for (const theme of o.themes.split(',')) for (const url of urls) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  if (init) await ctx.addInitScript(init);
  const page = await ctx.newPage();
  const u = new URL(url); if (o['theme-param']) u.searchParams.set(o['theme-param'], theme);
  await page.goto(u.toString(), { waitUntil: 'networkidle' });
  if (o.wait) await page.waitForSelector(o.wait, { timeout: 15000 });
  if (!o['theme-param']) await page.evaluate((t) => { document.documentElement.dataset.theme = t; }, theme);
  for (const w of widths) {
    await page.setViewportSize({ width: w, height: 900 }); await page.waitForTimeout(250);
    const r = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth, over = document.documentElement.scrollWidth - vw;
      if (over <= 0) return null;
      const clipped = (e) => { for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) if (getComputedStyle(a).overflowX !== 'visible') return true; return false; };
      const c = [...document.querySelectorAll('body *')].find((e) => e.getBoundingClientRect().right > vw + 0.5 && !clipped(e));
      return { over, culprit: c ? `${c.tagName.toLowerCase()}.${String(c.className).split(' ').slice(0, 4).join('.')} "${(c.textContent || '').trim().slice(0, 40)}"` : '?' };
    });
    if (r) found.push(`${url} ${theme} ${w}px: +${r.over}px, ${r.culprit}`);
  }
  await ctx.close();
}
await browser.close();
console.log(found.length ? found.join('\n') : `No sideways scroll at ${widths.join(', ')}px.`);
process.exitCode = found.length ? 1 : 0;
```

## Traps

- Read a control by its id once its label changes (Copy → Copied): a locator by name waits for the old name to come back.
- In a form, the first button may be a show-password toggle, not the submit: locate controls by id or role and name.
- Measure an element's position after scrolling it into view, not before.
- Shots of a Design System's component previews need the token values the page supplies: inject the app's built CSS, the bundle's CSS, its React files and the bundle into each preview's head, serve the folder, and pass the theme as a query parameter.
