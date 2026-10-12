# Python intermediate level: gap audit (W4)

- Audited 2026-10-12 at commit 995806a (branch `claude/focused-fermi-z89kyv-38-python-i5`, main plus I5). Scope: `site/src/content/lessons/python/intermediate/` lessons 01-40 (modules I1-I5).
- Compared against: `research/python/outline.md` (intermediate section), `research/python/facts.md`, the official tutorial (chapters 6, 8, 9, 10 and 11, with docs.python.org/3/library for `logging`), and comparable intermediate curricula (Real Python intermediate paths, Exercism Python track, "Fluent Python" part 1).
- Beginner items from `gaps.md` are not repeated. Note that the beginner level has since grown to 37 lessons and now has `reading-tracebacks`, `try-except`, `modules-and-imports`, `files-first-look`, `debugging-habits` and a mini-project, so beginner items 1-4, 7 and 8 are already addressed. Links from the intermediate lessons to those beginner slugs all resolve, and so do the `fundamentals:` slugs and the lesson-to-lesson links.
- Method: every exercise block was counted, the teaching order was checked by grep for classes, decorators, `yield`, `re`, `Counter`, `datetime` and dunder methods, and the version claims for 3.9-3.15 were compared with `facts.md` and docs.python.org (the `logging.basicConfig(formatter=...)` 3.15 claim was confirmed on the logging page). Lesson code was not re-run in this audit.

## Summary

- **Size.** 40 lessons exist; the outline plans 32. All outline topics are covered except dates and times. The built level has 8 more lessons than the outline (see item 2).
- **Version facts are accurate.** `except A, B:` (3.14), `add_note`/`except*` (3.11), `tomllib` (3.11), `-P` (3.11), `lazy import` (3.15), `math.integer` (3.15), `@override` (3.12), `copy.replace` (3.13), `StrEnum` (3.11), `batched` (3.12), `pairwise` (3.10), `cache` (3.9), `pdb -p` (3.14), `profiling.tracing`/`sampling` and `profile` deprecation (3.15) and `logging.basicConfig(formatter=)` (3.15) all match `facts.md` or the docs. No removed module is taught as current.
- **Exercises.** Every lesson has at least 2 (lessons 01-31 have 3, lesson 07 has 4, lessons 32-40 have 2). The weak spot is not the count but that 12 exercises have no stated input or output (item 9).
- **Real gaps.** One planned lesson is missing (dates and times). A few tools are used before they are taught (`re`, `Counter`). Frontmatter `minVersion` contradicts the body in 9 lessons. There is no intermediate project, and a handful of everyday tools are missing (`sqlite3`, `argparse` beyond a preview, `__getitem__`/`__call__`).

## P0: wrong or blocking

