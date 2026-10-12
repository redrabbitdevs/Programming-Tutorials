# docs.python.org/3/library/pdb.html (extract, fetched 2026-10-11)

The typical usage to break into the debugger is to insert:
import pdb; pdb.set_trace()
Or:
breakpoint()
at the location you want to break into the debugger, and then run the program.
You can then step through the code following this statement, and continue
running without the debugger using the continue command.
Changed in version 3.7: The built-in breakpoint(), when called with defaults, can be used
instead of import pdb; pdb.set_trace().
-m <module>¶
To execute modules similar to the way python -m does. As with a script,
the debugger will pause execution just before the first line of the module.
Changed in version 3.7: Added the -m option.
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
