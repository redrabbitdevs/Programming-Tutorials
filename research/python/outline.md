# Python curriculum outline

- Target version: **Python 3.15** (stable since 2026-10-09). See `research/python/facts.md`.
- **minVersion** is the oldest Python that can run the lesson's code as written. Lessons that need
  anything newer than 3.10 must say so on the page. 3.10 is end of life, so 3.11 is the oldest
  supported baseline. Where code is marked 3.11, 3.11 through 3.15 all run it.
- `[F]` marks a concept taught in the shared fundamentals track (`research/fundamentals/outline.md`).
  The Python lesson links to that fundamentals lesson and covers only Python syntax, idioms and pitfalls.
- 107 lessons in 17 modules: Beginner 31, Intermediate 32, Advanced 26, Expert 18.
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

## Intermediate (32 lessons)

### Module I1 - Errors and files (6)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `exceptions` | Exceptions | Handle errors with try/except | errors and exceptions [F], `try`/`except`/`else`/`finally`, exception hierarchy, EAFP vs LBYL, `except A, B:` without parentheses (3.14) | 3.11 | Robust number parser |
| `raising-custom-exceptions` | Raising and custom exceptions | Define and raise meaningful errors | `raise`, `raise ... from`, custom exception classes, `add_note()` (3.11) | 3.11 | Bank-account withdrawal errors |
| `files-pathlib` | Files and pathlib | Read and write files safely | `open` modes, `encoding="utf-8"`, `pathlib.Path`, `read_text`/`write_text`, glob | 3.8 | Log-file line counter across a folder |
| `context-managers` | The with statement | Manage resources with context managers | `with`, parenthesised multi-item `with` (3.10), `contextlib.suppress` | 3.10 | Copy one file to another with two managers |
| `data-formats` | CSV, JSON and TOML | Parse and write common formats | `csv.DictReader`, `json`, `tomllib` (3.11, read-only) | 3.11 | Convert a CSV of books to JSON; read settings from TOML |
| `dates-times` | Dates and times | Work with aware datetimes | `datetime.now(tz=UTC)` (not `utcnow()`), `zoneinfo` (3.9), `timedelta`, ISO 8601 | 3.11 | Meeting planner across 3 time zones |

### Module I2 - Modules, packages and tooling (7)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `modules-imports` | Modules and imports | Organise code into modules | `import`, `from ... import`, `__name__ == "__main__"`, module search path, `-P` (3.11) | 3.11 | Split a script into 3 modules |
| `packages` | Packages | Build a package layout | `__init__.py`, relative imports, the src layout, namespace packages | 3.8 | Package a small utility library |
| `venv-pip` | Virtual environments and pip | Isolate dependencies | `python -m venv`, activate, `pip install`, PEP 668 externally managed environments | 3.11 | Create a venv and install `requests` |
| `pyproject-uv` | pyproject.toml and uv | Define a modern project | PEP 621 `[project]`, build backends, dependency groups (PEP 735), `uv init/add/run/lock` | 3.11 | Turn the package into a pyproject project with uv |
| `single-file-scripts` | Single-file scripts with dependencies | Ship self-contained scripts | PEP 723 `# /// script` metadata, `uv run script.py` | 3.11 | A weather script with inline dependencies |
| `lazy-imports` | Lazy imports | Speed up startup with lazy imports | `lazy import` (3.15+, PEP 810), module scope only, `__lazy_modules__` for older versions, `-X importtime` | 3.15 | Measure CLI startup before and after lazy imports |
| `stdlib-tour` | A tour of the standard library | Know where to look before installing packages | `os`, `sys`, `shutil`, `subprocess`, `random`, `statistics`, `math.integer` (3.15), `argparse` preview, reading docs [F] | 3.8 | Scavenger hunt: solve 6 tasks with the stdlib only |

### Module I3 - Object-oriented Python (7)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `classes-objects` | Classes and objects | Define classes with state and behaviour | records and objects [F], `class`, `__init__`, `self`, instance vs class attributes | 3.8 | `BankAccount` class |
| `methods-properties` | Methods and properties | Use instance, class and static methods and properties | `@property`, `@classmethod`, `@staticmethod`, encapsulation by convention `_x` | 3.8 | `Temperature` with validated setters |
| `inheritance` | Inheritance and composition | Reuse code appropriately | `super()`, MRO, composition over inheritance, `@override` (3.12, typing) | 3.12 | Shapes hierarchy, then refactor to composition |
| `data-model` | The Python data model | Implement dunder methods | `__repr__`, `__eq__`, `__hash__`, `__len__`, `__iter__`, operator overloading | 3.8 | `Vector` class with `+`, `==` and `abs()` |
| `dataclasses` | Dataclasses | Write data classes with less boilerplate | `@dataclass`, `field`, `frozen`, `slots=True` and `kw_only` (3.10), `copy.replace()` (3.13) | 3.13 | Inventory items with immutable updates |
| `enums` | Enums | Model fixed sets of values | `Enum`, `IntEnum`, `StrEnum` (3.11), `auto()`, matching on enums | 3.11 | Traffic-light state machine |
| `abc-protocols` | Abstract base classes and protocols | Define interfaces | `abc.ABC`, `@abstractmethod`, duck typing, `typing.Protocol`, `@runtime_checkable` | 3.8 | Plugin interface with two implementations |

