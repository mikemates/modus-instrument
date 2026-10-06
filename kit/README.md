# prototype-foundations

The skills Modus prototypes are built with. This folder is their source, and everyone, Mike included, installs it as one plugin, `prototype-foundations`, so there's one copy of each skill.

| Skill | What it does |
| --- | --- |
| `modus-project-sop` | Mike's operating procedure: start (with the foundation questions), resume, re-sync, promote back, share; working from a cloud session; his standing preferences |
| `modus-ui-foundation` | The Modus Instrument look: tokens, Paper and Ink, Manrope, violet, restraint, the components |
| `experience-standards` | Modus Experience Standards v0.2: the floor, production-grade engineering, and how to choose a component foundation |
| `render-checks` | Shots, comparison sheets, pixel-for-pixel proof, the accessibility check and the sideways sweep |
| `ai-scrubber` | Finds and fixes the signs of an AI-made build, with rendered options |
| `design-iteration-loop` | Turns a critique into a specific, verified fix |
| `local-preview` | Hands over the exact command to run a project |
| `git-workflow` | Never runs git; hands over one save command |
| `memory-hygiene` | CLAUDE.md, the decision log and memory notes |

`init-prototype` was retired in 0.2.0: `modus-project-sop` starts projects now, with its coaching tone and the Vercel checklist folded in.

## Installing it

In the Claude app: **Customize → Plugins**, upload `prototype-foundations.plugin` from this folder. The skills are written from Mike's setup, but commands use your own home folder and GitHub account. The first time you start a project, Claude walks you through setting up your computer: git, Node, signing in to GitHub, and your own copy of the foundation. Ask Mike for access to the foundation repository and the Design System.

## Changing a skill

Edit its `SKILL.md` here and log the change in the repository's `DECISIONS.md`. Bump `version` in `.claude-plugin/plugin.json` and repackage `prototype-foundations.plugin`. To update, open the plugin under **Customize → Plugins**, choose **Remove**, then upload the new file.

Don't also keep these as separate skills under **Customize → Skills**: the names clash, and you get two of each.
