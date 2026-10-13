# concurrent.interpreters and InterpreterPoolExecutor (PEP 734)

- URL: https://docs.python.org/3/library/concurrent.interpreters.html, https://docs.python.org/3/library/concurrent.futures.html, https://peps.python.org/pep-0734/
- Accessed: 2026-10-12
- Retrieval: curl -sL (primary source), HTML stripped

Trimmed extract (verbatim lines, some omitted):

```text
concurrent.interpreters — Multiple interpreters in the same process¶
Added in version 3.14.
Source code: Lib/concurrent/interpreters
The concurrent.interpreters module constructs higher-level
interfaces on top of the lower level _interpreters module.
The module is primarily meant to provide a basic API for managing
interpreters (AKA “subinterpreters”) and running things in them.
Running mostly involves switching to an interpreter (in the current
thread) and calling a function in that execution context.
For concurrency, interpreters themselves (and this module) don’t
provide much more than isolation, which on its own isn’t useful.
Actual concurrency is available separately through
threads – see below.
You can take advantage of that concurrency model in a single thread,
switching back and forth between interpreters, Stackless-style.
However, this model is more useful when you combine interpreters
with multiple threads.  This mostly involves starting a new thread,
where you switch to another interpreter and run what you want there.
Each actual thread in Python, even if you’re only running in the main
thread, has its own current execution context.  Multiple threads can
use the same interpreter or different ones.
At a high level, you can think of the combination of threads and
interpreters as threads with opt-in sharing.
As a significant bonus, interpreters are sufficiently isolated that
they do not share the GIL, which means combining threads with
multiple interpreters enables full multi-core parallelism.
(This has been the case since Python 3.12.)
Communication Between Interpreters¶
In practice, multiple interpreters are useful only if we have a way
to communicate between them.  This usually involves some form of
message passing, but can even mean sharing data in some carefully
managed way.
With this in mind, the concurrent.interpreters module provides
a queue.Queue implementation, available through
create_queue().
“Sharing” Objects¶
Any data actually shared between interpreters loses the thread-safety
provided by the GIL.  There are various options for dealing with
this in extension modules.  However, from Python code the lack of
thread-safety means objects can’t actually be shared, with a few
exceptions.  Instead, a copy must be created, which means mutable
objects won’t stay in sync.
By default, most objects are copied with pickle when they are
passed to another interpreter.  Nearly all of the immutable builtin
objects are either directly shared or copied efficiently.  For example:
None
bool (True and False)
bytes
str
int
float
tuple (of similarly supported objects)
There are a small number of Python types that actually share mutable
data between interpreters:
memoryview
Queue
Reference¶
This module defines the following functions:
--- concurrent.futures.html
InterpreterPoolExecutor¶
Added in version 3.14.
The InterpreterPoolExecutor class uses a pool of interpreters
to execute calls asynchronously.  It is a ThreadPoolExecutor
subclass, which means each worker is running in its own thread.
The difference here is that each worker has its own interpreter,
and runs each task using that interpreter.
The biggest benefit to using interpreters instead of only threads
is true multi-core parallelism.  Each interpreter has its own
Global Interpreter Lock, so code
running in one interpreter can run on one CPU core, while code in
another interpreter runs unblocked on a different core.
class concurrent.futures.InterpreterPoolExecutor(max_workers=None, thread_name_prefix='', initializer=None, initargs=())¶
A ThreadPoolExecutor subclass that executes calls asynchronously
using a pool of at most max_workers threads.  Each thread runs
tasks in its own interpreter.  The worker interpreters are isolated
from each other, which means each has its own runtime state and that
they can’t share any mutable objects or other data.  Each interpreter
has its own Global Interpreter Lock,
which means code run with this executor has true multi-core parallelism.
The optional initializer and initargs arguments have the same
submit() and map() work like normal,
except the worker serializes the callable and arguments using
pickle when sending them to its interpreter.  The worker
likewise serializes the return value when sending it back.
When a worker’s current task raises an uncaught exception, the worker
always tries to preserve the exception as-is.  If that is successful
then it also sets the __cause__ to a corresponding
ExecutionFailed
instance, which contains a summary of the original exception.
In the uncommon case that the worker is not able to preserve the
original as-is then it directly preserves the corresponding
ExecutionFailed
instance instead.
ProcessPoolExecutor¶
--- PEP 734 header
Status:
Final
Type:
Standards Track
Created:
06-Nov-2023
Python-Version:
3.14
```
