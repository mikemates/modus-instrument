---
name: "git-workflow"
description: "Git discipline for prototypes — never run git in the person's project folders, write files only, hand over a single copy-paste save command (saving to GitHub), with plain-language framing and .gitignore conventions. Use whenever changes are ready to save or commit, when asked to save to GitHub, commit or push, or when setting up .gitignore. Written for experience designers who don't write code."
---

# git-workflow

Handle saving and backing up a project with git, in a way an experience designer can follow confidently.

**Audience assumption.** The person is a *designer, not an engineer.* Most have never used git and find it intimidating. So: explain it as **save-points plus backup** — it lets us rewind to any earlier version and keeps a copy safely off their laptop. That's the whole mental model they need. You handle the complexity; they run one short command when it's time to save.

---

## The one hard rule: never run git in their folders

Running git inside the session leaves behind lock files that jam the person's terminal. So **in their project folders you only ever write files. You never run `git` there** — not `add`, `commit`, `push`, `status`, `log`, `diff` or `init`. (Git on a scratch copy in Claude's cloud workspace touches nothing of theirs and is fine.) When work is ready to save, you hand them a single copy-paste command and let them run it on their own computer.

This holds even for a look: from Cowork's shell on their computer, a read-only `git status` has left an empty `.git/index.lock` behind, and the shell can't remove it without their permission. Every later save then fails with "index.lock: File exists". To see their recent saves, read `.git/logs/HEAD`: one line per save, with who, when and the message. For the branch or the remote, read `.git/HEAD` or `.git/config`.

Work built in a cloud copy goes back to their Mac before the save line (`modus-project-sop`, *Working from a cloud session*). Before you hand anything over, make sure the work is actually finished and clean — no leftover unused code, and the checks pass: the typecheck, the tests and the build (`experience-standards`: build as if it could go to production). Don't ask someone to save a broken state.

---

## The save command

Explain first — *"Ready to save your progress? Paste this into a Terminal window."* Then hand over one line that starts in the project's folder, with its full path, so it works from any window. For a project already connected to GitHub:

```bash
cd "<absolute-path-to-project-folder>" && git add -A && git commit -m "<short description of what changed>" && git push origin <branch>
```

The branch comes from `.git/HEAD` (usually `main`). Write the message in plain words: no quotes, backticks, `$` or `!`, which the Mac's shell would act on inside the double quotes.

Checkpoint for them: *"It worked if it prints a list of files and finishes without red 'error' lines. It'll pause a second while it uploads — that's the backup happening."*

**Their unsaved edits come first.** Files they changed since their last save (newer than the last line of `.git/logs/HEAD`) are their work, not the round's. Hand over their save first, naming the files so it can't sweep up the round: `cd "<path>" && git add -- "<file>" "<file>" && git commit -m "<their change>"`, then the round's save. A file both of you changed can't be split: one save, with a message that covers both. If their edits are half-done and break the build, ask before saving either.

For a brand-new project, first an empty repository on GitHub: github.com → New repository → name it after the folder → **Private** → leave README and licence unticked → Create. Then one line (`modus-project-sop`, SOP A):

```bash
cd "<absolute-path-to-project-folder>" && git init && git add -A && git commit -m "Start the project" && git branch -M main && git remote add origin https://github.com/<account>/<repo>.git && git push -u origin main
```

Walk them through the GitHub page if they've never done it. Keep the message short and in plain words — describe *what changed*, not the file names. After they save, give a one-line summary of what was saved; don't re-explain every change.

---

## What to ignore (.gitignore)

Every project starts with a `.gitignore` — explain it as *"a list of things we deliberately don't back up: giant auto-downloaded folders, temporary files, and any borrowed images we're not allowed to share."* Start with:

```gitignore
# Auto-downloaded building blocks and built output — no need to back these up
node_modules/
dist/
.vite/
*.tsbuildinfo

# Mac clutter
.DS_Store

# Secrets stay on your computer (keep an example file with blank values)
.env
.env.*
!.env.example

# Renders and files the Claude desktop app saves while you work — they stay on your computer
Claude outputs/

# Borrowed or unlicensed images — keep these local only
public/_incoming/
```

New Modus Instrument projects start with exactly this list. Add per project: local-only notes (for example `DEMO_RUNBOOK.md`) and any other folder of borrowed material. Anything borrowed, licensed to someone else, or not cleared to share stays ignored and local.

---

## When it goes live (deploy protection)

If a deployed link would show borrowed or unlicensed assets (e.g. reference photography in a demo), tell them plainly: keep the live link **password-protected / internal only**, and swap in owned or generated images before showing it to anyone outside the team. Flag this yourself — don't assume they've thought about the licensing.

---

## What not to do

- Don't run git just to "check" something — read `.git/logs/HEAD`, `.git/HEAD` or `.git/config`, or ask them to paste what the terminal shows.
- Don't make branches or open pull requests unless they ask.
- Don't bundle unrelated changes into one save — if the work covers two different things, hand over two save commands in order, each with its own clear message. Work that touched two repositories (a project and its design system, say) gets one save command per repository, each with its full folder path.
- Don't let git feel scary. Every error here is fixable; frame it that way and have them paste it back.

