# W4 review: JavaScript expert level

Reviewed 2026-11-13 at `0f5391a` (`origin/main`, E1–E3 merged, lessons 01–15). One pass covers both gaps (facts, versions, coverage) and teaching quality. The lessons were checked against `research/javascript/outline.md`, `facts.md`, the lesson standards in `.claude/agents/writer.md`, the V8 source at tag 14.6.202, the nodejs.org API docs (v26 pages, plus `latest-v24.x` for `cli` and `process`) and MDN/web-features.

**Read:** all 15 lessons in full, code included.

**Scripted checks.** The scripts live in the session scratchpad, outside the repo: `emetrics.py`, `blocks_e.py`, `firstuse_e.py`, `links_e.py`, `erun.sh` (the JS loop of `scripts/validate.sh`, limited to `e1`–`e3`) and `forof3.mjs`.
- **Examples.** All 55 runnable entries and 4 browser files in `examples/javascript/e1`–`e3` were run with `validate.sh`'s rules. On Node 26.11.1 they ran 5 times, plus once with 3 busy-loop processes holding the 4 cores. On 24.21.0 and on `/opt/node22/bin/node` (22.23.4) they ran once each.
- **Feature probes.** About 30 claims were probed on 22, 24 and 26: tier defaults, heap limits, `total_allocated_bytes`, Wasm flags, permission flags, `npm rebuild`, scrypt `maxmem` and `QuotaExceededError`.
- **Primary sources.**
  - V8 14.6.202: `flag-definitions.h`, `ic.cc`, `preparser.h` and `scavenger.h`.
  - Node docs: `cli`, `permissions`, `process`, `module`, `esm`, `timers`, `v8`, `crypto` and `single-executable-applications`.
  - Others: the npm CHANGELOG, and `web-features` 3.46.0 for Trusted Types and `scheduler.yield`.
- **Lesson metrics.**
  - Prose words, counted outside code, `<Exercise>` and imports.
  - Code-block length and width, in the body and in solutions.
  - Code blocks with no text between them.
  - Exercise count and stated results.
  - First use of 38 constructs across all four levels.
  - Relative links and anchors.
- **Repo checks.** All `scripts/check_*.py` that run without a build pass: style, frontmatter, fundamentals, headings, lesson examples and versions.

## Verdict

**What holds up.**
- **Deterministic examples.** On Node 26.11.1, all 55 entries gave byte-identical output in all 6 runs, including the one under CPU load. The timing examples print only margins ("over 10x"), and seeds, clocks and tokens are fixed.
- **Engine claims cite the source and match it.**
  - V8 14.6 flag defaults all match `flag-definitions.h`: `invocation_count_for_maglev` 400, `invocation_count_for_turbofan` 3000, `invocation_count_for_feedback_allocation` 8, `maglev_escape_analysis` on, `lazy` on, and a polymorphic limit of 4.
  - The IC letters `0 1 P N` match `ic.cc`. The `preparser.h` and `scavenger.h` quotes are exact.
  - On Node 22 (V8 12.4), `--no-maglev` really is the default.
- **Node version history checks out.**
  - `--cpu-prof` stable since 22.4/20.16.
  - The permission model: stable since 23.5/22.13; the entry point readable since 24.2/22.17; `NODE_OPTIONS` passed to children since 24.4/22.18; `--allow-net` since 25.0; `--permission-audit` since 24.20/25.8; `process.permission.drop` since 24.20/26.3.
  - Snapshot building no longer experimental since 25.4/24.13.1, while `--snapshot-blob` is still experimental.
  - The compile cache: `enableCompileCache` since 22.8, stable since 25.4.
  - Wasm ESM unflagged since 22.19/24.5, and `import source` since 24.0.
  - `crypto.argon2` since 24.7. `scheduler.yield` is still Stability 1.
- **Web, npm and crypto facts check out.**
  - Trusted Types became Baseline on 2026-02-24 (Firefox 148, Safari 26). `scheduler.yield` is in Chrome 129 and Firefox 142.
  - Bundled npm: 10.9.9, 11.19.0 and 11.20.0. npm 12.0.0 (2026-07-08) blocks install scripts by default.
  - scrypt needs a raised `maxmem` at N = 2^15. `getRandomValues` throws `QuotaExceededError` above 65,536 bytes.
