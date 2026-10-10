# What's New In Python 3.14

- URL: https://docs.python.org/3/whatsnew/3.14.html
- Accessed: 2026-10-10
- Retrieval: direct fetch (primary source)

Trimmed extract (verbatim lines, some omitted):

```text
This article explains the new features in Python 3.14, compared to 3.13.
Python 3.14 was released on 7 October 2025.
## Summary – Release highlights¶
Python 3.14 is a stable release of the Python programming
language, with a mix of changes to the language, the implementation,
and the standard library.
The biggest changes include template string literals,
deferred evaluation of annotations,
and support for subinterpreters in
the standard library.
The library changes include significantly improved capabilities for
introspection in asyncio,
support for Zstandard via a new
compression.zstd module, syntax highlighting in the REPL,
as well as the usual deprecations and removals,
and improvements in user-friendliness and correctness.
This article doesn’t attempt to provide a complete specification
of all new features, but instead gives a convenient overview.
For full details refer to the documentation,
such as the Library Reference
and Language Reference.
To understand the complete implementation and design rationale for a change,
refer to the PEP for a particular new feature;
but note that PEPs usually are not kept up-to-date
once a feature has been fully implemented.
See Porting to Python 3.14 for guidance on upgrading from
earlier versions of Python.
Interpreter improvements:
PEP 649 and PEP 749: Deferred evaluation of annotations
PEP 734: Multiple interpreters in the standard library
PEP 750: Template strings
PEP 758: Allow except and except* expressions without brackets
PEP 765: Control flow in finally blocks
PEP 768: Safe external debugger interface for CPython
A new type of interpreter
Free-threaded mode improvements
Improved error messages
Incremental garbage collection
Significant improvements in the standard library:
PEP 784: Zstandard support in the standard library
Asyncio introspection capabilities
Concurrent safe warnings control
Syntax highlighting in the default interactive shell, and color output in several
standard library CLIs
C API improvements:
PEP 741: Python configuration C API
Platform support:
PEP 776: Emscripten is now an officially supported platform, at tier 3.
Release changes:
PEP 779: Free-threaded Python is officially supported
PEP 761: PGP signatures have been discontinued for official releases
Windows and macOS binary releases now support the experimental
just-in-time compiler
Binary releases for Android are now provided

[...]
### Free-threaded mode improvements¶
CPython’s free-threaded mode (PEP 703), initially added in 3.13,
has been significantly improved in Python 3.14.
The implementation described in PEP 703 has been finished, including C API
changes, and temporary workarounds in the interpreter were replaced with
more permanent solutions.
The specializing adaptive interpreter (PEP 659) is now enabled
in free-threaded mode, which along with many other optimizations
greatly improves its performance.
The performance penalty on single-threaded code in free-threaded mode
is now roughly 5-10%, depending on the platform and C compiler used.
From Python 3.14, when compiling extension modules for the free-threaded build of
CPython on Windows, the preprocessor variable Py_GIL_DISABLED now needs to
be specified by the build backend, as it will no longer be determined
automatically by the C compiler. For a running interpreter, the setting that
was used at compile time can be found using sysconfig.get_config_var().

[...]
### PEP 750: Template string literals¶
Template strings are a new mechanism for custom string processing.
They share the familiar syntax of f-strings but, unlike f-strings,
return an object representing the static and interpolated parts of
the string, instead of a simple str.
To write a t-string, use a 't' prefix instead of an 'f':
>>> variety = 'Stilton'
>>> template = t'Try some {variety} cheese!'
>>> type(template)
<class 'string.templatelib.Template'>
Template objects provide access to the static
and interpolated (in curly braces) parts of a string before they are combined.
Iterate over Template instances to access their parts in order:
>>> list(template)
['Try some ', Interpolation('Stilton', 'variety', None, ''), ' cheese!']
It’s easy to write (or call) code to process Template instances.
For example, here’s a function that renders static parts lowercase and
Interpolation instances uppercase:
from string.templatelib import Interpolation
def lower_upper(template):
```
