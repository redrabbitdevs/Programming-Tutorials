# Improver review: JavaScript intermediate level

Reviewed 2026-10-17 at `0e95417`, the head of `claude/focused-fermi-z89kyv-90-javascript-i5-i6`, which holds I1–I6 (lessons 01–38). It has since merged into `main` as PR 90 (`4db51c1`) with identical lesson content. I built the site with `npm ci && npm run build` (880 pages, no errors) and inspected the HTML in `site/dist`. No screenshots were taken.

**Read in full:** 14 (event loop), 17 (body), 33 (body), 38 (project). **Read in part:** 07, 09, 15, 16, 19, 20, 30 (the grep project and child processes), 31, 35 (structure), 36 (opening and exercises), 37 (exercises). I also read the first paragraph, the headings, the closing line and every exercise prompt of all 38 lessons.

**Scripted checks across all 38 lessons** (scripts kept outside the repo; method in brackets):
- Prose word count (outside code fences and `<Exercise>`, MDX tags removed). Body code-block length (fenced blocks outside `<Exercise>`, output blocks excluded). Solution block length. Code lines over 80 columns in `javascript`/`json`/`html` blocks.
- Exercise count, and whether each prompt states its expected result.
- Code blocks that follow another code block with no prose and no output between them.
- **Syntax first use:** 40 constructs, each mapped to the lesson that teaches it (from `class` in 03 to `mock.timers` in 35 and JSDoc in 37). For each construct the script lists every earlier lesson whose code uses it, split into body, exercise and solution.
- "The documentation says" phrasing, `<Since>`, `minVersion`, closing lines, numbered cross-references, frontmatter values that YAML would cut short.
- The built curriculum page and lesson headers in `dist/`.

To compare like with like, the same word-count script gives the beginner level a mean of 1,012 words. The beginner review used a different counter and reported 919.

**Scope.** The Gap Finder is auditing facts and coverage in parallel, so this review makes no accuracy claims. It is about teaching quality, the standards set after the beginner audit, tone, the projects and the UI.

## Verdict

**What is working.**
- **The beginner standards took hold in I1–I4.** Body blocks: 1 over 20 lines in 27 lessons (`20-cancellation`, 21 lines). Code lines over 80 columns: 0 in the whole level. Every lesson has 3 or 4 exercises (119 in all, against 104 in the 40 beginner lessons). All 119 prompts state an expected result or a sample output. No heading leads straight into code.
- **Syntax order mostly holds.** Previews are marked and linked, for example 07's `WeakMap` ("[Lesson 12](../weak-collections/) explains `WeakMap`") and 15's `await` ("For now, think of `await` as 'wait for the result'"). The one real breach is lesson 14 (item 7).
- **The voice is a person's.** Openings are concrete and all different ("`readFile` gives you the whole file as one string. That is perfect for a settings file and a disaster for a 20 GB log"; "A promise cannot be cancelled."). Words like "simply", "powerful" and "robust" appear 4 times in 38 lessons. Explanations walk the output line by line, as 09's "Follow the output line by line" list and 17's "Follow the order" do. That is the strongest teaching device in the level.
- **The exercises are real work.** Examples: an LRU cache (11), shortest path in a grid (13), an abortable sleep (20), a cursor-paginated reader (21), the daylight-saving bug (26), and three test-writing tasks in 38 that each close a gap the lesson's own coverage report found. None of them recycles a body example, and no solution says "shown earlier".
- **The beginner review's UI fixes are visible.** The language page shows the four level blurbs, "Latest version Node.js 26.12.0" and "Latest standard ECMAScript 2026". `<Since v="24" />` renders "Node.js 24+" with the screen-reader text "Requires Node.js 24 or later". Temporal's row on the curriculum page reads "55 min · Node.js 26+".

