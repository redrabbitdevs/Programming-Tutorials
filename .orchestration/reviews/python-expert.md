# Improver review: Python expert level

Reviewed 2026-10-15 at `608cc23`, which is main with E1 (#61), E2 (#62), E3 (#66) and the expert gap audit (#67). The lessons are byte-identical to `a0dbc01`, the branch named in the task. I built the site with `npm ci && npm run build` (801 pages, no errors) and inspected the HTML in `site/dist`. No screenshots were taken.

**Read in full:** 09, 12 (body and first exercise), 18 (body). **Read in part:** 02 (body), 06 (body and exercise 1), 08 (GC sections), 14 (exit codes), 15 (body). I also read the headings and exercise prompts of all 18 lessons.

**Scripted checks across all 18 lessons:**
- Prose word counts (exercises excluded), code-block length, line width, exercise count, stated results, `<Since>`, `minVersion`, absolute links and a "When not to" or "Choosing" heading.
- I ran all 116 runnable `examples/python/e1`–`e3` programs on CPython 3.15.0, three times each. 114 of 116 matched their `.out` file every time. The 2 that did not are unittest files, whose timing line `validate.sh` handles separately. I also ran them once on 3.15.0t, where 4 differ for the expected reasons (`getsizeof`, immortality and the GIL report).
- `check_lesson_examples.py` reported 0 failures, with 4 expert blocks skipped. `check_versions.py --run-under` with 3.14 and 3.10 gave 0 FAIL lines. Every miss is labelled as a newer section.
- I extracted `tally.c` from lesson 12 and compiled it with `gcc -Wall`, both as a version-specific build and as `abi3t`. It then ran correctly on 3.15 and on 3.15t, with the GIL still off.
- I checked the `profiling.sampling` CLI against the 3.15.0 stdlib. The 1 kHz default, `attach`, `dump`, `--mode`, `--diff-flamegraph` and `--async-aware` all exist. `PySlot_DATA` and `PyMODEXPORT_FUNC` are in the 3.15.0 headers.

**Relation to `research/python/gaps-expert.md`.** That audit (#67) already lists 23 items, and this review does not repeat them. Where I agree with one I refer to it as **G*n***, and I add it to an item here only when the rendering, the standards or the order of work changes it. One correction: G's summary says every lesson has a "when not to" section, but 07 and 09 do not (item 3).

## Verdict

**What is working.**
- **Most of the content is genuinely expert, and accurate.**
  - E1 and E2 are the strongest modules on the site: biased and deferred reference counting, critical sections, PEP 793 export hooks, `abi3t`, the incremental-GC revert, the tracing JIT stated with its spread, and `sys.monitoring` with `DISABLE`.
  - Each 3.15 claim I checked against 3.15.0 held.
  - The C compiles and runs.
- **Performance claims are well framed.**
  - Results are given as margins ("at least 5x"), and raw times appear only as "on one machine".
  - Benchmark-suite figures are given as geometric means, with the range quoted.
  - The JIT exercise shows *no* speed-up and explains why.
  - The residual risk is the machine-dependent booleans (G15).
- **Most standards held:**
  - 54 of 54 exercises state a result. The predict prompts don't print their own answers.
  - 0 code blocks are over 25 lines, and 0 python or C lines are over 80 columns.
  - 0 links are absolute, and there are no bare dunder headings.
  - No "the documentation states" habit has crept back, and there are no em dashes.
- **The fixes from the advanced review are visible.**
  - `console` blocks now wrap with a hanging indent, so the 294-column `RuntimeWarning` in 09 is readable on a phone.
  - The level jump links (Beginner 37 · Intermediate 42 · Advanced 27 · Expert 18) work.
  - Python has its own advanced blurb.

**What most needs to change.**
1. The level and the whole Python track stop dead. Lesson 18 ends on one summary bullet, its pager has only "Previous", and the language is still marked `in-progress`.
2. The expert blurb is the generic cross-language one, and it misdescribes Python's expert level.
3. The G-file proposes about 2,500 words of additions, mostly to lessons that are already at or over the prose budget. Unless they are split out, they will break the 1,400-word standard across E3.
4. The lesson on profiling never shows what the sampling profiler prints.

## Did the advanced standards hold?

| Standard | Result |
|---|---|
| No syntax before it is taught | **Held for syntax.** `lazy import` (intermediate), t-strings (advanced) and `match` all build on earlier lessons. Library use ahead of teaching (`sqlite3`, `contextvars`, `dis` in 06) is G4 and G17. |
| One idea per block, with output after it | **Held.** `(continued)` builds are used throughout, except in the C blocks of 12 (item 8). Every runnable block is followed by an Output block or a console transcript. |
| 3 exercises with stated results | **Held: 54 of 54.** |
| Prose of about 1,400 words or fewer | **Four lessons are over:** 13 has about 1,620 words, 18 about 1,590, 02 about 1,510 and 06 about 1,470. The range is 1,064 to 1,622 (item 4). |
| Blocks of 25 lines or fewer | **Held.** 0 blocks are over 25 lines. |
| Lines of 80 columns or fewer | **Held for code.** The 21 longer lines are all program output, JSON logs, unittest names or console warnings, and all of them wrap. |
| Relative links | **Held.** 0 absolute links. |
| `minVersion` and `<Since>` | **Held.** `--run-under` 3.14 gives 0 FAIL lines. The outline drift is G16. |
| A "when not to" judgement in each lesson | **16 of 18.** 07 and 09 have none (item 3). |

---

## P0

None. Nothing on these pages is wrong in a way that misleads a reader before a fix lands, beyond what G1–G3 already list as P0. G1, the `-X disable-remote-debug` spelling, should be merged first. It is the only security-relevant error at this level.

## P1

### 1. Give the Python track an ending: closing lesson, end card and status
**Owner:** writer (closing text, with the capstone from G13), uiux (pager and end card), researcher (status)
**Files:**
- `site/src/content/lessons/python/expert/18-migrating-to-315.mdx` (last bullet)
- The lesson page template (the pager component in `site/src/pages/learn/[lang]/[level]/[slug].astro` or its `Pager`)
- `site/src/content/languages/python.md` (`status: in-progress`)

**Problem:**
- `dist/learn/python/expert/migrating-to-315/` renders a pager with only "Previous". Beginner, intermediate and advanced each end with a project and a "Where next".
- Expert, the last of 124 lessons, ends on "This completes the Production Python module and the expert level."
- The curriculum page and the catalog still call Python in progress, although every planned lesson exists.

**Acceptance criteria:**
- G13's capstone is the last lesson. Its final section, "Where next", links to:
  - the CPython devguide
  - the PEP index
  - the Python Discourse "Ideas" and "Core development" categories
  - the next language on the site (JavaScript)
  - the fundamentals track
- On the last lesson of any level, the pager's empty "Next" slot becomes a card. On the last level it reads "You have finished the Python track", with links to `/learn/python/` and to the language catalog. On the other levels it reads "Next level: …" and links to the first lesson of that level. This also fixes advanced 27's link, which goes to the index (G14).
- After the capstone merges, `python.md` has `status: complete`, and the catalog badge shows it.

### 2. Write a Python expert blurb
**Owner:** writer
**Files:** `site/src/content/languages/python.md` (`levels`), with the fallback in `site/src/lib/lessons.ts:11`
**Problem:**
- `/learn/python/#lv-expert` shows the shared fallback, "Internals, design trade-offs and the corners of the spec."
- Python's expert level has no lesson on the language spec. Its three modules are performance, CPython internals and production practice.
- The advanced blurb was fixed this way in the last review, but expert was left out.

**Acceptance criteria:**
- `python.md` has `levels.expert.blurb`, for example "Performance, CPython internals, and shipping and running Python in production."
- The built `dist/learn/python/index.html` shows that text under "Expert".
- The fallback in `lessons.ts` stays for other languages.

### 3. Add the missing "when not to" judgement to 07 and 09
**Owner:** writer
**Files:**
- `07-bytecode-dis.mdx`, before "Common pitfalls" at line 248
- `09-gil-internals.mdx`, before "Common pitfalls" at line 152

**Problem:**
- The other 16 lessons have a "When not to …" or "Choosing …" section, and G's summary wrongly counts all 18.
- The judgement is the expert content in these two lessons:
  - 07: never reason about performance or thread safety from opcode names, which change every release. Use `dis` to answer "what does this line do", not "how fast is it".
  - 09: do not declare `Py_MOD_GIL_NOT_USED`, or run production on `3.15t`, before an audit and a stress test. Most programs gain nothing from free-threading without parallel CPU-bound work.

**Acceptance criteria:**
- Both lessons have a `## When not to …` section of 150 words or fewer.
- `rg -L '^## (When not|Choosing)' site/src/content/lessons/python/expert` returns nothing.

### 4. Put the gap audit's additions into new lessons or sections, not onto the end of existing ones
**Owner:** writer (scoping), researcher (word-count check)
**Files:**
- Already over budget: 13, 18, 02, 06.
- Near the limit, and G would add the most: 12 (about 1,320 words; G8), 15 (about 1,330; G9), 14 (about 1,240; G10), 16 (about 1,250; G4, G12) and 18 (G5).

**Problem:**
- Done literally, G5, G6, G8, G9, G10 and G12 add about 300–500 words of prose each to lessons that are already at the 1,400-word budget.
- That would undo the standard that has held since the intermediate level.
- 13 and 18 already break it.

**Acceptance criteria:**
- G6 becomes its own lesson (`free-threaded-ready`), as G suggests.
- G8 becomes a second C API lesson (`c-api-functions-and-types`): argument parsing, containers, and debugging leaks.
- G10 and G12 cut text elsewhere in the lesson or move to a linked section in a new lesson. Candidates to cut or move:
  - 14's "Colour and suggestions"
  - 16's prose on `faulthandler`
- 13 moves the walk-through of `pylock.toml` into exercise 2. 18 shortens its tables and links to What's New instead of copying from it.
- `validate.sh` gains a prose-word check: it warns at more than 1,400 words and fails at more than 1,600. It counts as this review did: no code, no exercises, no tags.
- After all the G work, every expert lesson is at 1,500 words or fewer.

### 5. Show real sampling-profiler output in 02
**Owner:** writer (content), researcher (the run)
**File:** `02-profiling.mdx:118–122` ("Sampling with Tachyon")
**Problem:**
- The sentence "Here is the report generator you will speed up in exercise 1:" introduces a one-line console block, `$ python -m profiling.sampling run report_slow.py`.
- It shows no output and no report generator.
- The lesson's headline 3.15 tool is never shown doing anything. The flame-graph section works from a hand-written collapsed string.
- A learner meets the real table, with `nsamples` as direct/cumulative, for the first time in exercise 1.

**Acceptance criteria:**
- The block shows a trimmed real run on 3.15.0: the header and the top 5–6 rows. If the run needs privileges, use the `run` subcommand, which does not need `attach` privileges, and say so.
- The sentence is fixed: "Here is the sampling profile of the report generator you will speed up in exercise 1."
- The text points at one row and reads its direct and cumulative counts.
- The output is labelled as varying between runs, with a rule for reading it ("the order of the top rows is stable; the counts are not").

### 6. Compile the lesson C code in validation
**Owner:** researcher
**Files:**
- New: `examples/python/e2/tally.c` and `examples/python/e2/hello.c` (the exercise solution), with expected outputs
- `scripts/validate.sh`

**Problem:**
- Lesson 12 has 7 C blocks and 09 has 2, and the console transcripts depend on them.
- They compile today. The gap audit and this review each compiled `tally.c` by hand.
- But no example file holds them, so nothing would catch a change to the 3.15.x headers or to the `PySlot` API, which was new in 3.15.

**Acceptance criteria:**
- `validate.sh` compiles each `examples/**/*.c` with `gcc -Wall -Werror` against `python3.15-config --includes`. It does this twice, once as a version-specific build and once with `-DPy_LIMITED_API=0x030f0000 -DPy_TARGET_ABI3T=0x030f0000`.
- It imports each result under `python3.15` and `python3.15t`, and compares the output with a `.out` file.
- The step is skipped with a SKIP line, not a failure, when no compiler is present.
- `check_lesson_examples.py` maps the C blocks to these files, so a divergence between the lesson and the file is a failure.

### 7. Make the timing exercises self-explaining when they fail (extends G15)
**Owner:** writer
**Files:** the seven exercises in G15, plus the body examples that print timing booleans:
- `01` (`at least 20x slower`)
- `02` (`at least 2x slower`)
- `03` (`saving at least 30%`, which is memory but depends on the build)
- `04` (`set version 50x faster`)

**Problem:**
- G15 covers the exercises. The same pattern is in 4 body examples, and each prints only `True`.
- These passed on all three of my default-build runs. But on `3.15t`, or with the JIT on, the margins are untested, and a reader who gets `False` has no number to judge with.
- Lesson 01's own advice ("a claim like 'at least 20x slower' survives a different laptop") is stated as universal. It holds only with the margin the lesson measured.

**Acceptance criteria:**
- Each such script prints the measured ratio, rounded, on a line before the boolean, for example `ratio: about 40x`. The Output block shows that line as varying.
- Each prompt names the build it was measured on.
- 01:95 says "survives a different laptop *if the margin is wide compared with the noise you measured*".
- All seven exercises and four body examples pass three runs each on `python3.15`, and once on `python3.15t`. Any that fail on `3.15t` say so in the prompt.

## P2

### 8. Give the C blocks file names, and mark the split function as continued
**Owner:** writer
**File:** `12-c-api-tour.mdx:41`, `:70`, `:82` and the solution blocks; `09-gil-internals.mdx:99`
**Problem:**
- Every C block renders as an untitled frame. In the HTML, `figure.frame` has no `has-title`.
- The first block of `count_true` ends inside the function, at an open `while` brace, and the next block starts indented in mid-function, with no `(continued)` tab.
- The python blocks in the same lesson have file tabs, and the gcc command builds `tally.c`, a name the page never attaches to the code.

**Acceptance criteria:**
- The blocks are titled `tally.c`, `tally.c (continued)` and `tally.c (continued)`, and the solution is `hello.c`.
- The 09 snippets keep no title, because they are fragments, and are introduced as fragments.
- The built page shows the three `tally.c` tabs.

### 9. Copy only the commands from console blocks (still open from advanced item 14)
**Owner:** uiux
**File:** `site/ec.config.mjs`
**Problem:**
- The copy button still copies `$ ` prompts and output.
- At this level the console blocks are build and run recipes, and readers are most likely to paste them:
  - 12's gcc lines, with `\` continuations
  - 06's `PYTHON_JIT=1` runs
  - 13's `uv build` and `twine` lines
- 12's first transcript copies `3`, a traceback and `TypeError: …` into the shell along with the commands.

**Acceptance criteria:** as in advanced item 14. In addition, a command continued with a trailing `\` is copied whole.

### 10. Make the JIT exercise prompt and the 06 opening clearer
**Owner:** writer
**File:** `06-jit-and-interpreter.mdx:125`, and `:21–27` (with G17)
**Problem:**
- "Run `jit_bench.py` (below) twice … once with `PYTHON_JIT=0` and once with `PYTHON_JIT=1`, three times each" reads as both two runs and six.
- The prompt is 92 words long before the code, and the build-it-yourself detail sits in the middle of it.

**Acceptance criteria:**
- The prompt is a numbered list: 1. check `jit_status.py`; 2. run with `=0` three times; 3. run with `=1` three times; 4. compare the best of each.
- The optional source build moves to a sentence after the list.
- The prompt is 70 words or fewer.

### 11. Say which build the size and immortality figures were measured on
**Owner:** writer
**Files:** `03-memory-profiling.mdx:19`; `08-memory-model.mdx` (refcount and `_is_immortal` output)
**Problem:**
- 03 says "checked on 64-bit CPython 3.15", and adds that sizes change "between builds".
- On `3.15t`, `shallow_sizes.py` prints 44 for a small int, not 28, and 52,056 for the list, not 36,056.
- Lesson 09 tells readers to try `3.15t`, so some will and will see different numbers.
- `immortal_check.py` also differs.

**Acceptance criteria:**
- 03:19 reads "checked on the default (GIL) build of 64-bit CPython 3.15. The free-threaded build has a larger object header, so its numbers are bigger."
- 08 adds one sentence before the first refcount output to the same effect.

### 12. Use dashes, not hyphens, in descriptions
**Owner:** writer
**Files:** frontmatter `description` in `12-c-api-tour.mdx`, `15-security-python.mdx`, `16-config-observability.mdx`, `17-large-codebases.mdx` and `18-migrating-to-315.mdx`
**Problem:**
- "The Python-specific ways programs get compromised and their fixes - secrets instead of random, …" uses a spaced hyphen as a dash.
- These strings appear as the lesson card text and the meta description.
- The other 13 expert lessons use a colon or full stops.

**Acceptance criteria:** `rg '^description: .* - ' site/src/content/lessons/python` returns nothing.
