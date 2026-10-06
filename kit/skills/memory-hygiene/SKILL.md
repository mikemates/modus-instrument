---
name: "memory-hygiene"
description: "Keep a project's working context as a living source of truth (the files Claude and the team rely on, not documents people read) — CLAUDE.md, an append-only decision log (marked SUPERSEDED, never deleted), MEMORY.md index, and memory-file format, plus when to write/update/prune. Use when setting up a project's CLAUDE.md and memory, logging a decision, or keeping CLAUDE.md and the log current. Written for experience designers who don't write code."
---

# memory-hygiene

Keep a project's context — its front-page rules, its decision history, and its memory — accurate and alive, so nothing gets lost between sessions and no one re-argues a settled choice.

**Audience assumption.** The person is an *experience designer, not an engineer.* They should almost never have to touch these docs by hand — **you maintain them.** Their only job is to make decisions; you record them. When you explain what you're doing, use plain language: this is the project's memory, so next time we open it, weeks later, we pick up exactly where we left off. Frame it as a benefit to them (less lost context, fewer repeated debates), never as paperwork.

**Core principle:** the moment a decision is made mid-build, record it *and* update whatever doc it affects — in the same pass. Don't let the docs drift behind the actual work. If the memory ever contradicts what's actually in the project now, trust the current project and quietly fix the stale note. (A Standards version line isn't a stale note: it changes when the project is brought up to that version.)

---

## The three places things live (explain in these terms)

- **CLAUDE.md — the project's front page.** Its purpose, its rules, its stack, its hard limits. When something changes, *rewrite* the outdated part — don't staple a contradicting note underneath. If a rule was tried and dropped, remove it.
- **The decision log — the "why we chose this" trail.** Every meaningful choice, in the order it was made. Nothing here is ever deleted.
- **Memory files — what should carry across sessions.** Who the person is and how they like to work, choices that are settled, things to avoid repeating. These persist even after the project closes.

Don't store busywork: what you're doing *right now*, half-finished tasks, or anything already written in CLAUDE.md.

---

## Decision log — how to keep it

Append-only. Each entry gets a number, a date, and a status.

```markdown
## DEC-0NN — <short title of the choice>
**Status:** decided | superseded · **Date:** <YYYY-MM-DD>
<what was chosen, and the reason — in plain language>
Checked: <what was checked, when the change was verified>
<if superseded: "Replaced by DEC-0MM because ___">
```

Rules to hold:
- **Never delete a decision.** If it changes, mark the old one `superseded` and point to the new one. The trail of *why we changed our mind* is the valuable part. (A new project's DEC-001 is a setup placeholder: fill it in at setup.)
- Settled ("decided") choices are binding — if a new request would break one, **say so before doing it**, don't silently override.
- Always write real dates (`YYYY-MM-DD`), never "yesterday" — it has to make sense months later.
- On bigger projects, tag entries by discipline so they're scannable: `[Experience]`, `[Product]`, `[Brand]`, `[Engineering]`, `[Accessibility]`, `[Content]`, `[Measurement]`.
- Flag unknowns inside entries: `[Assumption]` (a stand-in that production would replace) and `[Open question]` (still to decide). Close an open question by striking it through and pointing to what settled it: `~~[Open question] …~~ — resolved by DEC-0NN (<date>)`.

---

## Memory files — the format

One fact per file, with a small header. Keep the fact itself in plain language.

```markdown
---
name: <short-kebab-case-slug>
description: <one line — helps decide when this is relevant later>
metadata:
  type: user | feedback | project | reference
---

<the fact.>
**Why it matters:** <the reason>
**What to do about it:** <how it should change future behavior>

Related: [[other-memory-slug]]
```

The four types: **user** (who they are, role, preferences) · **feedback** (how they like you to work — corrections and confirmed approaches, with the reason) · **project** (goals and constraints you couldn't figure out just from the files) · **reference** (a pointer to a doc, link, or ticket).

**MEMORY.md** is the index that loads every session — one line per memory, no detail in it:

```markdown
# Memory Index

- [Title](slug.md) — one-line hook
```

---

## When to write, update, or prune

- **Write** a new memory when you learn something non-obvious that should change how you work next time. Check MEMORY.md first — if it's already covered, update that file instead of making a duplicate.
- **Update** rather than pile on. When a fact changes, rewrite the stale part.
- **Prune** anything that turns out wrong or outdated — delete the file and its index line.
- After a meaningful chunk of work, take a quick pass: is there anything worth carrying into future sessions? Copy durable decisions from the log into memory.

**Never save sensitive personal details** (government IDs, financial account numbers, health information, home address, passwords) unless the person explicitly asks you to remember them.

---

## The one test before saving anything

Would a future session go better because this note exists — and is it still true today? If not, don't save it. One fact, one file, one index line. And whenever a decision prompts a change, the decision log and CLAUDE.md get updated in the same breath as the change itself.