### Module I4 - Iteration and functional tools (6)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `iterators` | The iterator protocol | Explain how `for` works | `iter`, `next`, `StopIteration`, iterables vs iterators, writing an iterator class | 3.8 | Countdown iterator |
| `generators` | Generators | Produce values lazily | `yield`, generator expressions, `yield from`, pipelines, memory benefits | 3.8 | Lazy log-processing pipeline |
| `itertools-functools` | itertools and functools | Use the standard functional toolkits | `chain`, `groupby`, `islice`, `batched` (3.12), `pairwise` (3.10), `partial`, `reduce`, `cache` (3.9) | 3.12 | Batch API calls with `batched`; memoise Fibonacci |
| `closures` | Closures | Capture state in functions | free variables, `nonlocal`, late-binding pitfalls in loops | 3.8 | Counter factory; fix the lambda-in-loop bug |
| `decorators` | Decorators | Write and apply decorators | wrappers, `functools.wraps`, decorators with arguments, stacking | 3.8 | `@timer` and `@retry(n)` decorators |
| `sorting-key-functions` | Sorting and key functions | Sort complex data correctly | `sorted(key=)`, `operator.itemgetter`/`attrgetter`, stability, `reverse`, sorting [F] | 3.8 | Leaderboard with tie-breakers |

### Module I5 - Testing, debugging and quality (6)

| slug | title | objectives | key concepts | minVersion | exercise idea |
|---|---|---|---|---|---|
| `debugging-py` | Debugging Python | Use Python's debugging tools | debugging [F], reading tracebacks (3.11+ fine-grained locations), `breakpoint()`, `pdb` commands | 3.11 | Find 4 bugs with `pdb` |
| `logging` | Logging | Replace prints with logging | loggers, levels, handlers, formatters, `basicConfig`, never log secrets | 3.8 | Add logging to a script, with a level switch |
| `pytest-basics` | Testing with pytest | Write and run tests | testing mindset [F], `assert` rewriting, test discovery, `pytest.raises` | 3.11 | Test the bank-account class |
| `pytest-fixtures-param` | Fixtures and parametrisation | Structure larger test suites | fixtures, `tmp_path`, `@pytest.mark.parametrize`, `monkeypatch`, coverage | 3.11 | Parametrised tests for the number parser |
| `lint-format-typecheck` | Linting, formatting and type checking | Automate code quality | ruff (lint and format), mypy/pyright, pre-commit, CI basics, version control [F] | 3.11 | Fix all ruff findings in a sample repo |
| `docs-and-docstrings` | Documentation | Document code for users and maintainers | docstring conventions, `help()`, README, `doctest` | 3.8 | Add docstrings and doctests to a module |

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
| `contextlib-advanced` | Advanced context managers | Write reusable context managers | `@contextmanager`, `ExitStack`, async context managers, `chdir` (3.11) | 3.11 | Temporary-environment manager |
| `template-strings` | Template strings | Process interpolations safely | `t"..."` literals (3.14, PEP 750), `string.templatelib.Template`, safe HTML/SQL rendering | 3.14 | HTML escaper built on t-strings |
| `introspection-ast` | Introspection and the AST | Inspect and transform code | `inspect`, `ast.parse`, `NodeVisitor`, `dis` preview, `eval`/`exec` dangers | 3.11 | Linter rule that flags `print` calls |

---

## Expert (18 lessons)

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
| `memory-model` | Memory management | Explain reference counting and GC | refcounts, immortal objects (3.12), cyclic GC, incremental GC (3.14), `weakref` | 3.14 | Find and fix a reference cycle leak |
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
| `config-observability` | Configuration and observability | Run Python services in production | env-based config, `logging.config`, structured logs, tracing, `faulthandler` | 3.11 | Add structured logging and a health check to a service |
| `large-codebases` | Architecture for large codebases | Structure big Python projects | layering, dependency injection, typing as documentation, monorepos, `lazy` imports for startup | 3.15 | Refactor a tangled app into layers |
| `migrating-to-315` | Upgrading to Python 3.15 | Plan and execute a version upgrade | What's New/porting guides, UTF-8 default impact, removals in 3.15, deprecations pending for 3.16/3.17, testing across versions | 3.15 | Upgrade a 3.11 project to 3.15 and fix every warning |
