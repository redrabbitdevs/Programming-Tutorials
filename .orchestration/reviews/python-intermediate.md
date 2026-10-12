# Improver review: Python intermediate level

Reviewed 2026-10-12 at `995806a`, which is main plus I5 and holds all 40 lessons. I built the site with `npm ci && npm run build` (754 pages, no errors) and inspected the HTML in `site/dist`. No screenshots were taken.

**Read in full:** 14, 18, 37 and 40, and the I5 helper usage in 32.
**Read in part:** 07, 17, 22, 23, 24, 30, 33, 34 and 38.
**Scripted checks across all 40 lessons:**
- Every python block that is followed by an output block was run: 316 blocks on CPython 3.15.0 and on 3.13, and the same set on 3.8 to test `minVersion`. The two Since 3.14 claims were also checked on 3.14.
- An internal link check over `dist/` found 0 broken links.
- Code-block length and line width, exercise prompts, prose word counts, `<Since>` usage, and the rendered TOC and sidebar.

## Verdict

**What is working.**
- **Accuracy.** On 3.15.0, 305 of 316 output-paired blocks print exactly what the lesson shows. Of the other 11, 2 are real errors (item 2). The rest come from how my harness ran them: a package that has to be laid out on disk, absolute paths in tracebacks, and checks that need an exercise solution.
- **New-feature claims hold up.** Lazy imports, `profiling.tracing`, `math.integer`, the `basicConfig(formatter=)` argument, `except A, B:` without parentheses, and the 3.14 hash message all behave as described.
- **Writing.** The prose is plain and specific. I found almost no filler.
- **Beginner standards.** Most held: see the table below. I1 to I4 use small blocks, each with its output directly after it, and a `(continued)` title for step-by-step builds (25, 26, 28 to 31). That fixes the beginner review's item 3.
- **Exercises.** Every lesson has at least two, and 37 of the 112 are predict, fix or debug exercises. The best pages are 18 (Inheritance) and 30 (Decorators).

**What most needs to change.**
1. The three core testing lessons import a helper, `showtests`, that learners do not have. Their code does not run as printed.
2. Two outputs are wrong because a Unicode escape was decoded when the lesson was written. Nothing checks that lesson code still matches the verified copies in `examples/`.
3. Module I5 drifts from the level's own standard: long blocks, dense prose and two exercises per lesson instead of three. On every intermediate page, the sidebar puts the current lesson below the fold.

## Did the beginner standards hold?

| Standard | Result |
|---|---|
| No syntax before it is taught | **Held.** Decorators appear before lesson 30, but 17 (line 22) and 22 (line 48) each mark them as a preview in one line, which the standard allows. No `class` appears in 01 to 15, and no `yield` before 26. |
| One idea per block, with output after it | **Held in I1 to I4.** The largest block in a lesson is usually 25 lines or fewer, and there is about one output block per code block. **Slipped in I5.** See item 6. |
| At least 2 exercises with stated input and output | **The count held:** 3 per lesson in I1 to I4, 2 in I5. **Stated output is missing in 20 prompts.** 6 of these are "predict" exercises, which is fine. The other 14 give no way to check success. See item 7. |
| Relative `../slug/` links | **Held.** No `/Programming-Tutorials/` appears in content, and the `dist/` check found 0 broken links. |
| `minVersion` matches core content, with `<Since>` for newer features | **Mostly held, with four errors.** See item 3. The "3.8+" badge noise from beginner item 11 remains on 27 of the 40 lessons. |

---

## P0

### 1. Remove the `showtests` harness from learner-facing code (32, 35, 36)
**Owner:** writer (lessons), researcher (`scripts/validate.sh`)
**Files:** `32-unittest-basics.mdx` (13 uses), `35-test-driven-workflow.mdx` (10), `36-mocking.mdx` (4), `examples/python/i5/showtests.py`
**Problem:**
- The lessons replace `unittest.main()` with `from showtests import run_tests` and `print(run_tests(SomeTests))`.
- 32 (line 127) says the helper sits "next to the lesson files", but the site never publishes it. A learner who copies any of these 27 blocks gets `ModuleNotFoundError: No module named 'showtests'`.
- It is also the wrong pattern to teach in the lesson that introduces unittest. The helper exists only so the validator gets stable output, and that is a test-infrastructure concern.