**What most needs to change.**
1. One lesson's description and two of its objectives are cut short on the curriculum page, in the lesson header and in the meta description. An unquoted `#` in the YAML caused it (item 1).
2. I5 and I6 (28–38) drift from the standard, as Python's I5 did. They hold 16 of the level's 17 body blocks over 20 lines. Their prose means are 1,533 and 1,752 words, against 1,035–1,230 in I1–I4, and 10 of their 11 lessons go over 1,400. They also hide the tools they teach behind a temp-directory and child-process harness.
3. Two habits the beginner review removed have come back: "MDN states / the Node documentation says" (16 times), and mechanical block splitting. There are 65 places where a code frame directly follows another code frame with nothing between them, and 53 of those pairs would fit in one 20-line block.
4. Projects. The level's two projects are 30's "tiny grep" (a section of a lesson) and 38's tested API client. 38 is well designed but caps only I3, I5 and I6, and does not use the two lessons just before it (lint, types). Nothing combines the first 27 lessons: classes, iterators, generators, collections, regex, Intl and Temporal.

## Did the beginner standards hold?

| Standard (from `javascript-beginner.md`) | Result |
|---|---|
| One idea per block, at most about 20 lines | **Held in I1–I4, slipped in I5–I6.** 506 body blocks; 17 over 20 lines, 16 of them in 31–38, 15 outside the project. The longest is 26. 13 solution blocks are also over 20, 10 of them in 30–38. See items 2 and 4. |
| Code lines of 80 columns or fewer | **Held.** 0 code lines. 10 output lines are longer, and output frames wrap. |
| No syntax before it is taught | **Mostly held.** The only unmarked early uses are in 14: `Promise.resolve().then` (16), an `async` IIFE in the "Predict the order" exercise (17), and `mock.timers` from `node:test` in the body and an exercise (35). The other early uses (`createServer` in 20, `Readable.from` in 21, `process.env.TZ` in 26) are one-off previews, each explained in the prose. See item 7. |
| At least 3 real exercises per lesson, each with a stated result | **Held for count and stated results:** 119 exercises, at least 3 in every lesson, every prompt checkable. **Partly held for "real":** in the tool lessons (33, 36, 37), the exercises build toy versions of the tool and never use it (item 6). Only 11 of 119 are predict, fix or debug exercises, and only one of those is in I5–I6 (item 14). |
| Prose under about 1,400 words | **Held in I1–I4** (one exception each in 14 and 27). **Not held in I5–I6.** See item 3. |
| No "the documentation states" habit | **Not held.** 16 cases in 9 lessons, 7 of them in 14 (item 8). |
| Linked closing line after the Summary; commands in `bash frame="terminal"` | **Not held in I3, I5 and I6.** Their "Next:" lines are plain text, 26 ends on a Summary bullet, and all 21 `bash` blocks lack the terminal frame (item 12). |
| Version markers name Node.js | **Held.** `minVersion: "26"` only on 27. Node 24 and 26 features carry `<Since>`. |

---

## P0

### 1. Quote frontmatter that contains `#`: lesson 04 is truncated on the site
**Owner:** writer (the fix), researcher (the check)
**Files:**
- `site/src/content/lessons/javascript/intermediate/04-private-and-static.mdx:7, :10, :12`
- `scripts/validate.sh` (new check)

**Problem:**
- In YAML, a space followed by `#` starts a comment. Three unquoted values are cut short:
  - line 7, `description: Hide state and helpers with #private fields…`
  - line 10, objective `…static members with the # prefix`
  - line 12, objective `Use #name in object as a brand check`
- The built site shows the truncated text:
  - the curriculum card in `dist/learn/javascript/index.html` and the lesson header both read "Hide state and helpers with";
  - `<meta name="description" content="Hide state and helpers with">`;
  - under "What you will learn", "Declare private fields, methods and static members with the" and "Use".
- The schema accepts the cut-down strings, so the build passes. Nothing catches this, and every later JavaScript lesson about private fields (`#x`) or CSS selectors risks the same bug.

