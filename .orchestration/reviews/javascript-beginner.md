# Improver review: JavaScript beginner level

Reviewed 2026-10-15 at `0a7a806`, the head of `claude/focused-fermi-z89kyv-78-javascript-b7`. That branch holds B1–B7 and is not yet merged into `main`. I built the site with `npm ci && npm run build` (842 pages, no errors) and inspected the HTML in `site/dist`. No screenshots were taken.

**Read in full:** 05, 19, 22 (body and the five-bug exercise), 35. **Read in part:** 04 (input section and exercises), 13 (`switch`), 28 (aliasing and exercises), 36 (opening and the server), 40 (stages 2 and 3). I also read the first paragraph, the headings, the closing line and every exercise prompt of all 40 lessons.

**Scripted checks across all 40 lessons, compared with Python beginner (37 lessons):**
- Prose word counts (code and exercises excluded), body code-block length, code lines over 80 columns, exercise counts, prompts that state a result, `<Since>`, `minVersion`, absolute links, closing lines and the first lesson in which each construct is used.
- I ran all 212 `examples/javascript` programs that have a `.out` file on **Node 22.22.0**, the oldest supported line. 210 matched. The 2 that did not are `b1/node_26_check.mjs`, which the lesson says prints something else on 22, and `b5/get_or_insert.mjs`, which is marked `<Since v="26" />`. So the claim in lesson 02 holds: the core path runs on 22.
- 0 absolute links. 0 em dashes. Every lesson has `minVersion: "22"`, so as intended no version badge renders.

**Scope.** The Gap Finder is auditing coverage and facts in parallel, so this review makes no accuracy claims beyond the Node 22 run above. Everything below is about teaching quality, consistency and the UI.

## Verdict

**What is working.**
- **The voice is a person's.** Openings are concrete ("Most programs deal with data that may not be there: a setting nobody set, a field a user left out…"). There is no filler, and the hedging is rare (8 uses of "just" in 40 lessons). The habit of explaining *why* a trap exists (ASI, `this`, `==`) is what a good human teacher does.
- **The projects are well designed.**
  - 35 (CLI quiz) and 40 (todo page) are built in stages, and each stage has a demo you can run.
  - Logic is kept apart from input and output, so it can be checked.
  - Errors get real paths (`process.exitCode`, storage that throws).
  - The B7 split between "logic you run in Node" and "page code you look at" is a genuinely good teaching device for an optional browser strand.
- **Some exercises are first-rate.** 22's "Fix five lost-this bugs", 28's "Find five aliasing bugs" and 16's "Fix four seeded bugs" match Python 28, the model for the site.
- **The scaffolding holds.**
  - Every lesson has "Common pitfalls" and a "Summary".
  - Every runnable block has output after it.
  - Lessons link to the fundamentals track rather than re-teaching it.
  - The interactive transcripts (`text frame="terminal"`) show typed input clearly.

**What most needs to change.**
1. Python beginner's P0 standard, one idea per block, did not carry over. From lesson 13 onwards, 51 body code blocks run over 20 lines. Python beginner has 4. The "wall of code, wall of output, then prose that refers back" pattern is back.
2. The level uses syntax before teaching it, the other Python beginner P0. Functions appear in 12 lessons before lesson 17. `try`/`catch` appears from lesson 05. Lesson 04's exercise hint needs `async function`, `Symbol.asyncIterator` and destructuring.
3. There are fewer and thinner exercises: 75 in 40 lessons, against Python's 96 in 37. Five lessons have one exercise. Six exercises ask the learner to rewrite code already shown in the lesson, and their solutions say "shown earlier".
4. The JavaScript language page still carries the scraped catalogue summary, a raw paradigm list and no level blurbs. A version badge or `<Since>` would say "JavaScript 24+" or a bare "26+", without naming Node.

## Did the Python beginner standards hold?

| Standard (from `python-beginner.md`) | Result |
|---|---|
| No syntax before it is taught | **Not held.** See item 2. |
| One idea per block, output directly after it, prose before the snippet | **Held in 01–12, not from 13 on.** There are 51 body blocks over 20 lines, against 4 in Python. Output always follows a block. Only 4 headings lead straight into code. |
| 2–3 exercises, each with a stated result | **Partly.** 75 exercises, 1.9 per lesson (Python has 2.6). Five lessons have one. About a dozen prompts give no expected output (item 3). |
| Prose under about 1,400 words | **Held.** The mean is 919 (Python 730), the range 652–1,373, and the highest is 36. |
| Code lines of 80 columns or fewer | **Not held.** 26 lines in `javascript`, `html` and `json` blocks, which do not wrap (item 9). Python beginner has 0 in code. |
| Relative links, no em dashes | **Held.** |
| No "the documentation states" habit | **Not held in B7.** 7 cases of "MDN says/states/notes" (item 8). |
| Version markers | **Held in substance.** Everything runs on Node 22 except the two marked Node 26 items. The labelling is item 7. |