**Acceptance criteria:**
- `rg showtests site/src/content` returns nothing.
- Each test file ends with `if __name__ == "__main__": unittest.main()`. Its output is shown under a `console` block that starts with `$ python -m unittest -v c32_failing.py` (or `python c32_failing.py`).
- `validate.sh` gives the verified examples stable output itself, by replacing `Ran N tests in X.XXXs` and stripping absolute paths. `showtests.py` then stays in `examples/` only, or is deleted.

### 2. Fix two wrong outputs, and add a check that lessons match the verified examples
**Owner:** writer (fixes), researcher (check script)
**Files:**
- `05-text-and-binary.mdx`: lines 221 and 225 contain an invisible U+FEFF character.
- `07-csv-json-toml.mdx`: line 166, and line 176, which says "instead of the escape `ü`".
- New: `scripts/check_lesson_examples.py`, wired into `validate.sh`.

**Problem:**
- Both `examples/python/i1/*.out` files are correct, but the lesson copies are not:
  - In 05, `repr()` prints `'﻿name,age\n'`, yet the lesson shows a raw BOM, which is invisible on the page. The prose then tells readers to look for "a hidden ``" (an empty code span).
  - In 07, `json.dumps(data)` prints `"Zürich"`, yet the lesson shows `Zürich`. That erases the exact difference the `ensure_ascii` paragraph explains.
- The validator runs `examples/`, but nothing compares the MDX blocks with those files. By my count 35 code blocks and 28 outputs differ in text, most of them only because of `(continued)` splits. So drift is invisible.

**Acceptance criteria:**
- Line 221 of 05 reads `'﻿name,age\n'`, and the prose names `﻿`.
- Line 166 of 07 reads `{"city": "Zürich", "b": 1, "a": [2, 3]}`, and line 176 reads "instead of the escape `ü`".
- `rg -P '\x{FEFF}' site/src/content` returns nothing.
- The new script works as follows:
  - It extracts each titled python block and the `text` block directly after it. `(continued)` blocks are joined to the block they continue.
  - It fails when the joined code differs from `examples/python/**/<title>`, or when the output differs from its `.out` file.
  - It allows exceptions through an explicit allowlist, such as blocks whose output is deliberately truncated.

## P1

### 3. Correct `minVersion` and `<Since>` where the code needs a newer Python
**Owner:** researcher
**Files and evidence:** the blocks named below were run on Python 3.8.
- **`22-dataclasses.mdx` (declares 3.8).** `items: list[str]` in a dataclass body raises `TypeError: 'type' object is not subscriptable` on 3.8. This affects `c22_mutable_default.py` and `c22_defaults.py`, which are core content. Set `minVersion` to 3.10 so that `slots`/`kw_only` need no badge, or to 3.9 and keep their badges.
- **`24-abc-protocols.mdx` (declares 3.8).** `def render(items: list[Drawable])` (line 236) and the Protocol exercise fail the same way. Set it to 3.9.
- **`23-enums.mdx` (declares 3.8).** "Branching with match" (line 257) uses `match`, which needs 3.10, with no badge. Add `<Since v="3.10" />` to that heading.
- **`08-modules-imports.mdx` (declares 3.11).** The core content works on 3.8. The only 3.11 feature, `-P`, already has its own `<Since>`. Set it to 3.8. Do the same for `10-venv-pip.mdx` (3.11), where I found nothing that needs 3.11. `13-ruff-and-type-checking.mdx` needs 3.10 for `int | None` in a `def`.
- **Version-specific output.** unittest output such as `(__main__.Class.test_name)` in 32, 35 and 36 is the 3.11+ format. On 3.8 to 3.10 it reads `(__main__.Class)`. Add a one-line note at the first such block.
- **Badge noise (beginner item 11, still open).** 57 of the 77 lesson badges on `/learn/python/` read "Python 3.8+", and 3.8 and 3.9 are end-of-life.

