# Improver review: Python advanced level

Reviewed 2026-10-13 at `032e456`, which is main with all four advanced modules merged (A1 #48, A2 #49, A4 #50, A3 #51). I built the site with `npm ci && npm run build` (782 pages, no errors) and inspected the HTML in `site/dist`. No screenshots were taken.

**Read in full:** 01, 14, 23 (first 200 lines) and 19 (first 240 lines).
**Read in part:** 08, 12, 13, 22, 25, and the exercise prompts of all 26 lessons.
**Scripted checks across all 26 lessons:**
- Prose word counts (exercises excluded), code-block length, line width, exercise count and stated output, `<Since>` and `minVersion`.
- All 265 `examples/python/a1`–`a4` programs were run on CPython 3.15.0, four times, to catch flaky concurrency output. All matched their `.out` files every time.
- `scripts/check_lesson_examples.py` reported 0 failures. It skips 18 advanced exercise-prompt blocks, because they have no example file.
- `scripts/check_versions.py --run-under` was run with 3.8, 3.10, 3.11, 3.12, 3.13 and 3.14. It found 2 failures (item 2).
- I re-ran every type-checker transcript in A1: 62 `$ mypy` / `$ pyright` commands in 01–07, using mypy 2.3.1 and pyright 1.1.414 with `--python-version 3.15`. After normalising pyright's absolute paths, **62 of 62 matched the lesson exactly** (item 3).
- `scripts/check_links.py` checked 23,304 internal references and found 0 broken.

## Verdict

**What is working.**
- **The intermediate standards all held, without exception.** Every lesson has exactly 3 exercises, and 0 code blocks run past 25 lines. No python code line is over 80 columns. Prose runs from 697 to 1,093 words per lesson. Every link is relative.
- **Accuracy is the best on the site so far.**
  - All run output is verified, and the checker transcripts are exact.
  - The 3.15 claims hold on 3.15.0: `sentinel`, `frozendict`, `TypeForm`, `disjoint_base`, `re.prefixmatch`, and `threading.serialize_iterator` / `synchronized_iterator`.
  - The free-threading status is stated carefully: supported but optional, with phase III undecided.
- **The writing is clean.** It has no em dashes and no "according to". "Powerful", "robust" and "delve" each appear once or not at all. A1, A3 and A4 are advanced material, especially the lessons on narrowing, annotations at runtime, free-threading, subinterpreters, descriptors and metaclasses, and template strings.
- **The fixes from the intermediate review are visible.**
  - Output blocks carry an "Output" label and wrap.
  - Only the current level and module are open in the sidebar, and the active entry scrolls into view.
  - The nav uses `aria-current="true"`.
  - No `cNN_` filename prefixes are left.

**What most needs to change.**
1. Eight headings that start with a dunder name render as bold text with the underscores removed, for example "**new** and **init** on a metaclass". The same bug is on 11 intermediate headings.
2. Two version claims are wrong.
3. The checker output that A1 depends on is correct today, but nothing keeps it correct, and on a phone it runs up to 168 columns without wrapping.
4. Module A2 is intermediate material on the advanced shelf, and the level has no capstone.

## Did the intermediate standards hold?

| Standard | Result |
|---|---|
| No syntax before it is taught | **Held.** No `async`/`await` before 17, apart from one prose mention in 14. `match` in 04 builds on beginner 18. `:=` (15) was taught in beginner 08. TypeVar and ParamSpec are introduced in 02 and 03 before use. |
| One idea per block, with output after it | **Held.** A1 pairs each program with its run output and then a titled `console` checker run. A2 and A4 use `(continued)` builds (3 to 7 per lesson). |
| 3 exercises with stated input and output | **Held: 78 of 78.** 38 of them are predict, fix or debug exercises. Every non-predict prompt states its expected output or checker result. One predict prompt prints its own answer (item 11). |
| Prose of about 1,400 words or fewer | **Held.** The range is 697 to 1,093, the highest being 14 and 01. |
| Blocks of 25 lines or fewer | **Held.** 0 blocks are over 25 lines. |
| Code lines of 80 columns or fewer | **Held for code.** All 29 lines over 80 are checker messages in A1 `console` blocks (item 4). |
| Relative `../slug/` links | **Held.** 0 absolute links, 0 broken. |
| `minVersion` and `<Since>` | **Two failures** (item 2). No redundant `<Since>` tags. Badges appear only above 3.11, as `versions.ts` intends. |

---

## P0

### 1. Wrap dunder names in headings in backticks
**Owner:** writer (content), researcher (check)
**Files:**
- `05-annotations-runtime.mdx:152`
- `21-descriptors.mdx:82`
- `22-class-customisation.mdx:53, 156, 185`
- `23-metaclasses.mdx:82, 113, 149`
- The same fix applies to intermediate `21-data-model.mdx` (24, 82, 133, 193, 226, 267, 318, 345, 372, 399) and `23-dataclasses.mdx:126`.

**Problem:**
- Markdown reads `__name__` as strong emphasis.
- `dist/learn/python/advanced/metaclasses/` renders `<h2><strong>new</strong> and <strong>init</strong> on a metaclass</h2>`.
- The TOC shows "init_subclass: a hook for every subclass" and "from future import annotations".
- These are the exact names the lessons teach, and the page shows them wrong. Body prose is unaffected, because it already uses backticks.

**Acceptance criteria:**
- `rg '^#+ [^`]*__\w+__' site/src/content` returns nothing. Write headings as ``## `__prepare__`: choosing the namespace``.
- `rg '<h[23][^>]*>[^<]*<strong>' site/dist/learn` shows no dunder fragments.
- `scripts/check_versions.py`, or a small new check in `validate.sh`, fails on a bare dunder in a heading.

