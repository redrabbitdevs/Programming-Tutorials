# JavaScript beginner level: gap audit (W4)

- Audited 2026-10-15 at commit 0a7a806 (branch `claude/focused-fermi-z89kyv-78-javascript-b7`, not yet merged into `main`; `main` is at 0478f0e). Scope: `site/src/content/lessons/javascript/beginner/` lessons 01-40 (B1 Getting started 01-05, B2 Values and types 06-11, B3 Variables and control flow 12-16, B4 Functions 17-22, B5 Arrays, objects and data 23-30, B6 Modules and a first project 31-35, B7 DOM basics, optional browser strand 36-40).
- Compared against: `research/javascript/outline.md` and `facts.md`, the MDN JavaScript Guide (index fetched 2026-10-15: Grammar and types, Control flow, Loops, Functions, Expressions and operators, Numbers and strings, Dates, Regular expressions, Indexed and Keyed collections, Working with objects, Equality comparisons, Closures, Modules and others), the Node.js 22 and 26 API docs (`cli`, `esm`, `packages`), the shared fundamentals track (`site/src/content/lessons/fundamentals/beginner/`, 28 lessons), and well-known curricula (javascript.info Fundamentals and Data types parts, Exercism's JavaScript concepts, the Odin Project's foundations path).
- Method:
  - All titled and untitled `javascript` blocks in lessons 01-40 were extracted and run with `node` 26.11.1 and 22.22.0. Output blocks were compared with the following `text` block (243 blocks for 01-35, plus the Node demos of 36-40). On 26.11.1 every difference is explained: stdin-driven programs (04, 35), multi-file programs run out of context (27, 32, 33, 34), the intentional `SyntaxError`/`TypeError` snippets in 05, and stdout versus stderr in 03. On 22.22.0 the only extra differences are the two version-print blocks in 02 (expected) and `getOrInsert` in 29 (correctly tagged `<Since v="26" />`). Browser-only files (`document`, `window`) cannot run in Node and were read, not run.
  - Piped-input runs of `greeting_year.mjs`, `main.mjs` and the quiz demos reproduce the documented transcripts. `npm init -y`, `npm run`, `node --run` (with and without `--`), `npm install ms` and the `serve.mjs` server were run with npm 11.20.0 and Node 26.11.1.
  - Frontmatter `fundamentals:` ids were resolved against the real lesson ids, and all relative links were resolved against lesson slugs (0 broken links). `<Exercise>` blocks were checked for a `<Solution>`.
  - Version, release and Baseline claims were compared with `nodejs.org/dist/index.json`, `docs/latest-v26.x/api/{cli,esm,packages}.html`, `docs/latest-v22.x/api/cli.html` and MDN.

## Summary

- **Size.** All 40 outline lessons exist with the planned slugs, order and module split (B7 is optional, as planned). There are 75 exercises (2 per lesson, except 15, 16, 17, 18 and 22 which have 1) and 75 solutions. No exercise is missing its `<Solution>`. The browser strand is split into pure functions that run in Node and thin page files, which keeps it checkable.
- **Code is sound.** On Node 26.11.1 no example is wrong. On Node 22 only the three expected blocks differ, so the "runs on Node 22" claim holds for the lessons as written (item 12 is about proving it in CI).
- **Version facts are mostly accurate.** Checked and correct: ECMAScript 2026 as the 17th edition (as far as `facts.md` could verify it), V8 14.6 in Node 26, the Node 22/24/26 status table and its dates (`schedule.json` values), Node 27's annual model, `--watch` stable since 22, `node --run` added in 22.0.0, `import.meta.dirname` and `filename` stable in 22.16 and 24.0, `require(esm)` (22.12 unflagged, 22.13 no warning, 23.0 default, 25.4 not experimental), JSON modules and `with`, Set methods and `Object.groupBy` on Node 22, `getOrInsert` needing Node 26 (tagged), decorators at stage 2.7, and the Baseline claim for `replaceChildren` (MDN: available since October 2020, so "widely available since April 2023" is right). No removed or deprecated API is taught as current (`substr`, `with`, `arguments` and `assert` are all flagged as legacy). The one wrong version claim is item 3.
- **Real gaps.**
  - Three lessons depend on `async`/`await`, which the beginner level never teaches (item 4).
  - Nine exercises have a `Solution` that only points back at code already printed in the lesson (item 5).
  - Dates, regular expressions and several `process` features are used before any lesson covers them (item 9).
  - There is no lesson on operators, and no random numbers, timers, accessors or `Object.assign` (items 10 and 11).
  - The module lessons are silent about Node's module syntax detection (item 6).
