# Team workflow

The work runs as **six event-triggered workflows**, not one loop. The Advisor is a router: it reads `state.json → triggers`, runs only the workflow whose trigger fired, and calls only that workflow's agents. Agents that a workflow does not need are never called.

## Roles and models

| Role | Agent file | Model | Used in |
|---|---|---|---|
| **Advisor / Lead** | main session | Opus | Routing, triage, merges, escalation to the user |
| Researcher | `researcher.md` | Opus | W1, W6 |
| Writer | `writer.md` | Sonnet (Opus for advanced and expert modules) | W2, W6 |
| Validator | `scripts/validate.sh` + `validator.md` | script (no tokens) + Sonnet for diff fact-checks | W2 (LLM part only when the diff has version claims), W3, W5, W6 |
| UI/UX | `uiux.md` | Sonnet | W3 |
| Gap Finder | `gapfinder.md` | Sonnet | W4 |
| Improver | `improver.md` | Opus | W4 |
| Summarizer | `summarizer.md` | Haiku | W5 |

The Advisor is **not** merged with the Improver. The Advisor's context is long-lived, and filling it with whole-site reviews would make it compact sooner. The Improver runs only at the end of a level, in a fresh context, and returns a short list.

## Workflows

| # | Workflow | Trigger | Agents, in order |
|---|---|---|---|
| W1 | Language bootstrap | Next language has no `research/<lang>/outline.md` | Researcher → scripted check → PR |
| W2 | **Module build** (hot path) | Outline exists, `next_module` set | Writer → `validate.sh` → Validator-LLM *only if the diff has version claims* → (FAIL → Writer, ≤2 rounds → user) → PR |
| W3 | Design change | Improver logs a design P0/P1, or a module needs a new component | UI/UX → `validate.sh` → PR |
| W4 | Level audit | Last module of a level is merged | Gap Finder ∥ Improver (scoped to that level) → Advisor triage → queue into W2/W3/W1 |
| W5 | Catalog batch | Start, then 1 run per ~40 tier-3 languages | Summarizer → template render → `validate.sh` → PR |
| W6 | Version refresh | A language releases a new stable version (checked at bootstrap, then monthly) | Researcher (facts diff) → Writer (patch only affected lessons) → `validate.sh` → PR |

- W2 and W3 may run concurrently, because they touch different directories. W4 runs in the background while W2 starts the next level.
- **Escalation:** an item that fails 2 fix rounds goes to `state.escalations`, and the Advisor asks the user.

## Token-cost rules
1. **Shared fundamentals track.** Concepts common to all languages are written once. Each language teaches only its own deltas.
2. Validation is scripted first. The LLM only fact-checks diffs.
3. Tier-3 pages come from a template plus batched Haiku summaries.
4. The unit of work is a module (5–8 lessons, one PR), not a single lesson.
5. Agents hand off through files and report back in 150 words or fewer. The Advisor never reads whole lessons.
6. Research sources are cached in `research/<lang>/sources/`.
7. The board is rendered by a script and republished only when milestone or language status changes.
8. Start a fresh session from `RESUME.md` at each language boundary.

## Rules
- **One commit = one PR.** The branch is `claude/focused-fermi-z89kyv-NN-<slug>` from the latest `main`. After a Validator PASS and green CI, the Advisor squash-merges it.
- Every version-sensitive claim cites a primary source in `research/`.
- **Resumability:** every PR updates `state.json`. A new session drains `triggers` in order.