## P1

### 2. Fix the two version errors, and run `--run-under` in validation
**Owner:** researcher
**Files and evidence:**
- **`19-free-threading.mdx:277`** ("Share a generator safely") is in a lesson that declares 3.14. Its prompt and solution use `@threading.synchronized_iterator`, which exists only in 3.15. On 3.14 you get `AttributeError: module 'threading' has no attribute 'synchronized_iterator'`, and `check_versions.py --run-under python3.14` reports FAIL. The body section at line 170 has its `<Since>`, but the exercise does not.
- **`22-class-customisation.mdx:160`** (`class_getitem.py`) is in a lesson that declares 3.8. `from types import GenericAlias` needs 3.9, so it fails under `--run-under python3.8` with an ImportError.
- **The floor is set inconsistently.**
  - 15, 16, 21, 22 and 23 declare 3.8.
  - All of A2 declares 3.10.
  - The site's own floor (`site/src/lib/versions.ts`) is 3.11, the oldest supported release.

**Acceptance criteria:**
- 19's third exercise prompt opens with `<Since v="3.15" />`, and the prompt says that on 3.14 you write a `Lock`-wrapped iterator class instead.
- Every advanced lesson declares at least `"3.11"` (or higher where needed). That removes the 3.8 failure in 22, and no badge changes.
- `validate.sh` runs `check_versions.py --run-under` with the oldest supported interpreter and with 3.14, and fails on any FAIL line.

### 3. Verify type-checker transcripts in validation
**Owner:** researcher
**Files:**
- `01` to `07` (62 `$ mypy` / `$ pyright` commands)
- New: `scripts/check_typecheck.py`, wired into `validate.sh`

**Problem:**
- Every transcript is correct today: I re-ran all 62.
- But they are the main teaching artefact of A1, and nothing checks them. The next mypy or pyright release changes wording, and the lessons pin exact versions ("mypy 2.3.1", 01 line 20).

**Acceptance criteria:**
- The script extracts each `console` block in `lessons/python/**`, runs each `$ mypy …` / `$ pyright …` command with `--python-version 3.15` against `examples/python/a*/`, and drops pyright's absolute-path header and prefix.
- It compares the result with the lesson, and fails on any difference.
- The checker versions are pinned in `scripts/requirements-typecheck.txt` (or similar), so a bump is a deliberate pull request that updates the lessons and the "mypy 2.3.1" titles together.

### 4. Make checker output readable on phones
**Owner:** uiux
**Files:** `site/ec.config.mjs` (`outputBlocks` plugin), `global.css`
**Problem:**
- Checker output is the "result" of half of A1's examples, but it renders as a non-wrapping terminal frame.
- In 01–07, 29 checker lines are over 80 columns, with a median of 72 and a maximum of 168.
- On a 360px screen about 38 columns show. The part that matters, `expected "Callable[[int], int]"` or the `[arg-type]` code, is off-screen to the right.
- Program output on the same page wraps, because of the "Output" style, so the two kinds of result look and behave differently.

**Acceptance criteria:**
- `console` blocks wrap, with `wrap: true, preserveIndent: true`, so pyright's indented continuation lines stay aligned. Shell commands may keep scrolling if the plugin can tell the `$` line apart from the output.
- At 360px no checker message needs horizontal scrolling. Both themes meet AA.

