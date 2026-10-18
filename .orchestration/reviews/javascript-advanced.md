# W4 review: JavaScript advanced level

Reviewed 2026-10-18 at `76aade9`, the head of `claude/focused-fermi-z89kyv-101-javascript-a3-a4`, which holds A1–A4 (lessons 01–22). The branch had not merged into `main`. This single pass covers both gaps (facts, versions, coverage) and teaching quality. It checks the level against `research/javascript/outline.md`, `facts.md` and the lesson standards in `.claude/agents/writer.md`.

**Read:** the prose of all 22 lessons in full, with code collapsed to markers. All of 22 (the capstone), code included. The code of every block named in an item below.

**Scripted checks.** The scripts are kept outside the repo, in the session scratchpad: `metrics.py`, `pairs.py`, `wide.py`, `firstuse.py`, `run.sh`, `probe.mjs`, `hist.py` and `split.mjs`.
- **Examples.** All 182 entry points under `examples/javascript/a1`–`a4` were run with `validate.sh`'s rules: 5 times on Node 26.11.1, and once each on 24.21.0 and `/opt/node22/bin/node` (22.22.0).
- **Feature probe.** 50 APIs and syntax forms were probed on 22, 24 and 26.
- **Node docs.** Version histories were taken from the nodejs.org v26.12.0 API pages (`deprecations`, `cli`, `test`, `fs`, `child_process`, `stream`) and from `CHANGELOG_V24.md`.
- **TC39 stages.** From `tc39/proposals` `README.md` and `finished-proposals.md`.
- **Tool versions.** From the npm registry: esbuild, vite, fast-check, web-features and browserslist. The npm `access` default comes from the npm/cli definitions.
- **GitHub Actions.** The current major versions come from the actions' own READMEs.
- **esbuild transcripts.** 18's transcripts were reproduced with esbuild 0.28.2.
- **Lesson metrics.** Prose word counts (outside code and `<Exercise>`). Block length and width, in the body and in solutions. Code blocks that follow each other with no text between them. Exercise count and stated results. "When not to" sections. Closing lines.
- **Syntax first use.** 19 constructs were mapped to the lesson that teaches them.
- **Repo checks.** `scripts/check_*.py` all pass for this level (style, frontmatter, fundamentals, headings, lesson examples, versions).

## Verdict

**What holds up.**
- **Examples are deterministic.** All 182 entries gave byte-identical output in 5 runs on Node 26. Racy and random code prints only invariants (`sm_race.mjs`), or takes the clock and the random source as parameters (07 `retry`, 07 token bucket, 22 rate limiter).
- **Version gating is honest.** The examples that fail on Node 24 are all in lesson 14 (`minVersion: "26"`), plus `cmp_probe`, whose output is meant to differ. Those that fail on Node 22 belong to lessons with `minVersion` 24 or 26, to `<Since v="24">` blocks, or to 20's `cmp_syntax` and `cmp_probe`, which the lesson shows failing on purpose. The one exception is `pkg_session` (item 9).
- **Most version claims check out against primary sources.** Verified:
  - Node: DEP0190 (22.15 documentation-only, 24.0 runtime); DEP0209 (26.8.2); `mkdtempDisposable` (24.4); `--build-sea` (25.5); `--test-coverage-include-all` (26.7); the coverage thresholds (22.8); `Readable.toWeb`/`fromWeb` stable (24.0 and 22.17); web streams in `pipeline` (18.16); `highWaterMark` defaults; `console.log` labelling proxies on Node 26 only.
  - Language: `Math.sumPrecise` absent from 22, 24 and 26; Float16 on 24+; base64 and hex on 26+; `JSON.rawJSON` on 22+.
  - TC39: decorators and ShadowRealm at Stage 2.7; pipeline at Stage 2.
  - Tools: esbuild 0.28.2, Vite 8.3.4, fast-check 4.10.2, web-features 3.43.0, browserslist 4.29.3.
  - npm: `access` defaults to public for new packages.
  - Transcripts: 18's esbuild transcripts reproduce exactly.
- **Standards.** No body code block is over 20 lines, and no body code line is over 80 columns. Every lesson has 3 exercises, and all 66 state an expected result. Every lesson has a "when not to" section: 20 under that name, plus 05's "When code generation is justified" and 10's "Which streams to use". They are specific, not filler.
- **Syntax order.** Apart from item 5, early uses are explained in one sentence and linked: `void (...)` and `URL.canParse` in 22, the forward reference to `Atomics.wait` in 09, `spawnSync` in 05.

