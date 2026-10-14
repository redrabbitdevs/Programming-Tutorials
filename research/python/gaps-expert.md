# Python expert level: gap audit (W4)

- Audited 2026-10-14 at commit a0dbc01 (`origin/claude/focused-fermi-z89kyv-66-python-e3`, main plus E3). Scope: `site/src/content/lessons/python/expert/` lessons 01-18 (E1 Performance 01-06, E2 CPython internals 07-12, E3 Production 13-18).
- Compared against: `research/python/outline.md` (expert section), `research/python/facts.md`, `research/python/gaps-advanced.md` (items there are not repeated, only extended where the expert level is the other half of the problem), What's New 3.14 and 3.15, the `profiling.sampling` reference, PEP 744, 751, 779, 793, 803, 829 and 831 headers, `sys.monitoring`, the free-threading and remote-debugging pages on docs.python.org, and comparable expert material (High Performance Python, Fluent Python's late chapters, the CPython devguide internals, the Python Packaging User Guide, Real Python's packaging and performance paths).
- Method: all 185 Python blocks were parsed with 3.15.0 (0 real errors; the one hit in 16 is an intentional "continued" fragment). The 3 C blocks of lesson 12 were compiled with `gcc -Wall` against the 3.15.0 headers and `count_true` was run (prints `3`). Run on 3.15.0 and 3.15.0t: `sys.abi_info`, `importlib.machinery.EXTENSION_SUFFIXES`, `gc.get_threshold()` (`(2000, 10, 10)`), `bytearray.take_bytes`, `sys._jit`, the lesson 09 import check (json, decimal, sqlite3, ctypes leave the GIL off), the `getsizeof` exercise (8056, 64, 8056), the `profiling.tracing` and `profiling.sampling` command lines. PEP statuses were read from peps.python.org. Exercises were read for a stated input and a checkable result. Relative links and `fundamentals:` ids were resolved against the content collection.

## Summary