### 5. Deepen module A2 to advanced level, or rebalance it
**Owner:** writer (content), researcher (accuracy)
**Files:** `09-collections-module.mdx`, `12-regex.mdx`, `08-match-advanced.mdx`, `11-copying-references.mdx`
**Problem:**
- A1, A3 and A4 assume an experienced reader. A2 drops back to intermediate material:
  - 12 teaches regex from character classes upward, with no lookarounds, no atomic groups or possessive quantifiers (3.11), and nothing on catastrophic backtracking or ReDoS.
  - 09 reintroduces `Counter`, `defaultdict`, `deque` and `namedtuple`, which already appear in intermediate 16 and beginner "choosing collections".
  - 08's "Value patterns need a dot" repeats beginner 18's pitfall (line 130).
  - 11 repeats beginner 19's shallow-copy material before it reaches `__copy__` / `__deepcopy__` / `copy.replace`.
- Coming after the hardest module (A1), the difficulty curve dips for six lessons and climbs again at A3.

**Acceptance criteria:**
- 12 cuts the basic pattern-language section to a short recap that links to the intermediate stdlib tour. It adds lookahead and lookbehind, `(?>...)` and possessive quantifiers with `<Since v="3.11">`, and a timed catastrophic-backtracking example with its fix. It also adds a tokenizer built from named alternatives and `finditer`.
- 09 replaces the introductory parts with material a returning reader lacks:
  - `OrderedDict.move_to_end` for an LRU cache
  - why `UserDict` beats subclassing `dict`
  - building a custom `Mapping` from `collections.abc` mixins
- 08 and 11 open with a one-paragraph recap and a link back, instead of re-teaching.
- Each lesson stays at 1,400 words of prose or fewer.

### 6. Add an advanced capstone, and give the level an ending
**Owner:** writer (lesson), uiux (index and pager)
**Files:**
- New: `27-project-async-plugin-tool.mdx` (module "Project", as in intermediate)
- New: `examples/python/a5/`
- `26-introspection-ast.mdx`

**Problem:**
- Intermediate now ends with a project (42). Advanced ends at 26. Its pager offers only "Previous", and nothing asks the learner to combine typing, concurrency and metaprogramming.

**Acceptance criteria:**
- One project lesson builds a small typed tool that:
  - passes `mypy --strict` and shows the transcript
  - uses generics or a Protocol (A1)
  - uses `match` on parsed JSON (A2)
  - uses an `asyncio.TaskGroup` with timeouts (A3)
  - uses a registry made with `__init_subclass__` or a descriptor (A4)
- The project has checkable steps and passes `validate.sh`.
- Its last paragraph says the level is finished, and the pager or a closing card links to the curriculum page.

### 7. Correct the level blurb, and add level jump links on the curriculum page
**Owner:** uiux
**Files:** `site/src/lib/lessons.ts:10`, `site/src/pages/learn/[lang]/index.astro`
**Problem:**
- `/learn/python/` describes Advanced as "Concurrency, performance, the type system and tooling."
  - No module covers performance or tooling: that was intermediate I2 and I5.
  - The blurb leaves out data handling and metaprogramming.
  - The blurb is shared by every language, so it cannot be right for all of them.
- The page now lists 105 lessons. Advanced starts after 79 entries, and the page has no in-page links to `#lv-intermediate` or `#lv-advanced`, so a returning learner has to scroll past the whole beginner level.

**Acceptance criteria:**
- Level blurbs can be overridden per language, for example `levels.advanced.blurb` in the language frontmatter. Python's reads something like "Typing in depth, advanced data handling, concurrency and metaprogramming."
- A row of level links (Beginner 37, Intermediate 42, Advanced 26) sits under the lesson count and points to the existing `lv-*` ids. It works at 360px without horizontal scrolling.

## P2

### 8. State facts directly instead of quoting the documentation
**Owner:** writer
**Files:** `14-concurrency-models.mdx` (41, 84, 122, 125), `19-free-threading.mdx` (23, 28, 166, 168), `20-subinterpreters.mdx` (123, 243), `22-class-customisation.mdx:183`
**Problem:**
- Intermediate item 10 removed "according to the …". A3 brought the same habit back in other words: "The glossary in the documentation describes it as", "here it is exactly as the documentation states it", "From the documentation", "The docs themselves recommend", "Two warnings from the docs".
- That is 11 instances, 8 of them in two lessons. It reads as unsure sourcing, and the facts are verified.

