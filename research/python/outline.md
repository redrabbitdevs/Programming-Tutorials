# Python curriculum outline

- Target version: **Python 3.15** (stable since 2026-10-09). See `research/python/facts.md`.
- **minVersion** is the oldest Python that can run the lesson's code as written. Lessons that need
  anything newer than 3.10 must say so on the page. 3.10 is end of life, so 3.11 is the oldest
  supported baseline. Where code is marked 3.11, 3.11 through 3.15 all run it.
- `[F]` marks a concept taught in the shared fundamentals track (`research/fundamentals/outline.md`).
  The Python lesson links to that fundamentals lesson and covers only Python syntax, idioms and pitfalls.
- 118 lessons in 19 modules: Beginner 31, Intermediate 42, Advanced 26, Expert 19. Intermediate
  is rewritten from the built lessons (5 modules plus the Project module). The Beginner section
  below is still the original plan: 37 beginner lessons are built, so it needs the same sync.
- Do not teach the items in facts.md "Deprecated or removed" as current practice.

Columns: slug | title | objectives | key concepts | minVersion | exercise idea

---

## Beginner (31 lessons)

### Module B1 - Getting started (6)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `install-python` | Installing Python | Install 3.15 and check the version; know python.org installers vs uv | `python --version`, `py` launcher (Windows), PATH, `uv python install`, the free-threaded build exists (`t` suffix) | 3.11 | Install 3.15 and print `sys.version_info` |
| `repl-and-scripts` | The REPL and running scripts | Use the REPL and run a `.py` file | colour REPL (3.13+), `help()`, `exit`, `python file.py`, `-m`, what a program is [F] | 3.13 | Use the REPL as a calculator, then save the session as a script |
| `hello-print-input` | print, input and your first program | Read input and print output | `print(sep, end)`, `input()` returns str, `int()` conversion, tools of the trade [F] | 3.8 | Greeting program that asks for a name and a birth year |
| `comments-and-style` | Comments, indentation and style | Write readable, correctly indented code | significant indentation, `#` comments, PEP 8, naming, ruff format | 3.8 | Fix the indentation and style of a messy script |
| `values-and-types-py` | Python values and types | Inspect and convert built-in types | `int`, `float`, `str`, `bool`, `None`, `type()`, `isinstance()`, dynamic and strong typing [F] | 3.8 | Type-detective quiz: predict `type()` results |
| `variables-py` | Variables and names | Explain names bound to objects | assignment, multiple assignment, swap with tuples, `id()`, constants by convention, variables [F] | 3.8 | Trace name bindings after 8 assignments |

### Module B2 - Numbers and text (6)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `numbers` | Working with numbers | Use int, float and arbitrary precision | unbounded `int`, float imprecision [F], `round`, `//`, `%`, `**`, `math`, `decimal`, `fractions`, `_` in literals | 3.8 | Compound-interest calculator using `Decimal` |
| `operators-py` | Operators and precedence | Predict evaluation order | precedence [F], chained comparisons `a < b < c`, `and`/`or` return operands, walrus `:=` (3.8) | 3.8 | Evaluate 10 expressions, then check them in the REPL |
| `strings-basics` | Strings | Create, index and slice strings | quotes, escapes, raw strings, immutability, indexing/slicing, `in`, `len`, text and strings [F] | 3.8 | Palindrome checker |
| `f-strings` | f-strings and formatting | Format output precisely | format spec, `{x=}` (3.8), quote reuse, nesting and multi-line expressions (3.12+), `!r` | 3.12 | Print an aligned receipt table |
| `string-methods` | String methods | Clean and transform text | `split`/`join`, `strip`, `removeprefix`/`removesuffix` (3.9), `replace`, `find`, `casefold` | 3.9 | Normalise a list of messy usernames |
| `unicode-bytes` | Unicode, bytes and encodings | Convert between str and bytes safely | code points, `encode`/`decode`, UTF-8 default for `open()` (3.15+, PEP 686), still pass `encoding=` explicitly, encodings [F] | 3.11 | Count characters vs bytes; fix a mojibake example |