**What most needs to change.** The capstone's body reader corrupts text and misreports oversize bodies (item 1). The capstone exercises A4 and intermediate material but almost none of A1–A3 (item 4). Two test-runner flags carry wrong version tags, and the CI workflow pins actions three majors old (items 2 and 3). A1 is 6–46 % over the prose budget (item 6). A2 teaches shared memory before typed arrays (item 5).

| Priority | Count |
|---|---|
| P0 | 1 |
| P1 | 6 |
| P2 | 5 |

---

## P0

### 1. The capstone's body reader corrupts UTF-8 and reports oversize bodies as "url required"
**Owner:** writer
**Files:** `site/src/content/lessons/javascript/advanced/22-project-fullstack.mdx:116-126, :139, :313-317`; `examples/javascript/a4/lnk/server/app.mjs`; `examples/javascript/a4/lnk/test/app.test.mjs`

**Problem.**
- `readJson` does `text += chunk`. Each `Buffer` chunk is decoded on its own, so a character split between two chunks is corrupted. This is the exact pitfall 10 teaches ("Decoding chunks one by one", `10-streams-advanced.mdx:320`), now in the code presented as the finished model app.
- Reproduced with `split.mjs`. It posts `{"url":"https://example.com/café"}` in two writes, cut inside the `é`. The server answers `201 {"code":"g8","url":"https://example.com/caf��","visits":0}` and stores the corrupted URL.
- `text.length > limit` counts UTF-16 code units, not bytes, so the "10,000" limit lets through about 30 KB of three-byte characters.
- The `RangeError("body too large")` is swallowed by `.catch(() => null)` (line 139). The client then gets `400 {"error":"url required"}`. The test at 313-317 asserts only `400`, so it passes for the wrong reason.

**Fix.**
- Collect `Buffer` chunks and count `chunk.byteLength` against a byte limit. Decode once with `Buffer.concat(chunks).toString("utf8")`, or use `new TextDecoder()` with `{ stream: true }` and link 10.
- Answer an oversize body with `413` and `{ error: "body too large" }`. Keep `400` for invalid JSON.
- Make the size test assert `413`. Add a test that posts a non-ASCII URL split across two `write` calls and gets it back intact.
- Update `app.mjs`, the lesson blocks and `app.test.out` together.

**Acceptance.**
- `split.mjs` (or the new test) returns the URL with `é` intact.
- The oversize test asserts `413`.
- `check_lesson_examples.py` passes and the example runs on 22, 24 and 26.

---

## P1

### 2. Fix two wrong test-runner version tags
**Owner:** writer (lesson), researcher (facts.md rows)
**File:** `site/src/content/lessons/javascript/advanced/21-testing-at-scale.mdx:28, :62, :359, :554`