---

## P0

### 1. One idea per block, from lesson 13 onwards
**Owner:** writer
**Files:**
- Worst cases:
  - `13-conditionals-js.mdx` (`switch_basic.mjs`, 38 lines, three ideas)
  - `19-scope-closures.mdx` (`scope_levels.mjs`, 31 lines: the scope chain *and* shadowing; `private_state.mjs`, 36 lines)
  - `28-copies-and-references.mdx` (`structured_clone.mjs`, 38 lines; `references_alias.mjs`, 25 lines covering primitives, aliasing, `===` on arrays and mutation through a parameter)
  - `26-objects-js.mdx` (`objects_basic.mjs`, 29 lines)
  - `27-destructuring-spread.mdx` (`destructure_objects.mjs`, 30 lines)
  - `30-json-js.mdx` (`json_lossy.mjs`, 30 lines)
- Project files that need splitting: `40-project-todo-page.mdx` (`todo.js`, 72 lines; `todo_storage.js`, 41 lines), `39-forms-and-validation.mdx` (`signup.js`, 39 lines), `38-dom-events.mdx` (`delegate.js`, 38 lines), `36-script-tags-modules.mdx` (`serve.mjs`, 38 lines).

**Problem:**
- Python beginner P0 item 3 set the standard: a small snippet, its output directly after it, and prose that introduces the snippet before it appears.
- B1 and B2 (01–12) follow it, with no body block over 21 lines.
- From B3 on, lessons go back to one long block, one block of output, and prose that refers back. 13 says "as the last block shows". 19 says "The second half shows shadowing again".
- 13–35 average about 2 such blocks per lesson.
- The reader has to count output lines to match them to code. In 13, the three `switch` behaviours are explained only after all three have printed.

**Acceptance criteria:**
- Outside the project lessons (35, 40) and the B7 page files, no body block (outside `<Exercise>`) runs over 20 lines, and none covers more than about three related ideas.
- Project and page files over 30 lines are split into titled parts, `todo.js` then `todo.js (continued)`, with prose between them. This is the pattern the Python expert review asked for in its item 8.
- Each split part has its own Output block where it prints anything.
- 13, 19 and 28 are rewritten first, as the model for B3–B6.
- A script check reports the count of body blocks over 20 lines per lesson. After the fix, the level total is 10 or fewer, all of them in 35–40.

### 2. Stop using syntax before it is taught
**Owner:** writer
**Files:**
- `function` declarations before lesson 17: 04 (exercise), 05, 06, 07, 08, 09, 10, 11, 12, 13, 15, 16.
- Arrow functions and callbacks before 17 and 20: 05 (`[1, 2].forEach((n) => …)`, in the body and in the "Fix the messy file" exercise), 06, 09 (`.map(parseInt)`), 10, 12, 15.
- `try`/`catch` before 15: 05, 07, 08, 11, 12, 14.
- `class` in 06 (`typeof class {}`) and 05's exercise 2 ("the body of a class"), with classes not taught at this level at all.
- Lesson 04, exercise 1: the hint and solution need `async function`, `rl[Symbol.asyncIterator]()`, destructuring (`const { value } = …`) and `process.stdout.write`, in the learner's fourth lesson. 35 repeats the same machinery.

**Problem:**
- This is Python beginner P0 item 2 again.
- The asides do not help. "A later lesson covers…" in 05 and "copy the shape" in 04 ask the learner to type code they cannot yet read.
- In 04 the cause seems to be the test harness. Two `rl.question` calls lose lines when `validate.sh` pipes stdin, so the lesson teaches an iterator workaround.

**Acceptance criteria:**
- An ordered "first taught in" table exists at `.orchestration/javascript-beginner-syntax.md`. No lesson uses a construct in code before the lesson that teaches it, except one line marked as a preview with a link to that lesson.
- One of two options is taken:
  - (a) A short lesson after 05, "A first look at functions and errors": `function`, parameters, `return`, and `try`/`catch` only, with 17 and 15 deepening them.
  - (b) Every example and exercise in 04–16 is rewritten as a plain script.
