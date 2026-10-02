---
name: design-system-publishing
description: The non-obvious steps and traps when republishing the Modus Instrument Design System artifact from this repo.
metadata:
  type: project
---

The Design System artifact is generated from this repo by `npm run ds:build` (output in `design-system-dist/project/`) and is never edited on its own.
- Publish the changed files with `project/design-system.json` (the index) last. Read the live index right before, and keep every key you didn't change.
- Send `components/index.d.ts` as `text/plain`; `.ts` is not a served type.
- The logo SVGs are uploaded assets, not files: re-upload changed ones and update `assetGroups.Logos` in the index with the new blob ids.
- The Design System page compiles colours, radii, shadows and `--font-*` itself, but turns type styles into classes rather than `--text-*` variables. That is why `tokens.reference.css` carries the text sizes as a static block; don't remove it.
- Previews can only use Tailwind classes that appear somewhere in `src/`. Use an inline `style` for one-off sizes.
**Why it matters:** each trap either fails the publish or silently breaks the previews.
**What to do about it:** follow these steps on every republish, then render a few previews in Paper and Ink before calling it done.

Related: [[references]], [[code-home]]