- **Fundamentals links.** 22 of the 40 lessons carry `fundamentals:` ids without the number prefix, so none of them resolves (item 1).
- **Catalog.** `.orchestration/languages.json` is structurally sound but lacks about 50 languages that are not listed under another name, one wrong alias and one duplicate (item 21).

## P0: wrong or blocking

### 1. 22 lessons list `fundamentals:` ids that do not exist
- Owner: writer
- Files and lines (frontmatter, all `fundamentals: [...]`): `12-let-const.mdx:15`, `13-conditionals-js.mdx:16`, `14-loops-js.mdx:15`, `15-errors-basics-js.mdx:15`, `16-debugging-js.mdx:15`, `17-function-forms.mdx:15`, `18-parameters-js.mdx:16`, `19-scope-closures.mdx:16`, `20-higher-order-functions.mdx:15`, `21-recursion-js.mdx:15`, `22-this-basics.mdx:15`, `23-arrays-js.mdx:15`, `24-array-methods.mdx:15`, `25-copying-arrays.mdx:15`, `26-objects-js.mdx:15`, `27-destructuring-spread.mdx:15`, `28-copies-and-references.mdx:15`, `29-map-and-set.mdx:15`, `30-json-js.mdx:15`, `35-project-cli-quiz.mdx:15`, `39-forms-and-validation.mdx:15`, `40-project-todo-page.mdx:15`.
- Why: lessons 01 to 11 use the correct form (`fundamentals/beginner/03-values-and-types`), and Python does too, but 12 onwards drop the number prefix (`fundamentals/beginner/variables-and-assignment`). `resolveFundamentals()` in `site/src/lib/lessons.ts` matches `l.id === id` and returns `lesson: undefined` without any error, so the build passes and the lesson header shows "Builds on" with a bare unlinked word instead of a link. A script comparing all ids against the 28 real files found exactly these 22 lessons broken (and 0 broken in 01-11). `scripts/validate.sh` does not catch it.
- Fix: replace each id with the numbered one: `variables-and-assignment` -> `04-variables-and-assignment`, `conditionals` -> `07-conditionals`, `loops` -> `08-loops`, `functions` -> `09-functions`, `scope-and-lifetime` -> `10-scope-and-lifetime`, `recursion` -> `11-recursion`, `errors-and-exceptions` -> `12-errors-and-exceptions`, `sequences-and-arrays` -> `13-sequences-and-arrays`, `maps-and-sets` -> `14-maps-and-sets`, `records-and-objects` -> `15-records-and-objects`, `memory-and-references` -> `18-memory-and-references`, `searching-and-sorting` -> `21-searching-and-sorting`, `paradigms` -> `23-paradigms`, `debugging` -> `24-debugging`, `clean-code-and-security-basics` -> `28-clean-code-and-security-basics`. Then add a check to `scripts/validate.sh` (or a small script like `check_links.py`) that fails when a `fundamentals:` id has no matching lesson. The same check would have caught this in Python and the other tracks.

### 2. The dynamic-import plugin example cannot be reproduced as written
- Owner: writer
- File: `33-json-modules-dynamic-import.mdx`, `shout.mjs` block (line 67), `whisper.mjs` block (line 77), `run_plugins.mjs` (line 87, import path at line 92), exercise at line 220 and its solution at line 226. Related: `where_am_i.mjs` (line 158).
- Why: `run_plugins.mjs` imports `` `./plugins/${pluginName}.mjs` ``, but the files are titled `shout.mjs` and `whisper.mjs`, and the text never says to put them in a `plugins/` folder. A learner who saves all three files side by side gets `no plugin called shout`, `no plugin called whisper`, `no plugin called shout`, `no plugin called missing` instead of the documented transcript (reproduced on Node 26.11.1). The bug also hides the point of the example, because `ERR_MODULE_NOT_FOUND` is then thrown for the plugins that should exist. A smaller version of the same problem: `where_am_i.mjs` prints `dynamic` as the folder name (output line 3), which is the name of the folder in `examples/javascript/b6/`, not something the learner has.
- Fix: retitle the blocks `plugins/shout.mjs` and `plugins/whisper.mjs` and add one sentence ("put the two plugins in a folder called `plugins` next to `run_plugins.mjs`"). For `where_am_i.mjs`, add "line 3 prints the name of the folder you saved the file in" under the output, or change the output block to show a placeholder such as `my-folder`. The example harness already supports sub-folders (`examples/javascript/b6/dynamic/`), so the repo files can stay as they are.

