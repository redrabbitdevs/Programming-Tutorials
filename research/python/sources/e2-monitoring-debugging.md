# e2-monitoring-debugging: extracts for Python module E2 (fetched 2026-10-14)

## https://docs.python.org/3/library/sys.monitoring.html

[lines 30-110 of the text dump]

Light
        Dark

 |

sys.monitoring — Execution event monitoring¶

Added in version 3.12.

Note

sys.monitoring is a namespace within the sys module,
not an independent module, and import sys.monitoring would fail
with a ModuleNotFoundError. Instead, simply import sys
and then use sys.monitoring.

This namespace provides access to the functions and constants necessary to
activate and control event monitoring.

As programs execute, events occur that might be of interest to tools that
monitor execution. The sys.monitoring namespace provides means to
receive callbacks when events of interest occur.

The monitoring API consists of three components:

Tool identifiers

Events

Callbacks

Tool identifiers¶

A tool identifier is an integer and the associated name.
Tool identifiers are used to discourage tools from interfering with each
other and to allow multiple tools to operate at the same time.
Currently tools are completely independent and cannot be used to
monitor each other. This restriction may be lifted in the future.

Before registering or activating events, a tool should choose an identifier.
Identifiers are integers in the range 0 to 5 inclusive.

Registering and using tools¶

sys.monitoring.use_tool_id(tool_id: int, name: str, /) → None¶

Must be called before tool_id can be used.
tool_id must be in the range 0 to 5 inclusive.
Raises a ValueError if tool_id is in use.

sys.monitoring.clear_tool_id(tool_id: int, /) → None¶

Unregister all events and callback functions associated with tool_id.

Added in version 3.14.

sys.monitoring.free_tool_id(tool_id: int, /) → None¶

Should be called once a tool no longer requires tool_id.
Will call clear_tool_id() before releasing tool_id.

Changed in version 3.14: Now calls clear_tool_id() before releasing tool_id.
Previously, it would not disable global or local events associated
with tool_id, nor unregister any callback functions.

sys.monitoring.get_tool(tool_id: int, /) → str | None¶

Returns the name of the tool if tool_id is in use,
otherwise it returns None.
tool_id must be in the range 0 to 5 inclusive.

All IDs are treated the same by the VM with regard to events, but the
following IDs are pre-defined to make co-operation of tools easier:

sys.monitoring.DEBUGGER_ID = 0
sys.monitoring.COVERAGE_ID = 1
sys.monitoring.PROFILER_ID = 2
sys.monitoring.OPTIMIZER_ID = 5

Events¶

[lines 235-242 of the text dump]

Deprecated event¶

BRANCH

The BRANCH event is deprecated in 3.14.
Using BRANCH_LEFT and BRANCH_RIGHT
events will give much better performance as they can be disabled
independently.

[lines 275-277 of the text dump]

Changed in version 3.15: Other events can now be turned on and disabled on a per code object
basis. Returning DISABLE from a callback disables the event
for the entire code object (for the current tool).

[lines 337-361 of the text dump]

Disabling events¶

sys.monitoring.DISABLE¶

A special value that can be returned from a callback function to disable
events for the current code location.

Local events can be disabled for a specific code
location by returning sys.monitoring.DISABLE from a callback function.
This does not change which events are set, or any other code locations for the
same event.

Other events can be disabled on a per code
object basis by returning sys.monitoring.DISABLE from a callback
function. This disables the event for the entire code object (for the current
tool).

Disabling events for specific locations is very important for high performance
monitoring. For example, a program can be run under a debugger with no overhead
if the debugger disables all monitoring except for a few breakpoints.

sys.monitoring.restart_events() → None¶

Enable all the events that were disabled by sys.monitoring.DISABLE
for all tools.

[lines 396-436 of the text dump]

PY_START and PY_RESUME:

func(code: CodeType, instruction_offset: int) -> object

PY_RETURN and PY_YIELD:

func(code: CodeType, instruction_offset: int, retval: object) -> object

CALL, C_RAISE and C_RETURN
(arg0 can be MISSING specifically):

func(code: CodeType, instruction_offset: int, callable: object, arg0: object) -> object

code represents the code object where the call is being made, while
callable is the object that is about to be called (and thus
triggered the event).
If there are no arguments, arg0 is set to sys.monitoring.MISSING.

For instance methods, callable will be the function object as found on the
class with arg0 set to the instance (i.e. the self argument to the
method).

RAISE, RERAISE, EXCEPTION_HANDLED,
PY_UNWIND, PY_THROW and STOP_ITERATION:

func(code: CodeType, instruction_offset: int, exception: BaseException) -> object

LINE:

func(code: CodeType, line_number: int) -> object

BRANCH_LEFT, BRANCH_RIGHT and JUMP:

func(code: CodeType, instruction_offset: int, destination_offset: int) -> object

Note that the destination_offset is where the code will next execute.

INSTRUCTION:

func(code: CodeType, instruction_offset: int) -> object

## https://docs.python.org/3/library/pdb.html

[lines 120-136 of the text dump]

-p, --pid <pid>¶

Attach to the process with the specified PID.

Added in version 3.14.

To attach to a running Python process for remote debugging, use the -p or
--pid option with the target process’s PID:

python -m pdb -p 1234

Note

Attaching to a process that is blocked in a system call or waiting for I/O
will only work once the next bytecode instruction is executed or when the
process receives a signal.

## https://docs.python.org/3/library/sys.html

[lines 2048-2075 of the text dump]

sys.remote_exec(pid, script)¶

Executes script, a file containing Python code in the remote
process with the given pid.

This function returns immediately, and the code will be executed by the
target process’s main thread at the next available opportunity, similarly
to how signals are handled. There is no interface to determine when the
code has been executed. The caller is responsible for making sure that
the file still exists whenever the remote process tries to read it and that
it hasn’t been overwritten.

The remote process must be running a CPython interpreter of the same major
and minor version as the local process. If either the local or remote
interpreter is pre-release (alpha, beta, or release candidate) then the
local and remote interpreters must be the same exact version.

See Remote debugging attachment protocol for more information about the remote debugging
mechanism.

When the code is executed in the remote process, an
auditing event sys.remote_exec is raised with
the pid and the path to the script file.
This event is raised in the process that called sys.remote_exec().

When the script is executed in the remote process, an
auditing event
cpython.remote_debugger_script is raised

## https://docs.python.org/3/howto/remote_debugging.html

[lines 36-72 of the text dump]

execute Python code remotely.

Attaching to another Python process may require additional permissions or
configuration, depending on the platform.

Disabling remote debugging¶

To disable remote debugging support, use any of the following:

Set the PYTHON_DISABLE_REMOTE_DEBUG environment variable to 1 before
starting the interpreter.

Use the -X disable_remote_debug command-line option.

Compile Python with the --without-remote-debug build flag.

Permission requirements¶

Attaching to a running Python process for remote debugging requires special
configuration on most platforms. The specific requirements and troubleshooting
steps depend on your operating system:

Linux

In general, you can debug your own processes, but there are several common
configurations that may disable this. Some Linux distributions enable ptrace
restrictions, aka “Yama,” as a form of system hardening. Recent versions of
the setpriv command (util-linux 2.41, released June 2025) let you loosen
ptrace restrictions on a per-process basis:

setpriv --ptracer any python3

(This is configured on the process being debugged.) You can also turn off
ptrace restrictions for all processes until reboot with:

echo 0 | sudo tee /proc/sys/kernel/yama/ptrace_scope
