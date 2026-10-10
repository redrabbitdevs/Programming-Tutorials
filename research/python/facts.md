# Python fact sheet

Verified 2026-10-10 against primary sources. Cached extracts are in `research/python/sources/`.
Every version tag ("3.12+") means "available from that version onward".

## Current stable version

| Fact | Value | Source |
|---|---|---|
| Latest stable | **Python 3.15.0** | [python.org downloads](https://www.python.org/downloads/), [3.15.0 release page](https://www.python.org/downloads/release/python-3150/) (`sources/python-3150-release.md`) |
| Release date | **2026-10-09** (Friday) | [PEP 790](https://peps.python.org/pep-0790/) "3.15.0 final: Friday, 2026-10-09"; [What's New 3.15](https://docs.python.org/3/whatsnew/3.15.html) "Python 3.15 was released on 9 October 2026" |
| Docs default | docs.python.org/3/ now serves the 3.15.0 documentation | `sources/whatsnew-315.md` |
| Next feature release | 3.16, expected October 2027 (annual cycle, [PEP 602](https://peps.python.org/pep-0602/)) | `sources/peps-index.md` |
| Windows installation | The **Python install manager** (Microsoft Store or python.org/downloads, MSIX) is the recommended route; it provides `python`, `py` and `pymanager`, and `py install 3.15` adds a version. The full installer and the standalone `py` launcher are deprecated since 3.14; no full installer for 3.16+. | [Using Python on Windows](https://docs.python.org/3/using/windows.html) (`sources/using-windows.md`) |
| Teaching baseline | **Python 3.15** for examples. Mark anything newer than 3.10 with its minVersion, because many learners will have 3.12 to 3.14 installed. | Writer guidance |

## Support status (as of 2026-10-10)

Source: the python.org "Active Python releases" table (`sources/python-org-downloads.md`) and the release-schedule PEPs.
Since [PEP 602](https://peps.python.org/pep-0602/) was updated (noted in What's New 3.13), 3.13 and later get **2 years of bugfix releases, then 3 years of security fixes**. 3.9 to 3.12 got 1.5 years of bugfix releases, then 3.5 years of security fixes.

| Version | Released | Status | End of support | Schedule PEP |
|---|---|---|---|---|
| 3.15 | 2026-10-09 | bugfix | 2031-10 | [PEP 790](https://peps.python.org/pep-0790/) |
| 3.14 | 2025-10-07 | bugfix (latest 3.14.8, 2026-09-30 on python.org) | 2030-10 | [PEP 745](https://peps.python.org/pep-0745/) |
| 3.13 | 2024-10-07 | **security only**: 3.13.16 (2026-10-01) was the final regular bugfix release | 2029-10 | [PEP 719](https://peps.python.org/pep-0719/) |
| 3.12 | 2023-10-02 | security only | 2028-10 | [PEP 693](https://peps.python.org/pep-0693/) |
| 3.11 | 2022-10-24 | security only | 2027-10 | [PEP 664](https://peps.python.org/pep-0664/) |
| 3.10 | 2021-10-04 | **end of life since 2026-10-01**; 3.10.22 was the final release | 2026-10-01 | [PEP 619](https://peps.python.org/pep-0619/) |
| 3.9 | 2020-10-05 | end of life (security fixes ended October 2025) | 2025-10 | [PEP 596](https://peps.python.org/pep-0596/) |
| 3.8 | 2019-10-14 | end of life (security fixes ended 2024-10-07) | 2024-10 | [PEP 569](https://peps.python.org/pep-0569/) |

Correction to the earlier lead: 3.10 did not reach end of life "in October 2026" in general terms. It reached it on **2026-10-01** ([PEP 619](https://peps.python.org/pep-0619/): "As of 2026-10-01, 3.10 has reached the end-of-life phase").
Minor discrepancy: PEP 745 lists 3.14.8 for Thursday 2026-10-01, but python.org lists it as released on Sept. 30, 2026. Use the python.org date.

## Major features by version

### 3.15 (2026-10-09) - [What's New](https://docs.python.org/3/whatsnew/3.15.html)
All four leads were verified as accepted (PEP status "Final") and shipped in 3.15.0.
- **PEP 810: explicit lazy imports.** `lazy import json` and `lazy from pathlib import Path` use the new soft keyword `lazy`. They are allowed only at module scope, not in functions, classes or `try` blocks; `lazy from x import *` and lazy `__future__` imports are a `SyntaxError`. Global mode: `-X lazy_imports=all|normal`, `PYTHON_LAZY_IMPORTS`, `sys.set_lazy_imports()`, `sys.set_lazy_imports_filter()`. For older versions: `__lazy_modules__ = [...]`. Proxy type: `types.LazyImportType`. (3.15+)
- **PEP 814: `frozendict` builtin.** Immutable, hashable if its contents are hashable, keeps insertion order, and compares without regard to order. Not a subclass of `dict`. Accepted by `json`, `copy`, `pickle`, `pprint` and others. (3.15+)
- **PEP 661: `sentinel` builtin** for unique sentinel values. Keeps identity when copied, usable in `X | sentinel` type expressions, picklable. (3.15+)
- **PEP 686: UTF-8 mode is the default.** `open()` without `encoding=` now uses UTF-8 on every platform. Opt out with `PYTHONUTF8=0` or `-X utf8=0`. Still teach an explicit `encoding="utf-8"` for code that must run on older versions. (3.15+)
- **PEP 798: unpacking in comprehensions**: `[*L for L in lists]`, `{**d for d in dicts}`. (3.15+)
- **PEP 799: new `profiling` package**: `profiling.tracing` (the former cProfile) and `profiling.sampling` (the "Tachyon" sampling profiler). `profile` is deprecated (removal in 3.17); `cProfile` remains as an alias. (3.15+)
- **PEP 829**: package startup configuration files. **PEP 831**: frame pointers on by default.
- Typing: **PEP 728** (TypedDict typed extra items), **PEP 747** (`TypeForm`), **PEP 800** (disjoint bases).
- Free-threading: **PEP 803** adds a stable ABI for free-threaded builds (`abi3t`). The official macOS installers now install free-threading support by default.
- JIT: upgraded (see the status section below). Windows x64 binaries now use the tail-calling interpreter.
- Library: `math.integer` module, `re.prefixmatch()` (with `re.match()` soft-deprecated), `bytearray.take_bytes()`, more colour in CLIs and help output.

### 3.14 (2025-10-07) - [What's New](https://docs.python.org/3/whatsnew/3.14.html)
- **PEP 649/749: deferred evaluation of annotations.** Forward references no longer need quotes. New `annotationlib` module. (3.14+)
- **PEP 750: template strings**, `t"..."` literals producing `string.templatelib.Template`. (3.14+)
- **PEP 734**: multiple interpreters in the stdlib (`concurrent.interpreters`, `InterpreterPoolExecutor`). (3.14+)
- **PEP 758**: `except A, B:` without parentheses (when there is no `as`). (3.14+)
- **PEP 765**: `return`/`break`/`continue` that exit a `finally` block now emit a `SyntaxWarning`. (3.14+)
- **PEP 768**: safe external debugger interface (`python -m pdb -p PID`). **PEP 784**: `compression.zstd`. Asyncio introspection (`python -m asyncio ps/pstree`). Syntax highlighting in the REPL. Incremental GC. Opt-in tail-call interpreter.
- **PEP 779**: free-threaded build **officially supported** (phase II). Single-thread overhead is about 5-10%.

### 3.13 (2024-10-07) - [What's New](https://docs.python.org/3/whatsnew/3.13.html)
- New interactive REPL (multiline editing, colour, `exit` without parentheses). Coloured tracebacks.
- **PEP 703**: experimental free-threaded build (`python3.13t`). **PEP 744**: experimental JIT, off by default.
- **PEP 667**: defined semantics for `locals()`. `copy.replace()`. `warnings.deprecated()` (PEP 702).
- Typing: PEP 696 (type parameter defaults), PEP 705 (`ReadOnly`), PEP 742 (`TypeIs`).
- iOS and Android are tier-3 platforms.
- **Removed**: 19 "dead batteries" (PEP 594: `cgi`, `cgitb`, `telnetlib`, `imghdr`, `pipes`, `crypt`, `nntplib`, `audioop`, `aifc`, `chunk`, `mailcap`, `msilib`, `nis`, `ossaudiodev`, `sndhdr`, `spwd`, `sunau`, `uu`, `xdrlib`), plus `2to3`/`lib2to3` and `tkinter.tix`.

### 3.12 (2023-10-02) - [What's New](https://docs.python.org/3/whatsnew/3.12.html)
- **PEP 695**: type parameter syntax `def f[T](x: T)`, `class C[T]`, and the `type X = ...` statement. (3.12+)
- **PEP 701**: f-strings formalised in the grammar; quotes can be reused inside them, and they can span multiple lines and contain comments. (3.12+)
- PEP 684 (per-interpreter GIL), PEP 669 (`sys.monitoring`), PEP 688 (buffer protocol from Python), PEP 709 (inlined comprehensions), PEP 692 (`Unpack[TypedDict]` for `**kwargs`), PEP 698 (`@override`).
- **Removed**: `distutils` (PEP 632), `asynchat`, `asyncore`, `imp`. `venv` no longer pre-installs setuptools.

### 3.11 (2022-10-24) - [What's New](https://docs.python.org/3/whatsnew/3.11.html)
- 10-60% faster than 3.10, 1.25x on average (Faster CPython).
- **PEP 654**: `ExceptionGroup` and `except*`. **PEP 678**: `add_note()`. **PEP 657**: fine-grained error locations in tracebacks.
- **PEP 680**: `tomllib`. `asyncio.TaskGroup`, `asyncio.timeout()`.
- Typing: PEP 646 (variadic generics), 655 (`Required`/`NotRequired`), 673 (`Self`), 675 (`LiteralString`), 681 (`dataclass_transform`).

### 3.10 (2021-10-04, now EOL) - [What's New](https://docs.python.org/3/whatsnew/3.10.html)
- **PEP 634-636**: structural pattern matching (`match`/`case`). Parenthesised context managers.
- `zip(strict=True)` (PEP 618). Much better error messages. PEP 626 (precise line numbers).
- Typing: `X | Y` unions (PEP 604), `ParamSpec` (612), `TypeAlias` (613), `TypeGuard` (647).
- `EncodingWarning` and `encoding="locale"` (PEP 597). `distutils` deprecated.

### 3.9 (2020-10-05, EOL) - [What's New](https://docs.python.org/3/whatsnew/3.9.html)
- `dict` merge operators `|` and `|=` (PEP 584). `str.removeprefix()`/`removesuffix()` (PEP 616).
- Built-in generics `list[int]`, `dict[str, int]` (PEP 585). Relaxed decorator grammar (PEP 614). `Annotated` (PEP 593).
- `zoneinfo` (PEP 615), `graphlib`. New PEG parser (PEP 617). Annual release cycle adopted (PEP 602).

### 3.8 (2019-10-14, EOL) - [What's New](https://docs.python.org/3/whatsnew/3.8.html)
- Assignment expressions `:=` (PEP 572). Positional-only parameters `/` (PEP 570). f-string `=` specifier.
- `typing`: `TypedDict`, `Literal`, `Final`, `Protocol`. `importlib.metadata`. `functools.cached_property`. `@lru_cache` without parentheses.

## Free-threading and JIT status (3.15)

| Topic | Status | Source |
|---|---|---|
| Free-threaded build (no GIL) | **Officially supported but optional** since 3.14 (PEP 779 phase II). Not the default build. 3.15 adds a stable ABI (`abi3t`, PEP 803). The macOS installer installs it by default. Its executable is a separate `t`-suffixed one (`python3.13t` in 3.13; follow the same pattern for later versions). | [PEP 703](https://peps.python.org/pep-0703/), [PEP 779](https://peps.python.org/pep-0779/), What's New 3.14 and 3.15 |
| Phase III (free-threaded as the default build) | **Not decided.** Do not claim "the GIL is gone". | PEP 779 |
| JIT compiler | **Experimental**, off by default; [PEP 744](https://peps.python.org/pep-0744/) is still Draft. In 3.15 it is 7-8% faster than the standard interpreter (geometric mean) on x86-64 Linux and 11-12% faster on AArch64 macOS. It has a new tracing frontend and register allocation, and needs LLVM 21 at build time only. Windows and macOS binaries have shipped with the experimental JIT available since 3.14. | What's New 3.15, "Upgraded experimental JIT compiler" |
| Tail-calling interpreter | Opt-in build option from 3.14. Used by the official Windows x64 binaries in 3.15. | What's New 3.14 and 3.15 |

## Deprecated or removed: do not teach as current

| Item | Status | Use instead |
|---|---|---|
| `distutils` | Removed in 3.12 | `pyproject.toml` with a build backend (setuptools, hatchling and others) |
| `imp`, `asynchat`, `asyncore` | Removed in 3.12 | `importlib`, `asyncio` |
| `cgi`, `telnetlib`, `pipes`, `imghdr`, `crypt` and the rest of PEP 594 | Removed in 3.13 | Third-party packages, `shlex.quote` instead of `pipes.quote` |
| `2to3`/`lib2to3` | Removed in 3.13 | n/a |
| `sre_compile`, `sre_parse`, `sre_constants` | Removed in 3.15 | `re` |
| `http.server.CGIHTTPRequestHandler`, `--cgi` | Removed in 3.15 | A real WSGI/ASGI server |
| `NamedTuple("P", x=int)` keyword form; `TypedDict("TD")` with no fields | Removed in 3.15 | Class syntax |
| `datetime.utcnow()`, `utcfromtimestamp()` | Deprecated (3.12), no removal date | `datetime.now(tz=datetime.UTC)` |
| `asyncio` policy system (`set_event_loop_policy` and related) | Deprecated, removal in 3.16 | `asyncio.run(..., loop_factory=...)`, `asyncio.Runner` |
| `asyncio.iscoroutinefunction()` | Removal in 3.16 | `inspect.iscoroutinefunction()` |
| `~True` / `~False` | Deprecated, removal in 3.16 | `not x` |
| `profile` module | Deprecated in 3.15, removal in 3.17 | `profiling.tracing` (or `cProfile`, now an alias) |
| `typing.ByteString`, `collections.abc.ByteString` | Removal in 3.17 | `collections.abc.Buffer` or `bytes \| bytearray \| memoryview` |
| `__version__` attributes of stdlib modules (`json`, `re`, `csv` and others) | Removal in 3.20 | `sys.version_info` |
| `re.match()` | **Soft**-deprecated in 3.15, never to be removed | `re.prefixmatch()` in 3.15+-only code; `match()` stays fine |
| `codecs.open()` | Deprecated | `open()` |
| `argparse.FileType` | Deprecated | Open files yourself |
| `typing.List`, `Dict`, `Optional[X]`, `Union[X, Y]` | Not removed, but superseded | `list[int]` (3.9+), `X \| None` (3.10+) |
| `from __future__ import annotations` | Still works, but no longer needed in 3.14+ | Deferred annotations (3.14+) |
| `setup.py install`, `easy_install`, `pkg_resources` | Legacy packaging (setuptools no longer pre-installed in venvs since 3.12) | `pip install .` or `uv`, with `pyproject.toml` |

Full lists: the "Removed", "Deprecated" and "Pending removal" sections of [What's New 3.15](https://docs.python.org/3/whatsnew/3.15.html#deprecated) (extract in `sources/whatsnew-315.md`).

## Modern tooling (what the course teaches)

Standards are cited to PEPs. The PEP index shows the status of each (`sources/peps-index.md`). Third-party tools are named without version claims; check their own changelogs before quoting a version.

- **Project metadata**: `pyproject.toml` `[project]` table ([PEP 621](https://peps.python.org/pep-0621/)), build backends ([PEP 517](https://peps.python.org/pep-0517/) and [PEP 518](https://peps.python.org/pep-0518/)), dependency groups ([PEP 735](https://peps.python.org/pep-0735/)), the `pylock.toml` lock file ([PEP 751](https://peps.python.org/pep-0751/)).
- **Single-file scripts**: inline script metadata, a `# /// script` block ([PEP 723](https://peps.python.org/pep-0723/)). It is run with `uv run` or `pipx run`.
- **Environments**: `python -m venv` (stdlib). System Pythons are often "externally managed" ([PEP 668](https://peps.python.org/pep-0668/)), so learners must use a venv rather than `sudo pip`.
- **Installers and project managers**: `pip` (bundled through `ensurepip`). `uv` (Astral) is widely used for Python version management, venvs, locking and running tools. Teach `pip` plus `venv` first and `uv` as the modern workflow.
- **Lint and format**: `ruff` (lint and format). `black` is still common.
- **Type checking**: `mypy`, `pyright`. Newer checkers such as `ty` and `pyrefly` exist; mention them without version claims.
- **Testing**: `pytest` (de facto standard), `unittest` (stdlib), `doctest`. `hypothesis` for property-based testing.
- **Profiling**: `profiling.sampling` and `profiling.tracing` (3.15+), `cProfile`, `tracemalloc`, `python -X importtime`.
- **Debugging**: `breakpoint()` (3.7+), `pdb`, remote attach `python -m pdb -p PID` (3.14+).
- **Style**: [PEP 8](https://peps.python.org/pep-0008/).