- Lesson 04 reads input with a provided `prompt.mjs` helper. The learner copies it once, and it is reused in 04, 35 and wherever input is needed. The iterator and `async` code live inside the helper, and 31 and 33 point back to it when they explain `export` and `await`. If the harness still needs it, the `.in` files are fed by the helper's design, not by the learner's code.
- 05's exercises use only statements, `const`, `console.log` and template literals. Its strict-mode exercise drops "the body of a class".
- 06 drops `typeof class {}`, or marks it as a preview of the intermediate module on classes.

## P1

### 3. Raise exercise count and stop recycling body examples
**Owner:** writer
**Files:**
- One exercise only: 15, 16, 17, 18, 22.
- Exercise duplicates a body example and the solution says "shown earlier" or "shown above":
  - 19 "Fix the closure in the loop" (the same code as `closure_loop_fix.mjs`)
  - 20 "Build once" (`once.mjs`)
  - 21 "Sum a nested array" (`nested_sum.mjs`) and "Walk an object tree" (`tree_walk.mjs`)
  - 24 "Order report" (`order_report.mjs`)
- No expected result in the prompt: 13 "Leap year checker", 19 "Counter factory", 24 "Flatten and filter", 29 "Word frequency counter", 29 "Common friends", 17 "Temperature converters in three styles", 21 "Walk an object tree".

**Problem:**
- Python beginner averages 2.6 exercises a lesson. JavaScript has 1.9.
- Lesson 21 has *no* new practice: both exercises are the lesson's own examples.
- A beginner who solves a prompt with no stated result cannot tell whether they got it right without opening the solution.

**Acceptance criteria:**
- Every lesson has at least 2 exercises, and B3–B5 lessons (12–30) have 3 where a third fits.
- No exercise reuses the code or the task of a body example. Each "shown earlier" solution is replaced with a new task and its own solution and output. Suggested replacements:
  - 21: depth of a nested array; count the keys in a nested object.
  - 20: a `memoize` for one-argument functions.
  - 24: a grouping report.
- Every prompt states its expected output, or a sample input and output, as 05's "Fix the messy file" and 20's "Write a pipeline" do.
- `rg -n 'shown (earlier|above)|earlier in this lesson' site/src/content/lessons/javascript/beginner` returns nothing inside a `<Solution>`.

### 4. Teach objects before `this`
**Owner:** writer (with the Advisor for the renumbering)
**Files:**
- `22-this-basics.mdx` (module "Functions")
- `26-objects-js.mdx`
- `research/javascript/outline.md` (B4 and B5)

**Problem:**
- `this` (22) is about methods on objects. It is taught four lessons before objects (26), and it leans on the fundamentals lesson on records for object literals and method shorthand.
- The functions module (17–22) also uses arrays and object literals throughout (19's `createAccount`, 20's `map`/`filter`), before arrays (23) and objects (26) are taught.