**Acceptance criteria:**
- A script runs every lesson's blocks under its declared `minVersion`. Only blocks inside a `<Since>`-marked section may fail. The script is documented in `scripts/`.
- No badge is shown when `minVersion` is at or below the oldest supported release (3.10 as of October 2026).

### 4. Keep the current lesson visible in the sidebar (beginner item 13, now urgent)
**Owner:** uiux
**Files:** `site/src/pages/learn/[lang]/[...slug].astro`, `global.css` (`.sidebar`, `.sidebar-wrap`)
**Problem:**
- Every intermediate page renders the full Beginner outline (37 entries) above the Intermediate one, so the outline has 77 links and 10 module sub-headings.
- On `itertools-functools/`, the `aria-current` entry is about the 65th link. That is several screens down inside the sticky sidebar. No script scrolls it into view, and nothing is collapsed.
- On lesson pages the main nav also marks "Languages" with `aria-current="page"`, which is wrong.

**Acceptance criteria:**
- Levels other than the current one are collapsed in `<details>`.
- The active entry is scrolled into view inside the sidebar on load, without moving the page.
- The current module is expanded, and other modules in the same level can be collapsed.
- Only the current lesson carries `aria-current="page"`. The nav uses `aria-current="true"` or no attribute at all.

### 5. Make output frames look different from code frames
**Owner:** uiux
**Files:** `site/ec.config.mjs`, `global.css` (Expressive Code overrides)
**Problem:**
- Intermediate lessons average 22 frames, and 20 lessons have 25 to 35.
- A `text` output block renders as an untitled `frame` with the same background, border and font as the code frame above it. The only difference is that the code frame has a filename tab.
- In long lessons, readers lose track of which frame is the program and which is its result, especially when a lesson shows a `text` file such as `c37_guide.txt` (37, line 240) next to output.

**Acceptance criteria:**
- An untitled `text` block that directly follows a code block renders with a small "Output" label and a visibly different surface: a tint or a left rule, not a second card.
- Both themes meet AA contrast.
- A titled `text` block, such as a data file, keeps the file-tab style.

### 6. Bring module I5 in line with the rest of the level
**Owner:** writer
**Files:** `32-unittest-basics.mdx` through `40-profiling.mdx`
**Problem:**
- **Long blocks.** Blocks over 20 lines per lesson: 32 has 9, and 38 and 39 have 6 each. I1 to I4 typically have 0 to 2. The largest are `c37_stats.py` (54 lines), `c36_*` (42), `c35_*` (41) and 33 (40).
- **Dense prose.** The five densest lessons on the level are all here or close: 39 has about 1,800 words of prose, 38 has 1,700, 40 has 1,600 and 35 has 1,500, against a level average of 1,285.
- **Two exercises per lesson,** where every earlier module has three.
- **Wide lines.** Lines over 80 columns: 40 has 15, 35 has 10, 36 has 9 and 38 has 8.
- **No `(continued)` steps.** The other modules use them to build code step by step.

**Acceptance criteria:**
- No I5 block runs past 25 lines unless it is the complete program at the end of a `(continued)` build-up.
- `c37_stats.py` is split into three steps: one function each for `mean`, `clamp` and `histogram`, with one doctest run per step.
- Each I5 lesson has three exercises, one of them predict, fix or debug.
- Each I5 lesson is at most about 1,400 words of prose. Asides go into a Callout or are cut.

### 7. Make every "write tests" exercise checkable, and replace the one that repeats the lesson
**Owner:** writer
**Files:**
- `34-fixtures-and-parametrize.mdx`, line 282. The solution is `pt_ex/tests/test_withdraw_param.py`, the same file shown as the lesson's first example at line 24. Its prose says "This is the file at the start of the lesson".
- Prompts with no success signal: 32 "leap-year bug", 33 "bank account's input checks", 34 (both), 35 (both), 36 "retry loop", 09 (both), 10, 11, 12, 13 (both), 14, 26 "Shorten with yield from".