**Acceptance criteria:**
- The three values are double-quoted, and the built page shows the full description and objectives.
- A check in `validate.sh` fails when a lesson's frontmatter has an unquoted scalar containing ` #`, across all languages. Alternatively, it compares each parsed `description` and objective with its raw line.

## P1

### 2. Bring I5 and I6 back to one idea per block
**Owner:** writer
**Files:** the 15 body blocks over 20 lines outside the project:
- `31-streams-intro.mdx`: `si_lines.mjs` (23), `si_errors.mjs` (25), `si_gzip.mjs` (23)
- `32-http-and-fetch.mdx`: `hf_post.mjs` (26), `hf_stream.mjs` (21)
- `33-npm-in-depth.mdx`: `np_semver.mjs` (22), `np_scripts.mjs` (21), `np_dual.mjs` (24)
- `35-mocks-and-fake-timers.mdx`: `mt_retry.test.mjs`, `mt_api.test.mjs`, `mt_debounce.test.mjs`, `mt_cache.mjs` (21 each)
- `37-types-for-js.mdx`: `tj_area.mjs` (25), `tj_jsdoc.mjs` (25)
- `20-cancellation.mdx`: `ab_search.mjs` (21)

**Problem:**
- I1–I4 show the standard can be met: 1 block over 20 lines in 27 lessons.
- I5–I6 slip back. For example, `si_lines.mjs` does two things inside a temp-directory wrapper: it writes 50,000 lines while ignoring backpressure, which the lesson had just taught, and it counts lines with `readline`.
- `np_dual.mjs` puts a whole package (a `package.json`, two builds and an app) inside string literals in one block.

**Acceptance criteria:**
- Outside `38-project-rest-client.mdx`, no body block is over 20 lines.
- Where a file is split, prose sits between the parts (see item 4), and each part that prints has its own output.
- `si_lines.mjs` writes the file in one block, with backpressure handled or the file supplied as a fixture, and counts lines in another.

### 3. Cut I5 and I6 prose to the level's own length
**Owner:** writer
**Files:** 28 (1,401 words), 29 (1,488), 30 (1,884), 31 (1,452), 33 (1,701), 34 (1,703), 35 (1,790), 36 (1,626), 37 (1,847), 38 (1,792). Also 14 (1,577) and 27 (1,540).
**Problem:**
- Module means are I1 1,035, I2 1,206, I3 1,117, I4 1,230, I5 1,533 and I6 1,752.
- Much of the excess is material outside the lesson's objective:
  - 30 adds a full "Running other programs" section (three `child_process` APIs) to a lesson about CLI conventions. The outline does not list child processes for that lesson.
  - 34 has a section on test tags, a Node 26.2 feature in early development.
  - 36 re-teaches beginner material (`==` against `===`, `var` in loops) before reaching ESLint, then covers three tools (ESLint, Prettier and Biome).
  - 38 introduces a new tool, experimental coverage, inside the project.
  - 14 spends a long section on `process.nextTick` in CommonJS against ES modules, and a whole section on mock timers (item 7).

**Acceptance criteria:**
- Every lesson in 28–38 is at 1,400 words or fewer, and the I5 and I6 means are at most 1,300.
- Child processes either become a short lesson of their own in I5 (renumbered in the outline by the researcher) or shrink to one `spawnSync` example. Today 33, 34, 36 and 37 depend on them; after item 5 they should not.
- The coverage section moves from 38 into 34, the testing lesson.
- The 36 opening links the beginner lessons on equality and `let`/`const` in one sentence instead of re-running their examples. Biome gets one paragraph.
- 34's tags section becomes a two-line note.

