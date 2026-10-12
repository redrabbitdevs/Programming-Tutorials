# docs.python.org/3/library/profile.html (extract, fetched 2026-10-11)

        Dark
 |
profile — Pure Python profiler¶
Source code: Lib/profile.py
Deprecated since version 3.15, will be removed in version 3.17.
The profile module is deprecated and will be removed in Python 3.17.
Use profiling.tracing instead.
The profile module provides a pure Python implementation of a
deterministic profiler. While useful for understanding profiler internals or
extending profiler behavior through subclassing, its pure Python implementation
introduces significant overhead compared to the C-based profiling.tracing
module.
For most profiling tasks, use:
profiling.sampling for production debugging with zero overhead
profiling.tracing for development and testing
Migration¶
Migrating from profile to profiling.tracing is straightforward.
The APIs are compatible:
# Old (deprecated)
import profile
profile.run('my_function()')
# New (recommended)
import profiling.tracing
profiling.tracing.run('my_function()')
For most code, replacing import profile with import profiling.tracing
(and using profiling.tracing instead of profile throughout) provides
a straightforward migration path.
Note
The cProfile module remains available as a backward-compatible alias
