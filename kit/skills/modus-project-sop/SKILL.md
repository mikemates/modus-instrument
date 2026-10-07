---
name: "modus-project-sop"
description: "Use when someone starts, resumes or ships a Modus project or prototype (ships: deploys it, behind a password when shared outside the team, or hands the code to a client's engineers), sets up their computer for a first project, re-syncs a project with the latest Modus Instrument, promotes a component, token or rule back into Modus Instrument (the design system), writes work back to their Mac from a cloud session, or brings the platform up to date (Node and the building blocks). Runs the SOP step by step, calls the other kit skills at the right steps, and applies Mike's standing preferences, which are the team's defaults."
---

# modus-project-sop

Mike's operating procedure for project work on Modus Instrument, shared with the team through the `prototype-foundations` plugin, plus the preferences that apply to every session. Run the matching SOP below; apply the preferences throughout. It's written from Mike's setup: where it says Mike, read the person you're working with, and use their paths and accounts (*Key places*).

This skill orchestrates; the detail lives in the skills it calls:
- `experience-standards` — the floor, the engineering bar and the foundation questions.
- `modus-ui-foundation` — the look: tokens, Paper/Ink, Season Sans and Serif, bright violet, composed column, restraint, components.
- `render-checks` — renders, comparison sheets, pixel proof, the accessibility check and the sideways sweep.
- `local-preview` — how every run command is handed over.
- `design-iteration-loop` — how feedback becomes a verified change.
- `memory-hygiene` — CLAUDE.md, the decision log, memory notes.
- `git-workflow` — saves and .gitignore.
- `ai-scrubber` — the AI-tells audit before work is shared.

## Key places

