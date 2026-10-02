---
name: layout-composition
description: Why pages are one composed column, not full width; read before changing page width, grids or the hero.
metadata:
  type: feedback
---

On 2026-10-02 Mike asked to use more of the browser, like the reference sites. A full-width version (DEC-012) "lost some of its intentionality and flow": the headline lost its three-line stack, cards turned into wide strips, and proportions drifted with the window. He chose one composed column that grows on big monitors, headline included (DEC-013).
**Why it matters:** for Mike, composition and reading flow outrank filling the screen. "Use more space" means scale the composition, not stretch its parts.
**What to do about it:** keep `mi-frame` and fixed gallery columns. To use a wide screen, grow the whole column and its type together; never let some parts stretch while others stay fixed.

Related: [[mike-ui-taste]], [[render-before-wiring]]