### Module B3 - Control flow (6)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `booleans-truthiness` | Booleans and truthiness | Predict the truth value of any object | `bool()`, falsy values, `is` vs `==`, `is None`, `not` (never `~` on bools, removal in 3.16) | 3.8 | Truthiness table for 12 values |
| `if-elif-else` | if, elif, else | Write branching logic in Python | conditionals [F], conditional expression `a if c else b`, guard clauses | 3.8 | Leap-year checker and grade calculator |
| `while-loops` | while loops | Loop on a condition | loops [F], sentinel input loops, `break`, avoiding infinite loops | 3.8 | Number-guessing game |
| `for-loops-range` | for loops and range | Iterate over sequences | `for x in iterable`, `range`, `enumerate`, `zip(strict=True)` (3.10) | 3.10 | Multiplication table; pair two lists safely |
| `loop-control` | Loop control and loop else | Use `break`/`continue`/`else` on loops | `for ... else`, nested loops, flags vs `else` | 3.8 | Find the first prime in a list, or report none |
| `match-intro` | match statements (intro) | Replace if-chains with `match` | literal, capture and wildcard patterns, `\|` alternatives, guards (3.10+) | 3.10 | Text-adventure command parser |

### Module B4 - Collections (7)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `lists` | Lists | Create and mutate lists | arrays and lists [F], `append`/`extend`/`insert`/`pop`, `sort` vs `sorted`, aliasing | 3.8 | Todo list manager |
| `tuples-unpacking` | Tuples and unpacking | Use tuples and unpacking idioms | immutability, star unpacking `a, *rest = ...`, returning multiple values | 3.8 | Parse "x,y" coordinate strings into tuples |
| `dicts` | Dictionaries | Map keys to values | maps [F], `get`, `setdefault`, iteration order, `\|` and `\|=` merge (3.9), `frozendict` preview (3.15) | 3.9 | Word-frequency counter |
| `sets` | Sets | Use sets for membership and set algebra | hashing [F], `\|`, `&`, `-`, `^`, `frozenset` | 3.8 | Common friends between two people |
| `slicing` | Slicing in depth | Slice any sequence | `[start:stop:step]`, negative indices, slice assignment, copies | 3.8 | Rotate and reverse lists with slices |
| `comprehensions` | Comprehensions | Write list, dict and set comprehensions | filters, nested comprehensions, unpacking `[*xs for xs in lists]` (3.15+), generator expressions | 3.15 | Flatten and filter nested data in two styles (3.15 unpacking vs nested) |
| `choosing-collections` | Choosing the right collection | Pick a collection by its operations and costs | Big-O of list/dict/set operations [F], `collections.deque` preview | 3.8 | Benchmark `in` on a list vs a set |

### Module B5 - Functions (6)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `defining-functions` | Defining functions | Write functions with return values | functions [F], `def`, `return`, `None` by default, docstrings | 3.8 | Temperature-conversion functions |
| `parameters` | Parameters in depth | Use every parameter kind | defaults (mutable-default pitfall), `*args`, `**kwargs`, keyword-only `*`, positional-only `/` (3.8) | 3.8 | Flexible `format_name()` |
| `scope-legb` | Scope and the LEGB rule | Resolve names correctly | scope [F], `global`, `nonlocal`, shadowing built-ins | 3.8 | Debug 5 UnboundLocalError puzzles |
| `lambdas-higher-order` | Lambdas and higher-order functions | Pass functions as values | first-class functions, `lambda`, `map`/`filter` vs comprehensions, `key=` | 3.8 | Sort records by several keys |
| `recursion-py` | Recursion in Python | Write recursive functions and know Python's limits | recursion [F], recursion limit, `RecursionError`, no tail-call optimisation | 3.8 | Recursive nested-list sum and directory walker |
| `type-hints-intro` | Type hints (intro) | Annotate simple functions | `int`, `str`, `list[int]` (3.9), `X \| None` (3.10), hints not enforced at runtime | 3.10 | Annotate 5 functions and run a type checker |

---