### 4. Stop splitting code blocks with nothing between them
**Owner:** writer
**Files:** 65 places in 20 lessons. The worst are 09 (12), 05 (8), 13 (8), 04 (4), 12 (4), 03 (3), 06 (3), 15 (3), 21 (3) and 35 (3).
**Problem:**
- Many short examples are cut into a definition block and a `(continued)` usage block, with no sentence and no output between them. Examples are `gen_basics.mjs` (8 and 6 lines), `gen_iterable.mjs` and `ids_infinite.mjs` in 09, and `aa_seq_parallel.mjs` in 17.
- In 53 of the 65 cases, the two parts together are 20 lines or fewer.
- The result is two framed boxes, two title bars and a copy button for one idea. It reads as code cut to pass a line count, not as code shaped for teaching. That is the "generated" look the review is meant to catch.
- The beginner review asked for `(continued)` parts with prose between them (its item 1).

**Acceptance criteria:**
- A `javascript` body block never directly follows another `javascript` block. Between them there is either output or at least one sentence that says what the next part adds.
- Pairs that total 20 lines or fewer are merged.
- A script check reports 0 such pairs (see item 11).

### 5. Show the tools as a learner uses them, not through a harness
**Owner:** writer (lessons), researcher (`validate.sh` support)
**Files:** `withTempDir`, `writeTree`, `spawnSync`, `execFileSync` or `startServer` appear in:
- 29 (15 times), 30 (13), 31 (10), 32 (17), 33 (20), 34 (5), 36 (5), 37 (9), 38 (6)
- 19 (4 times) and 28 (3)

**Problem:**
- To keep every example runnable in CI, I5–I6 run the commands they teach from inside JavaScript. For example:
  - 30's grep project is "tested" by `ct_run.mjs`, which prints made-up transcripts such as `$ grep -in BANANA fruit.txt  -> exit 0`. The learner never sees the real command, `node ct_grep.mjs -in BANANA fruit.txt`, and real `grep` is a different program.
  - 33 builds `node_modules/greeter/package.json` and the app from JSON strings inside `np_exports.mjs`. `exports` and `imports`, the lesson's main idea, are never shown as a `package.json` file.
  - 36 runs `node --check`, and 37 runs `node case.ts`, through `spawnSync`. 19 runs a child Node with `-e` source in a string.
- This is the problem Python intermediate P0 item 1 found (`showtests`), in a milder form. The code runs, but the learner has to read past the scaffolding to find the lesson, and learns harness patterns along the way. One of these is ignoring backpressure "for brevity" in a streams lesson.

**Acceptance criteria:**
- A command the lesson teaches is shown as the learner types it, in a `bash frame="terminal"` block or, with output, a `text frame="terminal"` transcript. Example: 30's grep cases are shown as `node ct_grep.mjs …` with their real output and `echo $?`.
- A multi-file project is shown as files, each in a block titled with its path (`node_modules/greeter/package.json`, `app.mjs`).
- `withTempDir`, `writeTree` and `spawnSync` wrappers stay in `examples/` for the validator. In lesson code they appear only where a temp directory or a child process is the topic.
- `validate.sh` supports the two forms the lessons need:
  - a fixture folder per example, holding the files the lesson shows;
  - a `.cmd` file holding the command a terminal transcript shows.
  Its output is compared as today.

### 6. Make the tool lessons' exercises use the tool
**Owner:** writer
**Files:**
- `33-npm-in-depth.mdx`: "Bump a version", "A package with a pattern export", "A dependency report"
- `36-lint-format.mdx`: "A tiny linter", "Errors, warnings and the exit code", "Wrap at a given width"
- `37-types-for-js.mdx`: "What can Node strip?" (mostly `spawnSync` and temp-file plumbing)
- `30-cli-tools.mdx`: "Three programs in parallel" (practises child processes, not CLI conventions)

**Problem:**
- The outline's exercise ideas were "Add, update and audit dependencies" (33), "Lint and fix a messy project" (36) and "Add JSDoc types and fix the errors the checker finds" (37).
- The written exercises reimplement the tool in miniature, so they can run offline: a string-matching "linter", a function that mimics Prettier's wrapping, an exit-code summariser.
- A learner can finish 36 without ever running ESLint on a file.

