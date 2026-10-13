# Python advanced level: gap audit (W4)

- Audited 2026-10-13 at commit 032e456 (`origin/main`, which has modules A1 to A4 merged). Scope: `site/src/content/lessons/python/advanced/` lessons 01-26 (A1 Typing 01-07, A2 Data handling 08-13, A3 Concurrency 14-20, A4 Metaprogramming 21-26).
- Compared against: `research/python/outline.md` (advanced section), `research/python/facts.md`, `research/python/gaps-intermediate.md`, What's New 3.15, the `ast`, `concurrent.interpreters`, `threading`/free-threading HOWTO and data-model pages on docs.python.org, and comparable advanced curricula (Fluent Python parts 3-5, Real Python's advanced paths, the Python typing documentation, the asyncio and threading chapters of the library reference).
- Items already open in `gaps-intermediate.md` (outline drift, `minVersion` rule, `sqlite3`, `collections` placement, the intermediate project) are not repeated, except where the advanced lessons are the other half of the problem (items 12 and 14).
- Method: all 340 Python blocks were parsed with 3.15.0 (0 syntax errors). Every relative link was resolved against the lesson slugs (0 broken). Exercise blocks were checked for a stated input and output. Version and status claims were compared with `facts.md` and the docs. Several 3.15 claims were run on a local 3.15.0: `[*L for L in x]`, `TaskGroup.cancel`, `threading.serialize_iterator` and the `NotShareableError` from `prepare_main`. Output blocks that need a type checker or a timing run were not re-run. `mypy 2.3.1` and `pyright 1.1.414` exist on PyPI.

## Summary

- **Size.** All 26 outline lessons exist, with the planned slugs, order and modules. Every lesson has exactly 3 exercises (78 in all), a summary, a pitfalls section and cross-links.
- **Version facts are accurate.** Checked and correct: free-threading is supported but optional and phase III is undecided (14, 19), JIT is not claimed, the `abi3t` stable ABI, `forkserver` as the default on Linux in 3.14, the asyncio policy deprecation and its removal in 3.16, `TaskGroup.cancel` (3.15), `threading.serialize_iterator` (3.15), `heapq` max functions (3.14), `ast.dump` omitting `Load()` (3.15), tuple `__slots__` (3.15), `contextmanager` as a decorator on generators (3.15), PEP 728, 747, 800, 661, 814 and 750, `annotationlib` formats, and `copy.replace`. No removed module is taught as current. The only wrong or risky facts are in items 1 and 2.
- **Real gaps.** The advanced level teaches the 3.15 features well and the "classic" advanced material thinly. The weak spots are:
  - Concurrency has no synchronisation primitives beyond `Lock` and `Queue`, and asyncio has no `async for`, async generators, `asyncio.Queue`, `Lock` or `Semaphore`.
  - Dynamic attribute access (`__getattr__`) is missing from metaprogramming.
  - Typing lacks `@overload`, `NewType`, `ClassVar` and `TYPE_CHECKING`.
  - Regex has no lookaround or backtracking warning.
  - There is no serialisation or numeric lesson, and no capstone project.
- **Exercises.** 75 of 78 give an input and an expected output or a checkable result. The three weak ones are in item 13.
- **Cross-links.** Within-module links are good. Cross-module links are thin, and no intermediate lesson links forward to the advanced level (items 11 and 12).

## P0: wrong or blocking

### 1. `sqlite3` is used in the template-strings lesson without being taught anywhere
- Owner: writer
- File: `site/src/content/lessons/python/advanced/25-template-strings.mdx` (section "Parameterised SQL", line 179 onwards, `import sqlite3` at line 198)
- Why: `sqlite3` appears in no beginner, intermediate or other advanced lesson. `gaps-intermediate.md` item 8 deferred it, and the outline lists it nowhere, so a learner meets `connect(":memory:")`, cursors, `?` placeholders and `execute` for the first time inside a lesson about t-strings. The safety lesson (placeholders versus string building) cannot land if the placeholder mechanism is unknown.
- Fix: add a 10-line box "sqlite3 in one minute" before the example (connect, `execute`, `?` placeholders, `fetchall`, why the placeholder is not string formatting), and link to the standard-library page. Better, close `gaps-intermediate.md` item 8 by adding a `sqlite3-basics` lesson and link back to it from 25.