## Intermediate (42 lessons)

Status: **built.** This section was rewritten from the 42 lesson files on 2026-10-12, so slugs, order, titles and `minVersion` are the real ones. The file name is `NN-slug.mdx` in `site/src/content/lessons/python/intermediate/`. Lessons cross-link with `../slug/`. Rows that were planned but not built are in "Deferred" at the end of this section.

`minVersion` is the lowest Python on which the lesson's unlabelled main path runs; a newer feature has an inline `<Since>` label. Lesson 42 is the end-of-level project and has its own module.

### Module I1 - Errors and files (8)

| # | slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|---|
| 01 | `exception-hierarchy` | The exception family tree | Catch whole families of errors and order handlers correctly | errors and exceptions [F], `try`/`except`/`else`/`finally`, hierarchy, EAFP vs LBYL, `except A, B:` without parentheses (3.14) | 3.8 | Rewrite a check as EAFP; forgiving number parser |
| 02 | `raise-and-chain` | Raising and chaining exceptions | Raise clear errors and keep the cause | `raise`, re-raise, `raise ... from`, `finally` with `return` (3.14 `SyntaxWarning`) | 3.8 | Refuse bad withdrawals |
| 03 | `notes-and-groups` | Notes and exception groups | Add context to errors and handle several at once | `add_note()`, `ExceptionGroup`, `except*` | 3.11 | Check every value, report every problem |
| 04 | `pathlib` | Paths and folders with pathlib | Build portable paths and search folders | `Path`, `/`, `read_text`/`write_text`, `glob`, `iterdir` | 3.8 | Count lines in every log file |
| 05 | `text-and-binary` | Text, bytes and newlines | Read and write bytes and recover from decoding errors | `rb`/`wb`, chunked reads, `errors=`, `newline=` | 3.8 | Copy in chunks and count them |
| 06 | `context-managers` | The with statement in depth | Guarantee clean-up and combine managers | `with`, parenthesised multi-item `with` (3.10), `contextlib.suppress`, `tempfile` | 3.10 | Copy a file in capitals |
| 07 | `csv-json-toml` | CSV, JSON and TOML | Parse and write common formats | `csv.DictReader`, `json`, `tomllib` (3.11, read-only) | 3.11 | Convert a CSV of books to JSON |
| 08 | `dates-times` | Dates and times | Work with aware datetimes | `date`, `datetime`, `timedelta`, ISO 8601, `zoneinfo`, `datetime.now(tz=UTC)` | 3.11 | Meeting planner across 3 time zones |

### Module I2 - Modules, packages and tooling (8)

| # | slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|---|
| 09 | `modules-imports` | Writing your own modules | Split code across files | `import`, `from ... import`, `__name__ == "__main__"`, `sys.path`, `-P` (3.11) | 3.8 | Split a script into three modules |
| 10 | `packages` | Packages | Build a package layout | `__init__.py`, relative imports, src layout, namespace packages | 3.8 | Package a small utility library |
| 11 | `venv-pip` | Virtual environments and pip | Isolate dependencies | `python -m venv`, activation, `pip install`/`freeze`, PEP 668 | 3.8 | Create, install, freeze, rebuild |
| 12 | `pyproject-uv` | pyproject.toml and uv | Define a modern project | PEP 621 `[project]`, `[project.scripts]`, build backends, PEP 735 groups, editable install, `uv init/add/run/lock` | 3.11 | Turn the package into a uv project |
| 13 | `single-file-scripts` | Single-file scripts with dependencies | Ship self-contained scripts | PEP 723 `# /// script`, `uv run script.py` | 3.11 | Add a metadata block to a script |
| 14 | `ruff-and-type-checking` | Linting, formatting and type checking | Automate code quality | ruff lint and format, `[tool.ruff]`, mypy/pyright, version control [F] | 3.10 | Fix what mypy reports |
| 15 | `lazy-imports` | Lazy imports | Speed up startup | `lazy import` (3.15, PEP 810), `__lazy_modules__`, `-X importtime` | 3.15 | Measure a CLI before and after |
| 16 | `stdlib-tour` | A tour of the standard library | Know where to look before installing | `os`, `sys`, `shutil`, `subprocess`, `statistics`, `Counter`, `re`, `math.integer` (3.15), `argparse` preview | 3.9 | Scavenger hunt with the stdlib only |