### 3. "The latest release is 26.11.1 ... as of 14 October 2026" is wrong on the date it states
- Owner: writer, then reviewer
- Files: `02-install-node.mdx:29` ("As of 14 October 2026"), `02-install-node.mdx:37` ("the latest release is 26.11.1"), `research/javascript/facts.md` (Node.js Current row: "v26.11.1, 2026-10-07"), `.github/workflows/ci.yml:23` (`node-version: 26.11.1`).
- Why: `https://nodejs.org/dist/index.json` lists **v26.12.0 on 2026-10-14**, the very day the lesson says "as of". The lesson therefore tells the learner that the newest release is the one before it. `facts.md` has the same stale row. The Node 26 documentation tree under `docs/latest-v26.x` already reports v26.12.0. The next patch release will do the same, so a hard-coded "latest" patch number will go stale again within weeks. (The npm version, 11.20.0, is unchanged in 26.12.0.)
- Fix: in lesson 02 say "Node.js 26 (26.12.0 on 14 October 2026)", or better, drop the claim of "latest" and write "this course was written and run on Node.js 26.11.1; any 26.x release behaves the same". Keep "26.11.1" in sample outputs where it is labelled as the version used (01:43, 03:25, 16:24, 32:20), because those are true statements about the verified run. Update the `facts.md` row to v26.12.0 with the dist-index date, and leave the CI pin at 26.11.1 deliberately or bump both in one commit. Add the check date to `facts.md`.

## P1: important for a learner

### 4. `async`/`await` is used in three beginner lessons and never taught at this level
- Owner: writer
- Files: `04-console-and-output.mdx` (line 150 `await rl.question`, hint at line 190 `rl[Symbol.asyncIterator]()`, `async function ask` at line 200, "copy the shape" at line 165), `33-json-modules-dynamic-import.mdx` (`async function runPlugin` line 90, the rule "Use `await` only inside an `async` function" line 148, promise helpers at line 130), `35-project-cli-quiz.mdx` (line 18 says "This lesson has no new syntax", yet `async function` at line 184, `rl[Symbol.asyncIterator]()` at lines 218, 259 and 374, and `await` in the loop), `20-higher-order-functions.mdx` (`setTimeout` and `clearTimeout` at lines 228-252), `36-script-tags-modules.mdx:124` (`createServer(async ...)`).
- Why: Promises, `async` and timers are module I3 of the intermediate level. Lesson 04 handles `await` as "copy the shape", which is acceptable once. But the first exercise in lesson 04 asks the learner to write an `async function` that uses `Symbol.asyncIterator` (a symbol is first taught in the intermediate level) and `await lines.next()` with destructuring of `{ value }`. That is the hardest code in the first four lessons, and a beginner cannot derive it from the lesson. Lesson 35 says "no new syntax" and then relies on `async function`, `await` in a `while (true)` loop, and the async iterator protocol. Lesson 33 states the `async function` rule as if the term were known. There is no forward link to the intermediate async lessons from any of these.
- Fix: add a one-page "Waiting for things: a first look at `await`" box to lesson 04 (or a short lesson between 14 and 15, or at the start of 33) that covers only: some operations take time and return a promise, `await` waits for one, `await` is allowed at the top of a module and inside an `async function`, a rejected promise throws. Make the lesson 04 exercise do the simple thing it can do on a terminal (two `rl.question` calls in a row, which works when typing) and move the piped-input iterator trick to lesson 35 where it is explained. Change the lesson 35 intro to "the only new idea is `async` input, explained in lesson 4/33". Add a forward link to the intermediate `promises` and `async-await` lessons and a one-line explanation that `setTimeout` schedules a callback for later (20:228).