### 2. Unverifiable, short-lived checker versions are printed as lesson facts, and the 3.15 support claim cannot be checked
- Owner: writer or reviewer
- Files: `01-typing-fundamentals.mdx` (line 21 and every `console title="mypy 2.3.1"`), `07-modern-typing-315.mdx` (line 21: "pyright 1.1.414 understood all three 3.15 features. mypy 2.3.1 understood `TypeForm` and `@disjoint_base`, but did not yet accept a sentinel"), and the same console titles in lessons 02, 03, 04, 06 and 07.
- Why: `facts.md` says third-party tools are "named without version claims". Lesson 07 does the reverse and makes a support statement per release for the three newest features. Those statements are the first thing to go stale (both tools release every few weeks) and cannot be checked against a primary source in this repo. If a learner installs the current mypy and the sentinel example passes, the lesson will look wrong. The same applies to the quoted message texts, which differ between releases.
- Fix: keep the versions in the console titles (they are honest provenance), but (a) add one sentence in lesson 01 that messages vary by version and the page shows the version used, (b) reword the lesson 07 sentence as "at the time of writing (October 2026, pyright 1.1.414, mypy 2.3.1)" with a link to each tool's typing-spec conformance page, and (c) add the check date to `facts.md` under Modern tooling. Re-run the checker blocks at each level review.

## P1: important for a learner

