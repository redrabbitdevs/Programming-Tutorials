# Team workflow

## Roles and models

| Role | Agent file | Model | Loop | Triggered |
|---|---|---|---|---|
| **Advisor / Lead** | main session | Opus | Main loop | Always on: plans, routes work, makes decisions, merges PRs, escalates to the user |
| UI/UX | `.claude/agents/uiux.md` | Sonnet | Design loop | Design-system work, and fixes from the Improver |
| Researcher | `.claude/agents/researcher.md` | Opus | Content loop | Start of each language or module |
| Writer | `.claude/agents/writer.md` | Sonnet | Content loop | After the Researcher's outline |
| Validator | `.claude/agents/validator.md` | Sonnet | Gate | Before **every** PR merges |
| Gap Finder | `.claude/agents/gapfinder.md` | Sonnet | Audit loop (async) | After each module, and once per language |
| Improver | `.claude/agents/improver.md` | Opus | Milestone loop (async) | End of each level (beginner, intermediate and so on), or after a design milestone |

### Why the Advisor is not merged with the Improver
The Advisor's context is long-lived and is the most expensive context to fill. If it also did the Improver's deep reviews of whole lessons, its context would bloat and force earlier compaction. The Improver runs in a **fresh, short-lived context** only at milestones, and hands back a 15-item list. That costs fewer tokens overall than an always-on combined agent.

## Flow

```
            ┌──────────── Advisor (Opus, main loop) ─────────────┐
            │  picks next item from state.json → dispatches       │
            ▼                                                     │
  Researcher ──outline/facts──▶ Writer ──MDX+examples──▶ Validator ─PASS─▶ PR → merge → state.json++
                                   ▲                        │FAIL
                                   └────────defects─────────┘
  UI/UX ─(design PRs)─▶ Validator ─▶ PR → merge
  Gap Finder (async, per module) ──gaps.md──▶ Advisor queues new items
  Improver (async, per milestone) ──review.md──▶ Advisor queues P0/P1 items
  Unresolvable after 2 rounds ──▶ Advisor asks the user
```

## Rules
- **One commit = one PR.** The branch is `claude/focused-fermi-z89kyv-NN-<slug>`, based on the latest `main`. The Validator passes it, the Advisor merges it, and the next branch starts from the updated `main`.
- Every version-sensitive statement cites a primary source in `research/`.
- **Resumability:** `state.json` is updated in every PR. A new session reads `RESUME.md` and continues from `next_actions`.