### 5. Nine exercises have a "solution" that only points back at code already printed in the lesson
- Owner: writer
- Files and lines: `19-scope-closures.mdx:289` (Fix the closure in the loop), `20-higher-order-functions.mdx:286` (Build `once`), `21-recursion-js.mdx:248` (Sum a nested array) and `:260` (Walk an object tree), `24-array-methods.mdx:226` (Order report), `25-copying-arrays.mdx:195` (Sort records by several keys), `27-destructuring-spread.mdx:228` (Merge user settings), `30-json-js.mdx:270` (Load, edit and save), `33-json-modules-dynamic-import.mdx:220` (Lazily import a plugin).
- Why: each `<Solution>` says "the solution is `x.mjs` shown earlier in this lesson". The exercise is answered in the text a few paragraphs above it, so the learner can copy it without thinking, and the solution box adds no new code. For 24 the lesson even says "Here is the exercise, solved" (`24-array-methods.mdx:180`) before the exercise is set. For 21 both exercises ask for the functions the lesson body has just walked through (`nestedSum`, `countFiles`). The tasks come straight from the outline's exercise ideas, and the lessons then solve those same ideas in the body, so the exercise has nothing left to practise.
- Fix: for each, change the exercise to a variation the lesson does not solve, and give a full solution with output. Suggestions: 19, a `makeLimiter(max)` closure that refuses the (max+1)th call; 20, `debounce`/`throttle` or `memoize(fn)` (the outline asks for `debounce`, which is now only shown in the text); 21, `flatten` (nested array to flat array) and `maxDepth(tree)`; 24, a report from a different array (for example students and marks); 25, a different sort key set; 27, merging three levels deep or a `pick(obj, keys)`; 30, a `readJsonOr(file, fallback)` helper; 33, an exercise that loads a locale file by name with a fallback. Delete the "Here is the exercise, solved" sentence at 24:180.

### 6. Node's module syntax detection is missing from the module lessons
- Owner: writer
- Files: `31-es-modules.mdx:20` ("Node.js treats a file as an ES module when: its name ends in `.mjs`, or ... `"type": "module"`"), `34-commonjs-awareness.mdx:59` ("A `.js` file is CommonJS when the nearest `package.json` has no `"type": "module"`") and `:133` ("Using `import` in a CommonJS file ... is a syntax error"), `32-package-json-npm.mdx:200`.
- Why: since Node 22.7.0 (enabled by default; also 20.19.0) a `.js` file with no `type` field is run as CommonJS first and, if that fails on ESM syntax, run again as an ES module. The Node 22 and 26 `packages.html` pages ("Syntax detection", Stability 1.2, release candidate) document it. Reproduced: a `t.js` containing `import { sep } from "node:path"` and no `package.json` runs as ESM on both 22.22.0 and 26.11.1 with no output other than the program's. A learner who saves `hello.js` with an `import` line, as lessons 32 and 36 do, will see it work with or without `"type": "module"`, which contradicts the lessons' "this is a syntax error" and "set `type`" advice. The advice to set `"type": "module"` is still right (it avoids the retry cost and the warning when a `package.json` exists), but the stated reason is incomplete.
- Fix: add a short note in 31 after the bullet list: "If a `.js` file has no `type` setting, Node runs it as CommonJS first and, if it contains `import` or `export`, runs it again as a module. That convenience is called syntax detection. Do not rely on it: set `type` or use `.mjs` so the behaviour is the same everywhere." Soften the sentences at 34:59, 34:133 and 32:200 to say "a `.cjs` file" or "a `.js` file with `"type": "commonjs"`", which are the cases where `import` is a hard error.

### 7. Lesson 34's run instruction leaves out a file the example needs
- Owner: writer
- File: `34-commonjs-awareness.mdx:59` ("Save these as `legacy_math.cjs` and `app.cjs`"), `modern.mjs` is shown about 50 lines later (in "Using ESM from CommonJS").
- Why: `app.cjs` begins with `require("./modern.mjs")`. A learner who saves the two named files and runs `node app.cjs` gets `MODULE_NOT_FOUND`. Verified: with only the two files, Node 26.11.1 exits with that error. With `modern.mjs` present the documented transcript is reproduced exactly on 26.11.1 and 22.22.0.
- Fix: move the `modern.mjs` block (now at line 112) above `app.cjs`, or change the instruction to "Save these as `legacy_math.cjs`, `modern.mjs` (shown further down) and `app.cjs`".

### 8. The local server in lesson 36 crashes on a malformed URL
- Owner: writer
- File: `36-script-tags-modules.mdx`, `serve.mjs` block (line 108); `decodeURIComponent(url.pathname)` at line 126 sits outside the `try`.
- Why: every lesson in B7 tells the learner to run this server. A request for `/%` makes `decodeURIComponent` throw `URIError: URI malformed` inside an `async` request handler. That is an unhandled rejection, and Node ends the process (reproduced on Node 26.11.1: `curl http://127.0.0.1:8123/%` returned nothing and the following request was refused). The lesson spends two bullets on the path-traversal check, so a second hole in the same function is a poor example. It is easy to hit by mistyping a URL in the address bar.
- Fix: move the decoding into the `try` (or a small `try { ... } catch { response.writeHead(400).end("Bad request"); return; }`) and add a sentence saying why. Keep the rest unchanged.

