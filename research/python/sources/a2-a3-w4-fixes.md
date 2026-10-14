# Sources for the W4 fixes to modules A2 and A3 (lessons 08-20)

Checked 2026-10-14 against docs.python.org (the `/3/` docs are the 3.15 docs) and run on CPython 3.15.0, 3.14.8 and 3.10.22.

| Claim in the lessons | Lesson | Source | Checked |
|---|---|---|---|
| Unpacking in comprehensions, `[*L for L in lists]`, `{**d for d in dicts}`, is new in 3.15 (PEP 798) | 09 | https://docs.python.org/3.15/whatsnew/3.15.html#pep-798-unpacking-in-comprehensions | Runs on 3.15.0, `SyntaxError` on 3.14.8 |
| Atomic groups `(?>...)` and possessive quantifiers `*+`, `++`, `?+`, `{m,n}+`: "Added in version 3.11" | 12 | https://docs.python.org/3/library/re.html#regular-expression-syntax | `re.error: multiple repeat` on 3.10.22 |
| `(?>.*).` never matches; possessive forms are equivalent to atomic groups | 12 | same page | |
| A lookbehind must be fixed width | 12 | same page, `(?<=...)` | |
| `(\w+\s?)*` on 24 letters and `!` takes about 1.5 s on 3.15.0, roughly doubling per letter | 12 | measured: 18 letters 0.03 s, 20 0.08 s, 22 0.32 s, 24 1.5 s | |
| `queue.Queue.shutdown` and `queue.ShutDown`: "Added in version 3.13" | 15 | https://docs.python.org/3/library/queue.html | |
| `asyncio.Queue.shutdown` and `asyncio.QueueShutDown`: "Added in version 3.13" | 18 | https://docs.python.org/3/library/asyncio-queue.html | |
| `BoundedSemaphore.release` too often raises `ValueError: Semaphore released too many times` | 15 | https://docs.python.org/3/library/threading.html#threading.BoundedSemaphore | run on 3.15.0 |
| `ProcessPoolExecutor` default `max_workers` is `os.process_cpu_count()`: "Changed in version 3.13" | 16 | https://docs.python.org/3/library/concurrent.futures.html#processpoolexecutor | |
| Free-threaded single-thread overhead: about 1% on macOS aarch64 to 8% on x86-64 Linux on pyperformance | 19 | https://docs.python.org/3/howto/free-threading-python.html#single-threaded-performance | |
| `threading.synchronized_iterator` exists only in 3.15 | 19 | https://docs.python.org/3.15/whatsnew/3.15.html | `AttributeError` on 3.14.8 |
| "do not use multiple interpreters in security-sensitive situations" | 20 | https://docs.python.org/3/library/concurrent.interpreters.html | |
| `graphlib.TopologicalSorter` is new in 3.9 | 13 | https://docs.python.org/3/library/graphlib.html | |
| Alternatives in a pattern must bind the same names (`SyntaxError: alternative patterns bind different names`) | 08 | https://docs.python.org/3/reference/compound_stmts.html#or-patterns | compiled on 3.15.0 |