### Module I3 - Object-oriented Python (9)

| # | slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|---|
| 17 | `classes-objects` | Classes and objects | Define classes with state and behaviour | records and objects [F], `class`, `__init__`, `self`, instance vs class attributes | 3.8 | Rectangle; a bank account |
| 18 | `methods-properties` | Properties, class methods and static methods | Choose the right kind of method | `@property`, `@classmethod`, `@staticmethod`, `_x` convention | 3.8 | `Temperature` with two views |
| 19 | `inheritance` | Inheritance and composition | Reuse code appropriately | paradigms [F], `super()`, MRO, `@override` (3.12), composition | 3.8 | Shapes hierarchy, then composition |
| 20 | `custom-exceptions` | Defining your own exceptions | Write exception families that carry data | subclassing `Exception`, attributes, chaining | 3.8 | Bank withdrawal errors |
| 21 | `data-model` | The Python data model | Implement dunder methods | `__repr__`, `__eq__`, `__hash__`, `__lt__`, `__len__`, `__iter__`, `__getitem__`, `__contains__`, `__bool__`, `__call__`, operators | 3.8 | `Vector` with `+`, `==`, `abs()` |
| 22 | `context-manager-classes` | Writing a context manager class | Support `with` in your own classes | `__enter__`, `__exit__`, swallowing errors | 3.8 | A timer |
| 23 | `dataclasses` | Dataclasses | Write data classes with less boilerplate | `@dataclass`, `field`, `__post_init__`, `frozen`, `slots=True`, `kw_only` (3.10), `copy.replace()` (3.13) | 3.10 | Inventory with immutable updates |
| 24 | `enums` | Enums | Model fixed sets of values | `Enum`, `IntEnum`, `StrEnum` (3.11), `auto()`, `match` on members (3.10) | 3.8 | Traffic-light state machine |
| 25 | `abc-protocols` | Abstract base classes and protocols | Define interfaces | duck typing, `abc.ABC`, `typing.Protocol`, `@runtime_checkable` | 3.9 | Plugin interface, then a Protocol |

### Module I4 - Iteration and functional tools (7)

| # | slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|---|
| 26 | `iterators` | The iterator protocol | Explain how `for` works | loops [F], `iter`, `next`, `StopIteration`, iterator classes | 3.8 | Countdown iterator |
| 27 | `generators` | Generators | Produce values lazily | `yield`, generator expressions, `yield from`, pipelines | 3.8 | Count error messages lazily |
| 28 | `contextmanager` | Writing context managers with generators | Build managers from generators | `contextlib.contextmanager`, `try`/`finally` around `yield` | 3.8 | Temporary environment variable |
| 29 | `itertools-functools` | itertools and functools | Use the standard functional toolkits | `chain`, `groupby`, `islice`, `pairwise` (3.10), `batched` (3.12), `partial`, `cache`, `singledispatch` | 3.8 | Batch the API calls; memoise Fibonacci |
| 30 | `closures` | Closures and higher-order functions | Capture state in functions | scope and lifetime [F], free variables, `nonlocal`, late binding | 3.8 | Counter factory with reset |
| 31 | `decorators` | Decorators | Write and apply decorators | wrappers, `functools.wraps`, decorators with arguments, stacking | 3.8 | A retry decorator |
| 32 | `sorting-key-functions` | Sorting and key functions | Sort complex data correctly | searching and sorting [F], `sorted(key=)`, stability, `reverse`, tuple keys | 3.8 | Leaderboard with tie-breakers |

### Module I5 - Testing, debugging and quality (9)

| # | slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|---|
| 33 | `unittest-basics` | Automated tests with unittest | Write and run standard-library tests | testing mindset [F], `TestCase`, assertions, `setUp`, `subTest`, `python -m unittest` | 3.8 | Catch a leap-year bug |
| 34 | `pytest-basics` | Testing with pytest | Write tests as plain functions | `assert` rewriting, discovery, `pytest.raises`, failure reports | 3.8 | Test the bank account's input checks |
| 35 | `fixtures-and-parametrize` | Fixtures, parametrization and temporary files | Structure larger suites | `@pytest.fixture`, `conftest.py`, `yield` fixtures, `parametrize`, `tmp_path`, `monkeypatch` | 3.8 | Turn a loop into a parametrized test |
| 36 | `test-driven-workflow` | A test-driven workflow and a quality gate | Grow code one failing test at a time | red-green-refactor, coverage, one check command, CI, version control [F] | 3.8 | A test that was never red |
| 37 | `mocking` | Mocking with unittest.mock | Replace slow or external parts | `Mock`, `patch`, `autospec`, call assertions | 3.8 | Test a retry loop without waiting |
| 38 | `doctest-and-docstrings` | Docstrings and doctest | Document code that is tested | docstring conventions, `help()`, `doctest`, reading docs [F] | 3.8 | Document and test a text-wrapping function |
| 39 | `logging` | Logging instead of print | Replace prints with logging | debugging [F], levels, handlers, formatters, `basicConfig` (`formatter=` 3.15), secrets | 3.8 | Add logging with a verbosity switch |
| 40 | `debugging-pdb` | Debugging with pdb | Debug beyond `breakpoint()` | conditional breakpoints, post-mortem, scripted sessions, `pdb -p` (3.14) | 3.8 | Find four bugs with pdb |
| 41 | `profiling` | Measuring speed with timeit and cProfile | Find the slow part | big-O [F], `timeit`, `cProfile`, `profiling.tracing`/sampling (3.15) | 3.8 | Profile, fix and confirm |

### Module Project - End-of-level project (1)

| # | slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|---|
| 42 | `project-tested-cli` | Project: a tested command-line tool | Combine packaging, files, dates, classes, generators, logging and tests in one installable tool | `spend` console script (src layout, `[project.scripts]`), `pathlib` + `csv`, `datetime`, frozen dataclass, `StrEnum`, generator pipeline, `logging`, pytest fixture, `parametrize`, `tmp_path`, `caplog`, `capsys` | 3.11 | Filter by category; biggest purchases; friendlier month error |

Verified code for lesson 42 is in `examples/python/i6/spendlog/` (21 tests, run by `run_pytest.py`).

### Deferred

These were planned in the earlier outline or in `gaps-intermediate.md` but are **not built**. None blocks the level.

| planned item | source | status and reason |
|---|---|---|
| Project A, an inventory project after I3 | gaps item 6 | Deferred. Lesson 42 already joins I1 to I5. A second project would repeat the dataclass and enum steps. Revisit if learners need a smaller bridge project before I4. |
| `sqlite3-basics` | gaps item 8 | Deferred. It is in no outline and has no slot yet. Needs a placement decision (I1 or I2) before it is written. |
| `collections-and-copying` moved into I4 | gaps item 8 | Deferred. `collections-module` and `copying-references` stay in Advanced module A2. |
| `namedtuple` / `typing.NamedTuple` comparison in `dataclasses` | gaps item 8 | Deferred. Not added to lesson 23. Note that the keyword form `NamedTuple("P", x=int)` was removed in 3.15. |
| Building and publishing (`uv build`, TestPyPI) | gaps item 14 | Deferred. Lesson 12 stops at the editable install. Add as a section when lesson 12 is next revised. |
| Property-based testing and memory profiling (`hypothesis`, `tracemalloc`) | gaps item 12 | Deferred. P2, and `hypothesis` is a third-party package beyond the level's pytest-only toolchain. |
| `enum.Flag`, `itertools.batched(strict=True)`, `zip(strict=True)` | gaps item 16 | Deferred. P2 extras. |
| README checklist, `pydoc` and doc generators | gaps item 17 | Deferred. P2. Lesson 38 covers docstrings and doctest only. |
| Full `argparse` lesson | earlier note | Not an intermediate topic. Lesson 16 previews flat options and lesson 42 uses them. Subcommands stay in Expert `cli-apps`. |

