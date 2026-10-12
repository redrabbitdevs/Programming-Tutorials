# What's New 3.14/3.15: concurrency changes

- URL: https://docs.python.org/3/whatsnew/3.14.html, https://docs.python.org/3/whatsnew/3.15.html, https://docs.python.org/3/library/threading.html
- Accessed: 2026-10-12
- Retrieval: curl -sL (primary source), HTML stripped

Trimmed extract (verbatim lines, some omitted):

```text
multiprocessing¶
On Unix platforms other than macOS, ‘forkserver’ is now the default start
method
(replacing ‘fork’).
This change does not affect Windows or macOS, where ‘spawn’ remains the default start method.
If the threading incompatible fork method is required, you must explicitly
request it via a context from get_context() (preferred)
or change the default via set_start_method().
See forkserver restrictions
This uses a pool of independent Python interpreters to execute calls
asynchronously.
This is separate from the new interpreters module
introduced by PEP 734.
(Contributed by Eric Snow in gh-124548.)
On Unix platforms other than macOS, ‘forkserver’ is now the default start
method for
ProcessPoolExecutor
(replacing ‘fork’).
--- whatsnew/3.15.html
asyncio¶
Added TaskGroup.cancel to allow early
termination of a task group, for instance, when the goal of the tasks has
been achieved or their services are no longer needed.
Previously this would involve unintuitive boilerplate such as an extra task
raising a custom exception which is then suppressed as it exits the task group.
concurrent.futures¶
Improved error reporting when a child process in a
concurrent.futures.ProcessPoolExecutor terminates abruptly.
The resulting traceback will now tell you the PID and exit code of the
terminated process.
(Contributed by Jonathan Berg in gh-139486.)
threading¶
Added serialize_iterator,
synchronized_iterator(),
and concurrent_tee() to support concurrent access to
generators and iterators.
(Contributed by Raymond Hettinger in gh-124397.)
asyncio policy system is deprecated and will be removed in Python 3.16.
In particular, the following classes and functions are deprecated:
asyncio.AbstractEventLoopPolicy
asyncio.DefaultEventLoopPolicy
asyncio.WindowsSelectorEventLoopPolicy
asyncio.WindowsProactorEventLoopPolicy
asyncio.get_event_loop_policy()
asyncio.set_event_loop_policy()
Users should use asyncio.run() or asyncio.Runner with
loop_factory to use the desired event loop implementation.
For example, to use asyncio.SelectorEventLoop on Windows:
import asyncio
async def main():
    ...
asyncio.run(main(), loop_factory=asyncio.SelectorEventLoop)
--- threading.html
class threading.serialize_iterator(iterable)¶
Return an iterator wrapper that serializes concurrent calls to
__next__() using a lock.
If the wrapped iterator also defines send(),
throw(), or close(), those calls
are serialized as well.
This makes it possible to share a single iterator, including a generator
iterator, between multiple threads. A lock ensures that calls are handled
one at a time. No values are duplicated or skipped by the wrapper itself.
Each item from the underlying iterator is given to exactly one caller.
This wrapper does not copy or buffer values. Threads that call
next() while another thread is already advancing the iterator will
block until the active call completes.
Added in version 3.15.
threading.synchronized_iterator(func)¶
Wrap an iterator-producing callable so that each iterator it returns is
automatically passed through serialize_iterator.
This is especially useful as a decorator for generator functions,
threading.concurrent_tee(iterable, n=2)¶
Return n independent iterators from a single input iterable, with
guaranteed behavior when the derived iterators are consumed concurrently.
This function is similar to itertools.tee(), but is intended for cases
where the source iterator may feed consumers running in different threads.
Each returned iterator yields every value from the underlying iterable, in
Added in version 3.15.
--- library/hashlib.html (https://docs.python.org/3/library/hashlib.html)
To allow multithreading, the Python GIL is released while computing a
hash supplied more than 2047 bytes of data at once in its constructor or
.update method.
--- glossary.html, global interpreter lock
global interpreter lock¶The mechanism used by the CPython interpreter to assure that
only one thread executes Python bytecode at a time.
```