**Problem.**
- **Line 28.** `<Since v="22.8" /> --test-isolation=none` is wrong. Node 22.22.0 answers `node: bad option: --test-isolation=none`. The flag was added in 22.8 as `--experimental-test-isolation` and renamed in v23.6.0 (cli.html history). The rename was never backported to 22.
- **Lines 62, 359 and 554.** `--test-randomize` / `--test-random-seed` carry `<Since v="26.1" />`, and the pitfall says "try `--test-randomize` on Node 26". Both flags work on 24.21.0: the probe printed `ℹ Randomized test order seed`. `CHANGELOG_V24.md` lists "test_runner: support test order randomization" (#61747) under 24.16.0. The docs page shows only 26.1.0.

**Fix.**
- Line 28: tag `--test-isolation=none` as `<Since v="23.6" />`, and say that Node 22 spells it `--experimental-test-isolation=none`.
- Retag the randomize flags `<Since v="24.16" />` and change the pitfall to "on Node 24.16 or later".
- Add both rows to `facts.md`'s Node platform table.

**Acceptance.**
- Every flag in 21 runs on the lowest version its tag names. Check with the 22/24/26 binaries.
- `facts.md` records both histories.

### 3. Update the CI workflow's action versions
**Owner:** writer
**Files:** `site/src/content/lessons/javascript/advanced/21-testing-at-scale.mdx:340-341`; the matching sentence at `22-project-fullstack.mdx:361`

**Problem.**
- The workflow pins `actions/checkout@v4` and `actions/setup-node@v4`. The current READMEs of both actions use `@v7`.
- v4 targets an Actions runtime on Node 20, which reached end of life in April 2026. Learners copying the file get deprecation warnings at best.

**Fix.**
- Use `@v7` for both. Add a one-line note to check the action's README for the current major.
- Optionally pin to a commit SHA, with a sentence on why (this ties into the expert supply-chain lesson).

**Acceptance.** No `@v4` remains in the level. The researcher records the action majors and the date checked in `facts.md` under tooling.

### 4. Make lesson 22 a capstone for the whole advanced level
**Owner:** writer (lesson), researcher (outline row)
**File:** `site/src/content/lessons/javascript/advanced/22-project-fullstack.mdx`, in particular `:343-361`, `:371-459`, `:518-565`, `:574`

**Problem.**
- The app uses `node:http`, a `Map` store, shared ESM, `URL.canParse` and `node:test`, which is intermediate and A4 material. It uses nothing from A1–A3:
  - no `using` or `DisposableStack` (06)
  - no async pattern (07)
  - no streams with backpressure (10)
  - no bytes or encodings (12–14)
  - no JSON Lines or `rawJSON` (15)
  - no compatibility step (20)
- Yet the closing review says "all of it in one application" (line 574).
- Linting, one of the outline's key concepts for this lesson, is a sentence (361). No ESLint config or `lint` script is shown. Line 361 says the 21 workflow runs `npm run lint`, but that workflow has no lint step.
- Exercise 1 ("Custom codes") asks for an API change, but its solution tests `chooseCode` directly and never changes or tests the HTTP route (417). It also leaves the collision it describes unfixed.
- Exercise 3 builds a fixed-window limiter in isolation and never wires it in, although 07 already built a token bucket.

**Fix.** Keep the app small, but make each part reuse one earlier technique:
- Persist links as an append-only JSON Lines log, read back through `readline` (10, 15).
- Wire 07's `TokenBucket` into the router, returning `429`, with an integration test using an injected clock.
- On Node 24+, tear down the test server with `await using` or a `DisposableStack`. Mark it `<Since v="24" />` and keep `after()` for 22 (06).
- Add a start-up `engines` check, or a `cmp_probe`-style guard (20).
- Show the actual `eslint.config.js` (browser and Node globals) and the `lint` step in the CI file.
- Rewrite exercise 1's solution to change `api()` and test it over HTTP with one store.

**Acceptance.**
- At least one technique from each of A1–A4 appears in the app or its required exercises, and each is named in the review section.
- A lint config and script are shown and run.
- Every exercise solution is exercised through HTTP.

### 5. Teach typed arrays before 08 and 09 lean on them
**Owner:** researcher (outline order), writer
**Files:** `site/src/content/lessons/javascript/advanced/09-shared-memory-atomics.mdx:21, :27-60`; `08-worker-threads.mdx:143-173`; `research/javascript/outline.md` (A2/A3 order)

**Problem.**
- 09 is built entirely on `new Int32Array(sharedArrayBuffer)`, typed-array printing and element writes, and 08 transfers `ArrayBuffer`s and `Uint8Array`s.
- `ArrayBuffer`, views, element types and `byteLength` are taught later, in 12 (A3). `firstuse.py` found 7 uses in 09 alone.
- Earlier lessons only meet `Uint8Array` as `TextEncoder` output (`intermediate/24-unicode-js`). 09:21 gives one clause: "viewed through typed arrays such as `Int32Array`".

**Fix.** Either:
- move `arraybuffer-typedarrays` to the start of A2, or before 08 (outline and `order:` change); or
- add a 4–6 sentence primer to 08 before "Transferring instead of copying". It should cover a buffer as bytes, a typed array as a fixed-type view, `Int32Array` elements as 4 bytes, and `byteLength`. Link 09:21 forward to [ArrayBuffer and typed arrays](../arraybuffer-typedarrays/).

**Acceptance.** `firstuse.py`, or an equivalent check, reports no unexplained typed-array or `ArrayBuffer` use before the lesson or primer that teaches it.

### 6. Bring A1 and lesson 08 back under the prose budget
**Owner:** writer
**Files:** `01-proxy-reflect.mdx` (2,040 words), `04-decorators-status.mdx` (1,771), `03-functional-patterns.mdx` (1,636), `05-realms-and-eval.mdx` (1,629), `02-tagged-templates.mdx` (1,520), `08-worker-threads.mdx` (1,411)

**Problem.**
- `writer.md` sets about 1,400 words. The level's mean is 1,288, and A2–A4 range from 832 to 1,385 except 08.
- All five A1 lessons are over, 01 by 46 %.
- The biggest sections:
  - 01's "When not to use a Proxy": 373 words (392-409), including a machine-specific benchmark paragraph.
  - 01's "Where proxies break" (336-390).
  - 04's paraphrase of the proposal README (23-77, 240-242).
  - 03 and 04's "When not to" sections: 302 and 310 words.

**Fix.**
- 01: cut the benchmark paragraph to one sentence plus "measure on your workload" (see item 8), and fold the four "Prefer the plain tools" bullets into the pitfalls.
- 04: replace the README narration with three plain statements and one link.
- 02, 03, 05 and 08: trim the prose around the code by 10–20 %, without removing examples.

**Acceptance.** `metrics.py` (or the validator's word count) shows every advanced lesson at or below 1,450 words.

### 7. Add AsyncLocalStorage, the missing request-context tool
**Owner:** researcher (outline and facts), writer
**Files:** `research/javascript/outline.md` (A2 `async-patterns` row, or a new row); `site/src/content/lessons/javascript/advanced/07-async-patterns.mdx`; `22-project-fullstack.mdx`

**Problem.**
- `AsyncLocalStorage` (`node:async_hooks`) is the standard way for a server to carry a request id or a user through `await` chains, timers and callbacks without passing it through every function. It is stable in every supported Node line.
- It appears in none of the 115 lessons and not in the outline.
- The level teaches async concurrency (07) and ends with a server (22), which is where learners need it.
- The TC39 counterpart, AsyncContext, is Stage 2. The outline already lists it as "do not teach", which makes a Node-only lesson the right place.

**Fix.**
- Add one section to 07, or a short lesson in A2: `run`, `getStore`, propagation through `await`, `setTimeout` and `EventEmitter`, and its cost.
- Use it in 22 to tag each log line with a request id.
- The researcher verifies the current stability and API on 22, 24 and 26 and adds a `facts.md` row. While there, note `module.registerHooks()` (the DEP0205 replacement, absent from the course) for the expert outline.

**Acceptance.**
- The outline names the topic and its owner lesson.
- A runnable example with a `.out` passes on 22, 24 and 26.
- The capstone logs include a request id.

---

## P2

### 8. Drop "the documentation says" and "on my machine"
**Owner:** writer
**Files:**
- `04-decorators-status.mdx:33, :58, :74, :76, :122, :242`
- `05-realms-and-eval.mdx:115, :237, :262, :276`
- `06-using-declarations.mdx:222`
- `08-worker-threads.mdx:177, :262, :322`
- `11-child-processes.mdx:203, :229`
- `01-proxy-reflect.mdx:396`
- `09-shared-memory-atomics.mdx:121`

**Problem.**
- `writer.md` says "State facts directly and link the source. Do not write 'MDN states' or 'the documentation says'". It still happens 16 times, all in A1 and A2. A3 and A4 are clean.
- 01 and 09 give benchmark and race figures "on my machine". The course has no single author, and readers cannot reproduce the figures.

**Fix.**
- State each fact and put the link after it, as A3 does ("... ([fs docs](...))").
- Replace the machine figures with a ratio and an instruction to measure ("a proxy read was about 20 times slower than a plain read in our test run; measure your own hot path").

**Acceptance.** A grep for `(MDN|[Dd]ocumentation|README) (says|states|notes|describes|warns|advises|points out)|on my machine` in `javascript/advanced` returns nothing.

### 9. Fix version-dependent transcripts and one misattributed tag
**Owner:** writer
**Files:**
- `17-package-authoring.mdx` (the `npm test | grep ℹ` transcript); `examples/javascript/a4/pkg_session.out`
- `21-testing-at-scale.mdx:62-67`
- `11-child-processes.mdx:207, :430`

**Problem.**
- **17.** On Node 22, which is the lesson's `minVersion`, `node --test` writes TAP (`# pass 2`) when stdout is not a terminal. The transcript's `grep -E '^ℹ (pass|fail)'` then prints nothing. `pkg_session.mjs` fails on 22 for that reason.
- **21.** Line 62 says "Durations are left out of the reports in this lesson", but the terminal block below it shows `(3.178805ms)` and `(0.340208ms)`.
- **11.** `<Since v="24" />` is attached to "`ChildProcess` has a `Symbol.dispose` method". The method exists on Node 22: added in v20.5.0, stable in v24.2.0. It is the `using` syntax that needs 24.

**Fix.**
- 17: use `node --test --test-reporter=spec` in the package's `test` script, or say the transcript is from Node 24+.
- 21: strip the durations from that block.
- 11: tag the `using` example instead, for example "`<Since v="24" />` With `using` ...", and say the method itself exists on 22.

**Acceptance.** `pkg_session.mjs` passes on 22, 24 and 26, and no transcript contradicts its own lesson.

### 10. Apply the block rules to solutions, and stop putting code blocks back to back
**Owner:** writer (lessons), researcher (extend `scripts/check_lesson_style.py`)
**Files:**
- Solution blocks over 20 lines: `12:302` (22), `12:373` (21), `15:258` (21), `19:225` (23), `19:349` (22), `20:249` (21), `21:508` (24), `22:419` (22).
- Code lines over 80 columns, all in solutions: `16:276, :305`, `20:242, :258`, `22:392, :401, :406, :414, :429, :470, :546`.
- Code blocks directly after another code block, with no text between them (26):
  - `01:90, :198, :483`
  - `02:349`
  - `03:214, :260, :414`
  - `04:101, :206, :316, :361, :402, :414`
  - `05:312, :371, :415`
  - `17:211, :269, :321, :328`
  - `18:49, :59, :161, :304`
  - `19:225`
  - `21:508`

**Problem.** The style checker only reads the lesson body outside `<Exercise>`, so solutions drift. Seven of the 11 wide lines are in the capstone. `writer.md` says "never put two code blocks back to back with no text". The back-to-back pairs cluster in A1, as they did in the intermediate review.

**Fix.**
- Split the long solutions with a sentence between the parts.
- Wrap the wide lines.
- Add one sentence between each pair of back-to-back blocks.
- Extend the checker to solutions and to back-to-back blocks, as warnings first.

**Acceptance.** `wide.py` reports 0, `pairs.py` reports no code-to-code pairs, and no solution block is over 20 lines.

### 11. Add predict, fix and debug exercises, and fix one exercise that shows nothing
**Owner:** writer
**Files:** all 22 lessons' `## Exercises`; `16-math-precision.mdx:329-373`

**Problem.**
- All 66 exercises are "write X". None asks the learner to predict output, find a bug or diagnose a failure. Yet the level's best material is about bugs:
  - the proxy receiver (01)
  - a semaphore that leaks without `finally` (07)
  - lost updates (09)
  - per-chunk decoding (10, and item 1)
  - dual-package `instanceof` (17)
- 16's "Compound interest in fixed point" prints `fixed: 1051.5807` and `float: 1051.5807`, so the exercise shows no difference between the two methods it compares.

**Fix.**
- Replace one exercise per module with a predict-or-fix task that has a checkable answer, for example "this semaphore deadlocks after a failed task; find why and fix it", with a `.out` file.
- In 16, choose a rate and term where the fixed-point and float results differ at four places, and explain the difference.

**Acceptance.** At least one predict, fix or debug exercise in each of A1–A4, and 16's exercise output shows the two methods diverging.

### 12. Make the lesson skeleton consistent: pitfalls, summary, closing links, cross-references
**Owner:** writer
**Files:**
- `22-project-fullstack.mdx:363-577`
- closing lines of `06` to `21`
- `05-realms-and-eval.mdx:264`
- `20-compatibility-baseline.mdx:215, :334-364`

**Problem.**
- 22 has no "Common pitfalls" section and no Summary. `writer.md` requires both. "The advanced level in review" is a level recap, not the lesson's.
- A1 ends each lesson with a linked "Next: [title](../slug/)". Lessons 06–21 end with an unlinked sentence ("The next lesson ..."). The intermediate review (item 12) asked for linked closing lines.
- 05:264 says "A later lesson in this course covers" the permission model. It should name and link the expert lesson `node-permission-model`.
- 20's exercise 3 builds a version-number check right after the pitfall "Detecting by version number" (215). The exercise needs one sentence saying why a start-up `engines` guard in a Node-only CLI is the legitimate exception.

**Fix.**
- Add pitfalls to 22 (body limits, trusting `X-Forwarded-For`, open redirects through stored URLs, in-memory state across restarts) and a five-line summary before the level review.
- Link every closing line.
- Name the expert lesson in 05.
- Add the framing sentence in 20.

**Acceptance.** Every lesson has pitfalls, a summary and a linked closing line, and no "a later lesson" reference lacks a title.