---

## Advanced (26 lessons)

### Module A1 - Typing in depth (7)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `typing-fundamentals` | Static typing fundamentals | Type real code precisely | `Callable`, `Literal`, `Final`, `TypedDict`, `Any` vs `object`, `cast` | 3.11 | Type a small inventory module with no `Any` |
| `generics-pep695` | Generics with type parameter syntax | Write generic functions and classes | `def f[T](x: T)`, `class Box[T]`, bounds and constraints, `type Alias = ...` (3.12), defaults `[T = int]` (3.13) | 3.13 | Generic `Stack[T]` and `Result[T, E]` |
| `protocols-structural` | Protocols and structural typing | Type duck-typed code | `Protocol`, callable protocols, `ParamSpec`, `Concatenate` | 3.12 | Typed decorator that keeps the signature |
| `narrowing` | Type narrowing | Help checkers narrow unions | `isinstance`, `TypeIs` (3.13) vs `TypeGuard`, `assert_never`, exhaustive `match` | 3.13 | Exhaustive event handler checked with `assert_never` |
| `annotations-runtime` | Annotations at runtime | Understand deferred annotations | lazy evaluation of annotations (3.14+), `annotationlib.get_annotations(format=...)`, `from __future__ import annotations` now unnecessary | 3.14 | Read annotations in 3 formats; write a mini validator |
| `typeddict-advanced` | TypedDict in depth | Model JSON-like data | `Required`/`NotRequired` (3.11), `ReadOnly` (3.13), typed extra items (3.15, PEP 728), `Unpack` for `**kwargs` (3.12) | 3.15 | Type a JSON API payload |
| `modern-typing-315` | New in typing (3.15) | Use the newest typing features | `TypeForm` (PEP 747), disjoint bases (PEP 800), `sentinel` in unions (PEP 661), `Self`, `@override` | 3.15 | Refactor `MISSING = object()` to `sentinel` |

### Module A2 - Advanced data handling (6)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `match-advanced` | Structural pattern matching in depth | Destructure complex data | class patterns, `__match_args__`, mapping and sequence patterns, guards, `as` | 3.10 | JSON event router |
| `collections-module` | The collections module | Use specialised containers | `Counter`, `defaultdict`, `deque`, `namedtuple`, `ChainMap`, stacks and queues [F] | 3.8 | LRU-style recent-items tracker with `deque` |
| `immutability` | Immutability and frozendict | Design with immutable data | `frozendict` (3.15, PEP 814), `frozenset`, tuples, frozen dataclasses, `MappingProxyType`, hashability | 3.15 | Hashable config objects used as cache keys |
| `copying-references` | Copying and references | Avoid aliasing bugs | memory and references [F], shallow vs deep copy, `copy.replace()` (3.13), `__copy__`/`__deepcopy__` | 3.13 | Fix 5 aliasing bugs |
| `regex` | Regular expressions | Match and extract text patterns | `re` syntax, groups, named groups, `fullmatch`/`search`, `prefixmatch` (3.15; `match` soft-deprecated), compile flags | 3.15 | Log-line parser with named groups |
| `algorithms-py` | Algorithms the Pythonic way | Implement classic algorithms idiomatically | searching and sorting [F], `bisect`, `heapq`, graphs with dicts, BFS/DFS, trees and graphs [F] | 3.8 | Dijkstra with `heapq` |

