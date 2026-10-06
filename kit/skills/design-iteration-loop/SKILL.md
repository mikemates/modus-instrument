---
name: "design-iteration-loop"
description: "Turn a design or copy critique, a stakeholder's or your own, into a specific, verified fix — across as many rounds as an element actually needs, without losing track of why each version changed. Use whenever feedback on a build, prototype or draft, vague ('too heavy', 'cramped', 'lost its rhythm') or specific ('match the buttons beside it'), needs to become a concrete change, especially across repeated rounds on the same element. Written for experience designers who don't write code."
---

# design-iteration-loop

Turn a stakeholder's reaction to a build into a specific, verified fix — repeatable across as many rounds as a design element actually needs, without losing track of why each version changed.

**Audience assumption.** The person running this may not be the one whose eye is doing the judging — they might be building for someone else's taste, or picking this up after watching someone more design-fluent do it well. **The diagnosis is the point of this skill, not a step to skip on the way to the edit.** Read every round of feedback as a problem to name, not an instruction to execute literally.

**Core principle:** a stakeholder's words are evidence about what's wrong, not a spec for what to do. "Too heavy," "make it pop," "too clunky" — these describe a *read*, not a *fix*. Guessing the fix straight from the words produces a plausible-looking change that doesn't actually address what prompted the reaction — and the same complaint comes back next round, in different words. Find the specific, nameable thing that's actually off before touching anything.

---

## The loop, in five moves

**1. Name the variable, not the vibe.**
"Too intense" is a reaction, not a target. Turn it into something specific enough that you could be wrong about it: is it the overlay's opacity, the base colour, or how much of it is in frame? Naming the actual variable is what makes the *next* round of feedback answerable instead of another guess in the dark.

**2. Diagnose before you edit.**
The literal ask and the real fix are often two different edits. A headline that reads "clunky" might not be a word-choice problem at all — it might be carrying two jobs (a hook *and* its own justification) that belong in two separate sentences. If a literal, surface-level edit gets the same complaint back in different words next round, the diagnosis was wrong, not the wording.

**3. Re-verify everything the change could have moved.**
Every parameter you touch can silently break a check you already passed. Cutting an overlay's opacity to fix "too intense" can quietly drop the text contrast sitting on top of it — a check that passed at the old value doesn't mean it still passes at the new one. Re-run the actual check every time an input it depends on changes, not just the first time. For a visual or perceptual claim specifically — contrast, legibility, crop — render the real composited result (the actual gradient over the actual image, at the actual size) and measure it. The `render-checks` skill has the tools: shots at real widths in each theme, pixel comparisons, the accessibility check and the sideways sweep. A value that looks fine at a glance can fail the numbers; a value that looks alarming in isolation can pass easily once the real background sits behind it.

**4. Preview before you commit, when the change is visually judged.**
Building the real thing and finding out afterward it's wrong is the expensive version of this loop. When a person is going to react to *how something looks* rather than *whether it works*, produce a cheap, fast render of the actual change first — a static composite, a mockup, a quick screenshot at real dimensions — and show that, not a description of it, before wiring it into the working build. When the diagnosis leaves more than one good answer, put the options side by side on one labelled sheet (`render-checks`; `modus-project-sop` preference 5), and once one is picked, check the build matches it. When it lands on one on-system answer, make it and show a before/after.

**5. Log the round, every round.**
Each pass through this loop is a decision, even the ones that feel like small tweaks. Write down what was wrong, what changed, and what you checked to confirm it's actually fixed. When a later round changes your mind again, mark the earlier entry superseded rather than editing it away — the trail of *why it moved* is what lets someone else pick this up mid-stream without re-litigating a round that's already settled, and it's what stops a stakeholder's earlier sign-off from becoming something only you remember. If this project already runs the `memory-hygiene` skill, this is the same decision log — don't start a second one.

---

## A worked example

A hero image's overlay gets flagged: "that purple blob is too intense." The literal read is "make it lighter" — but before touching the opacity slider, the real question is *why* it reads that heavy: is the tint itself too saturated, or is the opaque zone just covering too much of the frame? In this case it's a straight opacity problem — cut it by a third and recomposite the actual gradient over the actual photo at real screen widths, sampling the blended pixel colour across the real text column and checking it against a contrast floor rather than eyeballing "does that look readable." That catches something eyeballing wouldn't: two of the three text colours in play, which passed comfortably at the old opacity, now fail at the new one. Fix: those two move to plain white, which does pass, at every width tested — not a guess, a measured one.

Two rounds later, a headline on a *different* part of the same build gets flagged "too clunky for a headline." The instinct is to swap words. The actual problem: the headline is doing two jobs — stating a claim *and* justifying it — when a hero headline's only job is the hook. The fix isn't a better word, it's moving the justification down into the line below it, where reasoning belongs. Both rounds get written down as their own dated entries, and the earlier version stays in the log, marked superseded, not deleted — so six months from now, someone can see not just what shipped, but what was tried and why it changed.

## The one test before you say it's done

Could someone who wasn't in the room read your last log entry and know exactly what was wrong, what you changed, and what you checked to confirm it's actually fixed — not just that *something* changed? If the entry only says what changed, go back and add the why and the check. That gap — a changelog versus a decision record — is the whole reason this loop is worth writing down instead of just doing it from memory every time.