**Acceptance criteria:**
- Each of 33, 36 and 37 has at least two exercises in which the learner runs the tool on given files, with the expected tool output or final file stated in the prompt. For example:
  - 36: here is `eslint.config.mjs` and `messy.mjs`, and the first run reports these 5 problems. Make `npx eslint .` print nothing.
  - 33: given these ranges and this list of published versions, predict which version `npm install` picks for each. Then add an `exports` map so that `import "pkg/internal"` fails with `ERR_PACKAGE_PATH_NOT_EXPORTED`.
  - 37: run `npx tsc --noEmit` with `checkJs` on the given file and fix the three errors it reports.
- Exercises that need the network say so in one line and show the dated output, as 36's body already does.
- 30's third exercise practises a CLI convention, such as `--help` output or reading stdin when no file is given.

### 7. Teach mock timers once, in the testing module, and keep lesson 14 to taught syntax
**Owner:** writer
**Files:**
- `14-event-loop.mdx`: "Testing timers without waiting" (`el_mock.mjs`, `mock.timers` from `node:test`), exercise "Count interval ticks with a fake clock", exercise "Predict the order" (an `async` IIFE)
- `35-mocks-and-fake-timers.mdx`: "Fake timers"

**Problem:**
- 14 teaches `mock.timers.enable`, `tick` and `reset`, and sets an exercise on them, 20 lessons before `node:test` (34). 35 then introduces mock timers again from scratch, with no reference back to 14.
- 14's "Predict the order" turns on `G`, the code after `await null` inside an `async` arrow. Its solution has to explain async functions, which 17 teaches three lessons later.
- These are the only unmarked syntax-before-teaching cases in the level.

**Acceptance criteria:**
- 14 has no `node:test` code. Its third exercise uses real timers, for example "Break a long loop into chunks so a 10 ms timer fires on time", with stated output.
- 35's "Fake timers" section opens with one sentence linking 14 for timer semantics.
- "Predict the order" uses only sync code, promise callbacks, `queueMicrotask` and timers. The `async`/`await` variant moves to 17 as a predict exercise there.
- The first-use script (item 11) reports no construct in 14 that is taught in a later lesson, apart from `Promise.resolve().then`, which 14 explains in place.

### 8. Drop the "MDN says / the Node documentation says" habit again
**Owner:** writer
**Files:**
- `14-event-loop.mdx:23, :34, :83, :87, :147, :185, :191`
- `16-promises.mdx:113`
- `19-async-errors.mdx:164`
- `20-cancellation.mdx:188`
- `27-temporal.mdx:21` (twice)
- `28-node-runtime.mdx:120`
- `34-node-test.mdx:385`
- `35-mocks-and-fake-timers.mdx:363`
- `37-types-for-js.mdx:289`

**Problem:**
- Beginner P1 item 8 removed this tic from B7, and it is back: 16 cases.
- 14 has seven in one lesson: "The MDN execution model page calls this…", "MDN states it in the same terms…", "The Node.js event loop guide says…", "Node's documentation makes no promise…", "The Node documentation explains why…".
- It reads as a writer covering themselves. Each fact is either true, and should be stated, or uncertain, and should be checked by the researcher.

**Acceptance criteria:**
- `rg -n '(MDN|[Dd]ocumentation|guide)( page)? (says|states|notes|lists|marks|calls|explains|recommends|makes no promise)' site/src/content/lessons/javascript` returns nothing.
- Stability levels are stated as facts ("`process.nextTick` is marked Legacy since Node 22.7"), with the source cited in `research/javascript/`.

### 9. Add a capstone for I1–I4
**Owner:** writer (lesson), researcher (outline and `order` renumbering)
**Files:** new lesson after `27-temporal.mdx`; `research/javascript/outline.md` (I4)
**Problem:**
- The first 27 lessons, covering objects and classes, iteration, collections, async, and text and dates, end without any project.
- 38 draws on I3, I5 and I6 only. It uses one `class HttpError extends Error`, one regex and no iterator beyond an exercise's async generator.
- So `Symbol.iterator`, generators, iterator helpers, `Map.groupBy`, named groups, `Intl` and `Temporal` are never combined.
- Python intermediate needed the same fix (its item 8, "Add an end-of-level project").