### 3. Threading stops at `Lock` and `Queue`
- Owner: writer
- File: `15-threading.mdx` (headings: starting, race, locks, queues, pools, iterator, pitfalls)
- Why: `threading.Event`, `Semaphore`, `RLock`, `Condition`, `Timer`, `threading.local` and daemon threads appear in no lesson (grep finds none), and `queue.Queue` shutdown is not shown. The outline key concepts are only `Lock`, `Queue`, races and `ThreadPoolExecutor`, but every comparable curriculum (the tutorial's threading section, Fluent Python, Real Python) teaches `Event` for stopping a worker and `Semaphore` for rate limiting. Without `Event` there is no clean way to stop a thread, so the first realistic worker loop in the learner's code will use a global flag. Lock ordering and deadlock are named in pitfalls but not demonstrated, and `KeyboardInterrupt` handling in threaded programs is missing.
- Fix: add two sections. "Signalling with Event" (stop flag for a worker, `wait(timeout)`) and "Limiting with Semaphore, and RLock versus Lock". Add a short "Thread-local data" note that links to the contextvars item below. Add one deadlock example with a fix by lock ordering, output verified on 3.15 and on the free-threaded build.

### 4. asyncio has no async iteration, async generators, or asyncio synchronisation tools
- Owner: writer
- Files: `17-asyncio-basics.mdx` (section list: coroutines, await, gather, tasks, `to_thread`, `Runner`), `18-asyncio-structured.mdx`, `24-contextlib-advanced.mdx` (line 195 onwards)
- Why: `async for`, `__aiter__`, async generators (`async def` with `yield`), `asyncio.Queue`, `asyncio.Lock`, `asyncio.Event`, `asyncio.Semaphore` and `loop.run_in_executor` appear nowhere in the track. Lesson 24 teaches `@asynccontextmanager`, which is an `async def` generator, so the reader must understand async generators that were never introduced. Producer/consumer with a bounded `asyncio.Queue` and a `Semaphore` to cap concurrency are the two patterns almost every real async program has. Also missing: `asyncio.as_completed` (an async iterator in current versions), `asyncio.shield`, debug mode (`PYTHONASYNCIODEBUG`, `asyncio.run(debug=True)`) and how to test async code (`unittest.IsolatedAsyncioTestCase`, pytest plugins).
- Fix: add a lesson `asyncio-patterns` between 18 and 19 (Module A3 grows to 8 lessons) covering `async for` and async generators, `asyncio.Queue` with a worker group in a `TaskGroup`, `Semaphore`, `Lock` and `Event`, `as_completed`, `run_in_executor` versus `to_thread`, debug mode, and a short async test with `IsolatedAsyncioTestCase`. Add a one-paragraph forward link from 17 and a back-link from 24. Exercise idea: a rate-limited crawler over a local stub server with expected output.

### 5. Dynamic attribute access is missing from the metaprogramming module
- Owner: writer
- Files: `21-descriptors.mdx` or a new lesson after it; `22-class-customisation.mdx`
- Why: `__getattr__`, `__getattribute__`, `__setattr__` (one hit), `__delattr__`, `__dir__`, module-level `__getattr__` (PEP 562), `getattr`/`setattr` with defaults and `object.__getattribute__` for proxies appear nowhere. The descriptors lesson explains lookup order but ends before the fallback step, and these hooks are the usual tool for proxies, lazy attributes and deprecation shims. They also show where lookup order matters (`__getattr__` runs last, `__getattribute__` first). The data model lesson in intermediate does not cover them either (see `gaps-intermediate.md` item 7).
- Fix: add a section "When normal lookup fails: `__getattr__`" to lesson 21 (or a new `dynamic-attributes` lesson) with a delegating proxy, the infinite-recursion pitfall, module `__getattr__` for deprecated names, and a diagram of the full lookup order extended to include the fallback. Link from 22 and 23.

### 6. Typing coverage misses `@overload`, `NewType`, `ClassVar`, `TYPE_CHECKING`, `assert_type` and gradual adoption
- Owner: writer
- Files: `01-typing-fundamentals.mdx`, `02-generics-pep695.mdx`, `07-modern-typing-315.mdx`
- Why: a module about "typing in depth" never mentions `@overload` (the only way to type functions whose return type depends on the arguments, and used throughout the standard library stubs), `NewType`, `ClassVar`, `typing.TYPE_CHECKING` (the standard fix for circular imports), `assert_type`, `# type: ignore[code]` with `--warn-unused-ignores`, strict-mode flags, `py.typed` and stub files, `TypeVarTuple`/variadic generics (PEP 646, 3.11), `LiteralString`, `dataclass_transform` and `warnings.deprecated` (3.13, PEP 702, listed in `facts.md`). A learner who types a real codebase hits `TYPE_CHECKING` and `@overload` within a day. Variance is mentioned once without an exercise.
- Fix: add a lesson `typing-in-practice` after 04: `@overload`, `NewType`, `ClassVar` and `Final`, `TYPE_CHECKING` with a circular-import example, `assert_type` for tests, `# type: ignore[code]` and unused-ignore warnings, a strict `pyproject.toml` `[tool.mypy]` table, gradual adoption (start with one module), and a one-paragraph tour of `TypeVarTuple`, `LiteralString`, `dataclass_transform` and `@warnings.deprecated`. Mark which parts the older checkers lack. Add a variance exercise (a `Sequence[Cat]` versus `list[Cat]` argument) to lesson 02.

### 7. PEP 798 (unpacking in comprehensions) is not taught
- Owner: writer
- File: `13-algorithms-py.mdx`, `09-collections-module.mdx` or a new box in `08-match-advanced.mdx`; best placed in `09`
- Why: What's New 3.15 lists it among the five biggest changes. `facts.md` lists it as a 3.15 feature. The track has only two `[*` hits, both sequence patterns, so `[*L for L in lists]` and `{**d for d in dicts}` (checked on 3.15.0: `[1, 2, 3]`) never appear. The flat-map idiom is a natural advanced topic, and the lesson that compares it with `itertools.chain.from_iterable` and nested comprehensions belongs here.
- Fix: add a `<Since v="3.15" />` section to lesson 09 ("Flattening and merging") comparing nested comprehension, `chain.from_iterable` and `[*L for L in lists]`, plus `{**d for d in dicts}` for merging with later keys winning. Add a note that older versions must use `chain`. Mention it in the `immutability` summary only if a frozendict merge is shown.

### 8. Regular expressions lack lookaround, backtracking limits and the other `re` functions
- Owner: writer
- File: `12-regex.mdx` (headings: search versus match, language, greedy, groups, compile/flags, substitution, `prefixmatch`, pitfalls)
- Why: lookahead and lookbehind (`(?=`, `(?!`, `(?<=`), named backreferences (`(?P=name)`; only `\1` appears), `re.split`, `re.NOFLAG` (3.11), possessive quantifiers and atomic groups (3.11), scoped inline flags (`(?i:...)`), catastrophic backtracking (ReDoS) and `re.sub` with a function are absent. ReDoS matters for any code that applies patterns to user input, which is the exact use case of the lesson's log parser. Also missing: when not to use `re` (HTML, nested structures), and a pointer to `str` methods first.
- Fix: add "Looking around without consuming", "Possessive and atomic matching (3.11)", `re.split` and `re.sub` with a callable, and a "Backtracking can be exponential" pitfall with `(a+)+$` and its measured timing on a 30-character input. Add a one-line mention that the third-party `regex` module and `re2` bindings exist. Link back from the intermediate lessons that already use `re` (item 12).

### 9. `algorithms-py` is thin against the outline and the fundamentals lesson it follows
- Owner: writer
- File: `13-algorithms-py.mdx` (three algorithm sections: `bisect`, `heapq`, graphs)
- Why: the outline promises searching and sorting, trees and graphs, BFS/DFS. The lesson has no sorting algorithm discussion (stability, `sort` versus `sorted`, `heapq.merge`, `bisect.insort`), no recursion limit (`sys.setrecursionlimit`, iterative DFS), no memoisation (`functools.cache` on recursion appears in no lesson of this level, although `lru_cache` is the standard dynamic-programming tool), no tree traversal (`TypeVar`-less nested dataclasses are enough), no topological sort (`graphlib.TopologicalSorter`, 3.9, in `facts.md`) and no complexity statements beyond a few remarks. The `fundamentals:` frontmatter links `21-searching-and-sorting` and `17-trees-and-graphs` but not `11-recursion` or `20-big-o`.
- Fix: add sections "Recursion and its limits (with `functools.cache`)", "Trees: traversal with generators and `yield from`" and "Dependencies with `graphlib`", plus a table of big-O for the operations used. Add `11-recursion` and `20-big-o` to `fundamentals:`. Exercise idea: a build-order resolver with `TopologicalSorter` (input: a dependency dict, expected: an order, and a `CycleError` case).

### 10. No serialisation or numeric lesson in "Advanced data handling"
- Owner: researcher (placement), then writer
- Files: new lessons in module A2; `12-regex.mdx` precedes them
- Why: the module covers `match`, `collections`, immutability, copying, regex and algorithms, but not how data leaves the program. Missing for a data-handling module: custom JSON encoding and decoding (`default=`, `object_hook`, `dataclasses.asdict`), `pickle` and its security warning (lesson 16 explains pickling limits but never says that unpickling untrusted data runs code), `sqlite3` (item 1), binary data with `struct`, `memoryview` and `bytearray` (including 3.15 `take_bytes()` from `facts.md`), and numeric correctness with `decimal`, `fractions` and float pitfalls (`Decimal` appears only as a generic bound in lessons 02 and 03). `statistics`, `random` and `secrets` are also absent. Every comparable advanced course has at least serialisation.
- Fix: add two lessons to A2 (making it 8): `serialisation` (json hooks, `asdict`/`astuple`, pickle and `__reduce__`/`__getstate__`, a security box, `shelve` mention) and `numbers-and-bytes` (`Decimal`, `Fraction`, float representation, `struct`, `memoryview`, `bytearray.take_bytes()` as `<Since v="3.15" />`). Update the outline and totals.

### 11. Cross-module links are thin, and the end of each module is a dead end
- Owner: writer
- Files and fixes (each is one sentence plus a link; all slugs exist):
  - `14-concurrency-models` links to 15, 16, 17 and 19 but not to `subinterpreters` (20) or `asyncio-structured` (18), although its table has a row for interpreters.
  - `15-threading` should link to `free-threading` (19) at the lock section ("data races are real without the GIL"), to `asyncio-basics` (17, `to_thread`) and to `subinterpreters` (20). Lesson 19 links back to 15, but 15 does not link forward.
  - `16-multiprocessing` should link to `subinterpreters` (20, an alternative to a process pool) and to `serialisation` (once item 10 exists, for the pickle warning).
  - `17-asyncio-basics` should link to `threading` (15) for `to_thread`, and to `contextlib-advanced` (24) at `async with`. `18-asyncio-structured` should link to `contextlib-advanced` (24) and `threading` (15).
  - `20-subinterpreters` links only to 16. Add 14, 15 and 19.
  - `04-narrowing` mentions exhaustive `match` and should link to `match-advanced` (08). `08-match-advanced` links only to 09; it should link to 06 (matching on `TypedDict`) and 04.
  - `07-modern-typing-315` (`sentinel`) should link to `immutability` (10, `frozendict`) as the other 3.15 builtin, and to `copying-references` (11), since a sentinel keeps identity when copied.
  - `02-generics-pep695` should link forward to `class-customisation` (22) for `__class_getitem__`.
  - `21-descriptors` should link to `annotations-runtime` (05, `__set_name__` and field annotations) and `metaclasses` (23). `26-introspection-ast` links to none of 21-25. Add 22, 23 and 25 (t-strings are also AST-adjacent), and 05 for `annotationlib`.
  - `12-regex` should link to `template-strings` (25) for safe interpolation, and back to the intermediate lessons that use `re`.
  - Module ends: lessons 07, 13, 20 and 26 end with a bare summary. Add "Next" lines (07 to `match-advanced`, 13 to `concurrency-models`, 20 to `descriptors`, 26 to the expert level or the advanced project from item 14), as well as a "Before you start" line in 08, 14 and 21 naming the prerequisites.
- Why: the in-module "next lesson" links are good, but the track has no thread between the modules, and the module hand-offs (types to data, data to concurrency, concurrency to metaprogramming) are where learners get lost. The `fundamentals:` list is empty in 19 of 26 lessons, even where a fundamentals lesson fits (`11-recursion` for 13, `20-big-o` for 13 and 14, `10-scope-and-lifetime` for 22, `12-errors-and-exceptions` for 18, `25-testing-mindset` for 15).
- Fix: add the links listed and fill `fundamentals:` where a lesson exists. Add a build check that every advanced lesson has at least one link to a different advanced module.

### 12. Intermediate lessons never point forward, and still use `re` and `Counter` before they are taught
- Owner: writer
- Files: `site/src/content/lessons/python/intermediate/36-test-driven-workflow.mdx` (line 103 and 370, `re.compile(r"(\d+)([hms])")`), `39-logging.mdx` (line 322 onwards, `re.compile(r"(password|token)=\S+")`), `16-stdlib-tour.mdx`, `17-classes-objects.mdx` and `27-generators.mdx` (all use `Counter`), `26-iterators.mdx`, `28-contextmanager.mdx`, `31-decorators.mdx`, `25-abc-protocols.mdx`, `41-profiling.mdx`, `14-ruff-and-type-checking.mdx`
- Why: no intermediate lesson links to an advanced one (a search for `advanced/` in the intermediate folder finds nothing), although `gaps-intermediate.md` item 3 asked for forward links and the advanced lessons now exist. The module-A2 lessons on `collections` (09) and `regex` (12) are the ones the earlier audit named. Learners need a trail from intermediate topics to their deeper treatment: decorators to `protocols-structural` (`ParamSpec`), `abc-protocols` to `protocols-structural`, `contextmanager` to `contextlib-advanced`, `generators` to `asyncio-basics`, `ruff-and-type-checking` to `typing-fundamentals`, `profiling` to `concurrency-models`.
- Fix: add a "Going deeper" line at the end of each of the listed lessons, and a box at the first use of `re` ("Regular expressions are taught in [the advanced regex lesson]; here only `\d+` matters") and of `Counter`.

### 13. Three exercises have no standalone input or expected output
- Owner: writer
- Files and exercises:
  - `14-concurrency-models.mdx`, "Classify eight workloads" (line 168): a list of eight descriptions and a judgment answer. Fix: state the required answer format (a table with columns workload, I/O or CPU, tool, one sentence) and keep the solution as a model answer. This is acceptable as discussion, but add a checkable first column.
  - `19-free-threading.mdx`, "Benchmark both builds": an expected line is given (`primes below 200000: 17984`) but the timing target is only described in words. Fix: state that the solution only checks the result line and that the 4-worker time on `3.15t` should be below the 1-worker time by a stated margin on 4 or more cores. Give the exact `time` commands.
  - `23-metaclasses.mdx`, "Now without the metaclass" (line 329): refers back to the previous exercise's code rather than giving its own input. Fix: repeat the rule (method names must be lower case), the test classes and the expected `TypeError` text so the exercise stands alone.
- Why: the audit rule is a stated input and a checkable output. The other 75 exercises meet it, and most print an exact expected block.
- Fix: as above, then verify the three on 3.15.

### 14. No advanced capstone project, bridge or self-check
- Owner: writer
- Files: new project lesson at the end of A4, `26-introspection-ast.mdx` (ending)
- Why: the intermediate level now ends with `42-project-tested-cli`. The advanced level ends with a summary of lesson 26 ("That completes the metaprogramming module"), no project, no self-check, no cheat sheet and no pointer to the expert level (E1 performance). The examples folder has `examples/python/a1` to `a4` (per-module examples) but no joined project. Fluent Python and Real Python both end this level with a build that joins typing, concurrency and class machinery.
- Fix: add `27-project-typed-concurrent-tool` (or an advanced project in each module): for example an async log fetcher with a typed `Protocol` interface, `TaskGroup` with `asyncio.timeout`, a frozen-dataclass config, a descriptor-validated field and a t-string report, checked with mypy or pyright and tested with pytest. Give a spec, starter, milestones, solution and verified output on 3.15. End the level with a 10-question self-check and a pointer to the expert level.

## P2: nice to have

### 15. Concurrency lessons use tools before they are introduced
- Owner: writer
- File: `14-concurrency-models.mdx` (lines 46-73, `threading.Barrier`, `ThreadPoolExecutor`)
- Why: the models lesson demonstrates the GIL with `Barrier` and a thread pool before lesson 15 teaches either. The text says the pool gets "a proper introduction in the next lesson", which is honest, but `Barrier` gets no note, and `ThreadPoolExecutor` code that learners cannot yet read sits in the first lesson of the module.
- Fix: add a one-line explanation of `Barrier` ("waits until N threads arrive") at its first use, or move the demonstration to lesson 15's "Thread pools" section and keep lesson 14 conceptual.

### 16. `contextvars`, `signal`, `weakref` and the `sys.monitoring` family are missing
- Owner: researcher, then writer
- Files: `15-threading.mdx`, `17-asyncio-basics.mdx`, `22-class-customisation.mdx`, `26-introspection-ast.mdx`
- Why: `contextvars` appears only as "context variables" in lesson 19 (line 171), with no `ContextVar` example, but it is the replacement for thread-locals in asyncio code and relevant to the free-threaded behaviour described there. `weakref` has one hit (lesson 22, a mention) and is the way to build caches and registries that do not keep objects alive (a registry via `__init_subclass__`, lesson 22, leaks otherwise). `sys.monitoring` (3.12, PEP 669, in `facts.md`), `sys.settrace`, `inspect.currentframe`, `importlib` hooks and `gc` are absent from the introspection lesson. Graceful shutdown with `signal` is also missing from the concurrency module.
- Fix: a short `contextvars` section in 17 (or 18) with `ContextVar` and `copy_context`; a `weakref.WeakValueDictionary` registry variant in 22; a "Watching code run" section in 26 with `sys.monitoring` (3.12) and a pointer to the `profiling` lessons in the expert level; and a `signal` plus `asyncio` shutdown example in a pitfalls box.

### 17. Subinterpreters and free-threading lessons lack a decision exercise using all four tools
- Owner: writer
- Files: `20-subinterpreters.mdx`, `14-concurrency-models.mdx`
- Why: the outline asks for an exercise that compares tools. The only comparison exercise is the workload classification in lesson 14. After 15, 16, 17, 19 and 20, there is no final exercise that runs the same CPU-bound job through a thread pool, a process pool, `InterpreterPoolExecutor` and (when available) the free-threaded build, and records results.
- Fix: add a fourth exercise to lesson 20, "Same job, four executors", with a shared script, expected result lines and a table to fill in; mark the timing column as machine-dependent. Also state that the machine's core count matters, and give the commands to find it (`os.cpu_count()`).

### 18. Matching and immutability could use one more worked example each
- Owner: writer
- Files: `08-match-advanced.mdx`, `10-immutability.mdx`
- Why: `match` is taught with mappings, built-in classes and dataclasses, but there are no sequence patterns with `*rest` on nested structures beyond the single case, no `case _ if guard` ordering pitfall, no `|` patterns with captures (a `SyntaxError`), and no `match` on `TypedDict` values (the lesson mentions `TypedDict` nowhere). For `frozendict`, there is no example of `json.dumps` or a `pickle` round-trip, which `facts.md` says it supports.
- Fix: add two pitfalls to 08 (alternatives must bind the same names; guard order) and one `frozendict` serialisation example to 10.

### 19. `facts.md` is out of date on free-threading overhead
- Owner: researcher
- File: `research/python/facts.md` (3.14 section: "Single-thread overhead is about 5-10%")
- Why: the free-threading HOWTO (3.15 docs) says the pyperformance average overhead "ranges from about 1% on macOS aarch64 to 8% on x86-64 Linux", which is what lesson 19 quotes. The fact sheet and the lesson disagree, and the lesson is right.
- Fix: update `facts.md` to quote the HOWTO and add the source. Also add `threading.serialize_iterator`, `synchronized_iterator` and `concurrent_tee`, `TaskGroup.cancel` and the `ast.dump` default to the 3.15 list, because the lessons teach them and the fact sheet does not mention them.

### 20. `minVersion` follows the rule from the intermediate audit only partly
- Owner: writer
- Files: `09-collections-module` (3.10, outline 3.8), `10-immutability` (3.10, outline 3.15), `11-copying-references` (3.10, outline 3.13), `12-regex` (3.10, outline 3.15), `13-algorithms-py` (3.10, outline 3.8), `02-generics-pep695` (3.12, outline 3.13), `06-typeddict-advanced` (3.11, outline 3.15), `15-threading` and `16-multiprocessing` (3.8, each with 3.14 or 3.15 sections), `21-23` (3.8)
- Why: the main path of each lesson runs on the declared version and later features carry `<Since>` labels, so the pages are correct, but they differ from the outline. Lessons 09 and 13 declare 3.10, which does not match what the code needs (nothing in them requires `match` or `X | Y`). Lesson 10 declares 3.10 while its headline section needs 3.15.
- Fix: apply the rule from `gaps-intermediate.md` item 4 once: `minVersion` is the lowest version on which the unlabelled main path runs. Set 09 and 13 to what they need, keep the labelled sections, and update the outline column to match. Add the build check described there.

### 21. Windows and macOS notes for the free-threaded build and multiprocessing
- Owner: writer
- Files: `19-free-threading.mdx` (line 32-39), `16-multiprocessing.mdx` (start methods)
- Why: lesson 19 gives the install-manager tag `py install 3.15t` and the macOS installer note, which is right. Missing: a way to confirm which build is running on Windows (for example `py -V:3.15t`, to be verified), and a note in lesson 16 that the `__main__` guard is required on Windows and macOS because they use `spawn` (the lesson explains the guard but ties it to "every process example", not to the platform).
- Fix: one line each, with expected output.

### 22. Pitfall: the lessons assume a type checker is installed
- Owner: writer
- Files: `01-typing-fundamentals.mdx`, `02-generics-pep695.mdx`
- Why: the module A1 console blocks need `mypy` or `pyright`, but only lesson 01 mentions that, and without an install command. The intermediate lesson 14 covers checking, but a learner who skipped it hits `command not found`.
- Fix: add `uv tool install mypy` and `pip install mypy` (inside a venv) lines at the top of 01, and a note that `pyright` is installed with `pip` or `npm`. Link to the intermediate lesson.

## Catalog check (`.orchestration/languages.json`)

The catalog holds 644 unique slugs (tier 1: 14, tier 2: 29, tier 3: 601) and no duplicates. The file has no obvious structural problems. A name-and-slug search suggests the following languages are absent, or are listed under a name that did not match. Each needs a decision (add to tier 3, or record why it is out of scope) by the catalog owner; nothing was changed in this audit.

- Systems and general-purpose: Odin, Hare, Jai, MoonBit, Unison, Koka.
- Smart-contract languages: Move, Cairo.
- Hardware and GPU: Verilog, VHDL, CUDA, GLSL, HLSL, WGSL.
- Shells and scripting: zsh, VBA, Elvish.
- Configuration and typesetting: Typst, LaTeX, Dhall, CUE, Jsonnet, Starlark, Pkl.
- Array languages and small languages: BQN, Uiua, Wren, Janet, Fennel.

The first four groups are the most likely to be asked for by learners. Python itself is tier 1 and correct.
