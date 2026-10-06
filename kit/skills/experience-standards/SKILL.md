---
name: "experience-standards"
description: "Apply Modus Experience Standards: the house floor of default experience decisions (WCAG 2.2 AA accessibility; the required states: loading, empty, error, success, validation, read-only; responsiveness; content and language; components and tokens; perceived performance) and the engineering bar: build so the work could move into production with little effort. Use when building or reviewing any screen, flow or component, when choosing a project's component library or design system, when a project file is silent on an experience decision, or when deciding what done means for a prototype. Sets the bar; render-checks proves it. Inherit these defaults; log any deviation as an [Experience] decision. Written for experience designers who don't write code."
---

# experience-standards

Apply the **Modus Experience Standards** — the house floor of experience decisions every project starts from, so teams and agents don't re-decide the basics each time. The working checklists below are how to *apply* it; the canonical standard (verbatim, versioned) is reproduced at the end of this skill.

**Audience assumption.** The person is an *experience designer, not an engineer.* You handle the implementation; your job here is to make sure what gets built meets the floor without them having to police it. Speak in outcomes ("every screen needs to handle the empty and error cases, not just the happy path"), not code.

---

## The core rule: inherit, don't re-decide — and log every deviation

- When a project file is **silent** on an experience decision, **these defaults are the answer.** Apply them; don't invent something new.
- When a project **deviates** from a default, that's allowed — but it becomes a decision-log entry tagged `[Experience]` with the reason (use the `memory-hygiene` skill). That log is how client learning flows back into the next version of the standards; it's the point, not paperwork.
- Every default is one of two kinds: **Standard** (expected to hold nearly everywhere — deviating needs a logged reason) or **Starting point** (a sensible default you *expect* to tune per client — changing it is normal). Treat them differently: push back on dropping a Standard; treat tuning a Starting point as routine.

State the version in the project's CLAUDE.md: *"Follows Modus Experience Standards v0.2, except: [deltas]."* A project keeps the version it was built to until it's brought up to a newer one (a re-sync); new work in it meets the current Standards meanwhile.

---

## Production-grade by default [Standard]

Build every prototype as if it will move into a production environment, because it might. The way the work is built should carry into production with little effort, not be thrown away and rebuilt.

