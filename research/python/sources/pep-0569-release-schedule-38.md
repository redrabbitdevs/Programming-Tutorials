# PEP 569 - Python 3.8 Release Schedule

- URL: https://peps.python.org/pep-0569/
- Accessed: 2026-10-10
- Retrieval: direct fetch (primary source)

Trimmed extract (verbatim lines, some omitted):

```text
3.8 Lifespan
Source-only security fix releases
## 3.8 Lifespan
3.8 will receive bugfix updates approximately every 2 months for
the ninth and final 3.8 bugfix update was released. After that,
security updates (source only) were released for 5 years until the
end-of-life phase
of its release cycle. 3.8.20 was the final security release.
Actual:
3.8.0 final: Monday, 2019-10-14
### Source-only security fix releases
Provided irregularly on an “as-needed” basis until October 7th 2024.
(final security release)
approximately 18 months. Some time after the release of 3.9.0 final,
release of Python 3.13.0 final.
As of 2024-10-07, 3.8 has reached the
The codebase for 3.8 is now frozen and no further updates will be
provided nor issues of any kind will be accepted on the bug tracker.
## Release Schedule
### 3.8.0 schedule
3.8 development begins: Monday, 2018-01-29
3.8.0 alpha 1: Sunday, 2019-02-03
3.8.0 alpha 2: Monday, 2019-02-25
3.8.0 alpha 3: Monday, 2019-03-25
3.8.0 alpha 4: Monday, 2019-05-06
3.8.0 beta 1: Tuesday, 2019-06-04
(No new features beyond this point.)
3.8.0 beta 2: Thursday, 2019-07-04
3.8.0 beta 3: Monday, 2019-07-29
3.8.0 beta 4: Friday, 2019-08-30
3.8.0 candidate 1: Tuesday, 2019-10-01
### Bugfix releases
3.8.1 candidate 1: Tuesday, 2019-12-10
3.8.1 final: Wednesday, 2019-12-18
3.8.2 candidate 1: Monday, 2020-02-10
3.8.2 candidate 2: Monday, 2020-02-17
3.8.2 final: Monday, 2020-02-24
3.8.3 candidate 1: Wednesday, 2020-04-29
3.8.3 final: Wednesday, 2020-05-13
3.8.4 candidate 1: Tuesday, 2020-06-30
3.8.4 final: Monday, 2020-07-13
3.8.5 final: Monday, 2020-07-20
(security hotfix)
3.8.6 candidate 1: Tuesday, 2020-09-08
3.8.6 final: Thursday, 2020-09-24
3.8.7 candidate 1: Monday, 2020-12-07
3.8.7 final: Monday, 2020-12-21
3.8.8 candidate 1: Tuesday, 2021-02-16
3.8.8 final: Friday, 2021-02-19
3.8.9 final: Friday, 2021-04-02
3.8.10 final: Monday, 2021-05-03
(Final regular bugfix release with binary installers)
3.8.11 final: Monday, 2021-06-28
3.8.12 final: Monday, 2021-08-30
3.8.13 final: Wednesday, 2022-03-16
3.8.14 final: Tuesday, 2022-09-06
3.8.15 final: Tuesday, 2022-10-11
3.8.16 final: Tuesday, 2022-12-06
3.8.17 final: Tuesday, 2023-06-06
3.8.18 final: Thursday, 2023-08-24
3.8.19 final: Tuesday, 2024-03-19
3.8.20 final: Friday, 2024-09-06
## Features for 3.8
Some of the notable features of Python 3.8 include:
PEP 570, Positional-only arguments
PEP 572, Assignment Expressions
PEP 574, Pickle protocol 5 with out-of-band data
PEP 578, Runtime audit hooks
PEP 587, Python Initialization Configuration
PEP 590, Vectorcall: a fast calling protocol for CPython
Typing-related: PEP 591 (Final qualifier), PEP 586 (Literal types),
and PEP 589 (TypedDict)
Parallel filesystem cache for compiled bytecode
Debug builds share ABI as release builds
f-strings support a handy = specifier for debugging
continue is now legal in finally: blocks
on Windows, the default asyncio event loop is now
ProactorEventLoop
on macOS, the spawn start method is now used by default in
multiprocessing
multiprocessing can now use shared memory segments to avoid
pickling costs between processes
typed_ast is merged back to CPython
LOAD_GLOBAL is now 40% faster
pickle now uses Protocol 4 by default, improving performance
There are many other interesting changes, please consult the
“What’s New” page in the documentation for a full list.
```