- **Version gating is mostly honest.** Most examples that fail on 22/24 are labelled: `import source`, `--build-sea`, `--allow-net`, `argon2`, `install-scripts` and the V8 version strings. The exceptions are items 1, 2 and 8.
- **Standards are met.**
  - Every lesson has 3 exercises, and all 45 state an expected result.
  - Every lesson has a "when to / when not to" section.
  - No body JS block is over 20 lines or 80 columns.
  - The examples hold no wrappers that hide the tool being taught. The `session.mjs` transcripts run the real commands.
- **The capstone builds on earlier work.** It fixes the advanced P0, the body reader, so `readJson` now collects Buffers and answers 413. Every other lesson is between 989 and 1,269 prose words.

**What most needs to change.**
- Two lessons whose minimum is Node 22 give wrong answers on 22 and 24 without any warning (items 1 and 2).
- Two claims are wrong: Wasm "without warm-up or deoptimization" (item 3) and the p99 arithmetic (item 4).
- The `npm rebuild` advice silently does nothing (item 5).
- The capstone claims a test for every fix but has none for the crash it found (item 6).
- The capstone is 2,090 words, and its self-check does not cover the level (item 7).

| Priority | Count |
|---|---|
| P0 | 0 |
| P1 | 7 |
| P2 | 8 |

No P0: no example is broken on its stated version, and no advice makes a learner less safe.

---

## P1

### 1. Lesson 10's measuring tool exists only on Node 26, but `minVersion` is 22
**Owner:** writer
**Files:** `site/src/content/lessons/javascript/expert/10-data-oriented-js.mdx:8, :25-40, :209, :347`; `examples/javascript/e2/do_chain.mjs`, `do_reuse.mjs`, `do_ex_particles.mjs`, `do_ex_stats.mjs`

**Problem.**
- `getHeapStatistics().total_allocated_bytes` is `undefined` on 22.23.4 and 24.21.0 (probed).
- `undefined - undefined` is `NaN`, so every comparison is false. On 22 and 24, four examples print `chain allocates over 10x the loop: false`, `new objects, over 10 MB: false` and so on. That is the opposite of the lesson's conclusion, with no error.
- The one-line fallback (line 40, `grep -c Scavenge`) is never used in an example or an exercise.

**Fix.** Choose one:
- set `minVersion: "26"`; or
- keep 22 and measure with `PerformanceObserver` `"gc"` entries, as lesson 03's first exercise already does, with `total_allocated_bytes` as the `<Since v="26">` refinement.

In either case, make `allocatedMB` throw when the field is missing, so that an older Node fails loudly.

**Acceptance.**
- On 22.23.4 and 24.21.0 the four `do_*` examples either print the same conclusions as on 26, or exit non-zero with a message that names Node 26.
- `check_versions.py` agrees with the chosen `minVersion`.

### 2. Lesson 07's profile and third exercise give the stated answers only on Node 26
**Owner:** writer
**Files:** `site/src/content/lessons/javascript/expert/07-profiling-node.mdx:77, :84-87, :256, :288-293`; `examples/javascript/e2/pr_session.mjs`

**Problem.**
- On 22.23.4 and 24.21.0, V8 inlines `findUser`.
- `pr_top.mjs` then also lists `(anonymous) pr_slow.mjs:16` (the `orders.map` callback), and on 22 `handleOrdersRequest` as well.
- `pr_ex_total.mjs … findUser` prints `false` on both.
- The lesson says nothing about this, although its own pitfall (line 165) warns about inlining. This is the same trap that lesson 04 handles with `--no-turbo-inlining`.

**Fix.**
- Say the profile is from Node 26.
- Add a sentence that on 22/24 `findUser` is inlined into the `map` callback, so its time shows up at line 16.
- Either run the third exercise with `--no-turbo-inlining` (plus `--no-maglev-inlining` on 26) or state its result per version.

**Acceptance.** `pr_session.mjs`, with the documented flags, gives the stated output on 22, 24 and 26, or the lesson shows the 22/24 output next to the 26 output.

### 3. Wasm does warm up and can deoptimize in V8 14.6
**Owner:** writer (lesson), researcher (fact row)
**File:** `site/src/content/lessons/javascript/expert/05-webassembly-interop.mdx:174`

