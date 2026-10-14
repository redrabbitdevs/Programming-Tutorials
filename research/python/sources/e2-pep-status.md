# e2-pep-status: PEP headers checked 2026-10-14 on peps.python.org

- PEP 626 – Precise line numbers for debugging and other tools.: Status **Final**, Python-Version 3.10
- PEP 669 – Low Impact Monitoring for CPython: Status **Final**, Python-Version 3.12
- PEP 683 – Immortal Objects, Using a Fixed Refcount: Status **Final**, Python-Version 3.12
- PEP 703 – Making the Global Interpreter Lock Optional in CPython: Status **Final**, Python-Version 3.13
- PEP 768 – Safe external debugger interface for CPython: Status **Final**, Python-Version 3.14
- PEP 779 – Criteria for supported status for free-threaded Python: Status **Final**, Python-Version 3.14
- PEP 793 – PyModExport: A new entry point for C extension modules: Status **Final**, Python-Version 3.15
- PEP 810 – Explicit lazy imports: Status **Final**, Python-Version 3.15
- PEP 829 – Package Startup Configuration Files: Status **Final**, Python-Version 3.15
- PEP 831 – Frame Pointers Everywhere: Enabling System-Level Observability for Python: Status **Final**, Python-Version 3.15

## Confirmed by running CPython 3.15.0 (and 3.15.0t, 3.14.8), 2026-10-14

- `co_lnotab`: AttributeError on 3.15; present with DeprecationWarning on 3.14.8.
- `load_module`-only loader: AttributeError ('no attribute exec_module') on 3.15; imports on 3.14.8.
- `.start` file: entry point runs and the matching `.pth` import line is skipped on 3.15; 3.14.8 runs the import line.
- `gc.get_threshold()` is (2000, 10, 10) on 3.15.0 and 3.14.8 (generational GC restored in 3.14.5).
- `sys._is_immortal(10**6)`: False on the default build, True on the free-threaded build.
- `sys.remote_exec` and `python -m pdb -p` attach on Linux (container, root); `quit` detaches and the target keeps running.
- A `PyModExport_` extension built with `-DPy_LIMITED_API=0x030f0000 -DPy_TARGET_ABI3T=0x030f0000` as `tally.abi3t.so` imports on both 3.15 and 3.15t; without `Py_mod_gil` it re-enables the GIL on 3.15t with a RuntimeWarning.
- `-fno-omit-frame-pointer` is in `sysconfig` CFLAGS of the uv builds of 3.15.0 and 3.14.8 (the latter enabled by the redistributor).