**Acceptance criteria:**
- 34's second exercise uses a new subject (for example, the `numparse` module with a `tmp_path` fixture), and its solution does not appear earlier in the lesson.
- Every test-writing prompt states the result line to expect, for example `5 passed`, or `FF` before the fix and `..` after it.
- Every tooling prompt in I2 states the expected command output or file content.

### 8. Add an end-of-level project
**Owner:** writer
**Files:** new `41-project-tested-cli.mdx` (module "Testing, debugging and quality", or its own module), `site/src/pages/learn/[lang]/index.astro` if a new module needs listing
**Problem:**
- The beginner level ends with a mini-project (`37-mini-project-word-counter.mdx`).
- The intermediate level ends at 40 with "This ends the module and the intermediate level." Nothing makes the learner combine the five modules.
- Packaging (I2), classes (I3) and testing (I5) are never used together.

**Acceptance criteria:** one project lesson builds a small installable command-line tool that:
- uses `pyproject.toml` and a package layout (I2)
- uses a dataclass and an enum (I3)
- uses a generator pipeline (I4)
- reads CSV or JSON with `pathlib` (I1)
- has pytest tests with a fixture and `parametrize`
- uses `logging` (I5)

Each step is checkable. The full project lives in `examples/python/i6/` and passes `validate.sh`.

## P2

### 9. Fix `<Since>` inside headings, and use one badge per feature
**Owner:** uiux (slug and TOC), writer (duplicates)
**Files:**
- Headings: `01` (line 125), `18` (line 102), `23` (line 195), `28` (lines 98, 117, 246), `39` (line 260), `40` (line 193).
- Slug and TOC generation: `site/src/pages/learn/[lang]/[...slug].astro`.

**Problem:**
- A badge in a heading produces ids with a trailing hyphen, such as `#consecutive-pairs-` and `#cache-`.
- The TOC entry loses the version and keeps a trailing space ("Consecutive pairs ").
- Several features are badged two or three times close together: 18 (heading, line 104 and the summary), 23 (lines 195 and 197), and 06, 28 and 39 (body and summary).

**Acceptance criteria:**
- The ids are `consecutive-pairs`, `cache` and so on, with no trailing hyphen.
- The TOC shows the version as plain text, for example "Consecutive pairs (3.10+)".
- One badge appears per feature per section. Summary bullets carry no badge when the section heading already has one.

### 10. Cut hedged sourcing and truncated-output asides
**Owner:** writer
**Files:**
- `28-itertools-functools.mdx`, line 115: "according to the itertools documentation".
- `38-logging.mdx`, line 212: "according to the logging documentation".
- `40-profiling.mdx`, lines 195 and 200: "according to the 3.15 documentation" and "per the same page".
- `38-logging.mdx`, line 107: "(The script's last line also prints `WARNING 30 ERROR`...)".
- `38-logging.mdx`, line 159: the `c38_app` output omits the stderr line.

**Problem:**
- "According to the documentation" reads as unsure, generated sourcing. The facts are verified (they run on 3.15.0), so state them plainly and link the doc.
- The output blocks in 38 leave out lines the script prints, which breaks the "output after the code" contract.

**Acceptance criteria:**
- `rg -i "according to the|per the same page" site/src/content/lessons/python` returns nothing.
- Every output block shows everything the script prints.
- When a script deliberately writes to stderr, the lesson says so in one line, or the code sends that output to stdout.

### 11. Keep code readable on phones
**Owner:** uiux (config), writer (line width)
**Files:** `site/ec.config.mjs` (`defaultProps.wrap: false`), the I5 lessons listed in item 6
**Problem:**
- On a 360px screen about 38 code columns are visible.
- Horizontal scrolling is acceptable for code, but long output lines are hard to read when they scroll. Examples: tracebacks in 32 and 36, the `timeit` command lines in 40 (line 25), the 100-column sampling profiler table in 40 (lines 229 to 234), and log lines in 38.