### Module A3 - Concurrency and parallelism (7)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `concurrency-models` | Concurrency models in Python | Choose between threads, processes and async | I/O-bound vs CPU-bound, the GIL, free-threaded build (supported in 3.14, optional), interpreters | 3.14 | Classify 8 workloads and justify each choice |
| `threading` | Threads | Use threads safely | `threading`, `Lock`, `Queue`, race conditions, `concurrent.futures.ThreadPoolExecutor` | 3.8 | Parallel URL downloader |
| `multiprocessing` | Processes | Parallelise CPU-bound work | `ProcessPoolExecutor`, pickling limits, start methods | 3.8 | Parallel prime sieve over ranges |
| `asyncio-basics` | asyncio fundamentals | Write async code | `async def`, `await`, `asyncio.run`, event loop, `asyncio.Runner` (3.11), never the policy API (removal in 3.16) | 3.11 | Async countdown timers |
| `asyncio-structured` | Structured concurrency | Run many tasks safely | `TaskGroup` (3.11), `asyncio.timeout()` (3.11), cancellation, `ExceptionGroup`/`except*` (3.11), `python -m asyncio ps` (3.14) | 3.14 | Concurrent fetch with a timeout and error aggregation |
| `free-threading` | Free-threaded Python | Run and test code without the GIL | `python3.Xt` builds, `sys._is_gil_enabled()`, thread safety of built-ins, extension compatibility, `abi3t` (3.15) | 3.14 | Benchmark a CPU-bound thread pool on the default and free-threaded builds |
| `subinterpreters` | Multiple interpreters | Isolate work in subinterpreters | `concurrent.interpreters`, `InterpreterPoolExecutor` (3.14, PEP 734), sharing data | 3.14 | Run isolated workers with `InterpreterPoolExecutor` |

### Module A4 - Metaprogramming (6)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `descriptors` | Descriptors | Explain how attribute access works | `__get__`/`__set__`/`__set_name__`, properties as descriptors, lookup order | 3.8 | Validated field descriptor |
| `class-customisation` | Customising classes | Hook into class creation | `__init_subclass__`, class decorators, `__class_getitem__`, `__slots__` | 3.8 | Plugin registry via `__init_subclass__` |
| `metaclasses` | Metaclasses | Know when (rarely) to use metaclasses | `type()`, `__new__` vs `__init__`, `__prepare__`, alternatives | 3.8 | Metaclass that enforces method names, then rewrite it without one |
| `contextlib-advanced` | Advanced context managers | Write reusable context managers | `ExitStack` (`@contextmanager` is taught in intermediate lesson 28), async context managers, `chdir` (3.11) | 3.11 | Temporary-environment manager |
| `template-strings` | Template strings | Process interpolations safely | `t"..."` literals (3.14, PEP 750), `string.templatelib.Template`, safe HTML/SQL rendering | 3.14 | HTML escaper built on t-strings |
| `introspection-ast` | Introspection and the AST | Inspect and transform code | `inspect`, `ast.parse`, `NodeVisitor`, `dis` preview, `eval`/`exec` dangers | 3.11 | Linter rule that flags `print` calls |

---

## Expert (19 lessons)

### Module E1 - Performance (6)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `measuring-performance` | Measuring performance | Benchmark correctly | `timeit` (CLI colour 3.15), `perf_counter`, pyperf, Big-O vs constants [F] | 3.11 | Compare 4 string-building approaches |
| `profiling` | Profiling | Find hot spots | `profiling.sampling` (Tachyon) and `profiling.tracing` (3.15, PEP 799), `cProfile` alias, flame graphs | 3.15 | Profile and speed up a slow report generator |
| `memory-profiling` | Memory | Measure and reduce memory | `tracemalloc`, `sys.getsizeof`, `__slots__`, generators, `bytearray.take_bytes()` (3.15) | 3.15 | Halve the memory use of a data loader |
| `optimising-python` | Optimising Python code | Apply proven optimisations | algorithmic wins first, built-ins, local-name lookups, `functools.cache`, vectorising with NumPy (overview) | 3.11 | Optimise a naive n-body step |
| `native-extensions` | Native extensions | Know the options for native speed | `ctypes`, cffi, Cython, Rust with PyO3/maturin, the stable ABI, `abi3t` (3.15) | 3.15 | Call a C function with `ctypes` |
| `jit-and-interpreter` | The JIT and the interpreter | Explain CPython's execution tiers | specialising adaptive interpreter (3.11), tail-calling interpreter (3.14), experimental JIT (still off by default in 3.15) | 3.15 | Build CPython with `--enable-experimental-jit` and compare a benchmark |