### 9. Dates, regular expressions and several `process` features are used before any lesson teaches them
- Owner: writer (and outline owner)
- Files and lines: `Date` in `06-primitives-and-typeof.mdx:180` and `:200` (`typeof new Date()`, prompt and solution), `28-copies-and-references.mdx:112` (`born: new Date("1815-12-10")`), `30-json-js.mdx:92` and `:114` (`Date.UTC`, `toJSON`, a reviver rebuilding dates), `36-script-tags-modules.mdx:60` and `:69` (`new Date().getHours()`, and the date exercise). Regular expressions in `39-forms-and-validation.mdx:63` (`/\s/.test(name)`) and the email pattern after it. `process.argv[2]` in `32-package-json-npm.mdx:70` and `36-script-tags-modules.mdx` (`serve.mjs`); `process.exitCode` in `35-project-cli-quiz.mdx:284` and `:293`. Synchronous file I/O (`mkdtempSync`, `readFileSync`, `writeFileSync`, `node:os`, `node:path`) in `30-json-js.mdx:192` and `:225`; `URL` and `decodeURIComponent` in 36's server.
- Why: per the outline, `Date`, regex, `process` and files belong to the intermediate level (I4 and I5). That is a good plan, but the beginner lessons use them with one line of explanation or none, and none of them link forward. The `Date` uses are the most visible: a learner sees `Date.UTC(2024, 0, 15, 10, 30)` (months count from 0) in 30 and has no way to read it. `/\s/.test(...)` and `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` are opaque to a beginner.
- Fix: add a one-line explanation plus a forward link at each first use ("`Date` is covered in the intermediate level; here we only need `new Date()` for 'now' and `getFullYear()`"). For regex in 39, say what the two patterns test in a sentence each and link to the intermediate `regex-basics` lesson, or replace `/\s/.test(name)` with `name.includes(" ")` and the email check with `email.includes("@")` plus a note that real validation is done by `type="email"`. For `process.argv` add a three-line box in 32 ("`process.argv` is an array of the words typed after `node`; item 2 is the first argument"). Mention in 30 that file functions are covered later. Consider a short beginner "Date in five minutes" lesson (see item 11).

### 10. There is no lesson on operators, so MDN's "Expressions and operators" chapter is only partly covered
- Owner: outline owner, then writer
- Files: `07-numbers-js.mdx` ("Operators and Math", line 143, arithmetic only), `09-coercion.mdx`, `13-conditionals-js.mdx`, `11-null-undefined-nullish.mdx`. Fundamentals lesson `05-expressions-and-operators` is generic.
- Why: `grep` finds no mention of operator precedence, associativity, prefix versus postfix `++`/`--`, bitwise operators (`&`, `|`, `<<`, `>>>`, and the old `| 0` truncation idiom), the comma operator, `void`, or the rule that `-2 ** 2` is a `SyntaxError`. `instanceof` is used (15, 21, 28, 30) but never introduced as an operator. `a ** b` is in 07 and compound assignment (`+=`) is used throughout but never listed. A beginner who writes `i++ + ++i` or `a && b || c` has nothing to read. The outline's `numbers-js` row lists only `**` and `Math`.
- Fix: add a short lesson "Operators and precedence in JavaScript" after lesson 11 (module B2 grows to 7 lessons, B-total 41). Cover the precedence table in plain words with the five cases that surprise (`&&` over `||`, `**` right to left, unary minus with `**`, `??` mixed with `||`, `!` versus comparison), `++`/`--` (prefix and postfix value), compound assignment, `typeof` and `instanceof`, `in` and `delete`, and a one-paragraph bitwise note ("rarely needed; know that `~~x` and `x | 0` truncate to 32 bits"). Exercise: predict 10 expressions, then run them.

