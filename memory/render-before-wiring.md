---
name: render-before-wiring
description: How to handle visual changes Mike will judge by eye; read before any layout, colour or type change.
metadata:
  type: feedback
---

On 2026-10-02 the full-width layout was wired straight into the build and reversed one round later. The next round showed three rendered options at real widths beside the current version; Mike picked one and it shipped unchanged.
**Why it matters:** wiring a guess costs a round and leaves a superseded decision behind; a render costs minutes.
**What to do about it:** for layout, colour or type changes, render the options on the real page (both themes where it matters), show them side by side, let Mike choose, then build it and check the build matches the render. A precise single-value request (like "as bright as Ink") can go straight in, with a before/after shown afterwards. For a batch, step through one question per decision with its sheet, then ask once to confirm the set before building (as on 2026-10-05, DEC-016 and DEC-023). When the check finds a difference, nudge by a fraction of a pixel to tell a sub-pixel shift from a real change.

Related: [[layout-composition]]
