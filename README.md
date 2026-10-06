# Modus Instrument

The Modus UI foundation: tokens, Paper and Ink themes, Manrope, Modus violet, and accessible components on Base UI — plus the Insight Center patterns and a demo page with illustrative content.

Design System (brand book, tokens, live components): https://claude.ai/artifact/34AemeyKUpp1dyAc4TDoKv

## See it

```bash
npm install      # once — downloads the building blocks (needs Node 20 or newer)
npm run dev      # opens a private preview at http://localhost:5173
```

Use the Paper / Ink switch in the top bar to change theme. Press ⌘K to open Ask.

## Day to day

| Command | What it does |
| --- | --- |
| `npm run dev` | Live preview; regenerates styles from the tokens first |
| `npm run typecheck` | Spell-check for code |
| `npm test` | Checks the ROI maths |
| `npm run build` | The production build (what Vercel deploys) |
| `npm run logo` | Copies the logo artwork from `design-system/assets/Logos/` into the `Logo` component (after the files change) |
| `npm run ds:build` | Rebuilds the Design System files into `design-system-dist/project/` |
| `npm run new -- ../my-prototype` | Starts a new project on this foundation (`--patterns` adds the Insight Center patterns, `--gate` a password entry page) |

## What's inside

- `tokens/tokens.json` — every colour, type style, space, radius, shadow and layout value, with a usage note; colours carry a Paper and an Ink value. Change the look here.
- `design-system/assets/Logos/` — the official Modus Create logo files.
- `src/components/` — Logo, Button, LinkButton, GoLink, Label, Tag, Card, EvidenceMeter, StatTile, TextField, SegmentedTabs, Switch, Slider, ModeSwitch, ThemeToggle, AccordionList, Skeleton, EmptyState, ErrorState, Icons.
- `src/patterns/` — InsightCard, OpportunityCard, Figure, TopBar, ChapterRail, SectionRail, ChapterHeader, ChapterClose, AskPalette, ValueStream, ServiceBlueprint, CapabilityMatrix, HarveyBall, BenchmarkBars, RoiModel.
- `templates/gate/` — the password entry page `--gate` adds to a new project.
- `src/demo/App.tsx` — the demo page; `src/data/sample.ts` — its illustrative content.
- `design-system/` — the brand book and cover the Design System is built from.

## Using it in code

```tsx
import { Button, Card, Label, StatTile } from '@/index';

<Card className="p-6">
  <Label>Illustrative data</Label>
  <StatTile size="xl" label="FNOL → payment" value="22.4" unit="days" />
  <Button>Start the walkthrough</Button>
</Card>
```

Switch theme with `<html data-theme="ink">` or `setTheme('ink')`.

## A private preview

`npm run new -- ../client-preview --gate` adds a password entry page. The build encrypts the site, so a shared link shows nothing without the password, on any host. The command prints the password; change it in `gate.config.mjs` (or set `SITE_PASSWORD` where it's built), rebuild and send the new one. Anyone who can open the repository can read it, so keep the repository private.

## Saving to GitHub

The code is backed up at https://github.com/mikemates/modus-instrument.

First time on a computer (connects this folder to GitHub and uploads it):

```bash
git init && git add -A && git commit -m "Modus Instrument foundation" && git branch -M main && git remote add origin https://github.com/mikemates/modus-instrument.git && git push -u origin main
```

Every save after that:

```bash
git add -A && git commit -m "<what changed, in plain words>" && git push origin main
```

On another computer, get a copy with `git clone https://github.com/mikemates/modus-instrument.git ~/Projects/modus-instrument`.

`package-lock.json` is committed on purpose — it keeps every machine and Vercel on the same versions.