**Acceptance criteria:**
- `this` comes after `26-objects-js` (as B5's second lesson, or the first lesson after 26). 22's opening no longer says objects are introduced elsewhere.
- Either arrays and objects come before the Functions module, or 17–21 add one sentence plus a link the first time they use an array or object literal. The syntax table from item 2 records which option was taken.
- The outline and the `order` frontmatter agree, and every "Next" line and pager link follows the new order.

### 5. Add JavaScript level blurbs
**Owner:** writer
**Files:**
- `site/src/content/languages/javascript.md` (no `levels` key)
- The fallback in `site/src/lib/lessons.ts:8–11`

**Problem:**
- `dist/learn/javascript/index.html` shows the shared fallbacks.
- Beginner reads "Read and write small programs with confidence." That says nothing about Node, modules or the optional browser strand.
- Advanced reads "Concurrency, performance, the type system and tooling." JavaScript's advanced outline (A1–A4) has no type-system module.
- Expert reads "Internals, design trade-offs and the corners of the spec." The outline's expert modules are V8 internals, performance, and security and the supply chain.
- `python.md` has `levels.<id>.blurb` for advanced and expert.

**Acceptance criteria:**
- `javascript.md` has `levels.beginner`, `.intermediate`, `.advanced` and `.expert`, each with a `blurb` that matches `outline.md`. For example:
  - beginner: "Values, functions, arrays and objects, and modules in Node.js, with an optional first look at the browser."
  - intermediate: "Classes and prototypes, iteration, asynchronous JavaScript, text and dates, Node.js essentials and testing."
  - advanced: "Metaprogramming, resources and concurrency, binary data, and building and shipping packages."
  - expert: "V8 internals, performance, and security across the supply chain."
- The built `dist/learn/javascript/index.html` shows all four texts.

### 6. Replace the scraped JavaScript metadata
**Owner:** researcher (copy and versions), uiux (paradigm display)
**Files:**
- `site/src/content/languages/javascript.md`
- `site/src/pages/learn/[lang]/index.astro:67`
- `site/src/lib/paradigms.ts`

**Problem:**
- JavaScript is the second language with a curriculum, but its page and its catalogue row still show the template sentence that Python beginner P0 item 1 flagged: "JavaScript is a multi-paradigm and event-driven programming language that first appeared in 1995."
- The language page prints the raw list "multi-paradigm, event-driven, functional, imperative, procedural, object-oriented". For the same entry, the catalogue shows the mapped groups "Concurrent and distributed, Functional, Imperative, Object-oriented". So the two pages disagree, and "event-driven → Concurrent and distributed" is a stretch.
- There is no `latestVersion`, so the page has no "Latest version" row, although Python's has one and lesson 01–02 name ES2026 and Node 26.11.1.

**Acceptance criteria:**
- The summary is hand-written in one or two sentences, in the same register as Python's. For example: "The language of the web, also used for servers and command-line tools through Node.js."
- The language page shows the same paradigm groups as the catalogue, through `paradigmGroups` and `groupLabel`, not the raw `d.paradigm` array. This applies to every language.
- `latestVersion` is set, with the researcher citing `research/javascript/sources/`, and it renders. If one string cannot carry both, the page shows "ECMAScript 2026 · Node.js 26.11.1".

### 7. Name the runtime in version badges and `<Since>`
**Owner:** uiux
**Files:**
- `site/src/pages/learn/[lang]/[...slug].astro:76`
- `site/src/pages/learn/[lang]/index.astro:112`
- `site/src/components/mdx/Since.astro`
- `site/src/content.config.ts` (languages schema)

**Problem:**
- `minVersion: "22"` means Node major 22. The badge template is `{langName} {minVersion}+`.
- The first intermediate lesson that sets `minVersion: "24"` will render "JavaScript 24+", and the curriculum row will render "· JavaScript 24+". There is no JavaScript 24.
- `<Since v="26" />` in `29-map-and-set.mdx` renders as a bare "26+", and screen readers hear "Requires version 26 or later". Lesson 29's own text has to explain that this means Node 26, not ES2026.
- The B7 lessons depend on browser support, which a Node version cannot express.

**Acceptance criteria:**
- The languages schema gains an optional `versionLabel`, set to `"Node.js"` in `javascript.md`. Badges, curriculum rows and `<Since>` use it ("Node.js 24+"; screen-reader text "Requires Node.js 26 or later"). Python is unchanged when the field is absent.
- `<Since>` accepts an optional `label` prop for browser-only features (for example `label="Baseline 2024"`), so B7 and later browser lessons can mark them.
- To check: with a temporary `minVersion: "24"` on one lesson, the built page and the curriculum row read "Node.js 24+". Lesson 29 renders "Node.js 26+".

### 8. Drop the "MDN says" habit in B7
**Owner:** writer
**Files:**
- `36-script-tags-modules.mdx:29, :53, :104, :252`
- `37-dom-select-change.mdx:32`
- `38-dom-events.mdx:34`
- `39-forms-and-validation.mdx:24`
- `40-project-todo-page.mdx:108, :110`

**Problem:**
- Every B7 lesson attributes plain facts to MDN in the prose ("MDN states that you do not need `defer`… because 'modules are deferred automatically'", "MDN notes that…", "MDN lists pages with a `file:` …").
- The Python reviews removed the same "the documentation states" tic. It reads as a writer covering itself rather than teaching.
- B1–B6 never do it.

**Acceptance criteria:**
- `rg -n 'MDN (says|states|notes|describes|labels|lists)' site/src/content/lessons/javascript` returns nothing.
- Each claim is stated directly, and its source is cited in `research/javascript/` instead.
- At most one "Further reading: MDN, …" link appears per lesson, at the end, if wanted.

### 9. Keep code lines at 80 columns so phones do not scroll sideways
**Owner:** writer (lines), researcher (check in `validate.sh`)
**Files:** 26 lines over 80 columns in `javascript`, `html` and `json` blocks:
- 40 (7 lines)
- 39 (5)
- 35 (4)
- 30 (4)
- 38 (2)
- 13, 14 (1 each)

The longest is `40:186` at 97 columns.

**Problem:**
- `ec.config.mjs` wraps only output and `console` blocks. Code blocks keep `wrap: false`, so each of these lines needs sideways scrolling at phone width.
- Python beginner has 0 such lines in code.

**Acceptance criteria:**
- 0 lines over 80 columns in `javascript`, `html` and `json` blocks of `site/src/content/lessons/javascript/`, wrapped as Prettier would wrap them at `printWidth: 80`.
- `validate.sh` (or `check_lesson_examples.py`) warns on any code line over 80 columns in non-output blocks, for all languages.

## P2

### 10. Make the lesson scaffolding consistent across modules
**Owner:** writer (lessons), uiux (the site-wide decision on the Exercises heading)
**Files:** all 40 lessons
**Problem:** Different modules made different choices, and the page shows it.
- **Exercises heading.**
  - 01–11 have none, so in the "On this page" list the exercises fall under "Common pitfalls".
  - 15–18 and 22 have `## Exercise`.
  - The rest have `## Exercises`.
  - Python has none.
- **Closing line.**
  - 01–10 have a linked "Next: [title](../slug/)".
  - 11–35 have plain unlinked text, for example 19's "Next: functions that take and return other functions."
  - 36–40 put "Next…" as the last *bullet of the Summary list*.
- **Shell commands.**
  - 32's seven `bash` blocks render as untitled editor frames.
  - 02 and 03 use `bash frame="terminal"`.
  - 35 and 36 use `text frame="terminal"`.

**Acceptance criteria:**
- One rule per element, written into `.claude/agents/writer.md`:
  - every lesson has `## Exercises` (applied to Python too, or removed from JavaScript, decided once by uiux);
  - the closing line is a linked sentence after the Summary list;
  - commands are `bash frame="terminal"`, and transcripts with typed input are `text frame="terminal"`.
- `rg -c '^## Exercise$'` returns nothing.
- No "Next" line sits inside a list.

### 11. Vary the "the idea is in the fundamentals lesson" opening
**Owner:** writer
**Files:** 12–29, about 15 lessons whose second sentence is "The idea is explained in / covered in / described in the [fundamentals lesson on X](…)"
**Problem:**
- The same sentence shape in lesson after lesson is the most visible repetition in the level.
- It also repeats the "Builds on" chip that the lesson header already renders from the `fundamentals` frontmatter.

**Acceptance criteria:**
- No more than a third of the lessons put the fundamentals link in the first paragraph.
- Where the link stays, it is woven into a sentence that says what JavaScript does differently. 28 does this well ("JavaScript has exactly this split").

### 12. Make forward and back references exact
**Owner:** writer
**Files:**
- `05-syntax-style-strict.mdx:41` ("a later lesson covers" the conditional operator)
- `05-syntax-style-strict.mdx:206` ("The next module on variables explains `const`". The next module is values and types. Variables is the one after.)
- `12-let-const.mdx:57`, `14-loops-js.mdx:146`, `19-scope-closures.mdx:128`, `:217`, `02-install-node.mdx:166`

**Problem:** "A later lesson" or "a later module" without a name or link leaves the learner unable to look ahead, and one of them is wrong.
**Acceptance criteria:**
- Each forward reference names the lesson and links it, or names the level ("the intermediate module on classes") when the lesson does not exist yet.
- 05:206 names lesson 12.

### 13. Keep the project exercise solution as careful as the project
**Owner:** writer
**Files:** `35-project-cli-quiz.mdx:367–398` ("Review the missed questions"), and the end of 35 at `:465`
**Problem:**
- The solution rewrites `main.mjs` without the `try`/`catch`/`finally`, the `verdict` and the early-end message that stage 4 just taught. `rl.close()` is no longer guaranteed. A learner who copies it loses the error handling the project was about.
- The lesson then ends with "That is the end of the core beginner modules on data and projects", while the pager's Next goes into the optional browser module. A Node-only reader is not told they can stop here or skip ahead.

**Acceptance criteria:**
- The solution keeps `main.mjs`'s structure and adds only the `missed` array and its report. The diff against stage 4 is 10 lines or fewer.
- 35's last paragraph says the browser module (36–40) is optional, links 36, and says that Node-only readers have finished the level.

### 14. Present lesson 36's local server as a tool, not a lesson
**Owner:** writer
**File:** `36-script-tags-modules.mdx:102–160`
**Problem:**
- 36 is the longest lesson in the level (about 1,370 words of prose).
- About a quarter of it explains a 38-line static file server (`node:http`, `node:fs/promises`, path-traversal checks, MIME types) that the learner only needs to run.
- The server is good code, but explaining it at this point breaks the module's own rule: logic you can check, and page code you look at.

**Acceptance criteria:**
- The server is introduced as "save this file and run it; you do not need to follow every line yet". Its four-bullet explanation moves into a collapsed `<details>` or a Callout.
- 36's prose is 1,200 words or fewer.
- The path-traversal sentence stays visible, because it is the one security idea in the block.