**Acceptance criteria:**
- `text` and `console` output blocks wrap, with `wrap: true, preserveIndent: true` set per block or through a plugin, while python code keeps scrolling.
- Lesson code lines are at most 79 characters, as `ruff`'s default checks.
- Wide tables, such as the profiler output, are trimmed to the columns the prose discusses.

### 12. Mark edge topics as optional on the core path (03, 14)
**Owner:** writer (placement), researcher (version note)
**Files:** `03-notes-and-groups.mdx`, `14-lazy-imports.mdx`
**Problem:**
- Lesson 3 of the level teaches `ExceptionGroup` and `except*`. Learners next meet these in concurrency code, which is advanced material.
- Lesson 14 is a whole lesson whose every line needs 3.15, released three days before this review. Its `fundamentals: []` is the only empty list in I2 besides 12.
- Both are well written, but they make the start of I1 and the end of I2 steeper than the rest of the level.

**Acceptance criteria:**
- 03 keeps `add_note` in the core path, and its `except*` half is marked "optional on first read" or moved to the advanced concurrency module.
- 14 is labelled optional in the curriculum list, or folded into 08 as a `<Since v="3.15">` section of 40 lines or fewer.

### 13. Make module conventions consistent
**Owner:** writer
**Files:**
- I2: `08` to `15`, which have no "Common pitfalls" section.
- I3 and I5: the `c16_` to `c24_` and `c32_` to `c40_` filename prefixes.
- `30-decorators.mdx`: a body example named `timer_solution.py` (line 124).
- `06-context-managers.mdx`: a title reading `numbered_paren.py (the with statement)`.

**Problem:**
- The modules use different file naming. I1, I2 and I4 use readable names (`iter_manual.py`), while I3 and I5 show `c18_subclass.py`. The prefix is repo bookkeeping, not something a learner needs.
- A body example is labelled as a solution.
- I2 drops the pitfalls section that every other module has.

**Acceptance criteria:**
- Code-frame titles in the lessons use descriptive names without a `cNN_` prefix. The example files are renamed to match, and item 2's check keeps them in sync.
- No body block is titled `*_solution.py`.
- Either every module has a pitfalls section, or pitfalls are folded into the body everywhere (beginner item 14).

### 14. Link each lesson to what it builds on
**Owner:** writer
**Files:** `02`, `06`, `20`, `22`, `23`, `24` and `30`, which have no internal links
**Problem:**
- 30 (Decorators) builds directly on 29 (Closures) but does not link to it.
- 22 (Dataclasses) refers to "the data model lesson" without a link. So does 24's line 250, "the type hints lesson".
- The intro of 20 relies on 16 and 17.

**Acceptance criteria:**
- Every lesson links its direct prerequisite in the first paragraph.
- Every "the X lesson" mention is a relative `../slug/` link.
- The link check stays at 0 broken links.

### 15. Remove references to files learners cannot see, and split alternative commands
**Owner:** writer
**Files:**
- `37-doctest-and-docstrings.mdx`, line 174: "The script `c37_run_fail.py` runs `python -m doctest` on this file". That script is not shown.
- `40-profiling.mdx`, line 161: "as in `c40_table.py` in the examples folder". The site does not publish the examples folder.
- `13-ruff-and-type-checking.mdx`, lines 25 and 26: `pip install ruff` and `uv add --dev ruff` share one console block, so it reads as if both should be run.

**Problem:** This is the same leak as item 1, on a smaller scale. The validation scaffolding in `examples/` is described to the reader as if they had it.

**Acceptance criteria:**
- `rg "examples folder|c37_run_fail|c40_table" site/src/content` returns nothing.
- 37 shows the failure as `$ python -m doctest c37_doctest_fail.py` followed by its output.
- 40 shows `stats.sort_stats("tottime").print_stats(10)` inline, if the table is worth mentioning at all.
- Alternative install commands sit in `<Tabs>` (pip and uv) or in two separate blocks, each with one line of prose.