**Acceptance criteria:**
- A project lesson closes I4, built in 3–4 stages, each with a runnable demo and output, as beginner 35 and 40 are. Example: "Project: a log report". It:
  - parses lines with a named-group regex;
  - models entries with a small class that has a private field;
  - streams them lazily through a generator and iterator helpers;
  - groups by level with `Map.groupBy`;
  - prints counts and times with `Intl.NumberFormat`, `Intl.RelativeTimeFormat` and `Temporal.Duration`, or `Date`, with a `<Since v="26" />` stage.
- It has 3 exercises that extend it, each with stated output.
- The outline, `order` values, "Next" lines and pager agree after the renumbering.

### 10. Make the two existing projects work as capstones
**Owner:** writer
**Files:** `38-project-rest-client.mdx`, `30-cli-tools.mdx:226–347`
**Problem:**
- **38** is good engineering: a design table that becomes the tests, an injected `wait`, request counting. As a capstone it has four gaps:
  1. Nothing runs until about 110 lines are written: three client parts, three server parts, then the demo. There are no staged checkpoints.
  2. It ignores the two lessons just before it. There is no `package.json` with `test` and `lint` scripts, no `exports`, no ESLint config and no JSDoc `@ts-check`. The files are flat `pr_*.mjs` names rather than a project layout.
  3. It introduces new material, experimental coverage (item 3).
  4. It ends with "That ends the Testing and tooling module, and the intermediate Node material" and no wrap-up of the level. The pager then says "End of the lessons so far".
- **30's "Project: a tiny grep"** is a section halfway through a lesson, not a capstone:
  - it matches with `includes`, although regex was taught eight lessons earlier;
  - its "tests" are the made-up transcripts of item 5;
  - it reads whole files, and streams come in the next lesson.

**Acceptance criteria:**
- 38 builds in stages, and each stage ends in something that runs:
  1. `send` and a call against the server;
  2. errors;
  3. retries with the demo;
  4. tests.
- 38's files sit in a small package: `package.json` with `"type": "module"`, `"exports"`, and `test` and `lint` scripts run through `node --run`; `src/` and `test/` folders. `// @ts-check` with JSDoc on `createClient` gives one type error that the learner then fixes.
- 38 ends with a short "What you can do now" paragraph for the level (one line per module), and says the advanced level is coming.
- 30's grep takes a regex pattern (`new RegExp(pattern, ignoreCase ? "i" : "")`), with a pitfall line about escaping that links 23's `RegExp.escape`. Its cases are shown as real terminal runs (item 5). The heading becomes "Putting it together: a tiny grep", so the level has one clearly named project per half (items 9 and 10).

### 11. Write the standards down and check them in `validate.sh`
**Owner:** researcher (checks), writer (`.claude/agents/writer.md`)
**Files:** `.claude/agents/writer.md`, `scripts/validate.sh` (or a new `scripts/check_lesson_style.py`)
**Problem:**
- Beginner item 10 asked for per-element rules in `writer.md`. Beginner items 1 and 9 asked for scripted checks. Neither exists:
  - `writer.md` still has only its original bullets;
  - `scripts/` has no block-length, column, phrasing or frontmatter check.
- The level met the standards where its writer remembered them (I1–I4), and drifted where it did not (I5–I6, items 2, 3, 8 and 12). Each new level will repeat this.

**Acceptance criteria:**
- `writer.md` lists the standards:
  - body blocks of 20 lines or fewer;
  - code lines of 80 columns or fewer;
  - no syntax before the lesson that teaches it, except a marked one-line preview;
  - at least 3 exercises, each with a stated result;
  - prose of 1,400 words or fewer;
  - no "documentation says" phrasing;
  - a linked closing line after the Summary;
  - `bash frame="terminal"` for commands;
  - no back-to-back code blocks.
