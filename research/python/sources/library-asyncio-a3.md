# asyncio: TaskGroup, timeout, to_thread, Runner, ps/pstree (A3)

- URL: https://docs.python.org/3/library/asyncio-task.html, asyncio-runner.html, asyncio-tools.html
- Accessed: 2026-10-12
- Retrieval: curl -sL (primary source), HTML stripped

Trimmed extract (verbatim lines, some omitted):

```text
Task groups¶
Task groups combine a task creation API with a convenient
and reliable way to wait for all tasks in the group to finish.
class asyncio.TaskGroup¶
An asynchronous context manager
holding a group of tasks.
Tasks can be added to the group using create_task().
All tasks are awaited when the context manager exits.
Added in version 3.11.
create_task(coro, *, name=None, context=None, eager_start=None, **kwargs)¶
Create a task in this task group.
The signature matches that of asyncio.create_task().
If the task group is inactive (e.g. not yet entered,
already finished, or in the process of shutting down),
we will close the given coro and raise RuntimeError.
Changed in version 3.13: Close the given coroutine if the task group is not active.
Changed in version 3.14: Passes on all kwargs to loop.create_task()
cancel()¶
Cancel the task group.  This is a non-exceptional, early exit of the
task group’s lifetime – useful once the group’s goal has been met or
its services no longer needed.
cancel() will be called on any tasks in the group that
aren’t yet done, as well as the parent (body) of the group.  The task group
context manager will exit without asyncio.CancelledError being raised.
If cancel() is called before entering the task group, the group will be
cancelled upon entry.  This is useful for patterns where one piece of
code passes an unused asyncio.TaskGroup instance to another in order to have
the ability to cancel anything run within the group.
cancel() is idempotent and may be called after the task group has
already exited.
Some ways to use cancel():
call it from the task group body based on some condition or event
pass the task group instance to child tasks via create_task(), allowing a child
task to conditionally cancel the entire group
pass the task group instance or bound cancel() method to some other task before
opening the task group, allowing remote cancellation
Added in version 3.15.
The first time any of the tasks belonging to the group fails
with an exception other than asyncio.CancelledError,
the remaining tasks in the group are cancelled.
No further tasks can then be added to the group.
At this point, if the body of the async with statement is still active
(i.e., __aexit__() hasn’t been called yet),
the task directly containing the async with statement is also cancelled.
The resulting asyncio.CancelledError will interrupt an await,
but it will not bubble out of the containing async with statement.
Timeouts¶
asyncio.timeout(delay)¶
Return an asynchronous context manager
that can be used to limit the amount of time spent waiting on
something.
delay can either be None, or a float/int number of
seconds to wait. If delay is None, no time limit will
be applied; this can be useful if the delay is unknown when
the context manager is created.
The asyncio.timeout() context manager is what transforms
the asyncio.CancelledError into a TimeoutError,
which means the TimeoutError can only be caught
outside of the context manager.
Example of catching TimeoutError:
async def main():
    try:
        async with asyncio.timeout(10):
            await long_running_task()
    except TimeoutError:
        print("The long operation timed out, but we've handled it.")
    print("This statement will run regardless.")
The context manager produced by asyncio.timeout() can be
rescheduled to a different deadline and inspected.
(timeout section) Added in version 3.11.
(timeout section) Added in version 3.11.
async asyncio.to_thread(func, /, *args, **kwargs)¶
Asynchronously run function func in a separate thread.
Any *args and **kwargs supplied for this function are directly passed
Note
Due to the GIL, asyncio.to_thread() can typically only be used
to make IO-bound functions non-blocking. However, for extension modules
that release the GIL or alternative Python implementations that don’t
have one, asyncio.to_thread() can also be used for CPU-bound functions.
Added in version 3.9.
Scheduling from other threads¶
--- asyncio-runner.html
class asyncio.Runner(*, debug=None, loop_factory=None)¶
A context manager that simplifies multiple async function calls in the same
context.
Added in version 3.11.
--- asyncio-tools.html
this interface.
The following commands inspect the process identified by PID:
$ python -m asyncio pstree [--retries N] PID
$ python -m asyncio ps [--retries N] PID
The commands read the target process state without executing any code in it.
They are only available on supported platforms and may require permission to
inspect another process.  See the permission requirements for details.
Added in version 3.14.
--retries N¶
Retry failed attempts to inspect the target process up to N times.  This
can help when the target process changes while its state is being read.
Added in version 3.15.
--- asyncio-policy.html
Policies are deprecated and will be removed in Python 3.16.
--- asyncio-policy.html (cont.)
Deprecated since version 3.14: The get_event_loop_policy() function is deprecated and
will be removed in Python 3.16.
asyncio.set_event_loop_policy(policy)¶
Set the current process-wide policy to policy.
If policy is set to None, the default policy is restored.
Deprecated since version 3.14: The set_event_loop_policy() function is deprecated and
will be removed in Python 3.16.
--- whatsnew/3.14.html, get_event_loop
asyncio.get_event_loop() now raises a RuntimeError
if there is no current event loop,
and no longer implicitly creates an event loop.
(Contributed by Kumar Aditya in gh-126353.)
```