### 11. Common beginner topics have no lesson or section
- Owner: outline owner
- Files: none (the topics are absent); closest places are `07-numbers-js.mdx:179` (`Math.random` is only named), `35-project-cli-quiz.mdx` (`shuffle` uses it), `26-objects-js.mdx`, `23-arrays-js.mdx`, `20-higher-order-functions.mdx:228`.
- Why: compared with the MDN Guide and javascript.info, the beginner level has no coverage of:
  - **Random numbers** (`Math.random`, a random integer in a range, picking an item, seeded versus not). They are needed by games, quizzes and the existing shuffle exercise. The exercise "number-guessing game" in the outline cannot be written with a random secret (14:261 uses the fixed secret 37).
  - **Date and time basics** (`new Date()`, `Date.now()` for timing, `getFullYear`, `toISOString`). See item 9.
  - **Timers** (`setTimeout`, `setInterval`, `clearInterval`) apart from the debounce example.
  - **Accessor properties** (`get`/`set` in object literals) and `Object.assign`. `Object.assign` is only named in lists (`28-copies-and-references.mdx:65` and `:345`) and never shown; getters appear nowhere (the outline puts them in the intermediate classes and property-descriptor lessons).
  - **Array odds and ends**: `concat`, `join` on arrays (it is shown only in the strings lesson), `reverse`, `fill`, `Array.prototype.indexOf` with a start index, `delete arr[i]` creating a hole, `copyWithin`.
  - **String odds and ends**: `charAt`/`toLowerCase` are used but not listed, `localeCompare` is only in 25, `trimStart`/`trimEnd`, `String.raw`, `\u{...}` escapes, `substring`.
  - **Output and debugging helpers**: `console.dir`, `console.time`, `console.assert` (named in 16), `process.env`.
- Fix: add a tidy-up lesson in B4 or B5 ("Math, random numbers and dates for beginners"; about 30 minutes) covering `Math.random` ranges, `Date` basics and `setTimeout`/`setInterval`. Add a short "Odds and ends" box to 23 (`concat`, `join`, `reverse`, `fill`) and 08 (`toLowerCase`, `charAt`, `localeCompare`, `trimStart`/`trimEnd`). Add `Object.assign` and an object-literal getter to 26. Rework the guessing game in 14 to accept a `secret` produced by a function that can be replaced by a fixed one for testing.

### 12. Misleading or imprecise statements
- Owner: writer
- Why and fix, one per line:
  - `23-arrays-js.mdx:270` (Summary): "`includes` and `indexOf` compare with strict-equality rules". The body ("Searching", lines 129-160) is right that `includes` treats `NaN` as equal to itself, so the summary contradicts it. Say "`indexOf` uses `===`; `includes` uses the same-value-zero rule, which also finds `NaN`".
  - `24-array-methods.mdx:70` ("Always give reduce a starting value") versus `:211` (the `biggest` example uses no starting value "on purpose"). Not wrong, but a learner copying the heading will be confused. Add "except when you have checked the array is not empty and the result is the same type as the items" to the heading's text.
  - `12-let-const.mdx:94`: "Using `typeof` on an undeclared name is the one case where it does not throw." True for undeclared names, but `typeof` throws `ReferenceError: Cannot access 'later' before initialization` for a name in its temporal dead zone (verified on Node 26.11.1). Add this to the TDZ section (lines 102-110), because it is the one reason `typeof` is not fully "safe".
  - `28-copies-and-references.mdx:250`: the comment "Bug 5: sort on a copy that is only one level deep" describes a program that does not sort (it assigns `rowsCopy[0].n = 99`). Rename it "a copy that is only one level deep".
  - `39-forms-and-validation.mdx:228`: "Without it [the call to `check()` at load], ... an untouched form could be submitted." Every input has `required`, which already blocks the submit in the browser, so the claim is false for this page. The real reason for the call is that custom messages are set before the first interaction (for example for a `confirm` mismatch). Reword.
  - `05-syntax-style-strict.mdx:95` ("A line that begins with `(`, `[` or a backtick continues the line before it"): also true for a leading `+`, `-` or `/`. Add them in one clause.
  - `06-primitives-and-typeof.mdx:107` (section "Names that do not exist"): "`typeof` is safe on such a name" is true for undeclared names only; see the TDZ note above.
  - `31-es-modules.mdx:20`, `34-commonjs-awareness.mdx:59` and `:133`: see item 6.
  - `04-console-and-output.mdx:140` ("`process.stdout.write` accepts only a string"): it also accepts `Buffer` and `Uint8Array`; a number throws `ERR_INVALID_ARG_TYPE`. Say "a string or bytes; a number throws".

### 13. Node 22 compatibility is claimed everywhere but not checked in CI
- Owner: infra and reviewer
- File: `.github/workflows/ci.yml:17-39`, `scripts/validate.sh`
- Why: CI installs Node 26.11.1 for the lesson examples and Node 22 only for the site build ("only the examples use Node 26"). The lessons promise Node 22 for every beginner lesson and gate the exceptions with `<Since>`. I ran every lesson block on 22.22.0 for this audit and found no break, but the next edit could introduce a Node 24+ feature with no `<Since>` tag and nothing would fail. Only two lessons carry `<Since>` markers at all (02 as an example, 29 for `getOrInsert`).
- Fix: add a second example run with Node 22 in CI, with an allowlist of the known differences: the two version-print examples of lesson 02 (`versions_print.mjs` in `examples/javascript/b1/`) and the `get_or_insert` example of lesson 29. `scripts/check_versions.py` already has a `--run-under` option for Python lessons that downgrades failures inside a `<Since>` section to warnings; give it a Node equivalent so the same rule applies to JavaScript.

