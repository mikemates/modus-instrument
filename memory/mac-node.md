---
name: mac-node
description: How Node is installed on Mike's Mac (Homebrew, on the version the projects pin); read before giving him Node install or upgrade steps.
metadata:
  type: project
---

Mike's Mac gets Node from Homebrew (`/opt/homebrew/bin/node`). On 2026-10-05 it was on Node 23.10, which the projects' `engines` warns about (EBADENGINE), and moved to Node 24 (DEC-027) through Homebrew's versioned formula: `brew install node@24 && brew unlink node && brew link --overwrite --force node@24`. The versioned formulas are keg-only, hence the forced link.
**Why it matters:** Homebrew's plain `node` formula is always the newest release (26 at the time), not necessarily the long-term support version the projects pin, so `brew install node` or `brew upgrade node` can leave him on a version `engines` warns about. An installer from nodejs.org would add a second Node beside Homebrew's, and whichever comes first on his path wins.
**What to do about it:** when the projects move to a new Node version (SOP F, step 6), check which Homebrew formula carries it (plain `node` while it's still the newest, otherwise `node@NN`), link that one in place of the current one, have him confirm with `node -v`, then `npm install` in each project he opens.

Related: [[code-home]]