**Problem.**
- The lesson says "Wasm code gives predictable performance without warm-up or deoptimization." That is not true of the V8 this track targets.
- `flag-definitions.h` at 14.6.202 has `liftoff` (baseline compiler) on and `wasm_dynamic_tiering` (tier-up to TurboFan) on.
- `wasm_deopt` is `true` on x64 and arm64. `node --v8-options` shows `--wasm-deopt` on 26.11.1 and `--no-wasm-deopt` on 24.21.0.
- Wasm code starts in Liftoff and is optimised when hot. On 26, optimised Wasm can deoptimize after speculative inlining.

**Fix.**
- Replace the sentence. Wasm starts fast in the Liftoff baseline and tiers up to TurboFan. Its performance is more predictable than JavaScript's, because the types are fixed, but it is not free of warm-up.
- Benchmark it with the same warm-up rules as lesson 06.
- Cite `flag-definitions.h`.

**Acceptance.** The claim matches the flags above. `facts.md` has a row for Wasm tiering and `wasm_deopt` per Node line.

### 4. The p99 arithmetic is wrong
**Owner:** writer
**File:** `site/src/content/lessons/javascript/expert/06-measuring-performance.mdx:156`

**Problem.** "For a page that makes 50 requests, most visitors meet it." The chance of at least one p99 response in 50 independent requests is 1 − 0.99^50 ≈ 39.5 %. "Most" needs 69 or more requests (1 − 0.99^69 ≈ 50.0 %).

**Fix.** Say "about 4 in 10 visitors". Or use 100 requests, where 1 − 0.99^100 ≈ 63 %, so most visitors do meet it.

**Acceptance.** The sentence's number matches 1 − 0.99^n for the n it states.

### 5. `npm rebuild <name>` does nothing while `ignore-scripts=true` is set
**Owner:** writer
**File:** `site/src/content/lessons/javascript/expert/13-supply-chain.mdx:98` (also the summary at `:384`)

**Problem.**
- The lesson says to put `ignore-scripts=true` in `.npmrc` "and run `npm rebuild <name>` for a package you have decided to trust".
- `npm rebuild` respects `ignore-scripts`. Reproduced with `sc_app`/`sc_greet` on npm 10.9.9 (Node 22.23.4) and npm 11.20.0 (Node 26.11.1): `npm rebuild greet` prints `rebuilt dependencies successfully` and does not run the postinstall.
- `npm rebuild greet --ignore-scripts=false` does run it, and npm 11 then prints its allowScripts warning.
- A learner following the advice ends up with a package that was never built, and is told the rebuild succeeded.

**Fix.**
- Write `npm rebuild <name> --ignore-scripts=false`, and say why the flag is needed.
- On npm 11.16+, point to `allowScripts` and `npm install-scripts approve` as the lasting way to trust one package.
- Add the command to `sc_session.mjs`, so the transcript checks it.

**Acceptance.** `sc_session.out` shows `postinstall-ran.txt` appearing after the documented rebuild command, with `ignore-scripts=true` in `.npmrc`.

### 6. The capstone's crash fix has no test, though the lesson says every fix has one
**Owner:** writer
**Files:**
- `site/src/content/lessons/javascript/expert/15-security-review-project.mdx:187-198, :236, :339, :342`
- `examples/javascript/e3/sr_lnk/test/security.test.mjs`

**Problem.**
- Finding 2, the second-worst finding (one failed file read kills the server), is fixed in `serveFile` and shown in the session transcript.
- `security.test.mjs` has no case for it. Its four tests cover the headers, the validation, prototype codes and `requestTimeout`.
- The headings "A test for every fix" (step 6) and "Each finding here has one" (line 342) are therefore false.
- Line 339, "Two of the five findings were in error handling", counts the line-break 500 (a validation bug) as one of them.

