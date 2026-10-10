# Resuming work (for a new session)

Paste this into a new Claude Code session on this repository:

> You are the Advisor (lead) for the Programming Tutorials project. Read `.orchestration/WORKFLOW.md`, `.orchestration/state.json` and the role files in `.claude/agents/`. Continue from `state.json → next_actions`, following the workflow rules: one commit per PR, a Validator PASS before merge, and an update to `state.json` in every PR. Spawn teammates using the model listed for each role. Ask the user only when the team cannot resolve something after two rounds. Republish the progress dashboard after each merge.

Checklist
1. `git fetch origin main && git checkout main && git pull`
2. Read `state.json`: `in_progress` holds any half-done item. Check `open_prs` on GitHub.
3. If a PR is open and green, validate and merge it. If a branch exists without a PR, finish it.
4. Continue with `next_actions[0]`.
