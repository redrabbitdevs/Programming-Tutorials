# JavaScript intermediate level: gap audit (W4)

- Audited 2026-10-17 at `origin/main` f73107d, which contains PR 90 (lessons 01-38 are identical to branch `claude/focused-fermi-z89kyv-90-javascript-i5-i6`). Scope: `site/src/content/lessons/javascript/intermediate/` lessons 01-38 (I1 Objects, prototypes and classes 01-07, I2 Iteration and collections 08-13, I3 Asynchronous JavaScript 14-21, I4 Text, patterns, dates and numbers 22-27, I5 Node.js essentials 28-33, I6 Testing and tooling 34-38).
- Compared against: `research/javascript/outline.md` and `facts.md`; the beginner audit `research/javascript/gaps-beginner.md` and `.orchestration/reviews/javascript-beginner.md`; MDN (Baseline labels fetched 2026-10-17 for `Error.isError`, `RegExp.escape`, `Promise.try`, `Iterator.concat`, `Map.getOrInsert`, `Intl.DurationFormat`, Temporal, `using` and others); the Node.js API docs as JSON for v22 and v26 (`process`, `util`, `test`, `cli`, `fs`, `typescript`, `stream`, `events`, `timers`); `tc39/proposals` finished-proposals; the npm registry; and well-known curricula (The Node.js learn pages, javascript.info "Classes", "Promises, async/await" and "Regular expressions" parts, Exercism's JavaScript concepts, Real Python style learning paths as a structure check).
- Method:
  - Every example with a `.out` file in `examples/javascript/i1`-`i6` (341 programs plus 20 test files) was run on Node 22.22.0, 24.21.0 and 26.11.1. On 26.11.1 all 341 programs match the lesson output. The 20 test files match once durations are removed, and `nt_fail` and `nt_ex_median` fail on purpose. On Node 24 the only differences are Node 26 features that are tagged (`Iterator.concat`, `getOrInsert`, `Temporal`, test tags). On Node 22 the differences are the tagged Node 24 and 26 features, plus one untagged difference (item 8) and the expected TAP versus spec reporter change for piped `node --test` (item 14).
  - All 341 programs were also run in a stress pass (3 rounds with 16 workers and 4 rounds with 48 workers on a 4-core machine) and once with `TZ=Asia/Kolkata`, `LANG=de_DE.UTF-8`. The time zone and locale run was clean. The stress passes exposed five timer-margin examples (item 5).
  - `scripts/check_fundamentals.py` (227 ids, 0 failed), `check_versions.py` (0 failed), `check_headings.py` (0 failed) and `check_lesson_examples.py` (0 failed) pass. All `../beginner/...`, `../../../fundamentals/...` and intra-level links resolve to real lessons. Every `<Exercise>` has a `<Solution>` with code (38 lessons, 3 or 4 each, 119 pairs). The hard-coded beginner lesson numbers in the prose (22, 14, 29, 26, 19, 15, 28, 27, 6, 21, 24) all match the real beginner files.
  - Reproduced with the real tools: `npm install` / `npm ci` mismatch (npm 11.20.0), ESLint 10.13.0 on the messy file (output identical), `tsc` 7.0.2 on the JSDoc misuse example (output identical). Version facts checked against the Node docs JSON: `process.nextTick` Legacy since 22.7, `--env-file` and `util.parseEnv` stable in 24.10 and 22.21, `--env-file-if-exists` added in 22.9, `fs.glob` stable in 22.17 and 24.0, mock timers stable in 23.1, test tags and `--experimental-test-tag-filter` added in 26.2 (stability 1), default reporter changed from `tap` to `spec` for non-TTY in 23.0, type stripping defaults and warnings, `--experimental-transform-types` removed in 26.

## Summary

- **Size and plan.** All 38 outline lessons exist with the planned slugs, order and module split. The level has 119 exercises with solutions, a project (38), and about 340 verified programs. Quality is high: prose is accurate, outputs match, the `<Since>` tags sit where Node 22 fails, and the Node 22/24/26 split is stated in the text each time.
- **Beginner deferrals are mostly paid off.** Covered: `async`/`await`, promises and timers (14-21), the readline async iterator that beginner lesson 35 relied on (21), `Date` (26), regular expressions (22), `process.argv` and `process.exitCode` (28, 30), `URL` and `node:path` (29), getters and setters and `Object.assign` (03, 06), `instanceof` (01, 02). Not covered anywhere: operators and bitwise (beginner item 10), random numbers (item 11), `decodeURIComponent` and the malformed-URL crash (item 8), the synchronous `fs` functions used by beginner lesson 30 (item 9 here), and a first-class `EventEmitter` lesson that the level silently needs (item 1).
- **No wrong code.** There is no P0 in the sense of a broken example. The P0 items are an outline-level hole (no events lesson although `once`, `drain`, `process.on` and stream events are used from lesson 19 on), a statement about the spec status of Temporal that contradicts `facts.md`, and timer examples that fail under load.
- **Catalog.** `.orchestration/languages.json` still has 644 entries and still lacks the languages listed in `gaps-beginner.md` item 21 (item 18 here).

## P0: wrong, blocking or contradicting the fact sheet

### 1. There is no lesson on `EventEmitter` (`node:events`), yet events carry the whole level
- Owner: outline owner, then writer
- Files and lines: first needed at `19-async-errors.mdx:55` (`process.on("unhandledRejection")`), `28-node-runtime.mdx:75` (`process.on("exit")`), `30-cli-tools.mdx:138-161` (`once` from `node:events`, `child.on`), `31-streams-intro.mdx:36-48` and `:143-168` (`drain`, `finish`, `once`), `32-http-and-fetch.mdx` (`server.on`, `req` events). The outline has no row for it at any level (`grep EventEmitter research/javascript/outline.md` finds nothing).
- Why: `EventEmitter` is the base class of streams, servers, child processes and `process`. The Node.js learn pages and every Node curriculum teach `on`/`once`/`off`/`emit`, listener order, the special `'error'` event (an unhandled `'error'` throws), `events.once`, `events.on` as an async iterator, and the `signal` option. The level uses these pieces one sentence at a time (`30-cli-tools.mdx:161` explains `once` inline) and a learner cannot answer "what is `drain`?" or "why did my script crash with an unhandled 'error' event?".
- Fix: add a lesson `events` ("Events and EventEmitter") as lesson 31 in module I5 before streams (so I5 has 7 lessons and the level 39), with: subclassing and composition, `on`/`once`/`off`/`emit`, argument passing and `this`, the `'error'` rule, `events.once` and `events.on` with `AbortSignal`, memory-leak warning for more than 10 listeners, `EventTarget` and `Event` as the Web equivalent. Exercise ideas: a typed mini event bus; turn an event source into an async iterator. Update the module count in `outline.md`, and link from 19, 28, 30 and 31.

### 2. Lesson 27 states that Temporal is "part of the ECMAScript 2027 draft" and "finished as a standard"; `facts.md` says the spec text is not merged
- Owner: writer
- Files: `27-temporal.mdx:19` ("reached stage 4 ... in May 2026 and is part of the ECMAScript 2027 draft"), `:522` ("was finished as a standard in May 2026"), `:530`, and `research/javascript/outline.md` (`temporal` row).
- Why: `facts.md` ("Stage 4, expected in ES2027") says "Spec text not yet merged into the draft on 2026-10-14". Stage 4 means the proposal is finished and will be in the next edition (`tc39/proposals` `finished-proposals.md` lists it with "Expected Publication Year 2027"). It is not a published standard until ES2027 is approved (June 2027). The lesson's wording is stronger than the evidence. The same table lists `Iterator.concat`, `Map.getOrInsert`, `Error.isError` and `Uint8Array` base64 as 2026, so they are correctly called ES2026 elsewhere.
- Fix: write "reached stage 4 in May 2026 and is expected in ES2027" at 19 and 522, and re-check `tc39/ecma262` before publishing (it currently contains some `Temporal` text; if the merge has happened, update `facts.md` instead).

### 3. Examples that fail intermittently when the machine is busy
- Owner: writer (examples), then reviewer
- Files and lines (lesson, then program): `20-cancellation.mdx:100` `ab_search.mjs` (failed 4 of 4 stress rounds; abort at 100 ms must land inside a 40 ms sleep that begins at 80 ms, so there is a margin of 20 ms on each side), `20-cancellation.mdx:162` `ab_any.mjs`, `18-promise-combinators.mdx:97` `pc_any.mjs`, `18-promise-combinators.mdx:175` `pc_pool.mjs` (the prose at 223 claims gaps of 25 ms make the order stable; it failed once under 12 times oversubscription), `17-async-await.mdx:374` `aa_ex_parallel.mjs` (10 ms gaps).
- Why: all other programs were stable in the same runs. These five depend on timers 10 to 25 ms apart. A learner on a loaded laptop, or CI on a shared runner, will see different output, and the lessons print the output as a fact.
- Fix: widen the gaps to at least 50 ms (for example `ab_search`: sleeps of 100 ms and abort at 250 ms), or make the order depend on the logic, not the clock (use `Promise.withResolvers` to release steps). Add a sentence in lessons 14 and 17 that timing outputs assume an idle machine. Add a stress job (`stress.py` style, 3 rounds) to CI.

## P1: important for a learner

### 4. Node minor-version floors are not stated for the tools
- Owner: writer
- Files and lines: `36-lint-format.mdx:117` (ESLint 10.13.0), `37-types-for-js.mdx:176`, `28-node-runtime.mdx:161-167`, `29-files-and-paths.mdx:186`, `35-mocks-and-fake-timers.mdx:375`, frontmatter `minVersion: "22"` in all of 01-38 except 27.
- Why: the level promises "Node 22", but ESLint 10 declares `engines.node` as `^20.19.0 || ^22.13.0 || >=24` (npm registry, checked today), so it will not install on 22.0 to 22.12. `--env-file` is stable only from 22.21 (the lesson says so), `fs.glob` from 22.17, type stripping by default from 22.18, `t.assert.snapshot` exists from 22.3, WebSocket stable from 22.4. The reader who installed "Node 22" from an old LTS installer hits these one at a time.
- Fix: state once, in lesson 28 and in the module intro, "use the latest 22.x (22.22 or later) or 24; the lessons name any feature that needs a newer minor release", and add the ESLint engine range to the lesson 36 version note. Consider `minVersion: "22.13"` for 36.

### 5. `Intl` is incomplete for an intermediate level: no `Intl.Collator`, `DisplayNames`, `DurationFormat`
- Owner: outline owner, then writer
- Files: `25-intl-formatting.mdx` (sections Numbers, Dates, Lists, Plurals, Relative times), `22-regex-basics.mdx` and `29-files-and-paths.mdx` (use `localeCompare` for sorting without explaining it).
- Why: `grep Intl.Collator` finds nothing in the level. Sorting text for people (accents, case, numeric strings such as `file10` before `file2`) is a common bug, and `localeCompare` is used in exercises 22, 29 and 33 with default options. `Intl.DurationFormat` is Baseline 2025 (MDN) and exists in Node 24 and 26 (tested; not in 22), so it deserves a `<Since v="24" />` section next to `RelativeTimeFormat`. `Intl.DisplayNames` (language and region names) is the standard answer for language pickers.
- Fix: add a section "Sorting and comparing text" (`Intl.Collator`, `numeric: true`, `sensitivity: "base"`, `localeCompare` options, `sort` with a collator) and short sections for `DisplayNames` and `DurationFormat` (Node 24+, tagged).

### 6. The level never teaches the synchronous `fs` functions, `encodeURIComponent` or `decodeURIComponent`, which the beginner level already uses
- Owner: writer
- Files and lines: `29-files-and-paths.mdx:19` (names the `Sync` flavour, then never shows it), `29-files-and-paths.mdx:246-290` (URL section, no `encodeURIComponent`, no `URIError`). Beginner users: `30-json-js.mdx` (`readFileSync`, `mkdtempSync`), `36-script-tags-modules.mdx` (`decodeURIComponent` in `serve.mjs`).
- Why: `gaps-beginner.md` items 8 and 9 deferred these to the intermediate level. `readFileSync` is the right tool for start-up configuration and short scripts, and the reason to avoid it (it blocks the loop, lesson 14) is not tied back. A malformed `%` in a URL throws `URIError`; this is what crashed the beginner server and is a natural example for the "answer every request" rule in 32.
- Fix: in 29 add a short "Synchronous versions" box (`readFileSync`, `writeFileSync`, `existsSync`; fine at start-up, wrong inside a request handler) and in the URL section add `encodeURIComponent`/`decodeURIComponent` with the `URIError` case and when `URLSearchParams` is the better tool. Link `serve.mjs` handling in 32.

### 7. Operators, bitwise operators and random numbers are still taught nowhere
- Owner: outline owner
- Files: none (absent). Closest: `35-mocks-and-fake-timers.mdx:97-140` (`Math.random` is mocked but never explained), `24-unicode-js.mdx`, `13-data-structures-js.mdx`.
- Why: `gaps-beginner.md` items 10 and 11 asked for an operators lesson and for `Math.random` ranges. The intermediate outline has no row for either, and the expert track mentions `Math.random` only as "never for secrets". Intermediate readers meet `**`, `>>>`, `~~`, `|`, `&` in other people's code, and need `Math.floor(Math.random() * n)` to write a game or sample data.
- Fix: add a section "Random numbers" to lesson 35 (ranges, picking an item, `crypto.randomUUID`/`getRandomValues` for anything security-related, injecting the generator for tests) and a short "Operators you will meet in other people's code" box in lesson 08 or 24 (bitwise, `**`, comma, `void`, `in`, `instanceof`, precedence).

### 8. One example output changes between Node 22 and Node 24+, with no note
- Owner: writer
- File and line: `07-symbols.mdx:78-81` (`symbol_keys.mjs`, text block after `console.log(user)`).
- Why: Node 24 and 26 print `{ name: 'Ada', Symbol(id): 42 }`. Node 22.22.0 prints `{ name: 'Ada', [Symbol(id)]: 42 }`. The level says everything runs on Node 22, and this is the only untagged output difference on 22.
- Fix: add one sentence after the output ("Node 22 shows the key as `[Symbol(id)]`") or change the example to print `Object.getOwnPropertySymbols(user)` and `user[id]`, which are the same everywhere.

### 9. Solutions and statements that mislead
- Owner: writer. One per line:
  - `13-data-structures-js.mdx:59` and `:274`: "`shift` ... every other item has to move down one place ... renumbers every remaining item". V8 optimises `shift` on arrays in many sizes (left-trimming), so the cost is not what the prose says and a measurement on Node 26 can disagree. Say "can be O(n) on large arrays, depending on the engine", and either add a timing exercise or drop the claim of "renumbers".
  - `11-maps-sets-in-depth.mdx:23` ("compares keys by identity for objects"): add that primitive keys use SameValueZero (`NaN` equals `NaN`, `+0` equals `-0`), since "Choosing keys" is the natural place.
  - `07-symbols.mdx:229-264` (Money): stores cents but returns floating dollars for non-string hints (`price * 100`), the opposite of the advice at `04-private-and-static.mdx:45` ("whole cents avoid the rounding problems"). Works for 12.5 and 3, but `new Money(1)` times 100 gives a non-integer. Return cents for numeric hints or add a note.
  - `24-unicode-js.mdx:446` (Summary): "A symbol the reader sees as one character" collides with the `Symbol` type from lesson 7. Write "A visible character".
  - `33-npm-in-depth.mdx:121-123`: the `npm ci` error block is shortened without saying so. Real npm 11.20.0 prints `npm error code EUSAGE` first, a second `Invalid: lock file's is-number@6.0.0 does not satisfy is-number@4.0.0` line, and a "Clean install a project" footer. Add "(first lines)".
  - `14-event-loop.mdx:19`: "a first `await` in dynamic import" is the only mention of beginner `await` use. Beginner lessons 04 and 35 use `await` and an async iterator earlier; link them from `17-async-await.mdx:21` ("You saw the first forms of this in lessons 4, 33 and 35 of the beginner level").
  - `13-data-structures-js.mdx:391`, `22-regex-basics.mdx:301`, `26-dates-legacy.mdx:343` and the other 6 untitled `javascript` starter blocks (see item 12): not wrong, but they cannot be run or checked.

### 10. Missing coverage inside existing topics
- Owner: writer (rank by learner value)
  1. Graceful shutdown and signals in a CLI or server: `process.on("SIGINT"/"SIGTERM")`, `server.close()`, exit codes 128+n. Add to `30-cli-tools.mdx` ("Exit codes") and `32-http-and-fetch.mdx` ("Not closing the server"). Present in Node's learn pages and Real Python's CLI paths.
  2. `new.target`, abstract-class pattern, `Symbol.hasInstance` and `Symbol.species` (the array subclass example at `05-inheritance-composition.mdx:152-176` depends on `species` without naming it). Add to 05 and 07.
  3. Thenables, and the extra microtask ticks a promise resolved with a promise needs; `then` with two arguments. Add to `16-promises.mdx`.
  4. `Atomics`-free ways to run work in parallel are advanced (A2), but the level should link forward: `14-event-loop.mdx:255` says "a separate thread comes later in the course" without naming `worker-threads`.
  5. `node --inspect`, `console.time`, and basic profiling are beginner (debugging) and expert (profiling) only; a pointer from `14-event-loop.mdx:211-255` ("Blocking the loop") to the expert profiling lesson would help.
  6. `fs.watch` and `--watch` for a dev loop, `os` module (`EOL`, `homedir`), `Buffer` basics (`29-files-and-paths.mdx:69` promises "the advanced module on binary data").
  7. HTTP: `Headers`/`Request`/`Response` constructors, redirects, `FormData`, and the undici timeouts (`headersTimeout`) in `32-http-and-fetch.mdx`.

## P2: nice to have

### 11. Exercises and projects
- Owner: outline owner
- Why: each lesson has 3 or 4 exercises with full solutions, which is strong. Gaps against Exercism and javascript.info: no exercise asks the learner to read an error from a failing run and fix the code without a hint outside module I6; the only project is lesson 38. The level is long (about 17,000 lines) and has no cumulative checkpoint between I3 and I5.
- Fix: add a mini project after I3 ("a rate-limited job runner" using combinators, abort signals and async generators) and one after I5 ("log summariser CLI" using streams, `parseArgs` and a test). Offer a `node --test` file for every exercise in `examples/` as a self-check (the JavaScript beginner audit item 20 proposed the same).

### 12. Untitled code blocks and examples not run by CI
- Owner: writer, infra
- Files: untitled `javascript` blocks at `01-this-in-depth.mdx:294`, `02-prototypes.mdx:322`, `03-classes.mdx:328` and `:401`, `04-private-and-static.mdx:202`, `06-property-descriptors.mdx:390`, `13-data-structures-js.mdx:391`, `15-callbacks.mdx:325`, `18-promise-combinators.mdx:240`, `22-regex-basics.mdx:301`, `26-dates-legacy.mdx:343`, `36-lint-format.mdx:119, 150, 187, 208, 218, 289`, `37-types-for-js.mdx:315, 424`; and the `typescript` blocks `tj_*.ts` in lesson 37 (they exist in `examples/javascript/i6` but `check_lesson_examples.py` skips non-`.mjs`).
- Why: they are exercise starters or tool configs, so the omission is intentional, but a typo in an exercise starter will not be caught. The npm, ESLint, Prettier, Biome and `tsc` outputs in 33, 36 and 37 are not CI-checked, and tool versions change monthly (ESLint 10.13.0 was published 2026-10-16). I reproduced ESLint, `tsc` and the `npm ci` error today and they match, except the shortened `npm ci` text (item 9).
- Fix: give the starters a title and an examples file (marked as "starter", expected to fail or to print the buggy output); add a scheduled CI job that re-runs the tool outputs against pinned versions and reports drift.

### 13. Hard-coded lesson numbers that mix two numbering schemes
- Owner: writer
- Files and lines: 39 occurrences in 01-13, for example `01-this-in-depth.mdx:18` ("Lesson 22" = beginner), `:89` ("Lesson 3" = intermediate), `08-iteration-protocol.mdx:18` ("lesson 14", "lesson 27" = beginner) and `:25` ("lesson 7" = intermediate), `10-iterator-helpers.mdx:297`. All numbers are currently right.
- Why: "lesson 14" in one sentence is a beginner lesson and "lesson 7" in the next is an intermediate lesson, with no label. Lessons 14-38 use link text only, which is the better pattern. Renumbering (item 1 adds a lesson) will break the intermediate references.
- Fix: replace the bare numbers with link text ("the loops lesson"), as the later lessons do. `scripts/check_links.py` could flag `lesson \d+` in prose.

### 14. Test-runner reporter differs on Node 22 when output is piped
- Owner: writer
- File and line: `34-node-test.mdx:69` and the expected reports in 34, 35 and 38.
- Why: lesson 34 explains that before Node 23 a pipe got TAP. On Node 22 in a terminal the spec report matches, and the examples' `.out` files drop durations. The exercise instruction "compare with the expected report" will not match in CI or in a `| tee` on Node 22 (confirmed: all 20 test files print TAP when piped on 22.22.0).
- Fix: add `--test-reporter=spec` to the exercise commands, or add the note in the exercise statement.

### 15. Pedagogical and wording nits
- Owner: writer
  - `10-iterator-helpers.mdx:317` (pitfall "Using helpers on Node older than 22"): fine, but add "Node 20 is end of life" to avoid readers hunting for Node 18/20 workarounds.
  - `27-temporal.mdx:19` and `:377`: say once that `Temporal` can be feature-detected (`typeof Temporal !== "undefined"`) and give the one-line fallback to `Date`.
  - `23-regex-advanced.mdx:291-293`: "catastrophic backtracking" is named but not shown. A 6-line example with a timing note (and `AbortSignal`-free guidance: limit input length) would teach it.
  - `19-async-errors.mdx:164`: `Error.isError` for `DOMException` is correct (tested on Node 24 and 26); add that on Node 22 it does not exist and the fallback is `instanceof Error`.
  - `38-project-rest-client.mdx:350`: the coverage output says "Node 22 also lists the test file itself as a row"; add `--test-coverage-exclude` to the command so output matches on all three versions.

### 16. Catalog check (`.orchestration/languages.json`)
- Owner: catalog owner (W5)
- State: 644 entries, unchanged since the beginner audit. Still missing as of today (searched by slug, name and alias): VHDL, Verilog, SystemVerilog, CUDA, WGSL, Odin, Hare, Jai, Roc, Unison, Koka, Janet, Fennel, Wren, ClojureScript, Vyper, Move, Cairo, Dafny, Nushell, Starlark, Jsonnet, CUE, Dhall, Pkl, GraphQL, BQN, Uiua, Brainfuck, LOLCODE, Whitespace, Befunge, Malbolge, MoonBit. The full list, the PL/I alias problem and the `ecmascript` duplicate are in `gaps-beginner.md` item 21 and are still open. Mojo, Zig, Gleam, Nim, Crystal and Carbon are present.
- Fix: as in `gaps-beginner.md` item 21.

## Checked and fine (no action)

- All version claims in `<Since>` tags and prose: `Promise.try`, `RegExp.escape`, duplicate named groups and inline modifiers (Node 24); `Error.isError` (Node 24, not Baseline); `Iterator.concat`, `Map.getOrInsert`/`getOrInsertComputed`, `Temporal`, test tags (Node 26); `Array.fromAsync`, Set methods, iterator helpers, `Promise.withResolvers`, `v` flag (Node 22); `process.nextTick` Legacy since 22.7; ESM `nextTick` ordering; type stripping versions; `--env-file` and `parseEnv` stability; mock timers experimental warning on 22 (reproduced); snapshot testing without warning on 22.22.
- No removed or deprecated API is taught as current. `__proto__`, `getYear`, `url.parse`, `new Buffer` are flagged or absent. `promisify` on a promise-returning function is flagged as deprecated since 20.8 (correct).
- Examples are independent of time zone and locale (run with `TZ=Asia/Kolkata`, `LANG=de_DE.UTF-8`).
- Exercise-to-solution pairing, solution code, link targets and `fundamentals:` ids.