**Acceptance criteria:**
- `rg -i "the documentation (states|describes|calls|gives)|from the documentation|the docs (themselves|for)|warnings from the docs" site/src/content/lessons/python` returns nothing.
- Each claim is stated plainly, with a link to the doc or the PEP.
- Short direct quotes stay only where the exact wording matters: the PEP 779 phase wording and the "security-sensitive" warning.

### 9. Give A1 to A3 the "When not to" judgement that A4 has
**Owner:** writer
**Files:** 01 to 09, 11 to 13, 15 to 20
**Problem:**
- All six A4 lessons end with "When not to use …", and 10 and 14 have a "Choosing" section.
- The other 18 lessons have neither. Judgement is what separates advanced from intermediate: for example Protocol versus ABC, TypedDict versus dataclass, `asyncio` versus threads, and when generics are over-engineering.

**Acceptance criteria:**
- Every advanced lesson has either a "When not to …" or a "Choosing …" section of 150 words or fewer.
- Or the convention is dropped from A4 and the advice is folded into the pitfalls, so all four modules match.

### 10. Remove padding and one silent `Any`
**Owner:** writer
**Files:**
- `23-metaclasses.mdx:111`. "The `{... for k, v in ns.items()}` is a dictionary comprehension" re-explains beginner 24.
- `01-typing-fundamentals.mdx:493`. The dispatch solution loops `for name in get_args(Op)`, but `get_args` returns `tuple[Any, ...]`. `calc(name, …)` passes only because `name` is `Any`, which is the leak the same lesson warns about at line 272.

**Acceptance criteria:**
- The 23 sentence is cut, or reduced to "renames every non-dunder key".
- 01's solution either iterates over a typed `OPS: tuple[Op, ...] = get_args(Op)` with a sentence explaining why, or adds one line naming the `Any`. The `$ mypy dispatch.py` transcript is re-run.

### 11. Fix two weak exercises in 14
**Owner:** writer
**Files:** `14-concurrency-models.mdx:194` and `:210`
**Problem:**
- "Predict the barrier" asks the learner to predict a single line, then prints that line under "Expected output". That is the only spoiled predict prompt in the level.
- "Same job, three executors" swaps `sum_of_squares` for a vowel counter in a copy of `same_interface.py`, so it tests nothing new.

**Acceptance criteria:**
- The predict prompt shows no output. The answer moves into `<Solution>`.
- The third exercise asks for something the lesson did not show, for example: time an I/O-bound function (`time.sleep(0.2)` ×6) under a thread pool and a process pool, and explain why both are about 0.4 s with 3 workers, while `asyncio` is left out.
- The new exercise states its expected output, with tolerances.

### 12. Say once that checker paths are shortened
**Owner:** writer
**Files:** `01-typing-fundamentals.mdx:20`, and the first pyright block in `06-typeddict-advanced.mdx:86`
**Problem:**
- Real pyright output starts with an absolute-path header line and prefixes every message with the full path.
- The lessons show `td_optional_access.py:10:12 - error: …`. A learner who compares their output with the lesson sees a difference that the lessons never explain.

**Acceptance criteria:** the 01 sentence about versions adds "and pyright's absolute paths are shortened to the file name".

### 13. Verify the stated output of exercise-prompt blocks
**Owner:** researcher
**Files:**
- `scripts/check_lesson_examples.py`
- 18 skipped blocks, for example `money_broken.py` (08), `fewest_hops_broken.py` (13), `typed_check.py` (21), `lint_check.py` (26)

**Problem:** these prompts state the output a broken or check program prints, which is what a debug exercise depends on, but no example file backs them, so the output is never run.

**Acceptance criteria:**
- Each skipped advanced block has an `examples/python/a*/` file and an `.out` file. `*_check.py` files run with the solution module next to them.
- The skip count for `advanced/` is 0, or each remaining skip is listed in `lesson_examples_allow.txt` with a reason.

### 14. Copy only the command line from console blocks
**Owner:** uiux
**Files:** `site/ec.config.mjs`
**Problem:**
- The copy button on a `console` frame copies the `$ ` prompt and every output line.
- A1 has about 60 such frames ("$ mypy x.py" followed by errors), so a learner who pastes the copied text into a shell runs the error messages as commands.

**Acceptance criteria:**
- In `console` frames, copy gives only the command lines, without the `$ ` prompt. Expressive Code's terminal copy can do this, or a small plugin.
- The output lines can still be selected by hand.