- A check script warns, for all languages, on:
  - body blocks over 20 lines;
  - code lines over 80 columns;
  - back-to-back code blocks;
  - fewer than 3 `<Exercise>` blocks;
  - the item 8 regex;
  - unquoted ` #` in frontmatter (item 1, which fails rather than warns).
  It runs in `validate.sh` and prints counts per lesson.

## P2

### 12. Make closing lines and command frames consistent
**Owner:** writer
**Files:**
- Unlinked "Next:" lines in 14–20, 28–32 and 34–37.
- `26-dates-legacy.mdx` ends on a Summary bullet.
- `33-npm-in-depth.mdx` ends with "Next module: … starting with Node's built-in test runner" without a link.
- All 21 `bash` blocks in 28, 30 and 33–38.

**Problem:**
- I1, I2 and I4 end with a linked "Next: [title](../slug/)…". I3, I5 and I6 use plain text, so the page has a different ending in each half.
- Intermediate `bash` blocks render as untitled editor frames. The beginner level uses `bash frame="terminal"`.

**Acceptance criteria:**
- Every lesson ends with a linked closing sentence after the Summary list.
- `rg -n '^```bash$' site/src/content/lessons/javascript/intermediate` returns nothing.

### 13. Replace "lesson N" cross-references with titles
**Owner:** writer
**Files:** about 39 numbered references in 01–13, for example:
- `01:` "Lesson 22", which means beginner 22, next to "Lesson 3", which means intermediate 3
- `07:` "lesson 6" (beginner) next to "Lesson 12" (intermediate)
- `11:` "Lesson 29" (beginner) twice
- 15 references to beginner numbers; several, such as "lesson 28" in 06 and "lesson 22" in 01, are unlinked

**Problem:**
- The same phrase points into two levels. Unlinked numbers cannot be followed.
- Beginner item 4 proposes moving `this-basics` after objects, which would renumber beginner 22–26 and silently break these labels.
- I3 onwards already use titles ("the [promises lesson](../promises/)").

**Acceptance criteria:**
- `rg -n '[Ll]esson [0-9]+' site/src/content/lessons/javascript/intermediate` returns nothing.
- Every cross-reference names the lesson and links it, with "the beginner lesson on …" for the other level.

### 14. Add predict, fix and debug exercises to I4–I6
**Owner:** writer
**Files:** 22–38
**Problem:**
- 11 of 119 exercises are predict, fix or debug tasks: 14's "Predict the order", 15's "Why did the callback run twice?", 17's "The total that stayed zero" and so on. They are almost all in I1–I3.
- In I5–I6 there is only 34's "Catch every bug".
- Python intermediate had 37 of 112, and its review named them as the best pages.
- Node code has natural bugs to seed:
  - a stream that ignores backpressure;
  - a missing `await` in a test that therefore always passes;
  - `path.join` with user input that escapes the folder;
  - a mock that is never restored;
  - a `Date` month that is off by one.

**Acceptance criteria:**
- Each module from I4 onwards has at least two predict, fix or debug exercises, each with a stated result.
- 35 includes "This test passes but should fail. Why?".

### 15. Teach `Date` before `Intl` formats dates
**Owner:** writer (lessons), researcher (outline)
**Files:** `25-intl-formatting.mdx` (`new Date(...)` at :121 and :278), `26-dates-legacy.mdx`
**Problem:**
- 25 formats `Date` objects with `Intl.DateTimeFormat` and `toLocaleString`, and explains UTC against local time in passing.
- `Date` itself, including epoch milliseconds, months from 0 and local against UTC, is the next lesson.

**Acceptance criteria:**
- Either 25 and 26 swap places (Date, then Intl, then Temporal, which also lets the Intl lesson format a `Temporal` value with a `<Since v="26" />` note), or 25's date section uses only `new Date(isoString)` with one sentence and a link to 26.
- The outline and `order` values agree.