- **Typed:** TypeScript in strict mode, typed props, no `any` escapes or `@ts-ignore`. The typecheck passes before every save.
- **Tested where there's logic:** calculations, data transforms, validation rules and content checks have tests, and they pass. The first time a project needs them, add Vitest (it shares the Vite setup) and log it.
- **The build is the gate:** a red build means something real is broken. Never loosen it to get a deploy through.
- **One component system, on tokens:** components come from the chosen foundation; colour, type, spacing, radius and elevation come from the token file, never magic numbers.
- **Content apart from components:** copy and data live in a content file or a data layer, so real data can replace illustrative data without rewriting screens.
- **Pinned and declared:** the lockfile is committed and the Node version is declared. Secrets live in environment variables, never in the repository, unless a logged decision accepts it and says so (a prototype's shared password, for example).
- **Accessible from the first commit,** not bolted on before launch.
- **Documented:** decisions logged, CLAUDE.md current, and the README says how to run, test and deploy.
- **Shortcuts stay visible:** illustrative data is labelled in place, a stubbed service is named as a stub, and each is logged as an `[Assumption]` with what production would need instead.

---

## Choosing the component foundation

**The philosophy:**
1. **Modus Instrument is the default.** It's ours, accessible by construction (Base UI primitives bring keyboard, focus and ARIA), and its look comes entirely from our tokens, so the work doesn't read as a stock kit.
2. **Move off it only for a reason the project can name:** the client's own design system, the stack engineering will keep the code on, or something Instrument can't do.
3. **The floor travels with any library:** keyboard, focus, screen-reader semantics, contrast and every state. Build on accessible primitives, never hand-rolled controls.
4. **The look is chosen, never the library's stock defaults:** our tokens on Modus-branded work, the client's theme on theirs, kept in one place that drives colour, type, spacing and radius.
5. **One component system per project.** A specialist library for one job (a full data grid, maps, rich-text editing, advanced charts) sits beside the foundation, themed with the same tokens; it doesn't become a second kit.
6. **Choose as if it will ship.** Prefer what engineering would keep over what's quickest to demo.
7. **Log the choice** as an `[Experience]` decision with the answers below and the reason (on Instrument, in the project's DEC-001; otherwise a new entry that supersedes it), and revisit it at milestones.

**The operator's questions.** Ask them at the start of a project, one at a time; infer what you can from what the person has already said, and ask only what's missing.
1. Whose brand is it: Modus's or the client's?
2. Does the client have a design system to match: tokens and guidelines only, or a component library?
3. Where will this code go next? Assume it could reach production: which stack would engineering keep it on?
4. Does it need something Instrument doesn't have?
5. How long will it live: a sketch, a demo, or something we keep building?

**The outcomes:**
- **Modus Instrument** — Modus-branded or insight work with no other stack named. The usual case.
- **Instrument with the client's tokens** — the client has brand guidelines or tokens but no component library we must use: their values go in the token file; the components and the floor stay.
- **The client's or the target stack's library** — the client's component library must be matched, or engineering will keep the code on a named stack: use that library at the versions they use, with their theme (or our tokens mapped onto it on Modus-branded work), and keep the floor, the engineering bar, the decision log and the checks exactly as on Instrument.
- **Instrument plus one specialist library** — for the one job Instrument can't do, beside it, themed with the tokens.

These standards will name specific libraries as projects use them and log how they went; until then, the philosophy decides.

---

## Apply this as you build (the working checklist)

Every interactive view should clear this floor before it's "done." Frame each to the designer as a question about their screen, not a spec.

**Accessibility [mostly Standard]**
- Everything works by keyboard, with a visible focus outline that never disappears.
- Focus moves into dialogs/drawers when they open and returns to the trigger on close; after an error, focus jumps to the first problem field.
- Status is never color alone — always pair it with text, an icon, or a shape.
- Text contrast ≥ 4.5:1 (3:1 for large text); focus rings and UI edges ≥ 3:1.
- Respect `prefers-reduced-motion` — motion is never the only way to understand what happened.
- Touch targets ≥ 24px, prefer 44px.
- A region that scrolls sideways is reachable by keyboard: focusable, named, with a visible focus ring.
- *Leverage the foundation:* Modus Instrument's components are built on Base UI, which brings keyboard, focus and ARIA behaviour; with another library, use its accessible primitives the same way. Reach for those before hand-building interactive UI.

**Interaction states [the big one — mostly Standard]**
Every view handles the full set, not just the populated happy path:
- **Default** — the normal, filled state.
- **Loading** — show something after ~400ms; skeletons for content, inline spinners for actions; no layout jump. *(Starting point — tune the threshold.)*
- **Empty** — never a blank screen; say what belongs here and offer the next action.
- **Error** — say what happened, whether data was saved, and how to recover; never a dead end; keep the user's input.
- **Success** — confirm completion; destructive/irreversible actions get an explicit confirm and, if feasible, undo.
- **Validation** — on blur and on submit (not every keystroke); messages specific and next to the field. *(Starting point.)*
- **Permission / read-only** — unavailable actions are hidden or clearly disabled with a reason; never fail silently.

Check each state, don't assume it: give it a way to be opened on purpose (a labelled stub that can be set to slow, failing or empty) so it can be rendered and tested (`render-checks`).

**Content & language [mostly Standard]**
- Buttons are verb + object ("Save changes", not "Submit/OK"); destructive labels are explicit.
- Error copy: what happened → why (if useful) → what to do → whether data was saved.
- One term per concept everywhere (UI, prototype, tickets).
- Plain language, ~grade 8–10 for general audiences.
- Voice: operational and task-oriented in tools and forms; insight and strategy pages argue a point, the house tuning of this Starting point (`modus-ui-foundation`).

**Components & tokens [Standard]**
- Use the chosen foundation's components before building custom. Custom UI is built on accessible primitives, checked with `render-checks`, and logged `[Engineering]` as needing engineering and accessibility review before production.
- Color, type, spacing, radius, and elevation come from the token source (`tokens/tokens.json` in Modus Instrument projects), never magic numbers.

**Responsiveness & performance [mostly Starting point]**
- State the primary context: operator/internal tools are desktop-first, customer-facing is mobile-first.
- No horizontal scroll at supported widths (check 320 to 1920px); content reflows rather than truncating meaning.
- Aim for meaningful content ~1s, interactive feedback ~100ms, a loading state past ~400ms.

---

## When reviewing (not just building)

If asked to review a screen or prototype, walk this checklist against it and report gaps as: the missing state or criterion, whether it's a Standard (must fix or log) or a Starting point (worth tuning), and the concrete fix. Don't just say "improve accessibility" — name the specific state or criterion that's missing. The `render-checks` skill has the tools to prove it: the accessibility check, the sideways sweep and before/after comparisons.

---

## How this fits the kit

- `modus-project-sop` starts projects and asks the foundation questions above; it also carries Mike's working preferences.
- `modus-ui-foundation` is the look of the default foundation, Modus Instrument.
- `memory-hygiene` is where deviations get logged as `[Experience]` decisions and where the "Follows Standards v0.2, except…" line lives in CLAUDE.md.
- `render-checks` proves a build meets the floor.
- The floor is versioned and owned by the Modus XD Practice Lead — it rises as logged deviations become next-version defaults, so treat the canonical text as the source of truth and this skill as how to apply it.

---

## Canonical reference — Modus Experience Standards v0.2

> The house defaults, verbatim. Owner: Modus XD Practice Lead. Status: Active. Projects reference a version and record only their deltas.
> **Changed from v0.1:** the default UI foundation is Modus Instrument (Base UI primitives + Modus Instrument tokens), chosen through the foundation questions; production-grade engineering is a Standard; a sideways-scrolling region must be keyboard-reachable.

**Accessibility.** Baseline WCAG 2.2 AA [Standard] (ISO/IEC 40500:2025; WCAG 3.0 is a draft and does not supersede it; regulated work may raise specific criteria to AAA as a logged delta). Keyboard operability, including sideways-scrolling regions [Standard]. Focus management [Standard]. Screen-reader semantics — semantic elements first; name/role/state programmatic; live regions for async status and errors [Standard]. Status never color-only [Standard]. Contrast 4.5:1 text / 3:1 large text and UI/focus [Standard]. Reduced motion honored [Standard]. Target size ≥24px, prefer 44px on touch [Starting point]. Accessibility is part of the brief; unmet standards are risk-accepted and logged, not dropped.

**Interaction states.** Default [Standard]. Loading — indicator past ~400ms, skeletons/inline spinners, stable layout [Starting point]. Empty — explain + offer next action [Standard]. Error — what happened, whether saved, recovery path, preserve input [Standard]. Success/confirmation — confirm; destructive actions confirm + undo where feasible [Standard]. Validation — on blur and submit, specific and adjacent [Starting point]. Permission/read-only — hidden or clearly disabled with a reason [Standard].

**Responsiveness.** Desktop/Tablet/Mobile; internal tools desktop-first, customer-facing mobile-first — state primary context [Starting point]. No horizontal scroll; reflow not truncate [Standard]. Touch: meet target size, avoid hover-only [Starting point]. Support latest two evergreen browsers + iOS Safari/Android Chrome, narrow per project [Starting point].

**Content & language.** Voice: operational, direct, task-oriented [Starting point]. Error structure: what happened → why → what to do → whether saved [Standard]. Buttons: verb + object, explicit destructive labels [Standard]. Terminology: one term per concept, changes via glossary + decision log [Standard]. Reading level ~grade 8–10, domain terms allowed for expert tools [Starting point]. AI-generated copy: editable, uncertainty visible, never presented as verified unless reviewed [Standard, when applicable].

**Components & patterns.** Prefer the chosen foundation's accessible components [Standard]. Custom components require engineering + accessibility review [Standard]. Tokens over hard-coded values [Standard]. One component system per project; a specialist library for one job sits beside it, themed with the tokens [Standard]. Default UI foundation: Modus Instrument — Base UI primitives + Modus Instrument tokens on Vite + React + TypeScript + Tailwind v4 [Starting point]; another foundation is chosen through the foundation questions (the client's design system, the stack engineering will keep, a capability the default lacks) and logged [Standard].

**Engineering.** Built to move into production with little effort [Standard]: strict TypeScript, tests for logic, a build that gates on errors, content separate from components, pinned dependencies and a declared Node version, no secrets in the repository, accessible semantics from the start, decisions logged. Prototype shortcuts are visible in the product and logged as assumptions [Standard].

**Performance (perceived).** Meaningful content ~1s, interactive feedback ~100ms, loading state past ~400ms — tune per product/network [Starting point].

**Governance.** Owner = Modus XD Practice Lead. Deviations logged across projects are reviewed periodically; recurring deviations become the next version's default. Version bumps: minor for additions/clarifications, major for changes that alter existing projects' expectations. Keep defaults here, per-product specifics in the project pack — do not duplicate.