### Module E2 - CPython internals (6)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `bytecode-dis` | Bytecode and dis | Read CPython bytecode | `dis`, code objects, `co_lines()` (not `co_lnotab`, removed in 3.15), specialisation | 3.12 | Explain the bytecode of 3 loops |
| `memory-model` | Memory management | Explain reference counting and GC | refcounts, immortal objects (3.12), cyclic GC (generational; the 3.14 incremental GC was reverted in 3.14.5), `weakref` | 3.14 | Find and fix a reference cycle leak |
| `gil-internals` | The GIL and free-threading internals | Understand what PEP 703 changed | biased reference counting, per-object locks, `Py_mod_gil`, PEP 779 phases | 3.14 | Read a free-threading bug report and explain the race |
| `import-system` | The import system | Customise imports | finders, loaders, `exec_module` (not `load_module`, removed in 3.15), lazy import proxies (3.15), `.pth` startup files (PEP 829) | 3.15 | Write an import hook that logs imports |
| `monitoring-debugging` | Monitoring and remote debugging | Instrument running programs | `sys.monitoring` (3.12, PEP 669), remote attach `python -m pdb -p` (3.14, PEP 768), frame pointers (3.15) | 3.14 | Coverage tool built on `sys.monitoring` |
| `c-api-tour` | A tour of the C API | Read and write a small extension | `PyObject`, reference ownership, `PyModExport_*` (3.15), stable ABI, limited API | 3.15 | Minimal C extension module |

### Module E3 - Production Python (6)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `packaging-publishing` | Building and publishing packages | Ship a library to PyPI | wheels and sdists, build backends, versioning, trusted publishing, `pylock.toml` (PEP 751) | 3.11 | Publish a package to TestPyPI |
| `cli-apps` | Command-line applications | Build robust CLIs | `argparse` (colour help 3.14+), subcommands, exit codes, `python -m` entry points | 3.11 | A `todo` CLI with subcommands |
| `security-python` | Secure Python | Avoid common vulnerabilities | clean code and security basics [F], `secrets`, `subprocess` without `shell=True`, `pickle` risks, input validation, dependency auditing | 3.11 | Audit and fix an insecure script |
| `config-observability` | Configuration and observability | Run Python services in production | env-based config, `logging.config`, structured logs, `contextvars` (token, `reset`), `sqlite3` primer box, tracing sketch (W3C `traceparent`, OpenTelemetry named as third-party), SIGTERM with `loop.add_signal_handler`, `faulthandler` | 3.11 | Add structured logging and a health check to a service |
| `large-codebases` | Architecture for large codebases | Structure big Python projects | layering, dependency injection, typing as documentation, shared mutable state under threads and 3.15t, monorepos, `lazy` imports for startup | 3.15 | Refactor a tangled app into layers |
| `migrating-to-315` | Upgrading to Python 3.15 | Plan and execute a version upgrade | What's New/porting guides, UTF-8 default impact, removals in 3.15, "Porting to Python 3.15" behaviour changes, deprecations pending for 3.16/3.17, testing across versions with 3.15t as a real CI target, free-threading readiness checklist | 3.15 | Upgrade a 3.11 project to 3.15 and fix every warning |

### Module Project - End-of-level project (1)

| # | slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|---|
| 19 | `project-ship-a-fast-tool` | Project: ship a fast, observable tool | Take the advanced `jobrun` tool to a 0.2.0 release using the whole expert level | Tachyon line profile, sieve with a reference check, `ContextVar` job IDs in text/JSON logs, SIGTERM cancel with exit 143, `--version` from one source (hatch dynamic version), `uv build`, warnings as errors, 3.15t test run; ends with a ten-question self-check and "Where next" (other languages, devguide, PEPs, contributing) | 3.15 | Count regex calls with `profiling.tracing`; replace `asyncio.iscoroutinefunction`; GIL report on 3.15 and 3.15t |

Verified code for lesson 19 is in `examples/python/e4/jobrun/` (22 tests, run by `run_pytest.py`).
