---
name: code-home
description: Where the working copy lives and which copy wins; read before editing or delivering code.
metadata:
  type: project
---

The working copy is `~/Projects/modus-instrument` on Mike's Mac (DEC-009). It is backed up to https://github.com/mikemates/modus-instrument (DEC-011). In the Insight Center 2.0 Claude project, Claude saves to GitHub itself and then brings the Mac folder in line with it (DEC-032); elsewhere Mike saves with one copy-paste command (`git-workflow`). Projects made with `npm run new` go beside it in `~/Projects/`. Copies built in a Claude cloud session are scratch.
**Why it matters:** two copies drift, and writing an old copy over the Mac one would undo Mike's edits.
**What to do about it:** check the Mac copy and origin/main first, in case Mike saved something himself, and edit the Mac copy in place where possible. When files are built in a cloud session, write them back as `modus-project-sop` sets out (*Working from a cloud session*): an untouched base, the Mac fingerprinted against it before and after, a new staging folder each round, and the Mac file's modified time as the guard on every write.

Related: [[design-system-publishing]], [[mac-node]]