## P2: nice to have

### 14. Lessons 31-34 and 36-38 have empty `fundamentals:` although the text links the shared track
- Owner: writer
- Files: `31-es-modules.mdx:15`, `32-package-json-npm.mdx:15`, `34-commonjs-awareness.mdx:15`, `36-script-tags-modules.mdx:15`, `37-dom-select-change.mdx:15`, `38-dom-events.mdx:15` (all `[]`); text links at `36-script-tags-modules.mdx:27` (functions) and `37-dom-select-change.mdx:208` (clean code and security basics). `33-json-modules-dynamic-import.mdx:15` is probably legitimately empty.
- Why: the "Builds on" header is the only way the site connects these lessons to the shared track, and the two links in the text prove the author considers them prerequisites. `05-syntax-style-strict.mdx:15` points to `01-what-is-a-program`, which is a weak match; `18-parameters-js` could also list `18-memory-and-references`.
- Fix: set 36 to `09-functions`, 37 to `28-clean-code-and-security-basics`, 32 to `02-tools-of-the-trade`, and 38 to `09-functions`. Leave 31 and 34 empty unless a fundamentals lesson on code organisation is added. Change 05 to `["fundamentals/beginner/01-what-is-a-program", "fundamentals/beginner/05-expressions-and-operators"]`.

### 15. Five lessons have one exercise, and some outline exercise ideas were dropped
- Owner: writer
- Files: `15-errors-basics-js.mdx:234`, `16-debugging-js.mdx`, `17-function-forms.mdx`, `18-parameters-js.mdx`, `22-this-basics.mdx:207` (one exercise each); `14-loops-js.mdx:261`, `20-higher-order-functions.mdx` (outline asks for `once` and `debounce`; only `once` and a pipeline are set).
- Why: the other 35 lessons have two exercises and the Python track has three. These five have the most error-prone material (error handling, parameters, `this`) and the least practice. The guessing game in 14 takes a list of guesses rather than reading them, so it is not a game.
- Fix: add a second exercise to 15 (a `finally` cleanup order puzzle), 17 (convert a declaration to an arrow and predict what breaks), 18 (rest and spread: `average(...nums)`, `clamp` with defaults) and 22 (predict `this` in six calls). In 14, add an interactive variant that reads guesses with the lesson 04 reader once item 4 is fixed.

### 16. Hard-coded lesson numbers and version strings will drift
- Owner: writer
- Files: `02-install-node.mdx:121` ("Lessons 7 and 9"), `36-script-tags-modules.mdx:55` ("lessons 31 to 33"), `38-dom-events.mdx:18`, `39-forms-and-validation.mdx:18` and `40-project-todo-page.mdx:18` ("as in lesson 36"), and the repeated "Node.js 26.11.1" in sample outputs (`01:43`, `02:81`, `03:25`, `16:24`, `32:20`).
- Why: inserting a lesson (items 4, 10 and 11 each add one) renumbers everything, and the in-text numbers become wrong silently. The relative links used elsewhere (`[strings lesson](../strings-js/)`) do not have this problem.
- Fix: replace the numbers by links. Keep the Node version only where the output really differs by version (02:81, 03:25, 16:24).

### 17. Syntax that appears before its lesson (forward uses)
- Owner: writer
- Files and lines: ternary `? :` in `02-install-node.mdx:163` (exercise solution, with an apology), destructuring in parameters in `18-parameters-js.mdx:149` and `26-objects-js.mdx:243` (`[, count]`, before lesson 27), `filter(Boolean)` in `18-parameters-js.mdx:253` (before 24), `_` as an unused parameter in `23-arrays-js.mdx:173`, `class {}`, `Symbol()` and `new Date()` in the `typeof` quiz (`06-primitives-and-typeof.mdx:180` and `:200`), `Intl.Segmenter` in `08-strings-js.mdx:156`, regex (item 9).
- Why: each is individually explained or harmless, but together a learner meets about a dozen unexplained constructs in the first 20 lessons. The `typeof` quiz in particular asks for predictions about `class {}` and `Symbol()` before either exists in the course.
- Fix: add a one-clause gloss at each ("covered in lesson X"), or reword the quiz to use only types from the table above it.