### 1. `dates-times` lesson was never written (missing topic)
- Owner: writer
- File: new `site/src/content/lessons/python/intermediate/` lesson, planned in `outline.md` module I1 (row `dates-times`)
- Why: the outline promises "work with aware datetimes" (`datetime.now(tz=UTC)`, never `utcnow()`, `zoneinfo`, `timedelta`, ISO 8601, meeting planner exercise). No lesson covers it: `zoneinfo`, `timedelta` and `utcnow` appear nowhere in the Python track, and `datetime` appears only as a naive `datetime.now()` in `36-mocking.mdx` (line 166) and as one beginner mention. The deprecated `utcnow()`/`utcfromtimestamp()` (3.12, see `facts.md`) are never warned about. Every curriculum compared (Real Python, Exercism, the tutorial's chapter 10.8) teaches dates at this level, and the first realistic data exercises (logs, CSV with timestamps, scheduling) need them.
- Fix: add `dates-times` after `07-csv-json-toml` in I1. It should cover `date`, `datetime`, `timedelta`, `strftime`/`strptime`, `fromisoformat`/`isoformat` (3.11 accepts most ISO 8601), aware versus naive values, `datetime.now(tz=UTC)` with `from datetime import UTC` (3.11), `zoneinfo.ZoneInfo` (3.9) including the DST gap, and a `<Since v="3.12">` box saying `utcnow()` is deprecated. Include the "Meeting planner across 3 time zones" exercise plus a "naive versus aware comparison raises TypeError" prediction exercise, with output verified on 3.15 (and a note that `zoneinfo` needs the `tzdata` package on Windows). Then update lesson 36 to cross-link, since its clock example is the natural place to show injecting a `now` function.

## P1: important for a learner

### 2. The outline is out of date with what was built
- Owner: writer (or researcher)
- File: `research/python/outline.md` (intermediate section and the header counts on line 9)
- Why: the outline says "Intermediate 32" and "107 lessons in 17 modules", but there are 40 intermediate lessons (I1 has 7, I2 8, I3 9, I4 7, I5 9; outline: 6, 7, 7, 6, 6). Slugs, titles and order differ: `exceptions` became three lessons, `files-pathlib` became two (`pathlib`, `text-and-binary`), `lint-format-typecheck` moved into I2 (lesson 13), `debugging-py` moved to the end of I5 (lesson 39), `docs-and-docstrings` became `doctest-and-docstrings`, and `unittest-basics`, `test-driven-workflow`, `mocking`, `profiling`, `custom-exceptions`, `context-manager-classes` and `contextmanager` were added. The advanced outline also lists `contextlib-advanced` with `@contextmanager`, which lesson 27 now teaches.
- Fix: rewrite the intermediate tables from the 40 real lessons, set the total to 40 (and the grand total accordingly), and drop `@contextmanager` from `contextlib-advanced` (keep `ExitStack`, async managers, `chdir`). The new intermediate lessons are not new topics, but without this the site counts, the next planning pass and the advanced audit work from a wrong baseline.

### 3. Tools used before they are taught
- Owner: writer
- Files and fixes:
  - `site/src/content/lessons/python/intermediate/35-test-driven-workflow.mdx` (lines 101-110 and 378-383) and `38-logging.mdx` (line 316 onwards) use `re.compile`, `findall` and `.sub` with no explanation. The module is planned for the advanced level (`regex`). Fix: add a boxed "regular expressions in one minute" note on first use (what `(\d+)([hms])` matches, `findall`, `sub` with `\1`) and link forward to the advanced `regex` lesson. Alternatively rewrite the duration parser without `re`.
  - `09-packages.mdx` (line 80) uses `Counter(...).most_common(n)` with no explanation, and `collections` is an advanced lesson. Fix: add one sentence ("`Counter` counts items; `most_common(n)` returns the n largest as pairs; see the collections lesson later") or swap in a `dict` loop. Lesson 16 defines its own class named `Counter` (line 410), which is confusing next to the standard one; rename it to `Tally`.
  - `20-data-model.mdx` (line 225 onwards) teaches `__iter__` before iterators (25). It already says so and uses `iter(self._items)`, which is acceptable, but add a forward link in the lesson 20 summary.
  - `02-raise-and-chain.mdx` (line 22) defines exception classes before the OOP module. It says so, and the forward link to lesson 19 is present; no change needed apart from checking the link text.

### 4. Frontmatter `minVersion` contradicts the lesson body
- Owner: writer
- Files: `01-exception-hierarchy` (3.8, has a 3.14 section), `18-inheritance` (3.8; `@override` needs 3.12; outline says 3.12), `22-dataclasses` (3.8; `slots`, `kw_only` need 3.10; `copy.replace` needs 3.13; outline says 3.13), `23-enums` (3.8; `StrEnum` needs 3.11; outline says 3.11), `24-abc-protocols` (3.8; `@override` 3.12), `28-itertools-functools` (3.8; `batched` needs 3.12; outline says 3.12), `38-logging` (3.8; a 3.15 section), `39-debugging-pdb` (3.8; `-p` is 3.14), `40-profiling` (3.8; a 3.15 section). Lessons 32-37 also say 3.8 where the outline says 3.11 (pytest and Python tooling), and `15-stdlib-tour` says 3.9 while the lesson shows `math.integer` (3.15).
- Why: this is the same open question as beginner item 15 and it is now at 9+ lessons. The sections are labelled with `<Since>`, so nothing is wrong in the body, but the metadata (shown to learners as a version badge) is not consistent with itself or with the outline.
- Fix: decide the rule once and write it into the style guide: `minVersion` is the lowest version on which the lesson's unlabelled main path runs; any section needing more carries a `<Since>` label and a fallback or a "skip if older" line. Then set 18 and 24 to 3.12 only if `@override` is in the main path (otherwise keep 3.8 and say so), 22 and 23 per the rule, and add `<Since>` labels where a gated import appears without one. Add a build check that compares the highest `<Since v=...>` in a file with `minVersion`.

### 5. `finally` change in 3.14 (PEP 765) is not taught
- Owner: writer
- File: `02-raise-and-chain.mdx` (or the beginner `33-try-except.mdx` pitfalls list, with a link from 02)
- Why: `facts.md` lists that `return`, `break` or `continue` that leaves a `finally` block now emits a `SyntaxWarning` (3.14). Neither the beginner nor the intermediate lessons mention it (`grep -ri SyntaxWarning` finds only an unrelated `is` note), although `finally` is a core part of I1.
- Fix: add a pitfall with a 6-line example (a `finally` that returns hides an exception), `<Since v="3.14" />`, and the warning text, verified on 3.15.

### 6. No intermediate-level project
- Owner: writer
- Files: new project lessons at the end of I2 (or I3) and I5
- Why: the beginner level now has `37-mini-project-word-counter`. The intermediate level, 40 lessons and about 28 hours, has no capstone. The sample projects from the outline (a `todo` CLI, log analyser, inventory with immutable updates) are scattered across exercises. Real Python and Exercism both end intermediate blocks with a project that joins files, packages, OOP and tests.
- Fix: add two guided projects with a spec, a starter, milestones, a full solution and verified sample output. Project A (after I3): a CSV or JSON backed inventory with a package layout, dataclasses, an enum, custom exceptions and `pathlib`. Project B (after I5): add pytest tests, logging and `ruff` to project A, with a `pyproject.toml` and a `uv run pytest` command.

### 7. `__getitem__`, `__call__`, `__contains__` and `__bool__` are missing from the data model lesson
- Owner: writer
- File: `20-data-model.mdx`
- Why: the lesson covers `__repr__`, `__str__`, `__eq__`, `__hash__`, `__lt__`, `__len__`, `__iter__`, `__add__`, `__mul__` and `__abs__`, but none of `__getitem__` (indexing, slicing and the old iteration protocol), `__contains__` (`in`), `__bool__` (truthiness, which the beginner level teaches) or `__call__` (callable objects, used by decorator classes in lesson 30). The outline's key concepts list "`__len__`, `__iter__`" only, but the tutorial and "Fluent Python" treat the sequence protocol as the core of the data model. `__getitem__` and `__call__` appear nowhere in the track, so lessons on decorators and `sorted(key=...)` cannot refer back.
- Fix: add a section "Containers and callables" with a small `Playlist` class (`__getitem__`, `__contains__`, `__bool__`) and a `Multiplier` class with `__call__`. Link to it from lesson 30 (class-based decorators) and lesson 31. Add one prediction exercise ("what does `bool(Playlist())` return?").

### 8. Everyday standard-library tools with no home before advanced
- Owner: researcher (decide placement), then writer
- Files: `15-stdlib-tour.mdx`, outline
- Why: `collections` (`Counter`, `defaultdict`, `deque`, `namedtuple`), `re`, `copy.deepcopy`, `typing.NamedTuple`/`TypedDict` and `sqlite3` are not taught in the intermediate level. The first four are planned for the advanced level (`collections-module`, `regex`, `copying-references`, `typeddict-advanced`), but `sqlite3` is in no outline. `sqlite3` (the standard route to persistence beyond CSV/JSON) and `argparse` (only a preview in lesson 15; the full lesson is `cli-apps` in the expert section) are the largest holes, and `pickle` (with its security warning) is only a listed expert topic. Intermediate learners meet `defaultdict`, `Counter` and `namedtuple` in almost every script they read, and lesson 22 compares dataclasses to nothing.
- Fix: either (a) add a `collections-and-copying` lesson to I4 (moving `collections-module` and `copying-references` from advanced) and a `sqlite3-basics` lesson to I1 or I2, or (b) add a "you will also meet" table to lesson 15 with one example each and a pointer to where each is taught. In both cases add `namedtuple` and `typing.NamedTuple` to lesson 22 as a comparison with dataclasses (note that the keyword form `NamedTuple("P", x=int)` was removed in 3.15).

### 9. Exercises without a stated input and output
- Owner: writer
- Files and exercises (title in quotes). "Stated" means the exercise gives the exact input and the expected output or a checkable result.
  - Command-line or file-layout exercises with only a description: `09-packages` "Write the import" and "Predict the dotted names"; `10-venv-pip` "Inside or outside?" and "Installed it, still can't import it"; `11-pyproject-uv` "Read a project file" and "Add a dependency group by hand"; `13-ruff-and-type-checking` "Count the findings" and "Set up the checks for a project"; `35-test-driven-workflow` "Take one more step through the loop" (expected seconds are given, but not the failure message).
  - `12-single-file-scripts` "Spot the broken block" has no expected answer shown before the solution, and `14-lazy-imports` "Which lines are errors?" lists statements but no expected output format.
  - `32-unittest-basics` "Predict the report" gives the code but not a transcript format for the answer; `25-iterators` and `26-generators` have good predictions, but the second exercises ("Make Countdown reusable", "Shorten with yield from") should show the expected `list(...)` results in a fenced `text` block rather than prose.
- Why: the audit rule is 2+ exercises with stated input and output. The count is fine; these 12 are checkable only by reading the solution.
- Fix: for each, add a block "Input: ... Expected: ..." (a snippet and the exact output, or the exact commands and the expected last line). For tooling exercises (09-13) give a tiny starter repo or the file listing and the expected command output. Verify on 3.15.

### 10. Lesson 36 and the testing module lack a few everyday tools
- Owner: writer
- Files: `33-pytest-basics.mdx`, `34-fixtures-and-parametrize.mdx`, `38-logging.mdx`
- Why: pytest `skip`, `skipif` and `xfail` markers, `-W error` (turn warnings into failures), `[tool.pytest.ini_options]` (`testpaths`, `pythonpath`; needed for the src layout from lesson 09) and `caplog` (testing log output) are missing, and `capsys` has one sentence. The logging lesson has no `logging.config.dictConfig` or `exc_info` example, which is what real projects use.
- Fix: add a short "Markers and configuration" section to 34 with `skip`, `xfail(strict=True)` and the `pyproject.toml` table, one `caplog` example in 38 or 34, and a three-line `dictConfig` in 38 with a pointer to the logging cookbook.

### 11. Encoding default and the file lessons
- Owner: writer
- Files: `04-pathlib.mdx` (line 86), `05-text-and-binary.mdx`, `07-csv-json-toml.mdx`
- Why: the beginner level explains that 3.15 made UTF-8 the default for `open()` (PEP 686) and why explicit `encoding="utf-8"` still matters. The intermediate file lessons say "always give it" but never mention the 3.15 change, `EncodingWarning` or `-X warn_default_encoding` (3.10, PEP 597), or `locale.getencoding()`. Learners on 3.15 will see no difference and ask why the lesson insists.
- Fix: add a short `<Since v="3.15" />` note in 05 (section "When the encoding is wrong") that links back to beginner `unicode-bytes`, and one line about `-X warn_default_encoding` for finding missing `encoding=` arguments in older code.

## P2: nice to have

### 12. Property-based testing and memory profiling
- Owner: writer
- Files: `34-fixtures-and-parametrize.mdx` or `35-test-driven-workflow.mdx` (hypothesis), `40-profiling.mdx` (tracemalloc)
- Why: `facts.md` lists `hypothesis` and `tracemalloc`. `hypothesis` does not appear. `tracemalloc` is not taught, and the outline defers memory to an expert lesson (`memory-profiling`). Both are common next steps after `parametrize` and `timeit`.
- Fix: a "Where to go next" paragraph in 34 (one `@given` example, no install walk-through) and one `tracemalloc` snapshot example in 40 with a link to the expert lesson.

### 13. Generics and typing are only touched
- Owner: researcher
- Files: `13-ruff-and-type-checking.mdx`, `24-abc-protocols.mdx`
- Why: type hints are introduced in beginner `type-hints-intro` and checked in lesson 13, but nothing at intermediate level shows `list[int]` in a class, `Self` (3.11) or `X | None` in dataclasses, and `TypedDict` is advanced. That is acceptable, but the dataclass lesson would benefit from one annotated example showing `list[str] | None` and `field(default_factory=list)` together, which is the usual stumbling block.
- Fix: check that lesson 22 has that example, and add it if not.

### 14. Packaging lessons skip building and publishing
- Owner: writer
- Files: `11-pyproject-uv.mdx`, `09-packages.mdx`
- Why: the lessons teach layout and `uv init/add/sync`, but `uv build` / `python -m build`, an editable install (`pip install -e .`) and publishing to an index (TestPyPI) are not shown. The tutorial's "Installing Python modules" and Real Python both cover editable installs, which is how a src-layout project is imported in tests.
- Fix: one section with `pip install -e .` and `uv build`, and one sentence on publishing with a pointer to the packaging guide at packaging.python.org.

### 15. Windows setup note in the venv lesson
- Owner: writer
- File: `10-venv-pip.mdx` (line 33)
- Why: `facts.md` says the Windows install manager provides `python`, `py` and `pymanager`, and that the standalone `py` launcher is deprecated since 3.14. The lesson says "the launcher is often `py`" with no further detail, which is still true but may confuse learners who installed through the manager.
- Fix: one sentence that `py -m venv .venv` works with the install manager and that `py install 3.15` adds a version, linking to beginner `install-python`.

### 16. Enum and iteration extras
- Owner: writer
- Files: `23-enums.mdx`, `28-itertools-functools.mdx`
- Why: `enum.Flag`/`IntFlag` is not mentioned (the outline does not require it, but file permissions and options are the textbook use). `itertools.batched` gained `strict=True` in 3.13 and `zip(strict=True)` (3.10) is not shown anywhere in the intermediate level, although `facts.md` highlights it.
- Fix: a two-line note on `Flag` in 23, `batched(strict=True)` as a `<Since v="3.13" />` in 28, and `zip(..., strict=True)` next to the `zip` use in lesson 26.

### 17. Doc tooling is minimal
- Owner: writer
- File: `37-doctest-and-docstrings.mdx`
- Why: the outline mentions README and `help()`. The lesson covers docstring conventions and doctest, but not what a good README contains, or how docs are generated (Sphinx, MkDocs) or the `pydoc` command.
- Fix: a short "Documentation beyond docstrings" section: README checklist, `python -m pydoc`, and a one-line mention of the generators.

### 18. Self-check and bridge to the advanced level
- Owner: writer
- File: `40-profiling.mdx`
- Why: the last lesson ends with a summary and no pointer onward, the same issue as beginner item 14. Learners also have no cheat sheet for the 40 lessons.
- Fix: end 40 (or a level-complete page) with what the advanced level covers (typing, concurrency, collections, regex), a 10-question self-check, and a one-page cheat sheet linked from the module index.

## Catalog check (`.orchestration/languages.json`)

Not part of this level audit; nothing was changed. The completeness check is still outstanding from the beginner audit (see its last paragraph) and needs a language index. No gap in the catalog was observed while auditing Python.
