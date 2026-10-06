---
name: "local-preview"
description: "Use whenever someone wants to run, preview or spin up a project on their computer, and after finishing any change to a coded project: hand over the full folder path and the exact copy-paste command."
---

# local-preview

Mike's standing preference, and the team's: whenever a local preview is involved, give them the **full folder path and the exact command** in one copy-paste block, so they never have to work out where to run something or what to type. Do this when they ask ("spin up", "preview", "run it", "start the dev server", "how do I see it") and, unprompted, at the end of any turn that changed a coded project they will want to look at.

They run the command themselves in Terminal on their Mac. Never start the dev server for them from a session: it would run somewhere their browser can't reach.

## 1. Work out the facts (silently)

1. **The folder, as an absolute Mac path.** Projects live in `<home>/Projects/<project>`, where `<home>` is the person's home folder (`/Users/mike` for Mike; `modus-project-sop` → *Key places*); Modus Instrument is `<home>/Projects/modus-instrument`. Confirm it from the connected folder (`get_device_info` → `connectedFolders`), the project's CLAUDE.md or memory, or what they said. If the app lives in a subfolder (e.g. `sandbox/`), the path goes all the way to the folder that holds `package.json`. If you can't establish the path, ask once; never guess it.
2. **The run command.** Read `package.json` scripts: `dev` first, else `start`, else `preview` after `build`. Use the package manager its lockfile implies: `package-lock.json` → npm, `pnpm-lock.yaml` → pnpm, `yarn.lock` → yarn, `bun.lock`/`bun.lockb` → bun.
3. **Whether to install first.** Include the install step (`npm install`, `pnpm install`, …) when `node_modules` is missing, when `package.json` or the lockfile changed this session, or when you can't tell. Leave it out only when you know the building blocks are current.
4. **The address.** A port set in the dev script (`--port`) or the config (`server.port` in `vite.config.*`) wins; otherwise the framework default: Vite 5173, Next.js 3000, Astro 4321, Create React App 3000, `vite preview` 4173.
5. **The Node version** from `.nvmrc` or `engines.node`, for the one-line fix if Node is missing or too old.
6. **A password gate.** A project with a `gate.config.mjs` asks for the password in the preview too, once per browser. Say so, and where the password lives, if they may not have it to hand.

## 2. Hand it over in this shape

One sentence, then ONE bash block on one line, the path quoted and absolute with `<home>` filled in (no `~`, no "in the project folder"):

```bash
cd "<home>/Projects/<project>" && npm install && npm run dev
```

Then, briefly:
- **Open:** the address as a link, e.g. http://localhost:5173 — and say that if that port is busy, the terminal prints the address it used instead.
- **It worked when:** what the terminal shows (Vite: `ready in … ms` and a `Local: http://localhost:5173/` line). The first install takes a minute and prints a lot; that's normal.
- **To stop it:** press Control+C in that Terminal window. Leave the window open while previewing; changes show on refresh. Run anything else, such as the save line, in a second tab (Command+T): this one is busy running the preview.
- **If it says `command not found: npm`:** install Node LTS (version from step 1.5) from nodejs.org, reopen Terminal, run the same line again.
- **Anything red or the word "error":** paste it back and you'll fix it.

If the server is probably already running, say to refresh the browser, and still give the full block for next time. When this round added new source files (a new component, page or style file), say to stop it with Control+C and run the line again: a running preview can miss styles from files it didn't start with. Edits to existing files only need a refresh. If a project has two things to run (an app and an API), give one block per Terminal window, each with its own full path.

## 3. Before handing over

- Make sure the work is finished: the typecheck or build passes wherever you can run it. Don't hand over a command for a broken state.
- Work built in a cloud copy goes back to their Mac first (`modus-project-sop`, *Working from a cloud session*): the command runs there.
- Keep it to the block and the few lines above. No tour of the code, no list of every file changed.