- **Size.** All 18 outline lessons exist with the planned slugs, order and modules. Every lesson has exactly 3 exercises (54 in all), a "when not to" section, pitfalls and a summary. 0 broken relative links.
- **The version and status facts you asked about are right in the lessons.**
  - JIT (06): experimental, off by default, PEP 744 still Draft (confirmed), 7-8% on x86-64 Linux and 11-12% against the tail-calling interpreter on AArch64 macOS (matches What's New), range from about 15% slower to over 2x faster, LLVM only at build time, installers ship it disabled.
  - Free-threading (09): supported but optional (PEP 779 phase II), phase III undecided, `abi3t` and PEP 803 correct, `Py_mod_gil` behaviour reproduced on 3.15t.
  - Incremental GC (08): correctly described as shipped in 3.14.0-3.14.4 and reverted in 3.14.5, with 3.15 on the generational collector.
  - `pylock.toml` (13): PEP 751 Final, `lock-version = "1.0"`, tool statements match the dated extract in `sources/e3-production-sources.md`.
  - The stale copies of these facts are in the research files, not the lessons (items 3 and 11).
- **Real defects.** One wrong command-line option that silently does nothing (item 1), two `fundamentals:` ids that resolve to nothing (item 2) and a stale fact sheet (item 3).
- **Real gaps.** The expert level teaches the 3.15 features thoroughly, and the "ordinary" expert material thinly:
  - no lesson on getting a package ready for free-threading;
  - parallelism is not treated as an optimisation tool;
  - the C API tour stops at one single-argument function;
  - security has no TLS, XML or archive material;
  - the CLI lesson skips Ctrl-C, pipes and `choices`;
  - observability has no tracing sketch or graceful shutdown;
  - the migration lesson ignores the "Porting to Python 3.15" list;
  - there is no capstone or self-check.
- **Exercises.** 54 of 54 give an input and a result or a predicted output. Seven assert timing ratios that depend on the machine (item 15).
- **Cross-links.** Expert lessons link to the advanced level in 7 of 18 lessons and to the intermediate level in 10 of 18. Several natural links are missing (item 14).

## P0: wrong or blocking

### 1. `-X disable_remote_debug` is the wrong spelling, and the option is silently ignored
- Owner: writer
- File: `site/src/content/lessons/python/expert/11-monitoring-debugging.mdx` (line 174, section "Attaching a debugger to a running process")
- Why: the docs (`using/cmdline`, "Added in 3.14") spell it `-X disable-remote-debug`, with hyphens. CPython ignores unknown `-X` names without a warning, so the lesson's spelling does nothing. Checked on 3.15.0: `sys.is_remote_debug_enabled()` prints `False` with `-X disable-remote-debug` and `True` with `-X disable_remote_debug`. A learner who follows the lesson believes remote attach is off when it is on, in a lesson about attack surface. The environment variable `PYTHON_DISABLE_REMOTE_DEBUG=1` is spelled correctly.
- Fix: change to `-X disable-remote-debug`. Add two lines with a check: `python3.15 -X disable-remote-debug -c "import sys; print(sys.is_remote_debug_enabled())"` prints `False`, and without the option `True`. Mention `sys.is_remote_debug_enabled()` as the way to confirm. Also link the option from `15-security-python` (a process that must not be attachable). Because unknown `-X` names are silent, add a build check that compares every `-X name` in the lessons with a list of valid names.

### 2. Two `fundamentals:` ids do not resolve
- Owner: writer
- Files: `08-memory-model.mdx` (line 17: `fundamentals/beginner/memory-and-references`) and `11-monitoring-debugging.mdx` (line 17: `fundamentals/beginner/debugging`)
- Why: `resolveFundamentals()` in `site/src/lib/lessons.ts` matches `l.id === id` exactly, and collection ids keep the numeric prefix. Every other lesson at all levels uses the numbered form (`fundamentals/beginner/18-memory-and-references`, `fundamentals/beginner/24-debugging`). These two return `lesson: undefined`, so the lesson page shows a dangling or missing prerequisite. The body links (`../../../fundamentals/beginner/memory-and-references/`) are correct because the route strips the number; only the frontmatter is wrong.
- Fix: use `fundamentals/beginner/18-memory-and-references` in 08 and `fundamentals/beginner/24-debugging` in 11. Add a content build check that every `fundamentals:` id exists in the `lessons` collection (it would have caught both). While there, fill the empty `fundamentals: []` in lessons where one fits: `12-errors-and-exceptions` for 14, `25-testing-mindset` for 14 and 17, `10-scope-and-lifetime` for 17, `24-debugging` for 16.

### 3. `facts.md` and `outline.md` still present the incremental GC as a shipped 3.14 feature
- Owner: researcher
- Files: `research/python/facts.md` (line 58, 3.14 section: "Incremental GC."), `research/python/outline.md` (line 244, `memory-model` row: "incremental GC (3.14)")
- Why: What's New 3.14 and 3.15 both say the incremental collector shipped in 3.14.0-3.14.4 and was reverted in 3.14.5, and 3.15 uses the generational collector. Lesson 08 is correct and says so. But the fact sheet is the source of truth for writers, and the outline row still tells a writer to teach it as current. Any lesson written or revised from those two files, including the Tier 2 languages that borrow CPython facts, will repeat the error. The same row also keeps `minVersion` 3.14, which no longer describes the GC content.
- Fix: in `facts.md` change the bullet to "Incremental GC (3.14.0-3.14.4 only; reverted in 3.14.5, 3.15 uses the generational GC)" and add the source (What's New 3.14, "Garbage collection"). In the outline change the key concept to "cyclic GC (generational; the 3.14 incremental GC was reverted in 3.14.5)". Add a line to the "do not teach as current" table in `facts.md`.

## P1: important for a learner

### 4. `sqlite3` and `contextvars` are used before they are taught
- Owner: writer
- Files: `16-config-observability.mdx` (section "A request ID in every line", line 148; exercise "A health check", 3 uses of `sqlite3`), `17-large-codebases.mdx` (7 uses of `sqlite3` in the composition root, `lazy_root.py` and the exercises), `09-gil-internals.mdx` (2 uses in the "Did an import turn the GIL on?" exercise)
- Why: `gaps-advanced.md` item 1 found `sqlite3` untaught before the t-string lesson; the expert level leans on it more heavily (a second and third place) and the item is still open. `contextvars` is introduced in lesson 16 in one sentence ("holds a value per thread and per asyncio task") with no `set`, `reset`, token or asyncio demonstration, and it appears in no lower lesson (`gaps-advanced.md` item 16 lists it as missing). The whole request-ID pattern rests on it.
- Fix: close `gaps-advanced.md` item 1 (a `sqlite3-basics` lesson or a ten-line box) and link to it from 16 and 17. In 16 add a short subsection: `ContextVar.set()` returns a token, `reset(token)`, why a plain global fails with two concurrent requests, and a 12-line asyncio demonstration with two tasks and the expected output. Link to the advanced `asyncio-basics` lesson.

### 5. The migration lesson ignores the "Porting to Python 3.15" list
- Owner: writer
- File: `18-migrating-to-315.mdx` (section "What 3.15 removed" and "Read before you change anything", which tells the reader to read the Porting section but never lists it)
- Why: the lesson covers removals and deprecations well, and UTF-8. But What's New 3.15 lists behaviour changes that break working code without any removal, and none appears:
  - `argparse` `dest` is now inferred from a single-dash long option (`add_argument('-f', '-foo')` gives `foo`, not `f`), which matters for lesson 14;
  - `base64.urlsafe_b64decode()` no longer requires padding (`padded=True` restores the old behaviour);
  - `unittest` `assertWarns` and `assertWarnsRegex` no longer swallow non-matching warnings, so suites start leaking warnings that were masked, which interacts with the lesson's own `filterwarnings = ["error"]` advice;
  - `sqlite3.connect()` parameters other than `database` are keyword-only;
  - AST node constructors raise `TypeError` for missing or unknown arguments (deprecated since 3.13);
  - `importlib.resources.files(package=)`, `zipimporter.load_module` and `typing.no_type_check_decorator` are gone;
  - `typing.ByteString` and `collections.abc.ByteString` already left `__all__` and warn on import.
  Also missing for 3.16: `__loader__` set without `__spec__.loader` stops being consulted, relevant to the import-system lesson.
- Fix: add a table "Behaviour changes that are not removals" with the six or seven entries above, each with a one-line detection method, and extend exercise "Predict: five lines on 3.15" or add a fourth exercise built on `argparse` `dest` and `assertWarns`. Update the summary line to mention them.

### 6. Nothing teaches how to make a package ready for free-threading
- Owner: writer
- Files: `09-gil-internals.mdx` (internals only), `18-migrating-to-315.mdx` (line 159 treats `3.15t` as "an extra, allowed-to-fail entry"), `13-packaging-publishing.mdx` (explains the `cp315t` tag but not how to build one), `17-large-codebases.mdx`
- Why: the level explains why free-threading works, but a learner who maintains a library has no procedure. Missing: running the tests with `PYTHON_GIL=0` and `-X gil=0`; writing a stress test with many threads; checking an extension with ThreadSanitizer; the compatibility tracker for dependencies; and shared-state audit (module-level caches, `lru_cache` use, class-level counters). Also missing are two runtime behaviour flags that are on by default only on the free-threaded build: `-X context_aware_warnings` and `-X thread_inherit_context` (checked on 3.15: `sys.flags.context_aware_warnings` and `sys.flags.thread_inherit_context` are `1 1` on `python3.15t`, `0 0` on `python3.15`). They change how `warnings` filters and `contextvars` behave in threads, which also affects lesson 16's request-ID logging and lesson 18's `catch_warnings` advice. The single-thread cost (about 1% to 8% depending on platform, per the HOWTO quoted in the advanced level) is not stated in lesson 09 or 06.
- Fix: add a lesson `free-threaded-ready` at the end of E2 (or a section in 09 plus one in 18): the audit checklist, a thread stress test with expected output on both builds, the two flags, cibuildwheel's `cp315t` build in 13, and the overhead figure with its source. Keep it labelled as the supported-but-optional phase; do not imply it is the default.

### 7. Parallelism is not taught as an optimisation, and the E1 lessons do not link to the concurrency level
- Owner: writer
- File: `04-optimising-python.mdx` (sections: algorithm first, built-ins, caching, micro-optimisations, NumPy); only `01` links to `advanced/concurrency-models`
- Why: the outline's key concepts are algorithmic wins, built-ins, locals, `functools.cache` and NumPy, and the lesson delivers those. But "optimise" at expert level also means choosing among threads, processes, `asyncio`, subinterpreters and the free-threaded build for the workload (the advanced level has the tools, `gaps-advanced.md` item 17 asks for a decision exercise). Missing too: data-structure choices with measured numbers (`deque` against `list.pop(0)`, `set` membership, `array`, `bisect`), I/O costs (buffering, batching), and a short map of "compile it" options in the order mypyc, Cython, Numba, PyPy (named in a pitfall at most).
- Fix: add a section "When the work can run in parallel" with a link to `advanced/concurrency-models` and a one-row-per-tool table, a section "Data structures that change the constant", and a link from `05-native-extensions` to the same level. Add `advanced/free-threading` and `advanced/subinterpreters` links in `06-jit-and-interpreter` (the "what else can I do" paragraph).

### 8. The C API tour covers one single-argument function
- Owner: writer
- File: `12-c-api-tour.mdx` (sections: PyObject, owning references, a function in C, the module, building, stable ABIs)
- Why: the tour compiles and works (checked), and the `PyModExport_` material is accurate and current. But the lesson stops short of what the next extension needs: argument parsing (`METH_FASTCALL`, `PyArg_ParseTuple`, keyword arguments), creating and returning containers, a custom type, per-module state, the buffer protocol (`Py_buffer`), releasing the GIL around blocking calls (`Py_BEGIN_ALLOW_THREADS`) and the free-threaded alternatives, and debugging reference-count mistakes (`./configure --with-pydebug`, `sys.gettotalrefcount`, `python -X dev`). Two 3.15 headline C API items are not named: `PyBytesWriter` (PEP 782) and protection against interpreter finalization (PEP 788). The lesson also assumes C knowledge without saying so.
- Fix: add a second function `scale(seq, factor)` that takes two arguments with `METH_FASTCALL`, builds a list and releases references on error paths; a "Debugging leaks" section with a debug-build or `-X dev` run and the expected output of `sys.gettotalrefcount()`; two sentences on PEP 782 and PEP 788 with links; and a prerequisite note ("you need to read C pointers and `malloc`; if not, use `ctypes` or Cython").

### 9. Security lesson has no TLS, XML or archive material, and does not mention the 3.15 `tarfile` fixes
- Owner: writer
- File: `15-security-python.mdx` (section "Other traps in the standard library", line 239-247)
- Why: the table has six rows. Missing for a Python security lesson: TLS (`ssl.create_default_context()`, never `verify=False` or `_create_unverified_context`), parsing untrusted XML (entity expansion and external entities; `defusedxml`), `zipfile` extraction and path traversal (the lesson teaches `is_relative_to` for paths but not for archive members), `urllib` accepting `file:` URLs, `random` for tokens (covered), deserialising YAML (covered), and ReDoS (linked from the regex gap in `gaps-advanced.md` item 8). The `tarfile` row says the `data` filter is the default from 3.14, which is right, but 3.15 tightened it again (symlink targets are normalised, extraction re-applies the filter when it substitutes a link, new `LinkFallbackError`), with CVE references in What's New 3.15.
- Fix: add rows for TLS, XML, `zipfile` and `file:` URLs, and one sentence on the 3.15 `tarfile` changes. Add `advanced/regex` to the links for the ReDoS point. Optionally add a fifth fix to the audit exercise (a request that disables certificate verification).

### 10. The CLI lesson skips Ctrl-C, pipes, stdin and most of the argparse vocabulary
- Owner: writer
- File: `14-cli-apps.mdx` (headings: shape, subcommands, exit codes, python -m, colour, when not)
- Why: the outline places the first full `argparse` lesson in the expert level (`gaps-intermediate.md`, line 172 of the outline), so this lesson must teach the vocabulary. It never shows `choices=`, `nargs`, `action="store_true"` beyond the todo example, mutually exclusive groups, `--version`, `parents=`, or a `-` argument for stdin. `grep` finds no `KeyboardInterrupt` or `BrokenPipeError`: a tool piped into `head` prints a traceback, and Ctrl-C should exit with 130. Also missing: reading from stdin, `shlex.split` for testing, and exit codes for signals. The lesson does not mention the 3.15 `dest` inference change (item 5).
- Fix: add a section "Pipes and Ctrl-C" with a handler for `BrokenPipeError` (and the documented `os.dup2(os.open(os.devnull, os.O_WRONLY), sys.stdout.fileno())` step), `KeyboardInterrupt` returning 130, and a `-` for stdin. Add a table of the ten common `add_argument` shapes (flag, option with `type`, `choices`, `nargs`, repeated option, mutually exclusive group, `--version`) each with a one-line example and its usage text. Add an exercise "`todo list | head -1` without a traceback" with the expected stderr.

### 11. `pylock.toml` tool support is dated, narrow, and not shown on the install side
- Owner: writer, researcher
- Files: `13-packaging-publishing.mdx` (section "Lock files: pylock.toml", lines 189-260), `research/python/facts.md` (Modern tooling bullet)
- Why: the lesson is accurate for what it names: `pip` 26.2.1 (`pip lock`, still experimental) and `uv` 0.13.0 (export, `uv pip sync`). Today PyPI shows pip 26.2.1 and uv 0.13.1, so the uv number is already one release behind, and the statement will go stale quickly. It names only two tools, says nothing about other installers or project managers, and never shows installing from a lock file (`pip install -r pylock.toml`, which the `pip` help text says is experimental) or the multi-lock filename pattern `pylock.<name>.toml` that the specification allows. `facts.md` gives no tool-support statement at all (it only lists PEP 751).
- Fix: reword as "At the time of writing (14 October 2026: pip 26.2.1, uv 0.13.1)", link to the packaging guide's lock-file specification page and each tool's own docs, state the status of each (pip experimental), and add the install command with expected output. Add the checked-on date and the two versions to `facts.md` under Modern tooling. Re-check at the next level review; this is the item most likely to be wrong in six months.

### 12. Observability: tracing is named but not shown, and there is no graceful shutdown
- Owner: writer
- File: `16-config-observability.mdx` (headings: configuration, logging, request ID, health checks, crashes, when not)
- Why: the outline key concepts include "structured logs, tracing". Tracing appears only in the closing paragraph, which tells the reader not to build it. There is no sketch of a span, trace ID propagation or what OpenTelemetry adds over a request ID. `SIGTERM` handling (how a container stops a service), `signal.signal` and flushing logs on exit are absent. `logging.handlers.QueueHandler` and `QueueListener` (non-blocking logging in a threaded or async service) are not mentioned. The health-check section is a paragraph plus the exercise; liveness against readiness is not distinguished. `faulthandler` gained a `max_threads` parameter in 3.15 that is not noted.
- Fix: add a short "Following one request across services" section (trace ID in a header, copied into the `ContextVar` from item 4, a span as start, end and parent), a "Stopping cleanly" section (SIGTERM handler that sets an `Event`, closes the server and flushes handlers, with the expected output of a child process that is terminated), a QueueHandler paragraph, and a two-row liveness/readiness table. Add `advanced/asyncio-basics` and `advanced/threading` links.

### 13. No expert capstone project, self-check or "where next"
- Owner: writer
- Files: new project lesson after `18-migrating-to-315.mdx`; `18-migrating-to-315.mdx` (ending)
- Why: the beginner, intermediate (`42-project-tested-cli`) and advanced (`27-project-async-plugin-tool`) levels each end with a project; the expert level ends with a summary line ("This completes the Production Python module and the expert level"). Nothing joins the three modules (measure and profile a tool, read its bytecode and imports, package and ship it, upgrade it), there is no self-check, and nothing says what to do next (CPython contributor guide, PEPs, reading the devguide). The advanced project's "Where next" links to the curriculum index, not to a first lesson (item 14).
- Fix: add `19-project-ship-a-fast-tool`: take the `jobrun` tool from the advanced project, profile it with Tachyon, apply one optimisation, add a `sys.monitoring` coverage check, package it with a lock file and trusted-publishing workflow, and run the 3.15 upgrade checklist. Give a spec, milestones, a solution and checked output on 3.15 and 3.15t. End with a ten-question self-check and a "where next" list.

### 14. Cross-level links are thin or point at the index
- Owner: writer
- Files and fixes (each one sentence plus a link; all slugs exist):
  - `advanced/27-project-async-plugin-tool.mdx` "Where next" links to `../../` (the curriculum index). Point it at `../../expert/measuring-performance/` for E1, and give `expert/01-measuring-performance` a "Before you start" line that names `advanced/27`.
  - `02-profiling` to `advanced/asyncio-basics` (for `--async-aware`) and `advanced/threading` (for `--mode gil`).
  - `03-memory-profiling` to `advanced/class-customisation` (`__slots__` and `weakref` in registries) and `advanced/copying-references`.
  - `08-memory-model` to `advanced/class-customisation` (the `__init_subclass__` registry leak noted in `gaps-advanced.md` item 16) and `advanced/copying-references`.
  - `09-gil-internals` to `advanced/threading` (15) and `advanced/concurrency-models` (14); it links only to 19 and 20.
  - `10-import-system` to `advanced/introspection-ast` and `advanced/metaclasses` (module creation).
  - `11-monitoring-debugging` to `intermediate/debugging-pdb` (pdb basics before `pdb -p`), `advanced/introspection-ast` (`settrace`/`inspect`) and `advanced/contextlib-advanced` (the exercise "Debug the second run" is a `try/finally` or context-manager fix).
  - `14-cli-apps` to `intermediate/test-driven-workflow` for the in-process test exercise.
  - `15-security-python` to `advanced/regex` (ReDoS) and `intermediate/pathlib` for path handling.
  - `16-config-observability` to `advanced/asyncio-basics` and `advanced/threading`.
  - `17-large-codebases` to `advanced/typing-fundamentals` and `intermediate/abc-protocols`.
  - `18-migrating-to-315` to `advanced/modern-typing-315`, `advanced/immutability` and `advanced/template-strings`, since an upgrade also adopts new features, not only removals.
  - Intermediate to expert: no intermediate lesson links forward to the expert level (`41-profiling` should link to `expert/profiling`, `39-logging` to `expert/config-observability`, `12-pyproject-uv` to `expert/packaging-publishing`, `40-debugging-pdb` to `expert/monitoring-debugging`).
- Why: the in-module links are good ("Next" lines throughout), but cross-level links connect only a few lessons, and the module hand-offs are where learners stall.
- Fix: add the links, fill `fundamentals:` where it is empty (item 2), and add a build check that every expert lesson links to a lesson in a different level.

### 15. Seven exercises assert timing ratios that depend on the machine
- Owner: writer
- Files and exercises: `01-measuring-performance` "The impossibly fast generator" (within 3x) and "A verdict, not a number" (margin 1.25 on `data[:]` against a comprehension), `02-profiling` "Speed up the report" (at least 5x faster), `04-optimising-python` "Optimise an n-body step" (`faster: True`) and "Remove duplicates, keep order" (at least 20x), `05-native-extensions` "Price the boundary" (`len()` at least 3x faster), `06-jit-and-interpreter` "Try the JIT on a benchmark" (no expected speed-up).
- Why: all give an exact expected line, so they pass the stated-result rule, but a ratio test fails on a noisy laptop, a container with CPU limits, or a different build (the `len()`-against-`strlen` ratio in particular varies by libc and by interpreter). A learner who sees `False` cannot tell a bug from noise.
- Fix: state the expected ratio range and the machine it was measured on, tell the learner to run the check three times and keep the best, and have each script print the measured ratio as well as the boolean. For the JIT exercise, say that on a build without the JIT both runs measure the same interpreter and the expected result is two similar times.

## P2: nice to have

### 16. `minVersion` differs from the outline in six lessons
- Owner: writer
- Files: `03-memory-profiling` (lesson 3.11, outline 3.15), `05-native-extensions` (3.11, 3.15), `06-jit-and-interpreter` (3.11, 3.15), `08-memory-model` (3.12, 3.14), `10-import-system` (3.11, 3.15), `17-large-codebases` (3.11, 3.15)
- Why: the pages are correct, because the main path of each runs on the declared version and the 3.15 parts carry `<Since>` labels; the outline column is the part that drifts. The same drift is open in `gaps-intermediate.md` item 4 and `gaps-advanced.md` item 20.
- Fix: apply the rule once (`minVersion` is the lowest version on which the unlabelled main path runs), and update the outline column.

### 17. The JIT lesson uses `dis` before it is taught, and its tier terminology differs from CPython's
- Owner: writer
- File: `06-jit-and-interpreter.mdx` (lines 29-57 and the pipeline list at line 24-27)
- Why: `dis.get_instructions(func, adaptive=True)` is used in the first code block, with the bytecode lesson (07) only mentioned as "the next module". The pipeline list calls the interpreter loop (switch, computed gotos, tail calls) a "tier", while CPython's own "tier 2" means the micro-op trace executor, which also exists as an interpreter when the JIT is built in `interpreter` mode (`--enable-experimental-jit=interpreter`, which the lesson does not list next to `yes` and `yes-off`). It omits three items from the 3.15 JIT upgrade list: partial support for generators and overloaded operations in the new tracing front end, GDB and `backtrace()` unwinding support (relevant to lesson 11's native profiler section), and the basic register allocator being a separate step.
- Fix: add one sentence at the first `dis` call ("`dis` is covered in the next module; here you only need to read the opcode names"), split the list into "tiers" (1, 2) and "how the loop is compiled" (switch, tail calls), add the `interpreter` configure value, and add the unwinding support to the status bullet. Re-verify the benchmark numbers at each review; they are quoted from What's New.

### 18. PEP-schedule statements are stated as fact where the PEP says "expected"
- Owner: writer
- File: `10-import-system.mdx` (line 243, the PEP 829 timeline)
- Why: the PEP says import lines are processed "for the first three years (expected to be Python 3.15, 3.16, and 3.17)", silently ignored in "expected 3.18 and 3.19", and warned about from "expected 3.20". The lesson states the dates without the hedge. The PEP is Final, but the schedule is a plan.
- Fix: add "planned" and link the PEP section. The same hedge belongs on removal dates in lesson 18's tables (`profile` in 3.17, asyncio policies in 3.16), which are "scheduled" in What's New.

### 19. Profiling and monitoring options that learners will meet next
- Owner: writer
- Files: `02-profiling.mdx` (Tachyon section, lines 114-141), `11-monitoring-debugging.mdx` (line 65)
- Why: Tachyon's `--live` terminal view, `--opcodes` (instruction-level samples that show the specialisations from lesson 06), `--jsonl`, and the `replay` subcommand are in the reference page but not the lesson. Third-party tools that the learner will see in job postings and blog posts (py-spy, Scalene, memray, line_profiler) are not named, which leaves the "memory" lesson without a tool for native allocations. 3.15 also lets `PY_THROW`, `PY_UNWIND`, `RAISE`, `EXCEPTION_HANDLED` and `RERAISE` be turned on per code object and `DISABLE` returned from them without a `ValueError`; lesson 11 lists the events but not that change.
- Fix: one line each in lessons 02, 03 and 11, with links. Mark third-party tools with "no version claims" as `facts.md` requires.

### 20. The configuration lesson prints a secret-bearing field
- Owner: writer
- File: `16-config-observability.mdx` (Settings dataclass, lines 21-60)
- Why: `api_key` is `field(repr=False)`, which the lesson praises, but `database_url` is not, and real database URLs carry a password (`postgresql://user:pw@host/db`). The sentence "logging the settings at start-up ... cannot leak it" is then false for the most common secret in a service. The example value `sqlite:///shop.db` hides the problem.
- Fix: give `database_url` a redacting `__repr__` or `repr=False`, use a URL with a placeholder password in the example, and add one sentence about secrets in URLs.

### 21. Third-party support statements in 05 are undated and unchecked
- Owner: researcher
- File: `05-native-extensions.mdx` (line 153: "meson-python, scikit-build-core and maturin support it", about `abi3t`; lines 95-146 on cffi, Cython and PyO3)
- Why: `facts.md` says third-party tools are named without version claims. Saying that three named build tools support `abi3t` is a support claim on the lesson's newest feature, with no source or date in the repo, and it was released five days before this audit. The Cython and PyO3 snippets were not run in this audit.
- Fix: add a source and a check date for the three tools, or reword to "check each tool's release notes". Run the two snippets (`cythonize -i dot.py`, `maturin develop`) once and record the versions used in the source extract.

### 22. A leak-hunting workflow is not assembled
- Owner: writer
- Files: `03-memory-profiling.mdx`, `08-memory-model.mdx`
- Why: the pieces are there (`tracemalloc` snapshots, `gc.collect`, `weakref`, the leaking tree exercise) but the order of use is not. `gc.get_objects()`, `gc.get_referrers()`, `gc.garbage`, `gc.callbacks`, object-graph tools and `tracemalloc.take_snapshot().compare_to(...)` for a growing process are not put together, and `__del__` is only used in the finaliser exercise.
- Fix: add a "Hunting a leak in a running service" box in 08 with a six-step order and a short expected output, linking to 03.

### 23. Catalog check (`.orchestration/languages.json`)
- Owner: catalog owner
- The catalog still holds 644 entries (tier 1: 14, tier 2: 29, tier 3: 601), with Python correct at tier 1. Re-checked by slug, name and alias against the list in `gaps-advanced.md`. Still absent: Odin, Hare, Jai, MoonBit, Unison, Koka, Move, Cairo, Verilog, VHDL, CUDA, WGSL, zsh, Elvish, Typst, LaTeX, Dhall, CUE, Jsonnet, Starlark, Pkl, BQN, Uiua, Wren, Janet, Fennel. GLSL, HLSL and VBA from the earlier list now match, so they can be dropped from it. New in this check: Roc, Bend, and Coq (check whether it is listed as Rocq, its new name). Nothing was changed in this audit.

## Not repeated from `gaps-advanced.md`

Items 1 (sqlite3), 10 (serialisation, `pickle` warning), 11 (cross-module links) and 16 (`contextvars`, `weakref`, `sys.monitoring` at the advanced level) are still open. Expert lessons 09, 15, 16 and 17 depend on them; see items 4 and 14 above. The advanced-level capstone from item 14 of that file now exists (`27-project-async-plugin-tool`), and the expert level has no counterpart (item 13 here).