**Fix.**
- Add a test in which reading a file fails, and assert that the request gets `500 internal error` and that a following `GET /api/links/nope` still answers 404.
- The simplest way is a test that spawns `node --permission` with no grant for `public/` (the session's third command already does this), or an option to `createApp` that sets the file root.
- Fix the count on line 339.

**Acceptance.**
- The test fails against `a4/lnk`, because the process exits, and passes against `e3/sr_lnk`.
- `security.test.out` is updated, and the lesson shows the new case.

### 7. The capstone is 2,090 words, and its self-check does not cover the level
**Owner:** writer
**File:** `site/src/content/lessons/javascript/expert/15-security-review-project.mdx:503-545`

**Problem.**
- Prose is 2,090 words against a budget of about 1,400. Of that, 736 words are track ending: the self-check 475, "Where next" 185 and "What you can now do" 76.
- The self-check says "one or two from each lesson", but lessons 05 (Wasm), 10 (data-oriented) and 15 itself have no question.
- "That is the whole language and runtime" (line 536) overclaims.
- The ending works in outline. It has a recap, honest next steps (Python is complete, TypeScript is `status: planned`, TC39, Node contributing, OWASP), and all its links resolve. But it buries the project under level material.

**Fix.**
- Cut the self-check to one question per module, or move it to a short level-review page linked from here. A collapsed `<details>` still counts as prose.
- Keep "Where next" to about 4 bullets.
- Replace the "whole language" sentence with what the learner can now do.
- Trim steps 2 and 4: the five findings are each restated three times, in the probe, the list and the fix.

**Acceptance.**
- `emetrics.py` (or the writer's count) puts the lesson at 1,500 words or fewer.
- Every self-check claim about coverage is true.

---

## P2

### 8. Version notes are missing where Node 22 or 24 prints something else
**Owner:** writer
**Problem, and fix, per lesson.**
- `01-engine-pipeline.mdx:90, :121-126`. With `--single-threaded`, Node 22.23.4 prints `Ignition@1 -> TurboFan@3011`, with no Sparkplug. Without the flag it prints `Sparkplug@4096 -> TurboFan@~13,800`. Show the 22 line next to the 26 one.
- `03-garbage-collection.mdx:263`. Node 24.21.0 prints `rest of the limit: 192 MB`, not 48 or 96. Add it.
- `09-startup-snapshots-cache.mdx:134`. A learner on 22 or 24 gets no runnable SEA path. Show the three `--experimental-sea-config` + `postject` commands, or link the SEA docs section.
- `12-node-permission-model.mdx:234, :270`. On 24.21.0, `rmSync` needs no read grant, so the output lacks `pm_out/audit.txt` and the "easy to miss" remark holds only on 26. Label it.
- `15-security-review-project.mdx:157-160, :349-392`.
  - The step-4 command uses `--allow-net`, which is a bad option on 22 and 24, but the version note comes only in step 5.
  - The audit exercise prints no `Net` lines on 24.21.0.
  - `sr_lnk/package.json` keeps `engines >=22`, while `start:locked` needs Node 25 or later.

**Acceptance.** Each listed output is either labelled with its Node version, or the 22/24 output is shown beside it.

### 9. Two figures in lesson 10 are not reproducible
**Owner:** writer
**File:** `site/src/content/lessons/javascript/expert/10-data-oriented-js.mdx:93, :202`

**Problem.**
- "556 scavenges … with `for...of`" does not reproduce. Three runs of the same loop on 26.11.1 gave 481, 109 and 116 scavenges. Node 22 and 24 gave about 1,340. The indexed loop gave 1–3 on every version.
- "A `Float64Array` silently converts strings … to `NaN`" is wrong for numeric strings: `"3"` is stored as 3.

**Fix.**
- State a range, or the ratio ("hundreds against one"), and say that the count varies from run to run.
- Write "non-numeric strings".

**Acceptance.** No single-run count is presented as typical.

### 10. A broken anchor
**Owner:** writer
**File:** `site/src/content/lessons/javascript/expert/14-crypto-and-secrets.mdx:234`

**Problem.** `#env-files-and-env-file` does not exist. The heading `## .env files and --env-file` slugs to `#env-files-and---env-file`.

**Fix.** Correct the anchor, or rename the heading in `intermediate/28-node-runtime.mdx`.

**Acceptance.** `check_links.py` passes after a build.

### 11. Back-to-back blocks and very wide terminal output
**Owner:** uiux (rendering), writer (text)

**Problem.**
- **Blocks with no text between them.** `13-supply-chain.mdx:27/40` (`package.json` then `postinstall.js`) and `:187/229` (in the solution). These are the only pairs that are not code followed by its output.
- **Wide or long body transcripts** that force horizontal scrolling on mobile:
  - `03:76`, 158 columns;
  - `13:106`, 117 columns;
  - `15:159`, a 25-line stack trace at 114 columns;
  - `12:135`, 21 lines.
- **Long or wide solutions.** 27 JS solution blocks are over 20 lines, for example `el_ex_server.mjs` (40 lines), `sb_ex_settings.mjs` (37) and `cr_ex_rehash.mjs` (37). Two lines go over 80 columns: `12-node-permission-model.mdx:291` and `14-crypto-and-secrets.mdx:386`.

**Fix.**
- Put a sentence between the 13 pairs.
- Cut the step-4 stack trace to the two frames that matter, plus the `ERR_HTTP_HEADERS_SENT` line, and mark the cut with `…`.
- Split the longest solutions with "(continued)".
- uiux: confirm that the terminal frames scroll inside the block, not the page, at 360 px, in both themes.

**Acceptance.**
- No two code blocks touch, except code followed by its output.
- No body transcript is over 100 columns, or it is shown truncated on purpose.

### 12. Three exercises give the answer away or repeat the body
**Owner:** writer

**Problem.**
- `01:244-269`, "Count the returns": three `return` statements give three `Return` instructions. The answer is in the prompt.
- `07:170-209`, "Fix the endpoint": "The fix" (line 93) already describes it, and lesson 08 quotes the result.
- `15:452-499`, "Grade the response headers", repeats the step-6 header test.

**Fix.** Replace each with an exercise that needs a decision:
- 01: predict which bytecode changes when `const` becomes `let`, or read `TestLessThan` and `JumpIfFalse` operands.
- 07: profile a second hot spot that the lesson does not name, such as a `JSON.stringify` replacer.
- 15: find and fix a sixth finding, such as `headersTimeout` or the `Server` header, with its test.

**Acceptance.** No exercise's answer appears in the lesson body or in its own prompt.

### 13. An example file that nothing runs
**Owner:** writer
**File:** `examples/javascript/e2/mp_ex_warmup.mjs`

**Problem.** It has no `.out`, no session runs it, and no lesson references it. It looks left over from a removed lesson-06 exercise, so the Validator never checks it.

**Fix.** Delete it, or restore the exercise with a `.out`.

**Acceptance.** Every `e1`–`e3` entry point is either a library module or validated by a `.out` or a session.

### 14. Things used before they are taught, and small version slips
**Owner:** writer

**Problem, and fix.**
- **`03:13, :170-192`.** The objective promises "observe garbage collections … with PerformanceObserver", but the body never shows it. It first appears in an exercise, three lessons before perf_hooks is taught (06/07). Fix: add a 6-line body example, or a sentence and a link.
- **`11:281`.** `RegExp.escape` needs Node 24, in a lesson whose minimum is Node 22. Fix: add `<Since v="24" />`.
- **`13:100`.** It implies `npm install-scripts` arrived with `allowScripts` in 11.16, but `facts.md` row 103 says 11.18.0. Fix: state both versions.
- **`12:80-87`.** The table omits `--allow-ffi` (26.1.0, in `facts.md`). Fix: add it with `<Since v="26.1" />`.

**Acceptance.** `firstuse_e.py` finds no construct used in an expert lesson before the lesson that teaches or explains it, and the four version facts match `facts.md`.

### 15. `facts.md` has no rows for E1 and E2
**Owner:** researcher
**File:** `research/javascript/facts.md`

**Problem.**
- The engine and performance claims that the lessons now depend on have no source row, so the next writer cannot check them.
- Missing: the Maglev default per Node line; the tier thresholds; `total_allocated_bytes` (26 only); Wasm Liftoff, tier-up and `wasm_deopt` per line.
- Also missing: compile cache 22.1, `enableCompileCache` 22.8, stable 25.4; `--build-sea` 25.5.
- Also missing: `scheduler.yield` (Stability 1 in Node; Chrome 129, Firefox 142); Trusted Types Baseline 2026-02-24.
- The outline still says "Re-verify every engine claim", with no record that this has been done.

**Fix.** Add one row per item above, with the V8 14.6.202 source path or the docs YAML history as the link. Mark the outline note as verified, with today's date.

**Acceptance.** Every version or default stated in lessons 01–10 has a `facts.md` row with a primary source.