`<home>` is the person's home folder on their Mac (`/Users/mike` for Mike) and `<github>` their GitHub account (`mikemates` for Mike). Read `<home>` from a connected folder (`get_device_info`); ask once for anything you can't read, and never guess.
- Foundation repo: `<home>/Projects/modus-instrument` (GitHub: https://github.com/mikemates/modus-instrument; teammates may need Mike to give them access).
- Projects: `<home>/Projects/<project-slug>`, one private GitHub repo each under `<github>`, or under the client's organisation when the code is going to them.
- Design System: https://claude.ai/artifact/34AemeyKUpp1dyAc4TDoKv. Anyone with the link can open it; if it won't open, the foundation's `tokens/tokens.json` and `CLAUDE.md` stand in.
- The skills: `modus-instrument/kit/` is their source. Everyone, Mike included, installs it as the `prototype-foundations` plugin (`kit/prototype-foundations.plugin`), so there's one copy of each skill.

## Standing preferences (every session)

1. **Commands:** one copy-paste line per step, with the full absolute path (`cd "<home>/Projects/<slug>" && …`), what success looks like, and how to stop it (`local-preview`). Never "in the project folder", and never `~` inside quotes (it doesn't expand there). Never run npm or git on their machine for them.
2. **The Mac copy wins.** `<home>/Projects/<slug>` is the working copy. Small edits can go straight into it through the connected folder; anything that needs installing, building or rendering happens in a cloud copy and comes back through *Working from a cloud session*. Option switches and half-done work stay in the cloud copy. Never overwrite newer edits on the Mac.
3. **Production-grade by default.** Build as if the work will move into production, because it might (`experience-standards`): strict types, tests for logic, the build as the gate, content apart from components, no hidden shortcuts. Typecheck, tests and build pass before any save line. When a project first gets logic worth testing (a calculation, a data transform, validation rules), add Vitest (`npm install -D vitest` and a `"test": "vitest run"` script) and log it `[Engineering]`.
4. **The look is Modus Instrument** (`modus-ui-foundation`), unless the foundation questions chose another library: one composed column, never full width (a dense working tool may log a full-width departure); Paper and Ink; Season Sans, with Season Serif on big headlines; violet 500 for the signal and every main action; restraint; no stock component kits.
5. **Visual choices are rendered first.** When a layout, colour or type change has more than one good answer, render two or three options on the real content beside the current version, let Mike pick, then build it. Build the options behind a temporary `?name=` switch in the cloud copy, shoot them at 1440px and on a phone in each theme the project has, and show labelled sheets of about half a megabyte (`render-checks`). Related complaints about one area are one decision on one sheet; separate decisions go one question at a time, then one confirmation of the set. After the pick, remove the switch and the unchosen options, and check the build matches the pick pixel for pixel. When the diagnosis lands on one on-system answer (a token step the design should already use, a rule it breaks) or the request is a precise value, make the change and show a before/after instead.
6. **Diagnose feedback before editing.** Name the variable behind a reaction ("lost its flow" → which proportions changed) before touching anything (`design-iteration-loop`).
7. **Log every decision** in the project's `DECISIONS.md` (numbered, dated, tagged; superseded, never deleted) and update `CLAUDE.md` in the same pass.
8. **End each finished chunk** with a one-line summary, the preview line if something visible changed (and "restart the preview" when the round added new source files), and the save line: `cd "<home>/Projects/<slug>" && git add -A && git commit -m "<what changed>" && git push origin <branch>` (the branch from `.git/HEAD`, usually `main`; the message in plain words, with no quotes, backticks, `$` or `!`). If the person had unsaved edits of their own when the round began, their save goes first, on its own (`git-workflow`). Work that touched two repositories gets one save line each.
9. **Content:** an analyst's voice on pages that argue (insight, strategy, a point of view) and an operational one on tools and forms; numbers with units; `[Prospect]` until a client is confirmed; illustrative figures and AI-drafted answers labelled in place.
10. **Coach, don't overwhelm.** When Mike is hands-on, give one step at a time, say what success looks like, translate a term the first time it comes up, and treat errors as expected and fixable: "paste what you see and I'll sort it out".

## SOP A — Start a new project

0. **First time on this computer** (skip when `<home>/Projects/modus-instrument` exists, as it does for Mike). One step at a time, each with what success looks like:
   - **Ask Mike for access first; it's the slowest step.** He adds their GitHub account to the foundation repository. The Design System needs no access: anyone with its link can open it. They accept GitHub's emailed invitation (it expires after seven days). Until then, a clone says "Repository not found".
   - `echo "$HOME"; git --version; node -v` in Terminal. The first line is `<home>`. If git isn't installed, a window offers Apple's command line tools: install them. If Node is missing or older than the version Modus projects use (24 at the moment; the foundation's `.nvmrc` names it), install that version from nodejs.org. Then run the line again.
   - Git needs a name and email once: `git config --global user.name "<Name>" && git config --global user.email "<email>"`. GitHub refuses account passwords: when git asks for one, it wants a personal access token. A classic token with the `repo` scope (github.com → Settings → Developer settings) covers repositories other people share; nothing shows as it's pasted, and the Mac's keychain remembers it.
   - Clone the foundation: `mkdir -p "$HOME/Projects" && cd "$HOME/Projects" && git clone https://github.com/mikemates/modus-instrument.git`. It needs no install of its own: `npm run new` uses only what Node brings.
   - Before each later project, teammates bring their copy up to date: `cd "$HOME/Projects/modus-instrument" && git pull`.
1. **Intake.** Get, in one short exchange: the project name (turn it into a lowercase-hyphen slug), what it is, who it's for and the main task its first screen must support, and whether it is insight / strategy / POV work (→ `--patterns`). Infer what you can; ask only what's missing.
2. **Choose the foundation.** Ask the foundation questions from `experience-standards`, one at a time, skipping what you already know: whose brand, the client's design system, where the code goes next, anything Instrument lacks, how long it lives. Modus Instrument is the default. Record the answers in step 6.
3. **Create it** (copies files only; refuses a folder that already has files):
   ```bash
   cd "<home>/Projects/modus-instrument" && npm run new -- ../<slug>
   ```
   Add `--patterns` for the Insight Center pieces and `--gate` for anything shared outside the team (a password page; the build encrypts the site and the command prints the password). Success: "Created …" and the next commands printed.
   - **Another library** (the foundation questions chose the client's or the target stack's): match the stack engineering will keep: their library and React versions, their theme file, their lint and test setup. Ask for them now, and log anything still missing as an `[Assumption]`. On the same kind of stack (Vite, React, TypeScript), create the project as above, so the docs, checks, preview and save setup match every other project; after step 4, add their library by its own instructions, take the look from their theme (our token file on Modus-branded work), and remove the foundation pieces it replaces. On a different stack, start from their starter instead and copy in the working files from a scratch `npm run new`: `CLAUDE.md`, `DECISIONS.md`, `MEMORY.md`, `memory/`, `.gitignore`, `.nvmrc`. `modus-ui-foundation` lists what travels and what stays behind.
   - **A demo beside strategy docs:** the app can live in `sandbox/` next to a `context-pack/` of the thinking; add a `vercel.json` that builds the subfolder (SOP E).
4. **Get access** to `<home>/Projects/<slug>` (in Cowork, request that one folder). With another library, swap it in now (step 3).
5. **Install and preview:**
   ```bash
   cd "<home>/Projects/<slug>" && npm install && npm run dev
   ```
   Success: `ready in … ms`, and http://localhost:5173 shows the Modus Create logo and a Paper / Ink switch (with `--gate`, the password page first; with another library, its own starting page).
6. **Set up its memory.** Replace the `[Open question]` placeholders in the project's `CLAUDE.md` ("What this is", "In one line") with the intake answers. Record the foundation answers: on Instrument, in DEC-001 (a setup placeholder, so filling it in rewrites nothing); with another library, mark DEC-001 superseded and log the choice and the answers as DEC-002, and rewrite the Stack and Design system sections of `CLAUDE.md` and the `memory/design-system.md` note for that library, so later sessions don't bring Instrument's rules back. Log any other first decisions (for example `--patterns`, `--gate`, illustrative data). Add a `memory/` note only for what the files can't tell a future session.
7. **GitHub.** The person creates an empty **private** repo named `<slug>` on github.com, under `<github>` or the client's organisation (no README, no licence), then runs:
   ```bash
   cd "<home>/Projects/<slug>" && git init && git add -A && git commit -m "Start the project" && git branch -M main && git remote add origin https://github.com/<github>/<slug>.git && git push -u origin main
   ```
   The starter passes its checks as it comes; only the docs changed in step 6.
   If it reports "rejected … fetch first", the repo was created with a README; if it asks for a password, it wants a token (step 0). Either way, have them paste it back and fix it with them.
8. **Build the first screen** for the main task, from the chosen foundation's components, applying the preferences above. Finish with the preview and save lines.

## SOP B — Resume a project

1. Get access to `<home>/Projects/<slug>`.
2. Read `CLAUDE.md`, `MEMORY.md` and the notes it lists, and `DECISIONS.md`, including its open questions. Don't re-argue anything marked decided; if a request would break a decision, say so first. If the request depends on an open question, ask it.
3. Read `.git/logs/HEAD` for the last save (never run git). Files modified since then are the person's unsaved work: mention them once, and offer to save them first as their own save point (`git-workflow`).
4. Check whether the project is behind the system: compare its `tokens/tokens.json`, `scripts/build-tokens.mjs` and `src/components/` with the foundation's, its Standards version line with the current one, and its `.nvmrc` and `engines` with the foundation's. If they differ, mention it once and offer SOP C; don't re-sync unasked. The version line stays until the project is brought up to that version (SOP C). Meanwhile, new work meets the current Standards; where the book names a token step the project lacks, use its nearest and note it for the re-sync.
5. Hand over the preview line (`npm install &&` only when `node_modules` is missing or `package.json` changed).
6. Carry on with what Mike asked; ask what's next only if he didn't say.

## SOP C — Re-sync a project with the latest Modus Instrument

Projects are copies; system changes don't flow in on their own.
1. **Compare** the project's foundation files (`tokens/`, `scripts/build-tokens.mjs`, `src/styles/`, `src/components/`, `src/patterns/`, `src/lib/`, `src/index.ts`, and the Node version in `.nvmrc` and `engines`) with the foundation's. List what differs, and which differences are the project's own changes: its decision log and `memory/design-system.md` name them.
2. **Show Mike the list;** copy across only what he approves, keeping the project's own changes. Where the foundation now has a piece the project built for itself, swap it in; turning the project's file into a one-line pointer keeps its imports unchanged.
3. **Clear what the new token build stops on** before it comes across: Tailwind's `text-xs`, `text-sm`, `text-base`, `text-lg` and `text-xl` draw nothing under the token theme. Remove them, and swap one-off sizes for the token steps, keeping the look.
4. **Check:** regenerate tokens, typecheck, test, build. Render every page before and after at the final-check widths in each theme (`render-checks`; on Instrument that includes 1920 and 2560px), and compare pixel for pixel. Every difference must be an intended system change; prove it by setting that change back and comparing again. Run the accessibility check and the sideways sweep.
5. **Log** `DEC-0NN — Re-synced to Modus Instrument as of <date> [Engineering]` with what came across, what was kept and what was checked; update `memory/design-system.md` and `CLAUDE.md`, and the Standards version line once the project meets that version. Preview and save lines.

## SOP D — Promote something back into the system

When a project grows a component, token, rule or way of working other projects would want. SOP D is Mike's: a teammate sends him the proposal (a note naming the project and files, or a pull request), and he promotes it.
1. Move it into `<home>/Projects/modus-instrument` (`src/components` or `src/patterns`, exported from `src/index.ts`; tokens in `tokens/tokens.json` with both theme values, a usage note and contrast checked).
2. Add or update its entry in `scripts/ds-spec.mjs`, with a preview that follows the book's rules; run `npm run ds:build` and republish the Design System. Read the artifact itself first: a read of one of its files doesn't count, and the publish is refused. Send only the changed files, with `project/design-system.json` (every key kept, `lastChange` updated) in the same call; `components/index.d.ts` goes as `text/plain`. The foundation's `memory/design-system-publishing.md` lists the other traps.
3. Log it in the foundation's `DECISIONS.md`, and update its brand book and `CLAUDE.md`. If a rule or a way of working changed, update the skill in `kit/`, bump the plugin's version and repackage it; Mike and the team then reinstall it (**Customize → Plugins**: **Remove**, then upload the new file).
4. Hand over the foundation's save line; offer SOP C for projects that want it.
A one-off departure for a single client stays in that project and is logged there as an `[Experience]` decision.

## SOP E — Share it

1. Typecheck, tests and build pass; every view handles its states (`experience-standards`). Run `ai-scrubber` before it goes outside the team.
2. On vercel.com, import the GitHub repo. The defaults work: build `npm run build`, output `dist`. The Node version comes from the project: Vercel reads `engines.node` in `package.json`, which overrides the project's setting; Netlify and Cloudflare read `.nvmrc`. Keep both on the foundation's version (SOP F).
3. Keep it deployable:
   - **The lockfile is committed.** Vercel installs with `npm install`, which follows it; `"installCommand": "npm ci"` in `vercel.json` makes that strict.
   - **Import paths match file names exactly,** capitals included: a Mac forgives `./button` for `Button.tsx`; Vercel's Linux build fails on it.
   - **The build stays strict.** A red deploy means something is broken; fix it, never loosen the build to get through.
   - **Real routes need a rewrite** to `/index.html` so deep links don't 404 (hash routes don't).
   - **An app in a subfolder** needs a `vercel.json` with its `installCommand`, `buildCommand` and `outputDirectory`.
4. **Protect it.** Anything shared outside the team goes behind a password: `--gate` builds one in (the site is encrypted, so any host works); otherwise use the host's protection. Keep the repository private while it holds client names, unvalidated figures, borrowed imagery or a password.
5. Log the live URL in the project's `CLAUDE.md`.
6. **Code going to a client's engineers:** agree where the repository will live (their organisation, or a transfer later), and give it a README for their team: how to run, test and deploy, and what is illustrative or stubbed. Review `CLAUDE.md`, `DECISIONS.md` and `memory/` for anything internal before it goes. Protect previews with the host's password rather than `--gate`: anyone with the repository can read the gate's password. Licence and ownership are contract questions; ask, don't assume.

## SOP F — Keep the platform current

Twice a year, when Node's long-term support version changes (late April and late October), or when a host drops a version:
1. **Check the hosts.** Which Node versions Vercel builds with (its docs list them) and the defaults on Netlify and Cloudflare; Node's release schedule for which versions have long-term support and until when.
2. **Choose** the newest long-term support version that Vercel builds with.
3. **Update the foundation** in a cloud copy, running that version: `.nvmrc` and `engines.node` (`NN.x`), then `npm outdated` for the rest. Patch and minor updates come in together; a major update gets its own round, with its migration notes read and options rendered if it changes the look. If npm lists install scripts nobody has approved (`npm install-scripts ls`), approve only the ones the build needs and log them.
4. **Check** on the new version: a clean install, tests, typecheck and build; the demo's build compared file for file with the one before (pixel for pixel where it differs, `render-checks`); a new project with `--gate --patterns` installed, typechecked and built. Read `npm audit`: for a finding deep in the tree, look for a newer version of the package that brings it in, take it with `overrides` in `package.json` and check again, and remove the override once the parent package takes the fix itself. Never run `npm audit fix --force`: it can downgrade packages. Log what's left.
5. **Log** it in the foundation as `[Engineering]`, change the version wherever the README or a skill in `kit/` names it, and hand over the save line (SOP D).
6. **The person's Mac:** they install the new version once, from nodejs.org or with their version manager, then run `npm install` in each project they open.
7. **Projects** take the new `.nvmrc` and `engines` at their next re-sync (SOP C), or straight away when they deploy before then.

## Working from a cloud session

When the work is built in a Claude cloud workspace and written back to the person's Mac. This is the one step that can overwrite their work, so follow it exactly.
- **No git in their folders,** not even `git status` or `git log`: it can leave `.git/index.lock` behind, which blocks their next save. Read `.git/logs/HEAD` for recent saves and `.git/HEAD` for the branch. Git on a scratch copy in the cloud is fine.
- **No npm on their Mac.** Install, build and check in the cloud copy, with `npm ci` so the lockfile doesn't change unless the round changes dependencies.

1. **Start in step.** Bring the project into the cloud workspace (`device_stage_files`, up to 50 files a call, leaving out `.git`, `node_modules` and `dist`). Keep two folders: the **work copy** you edit, and an untouched **base** copy of what the Mac held when the round started. Fingerprint the Mac folder and the base the same way; they must match before you build:
   ```bash
   cd "<folder>" && find . \( -name .git -o -name node_modules -o -name dist -o -name "Claude outputs" \) -prune -o -type f ! -name .DS_Store ! -name "*.tsbuildinfo" -print0 | LC_ALL=C sort -z | xargs -0 sha256sum
   ```
   Compare the one-line totals first (pipe it through `sha256sum` once more), file by file only when they differ. Keep fingerprints in the cloud scratch folder or the tool output, never as a file in their folder. A file only on the Mac is theirs: copy it into both cloud folders.
2. **Finish in the cloud:** typecheck, tests and build pass, `render-checks` for anything visible, decisions logged and `CLAUDE.md` current, so the docs travel in the same write.
3. **List the round:** fingerprint the work copy and compare it with the base, giving the changed, new and deleted files. That list is what gets written; nothing else.
4. **Check the Mac again** against the base: list the modified times first (`device_list_dir`), then fingerprint, and keep those times for step 6.
   - a file the round changes that differs from the base: the person edited it. Stage their version, merge it into the work copy (three-way, against the base), and re-run the checks;
   - a file the round deletes that differs from the base: theirs now; ask before removing it;
   - a file the round doesn't touch that differs: theirs. Bring it into the work copy too, so the checks build with it, and hand over their save first (`git-workflow`);
   - a new file that already exists on the Mac: theirs; merge or rename, never overwrite.
5. **Stage** the round's files in a new folder under `/mnt/user-data/outputs/` (reusing an old one has left stale copies behind), and check each against the work copy's fingerprint and the count against the list (a list file without a final newline drops its last entry).
6. **Write** with `device_commit_files`. For each changed file, pass `expectedMtimeMs` from the time step 4 listed (or `device_stage_files` returned for a file you merged), so an edit made since then is refused rather than overwritten; never `force`. A refused file changed again: go back to step 4 for it. Just before writing, list again to confirm each new file's path is still free.
7. **Deletions and renames:** the shell on their computer can't delete without their permission. List what to remove, and either request delete permission for that folder or give them the list. A rename that only changes capitals needs a temporary name in between: the Mac ignores case.
8. **Verify:** fingerprint both again; every file on the list must match. On any mismatch, stop and find out why; never fix it by writing over the Mac.
9. **Move the base forward:** copy the written files into the base, so the next round compares against what the Mac now holds.
10. **If their computer drops out,** stop. Note what was written and what wasn't, keep the staging folder, base and work copy, and hold the save line: a half-written project may not run. When it's back, start again at step 4.
11. **Hand over** the preview line (restart it when the round added source files) and the save line.

## End of every session

A quick `memory-hygiene` pass (stale notes fixed, new decisions logged) before any write-back, then the one-line summary, the preview line if anything visible changed, and the save line.
