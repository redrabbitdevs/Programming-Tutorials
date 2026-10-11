# Extract: What's New in Python 3.15, PEP 810 (fetched 2026-10-11 from https://docs.python.org/3/whatsnew/3.15.html)

PEP 810: Explicit lazy imports¶
Large Python applications often suffer from slow startup times. A
significant contributor to this problem is the import system: when a module
is imported, Python must locate the file, read it from disk, compile it to
bytecode, and execute all top-level code. For applications with deep
dependency trees, this process can take seconds, even when most of the
imported code is never actually used during a particular run.
Developers have worked around this by moving imports inside functions, using
importlib to load modules on demand, or restructuring code to avoid
unnecessary dependencies. These approaches work but make code harder to read
and maintain, scatter import statements throughout the codebase, and require
discipline to apply consistently.
Python now provides a cleaner solution through explicit lazy
imports using the new lazy soft keyword. When you mark an import as
lazy, Python defers the actual module loading until the imported name is
first used. This gives you the organizational benefits of declaring all
imports at the top of the file while only paying the loading cost for
modules you actually use.
The lazy keyword works with both import and from ... import
statements. When you write lazy import heavy_module, Python does not
immediately load the module. Instead, it creates a lightweight proxy object.
The actual module loading happens transparently when you first access the
name:
lazy import json
lazy from pathlib import Path

print("Starting up...")  # json and pathlib are not fully imported yet

data = json.loads('{"key": "value"}')  # json gets fully imported here
p = Path(".")  # pathlib gets fully imported here

This mechanism is particularly useful for applications that import many
modules at the top level but may only use a subset of them in any given run.
The deferred loading reduces startup latency without requiring code
restructuring or conditional imports scattered throughout the codebase.
In the case where loading a lazily imported module fails (for example, if
the module does not exist), Python raises the exception at the point of
first use rather than at import time. The associated traceback includes both
the location where the name was accessed and the original import statement,
making it straightforward to diagnose and debug the failure.
For cases where you want to enable lazy loading globally without modifying
source code, Python provides the -X lazy_imports command-line
option and the PYTHON_LAZY_IMPORTS environment variable. Both
accept two values: all makes all imports lazy by default, and normal
(the default) respects the lazy keyword in source code. The
sys.set_lazy_imports() and sys.get_lazy_imports() functions allow
changing and querying this mode at runtime.
For more selective control, sys.set_lazy_imports_filter() accepts a
callable that determines whether a specific module should be loaded lazily.
The filter receives three arguments: the importing module’s name (or
None), the imported module’s name, and the fromlist (or None for
regular imports). It should return True to allow the import to be lazy,
or False to force eager loading. This allows patterns like making only
your own application’s modules lazy while keeping third-party dependencies
eager:
import sys

def myapp_filter(importing, imported, fromlist):
    return imported.startswith("myapp.")
sys.set_lazy_imports_filter(myapp_filter)
sys.set_lazy_imports("all")

import myapp.slow_module  # lazy (matches filter)
import json               # eager (does not match filter)

The proxy type itself is available as types.LazyImportType for code
that needs to detect lazy imports programmatically.
There are some restrictions on where the lazy keyword can be used. Lazy
imports are only permitted at module scope; using lazy inside a
function, class body, or try/except/finally block raises a
SyntaxError. Neither star imports nor future imports can be lazy
(lazy from module import * and lazy from __future__ import ... both
raise SyntaxError).
For code that cannot use the lazy keyword directly (for example, when
supporting Python versions older than 3.15 while still using lazy
imports on 3.15+), a module can define
__lazy_modules__ as a container of fully qualified module
name strings.  Regular import statements for those modules are then treated
as lazy, with the same semantics as the lazy keyword:
__lazy_modules__ = ["json", "pathlib"]

import json     # lazy
import os       # still eager

(Contributed by Pablo Galindo Salgado and Dino Viehland in gh-142349.)

See also
PEP 810 for the full specification and rationale.

PEP 814: Add frozendict built-in type¶
A new immutable type, frozend