### 18. Browser strand: accessibility, validation and the `alert` example
- Owner: writer
- Files: `40-project-todo-page.mdx:234` and the render function (list items are clickable `<li>` elements with no keyboard access; a toggle needs a checkbox or button), `37-dom-select-change.mdx:289` and `:315` (the XSS exercise uses an `alert(1)` payload and says nothing about trying it only on a local page), `scripts/validate.sh` (the `.browser` folders are syntax-checked only).
- Why: the project teaches state, render and persistence well, but its markup is mouse-only, which teaches a habit. The browser pages are never run by CI, so a broken page would pass.
- Fix: render each todo as `<li><label><input type="checkbox"> <span>...</span></label> <button>Delete</button></li>` and toggle on `change`; note `aria-live` for the count. Add a jsdom or Playwright smoke test (one page load, one click) as a later CI step.

### 19. Rendering nit
- Owner: writer
- File: `10-equality.mdx:61`
- Why: "The rules are easy to describe but not worth memorising:" follows the paragraph about transitivity on the very next line with no blank line, so the two run together in the rendered page.
- Fix: insert a blank line before it.

### 20. Projects and self-check
- Owner: outline owner
- Files: none; the level has two projects (35 and 40) and no way for a learner to check an exercise besides eyeballing the transcript.
- Why: comparable tracks (Exercism, javascript.info) give a test or an expected output to run. Here the expected output is shown but not checkable by the learner.
- Fix: add a "Check yourself" line to each exercise with a two-line `node:assert/strict` snippet the learner can paste after their code (`assert.deepEqual(formatName({ first: "Ada" }), "Ada")`). Add three small optional projects: a word-frequency CLI that reads a file given in `process.argv` (after 32), a bank-account factory with closures and tests (after 22), an inventory report built only with `map`/`filter`/`reduce`/`Object.groupBy` (after 30).

## Catalog check (`.orchestration/languages.json`)

### 21. About 50 languages are not in the catalog, one alias is wrong, and `ecmascript` duplicates `javascript`
- Owner: catalog owner (W5)
- File: `.orchestration/languages.json`
- State: 644 entries, no duplicate slugs, every `tier` is 1, 2 or 3 (14, 29, 601), every entry has a `name`. JavaScript is tier 1 and its aliases are `JS` and `ECMAScript`.
- Missing programming languages (searched by slug, name and alias; names that exist under another slug are excluded, for example `zsh` is `z-shell`, `Octave` is `gnu-octave`, `Wolfram` is `wolfram-language`, `Coq` is `rocq`, `Standard ML` is `sml`, `Algol` is `algol-58`/`-60`/`-68`, `GLSL` is `opengl-shading-language`, `VBA` is under `visual-basic`):
  - Hardware and GPU: VHDL, Verilog, SystemVerilog, CUDA, WGSL.
  - Systems and general purpose: Odin, Hare, Jai, Roc, Unison, Koka, Frege, Genie, FreeBASIC, QBasic.
  - Lisp family and small languages: Janet, Fennel, LFE, Wren, ClojureScript, MoonScript.
  - Smart contracts and verification: Vyper, Move, Cairo, Dafny, Isabelle, TLA+, Alloy.
  - Shells and scripting: Nushell, Elvish.
  - Configuration and query languages: Starlark, Jsonnet, CUE, Dhall, Pkl, SPARQL, GraphQL, Gremlin, PostScript, OpenSCAD, Typst, LaTeX.
  - Array and esoteric: BQN, Uiua, Brainfuck, LOLCODE, Whitespace, Befunge, Malbolge, Ink.
  - Other: MoonBit.
- Data problems:
  - `PL/I` is listed only as an alias of `easy-pl-i` (Easy PL/I). The 1964 language PL/I has no entry of its own, although many `pl-*` dialects do.
  - `ecmascript` (tier 3, `https://en.wikipedia.org/wiki/ECMAScript`) duplicates the tier-1 `javascript` entry, whose aliases already include `ECMAScript`. Remove it, or make the site resolve it to JavaScript.
  - 211 of 644 entries have no `firstAppeared`, 275 have an empty `paradigm` list, and 4 have no `wikipedia` link (`babbage`, `cayenne`, `cg`, `pico`).
- Fix: add the languages above as tier 3 (most already have Wikipedia pages) in the next W5 batch, give PL/I its own slug and move the alias, remove or redirect `ecmascript`, and fill the 4 missing links. Whether the shell, markup and query languages count as "programming languages" for this site is a policy call; list them and let the owner decide.
