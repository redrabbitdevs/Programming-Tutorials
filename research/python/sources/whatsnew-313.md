# What's New In Python 3.13

- URL: https://docs.python.org/3/whatsnew/3.13.html
- Accessed: 2026-10-10
- Retrieval: direct fetch (primary source)

Trimmed extract (verbatim lines, some omitted):

```text
This article explains the new features in Python 3.13, compared to 3.12.
Python 3.13 was released on October 7, 2024.
## Summary – Release Highlights¶
Python 3.13 is a stable release of the Python programming
language, with a mix of changes to the language, the implementation
and the standard library.
The biggest changes include a new interactive interpreter,
experimental support for running in a free-threaded mode (PEP 703),
and a Just-In-Time compiler (PEP 744).
Error messages continue to improve, with tracebacks now highlighted in color
by default. The locals() builtin now has defined semantics for changing the returned mapping,
and type parameters now support default values.
The library changes contain removal of deprecated APIs and modules,
as well as the usual improvements in user-friendliness and correctness.
Several legacy standard library modules have now been removed following their deprecation in Python 3.11 (PEP 594).
This article doesn’t attempt to provide a complete specification
of all new features, but instead gives a convenient overview.
For full details refer to the documentation,
such as the Library Reference
and Language Reference.
To understand the complete implementation and design rationale for a change,
refer to the PEP for a particular new feature;
but note that PEPs usually are not kept up-to-date
once a feature has been fully implemented.
See Porting to Python 3.13 for guidance on upgrading from
earlier versions of Python.
Interpreter improvements:
A greatly improved interactive interpreter and
improved error messages.
PEP 667: The locals() builtin now has
defined semantics when mutating the
returned mapping. Python debuggers and similar tools may now more reliably
update local variables in optimized scopes even during concurrent code
execution.
PEP 703: CPython 3.13 has experimental support for running with the
global interpreter lock disabled. See Free-threaded CPython for more details.
PEP 744: A basic JIT compiler was added.
It is currently disabled by default (though we may turn it on later).
Performance improvements are modest – we expect to improve this
over the next few releases.
Color support in the new interactive interpreter,
as well as in tracebacks
and doctest output.
This can be disabled through the PYTHON_COLORS and NO_COLOR
environment variables.
Python data model improvements:
__static_attributes__ stores the names of attributes accessed
through self.X in any function in a class body.
__firstlineno__ records the first line number of a class
definition.
Significant improvements in the standard library:
Add a new PythonFinalizationError exception, raised when an operation
is blocked during finalization.
The argparse module now supports deprecating command-line options,
positional arguments, and subcommands.
The new functions base64.z85encode() and base64.z85decode()
support encoding and decoding Z85 data.
The copy module now has a copy.replace() function,
with support for many builtin types and any class defining
the __replace__() method.
The new dbm.sqlite3 module is now the default dbm backend.
The os module has a suite of new functions
for working with Linux’s timer notification file descriptors.
The random module now has a command-line interface.
Security improvements:
ssl.create_default_context() sets ssl.VERIFY_X509_PARTIAL_CHAIN
and ssl.VERIFY_X509_STRICT as default flags.
C API improvements:
The Py_mod_gil slot is now used to indicate that
an extension module supports running with the GIL disabled.
The PyTime C API has been added,
providing access to system clocks.
PyMutex is a new lightweight mutex that occupies a single byte.
There is a new suite of functions
for generating PEP 669 monitoring events in the C API.
New typing features:
PEP 696: Type parameters (typing.TypeVar, typing.ParamSpec,
and typing.TypeVarTuple) now support defaults.
PEP 702: The new warnings.deprecated() decorator adds support
for marking deprecations in the type system and at runtime.
PEP 705: typing.ReadOnly can be used to mark an item of a
typing.TypedDict as read-only for type checkers.
PEP 742: typing.TypeIs provides more intuitive
type narrowing behavior, as an alternative to typing.TypeGuard.
Platform support:
PEP 730: Apple’s iOS is now an officially supported platform, at tier 3.
PEP 738: Android is now an officially supported platform, at tier 3.
wasm32-wasi is now supported as a tier 2 platform.
wasm32-emscripten is no longer an officially supported platform.
Important removals:
PEP 594: The remaining 19 “dead batteries”
(legacy stdlib modules) have been removed from the standard library:
aifc, audioop, cgi, cgitb, chunk,
crypt, imghdr, mailcap, msilib, nis,
nntplib, ossaudiodev, pipes, sndhdr,
spwd, sunau, telnetlib, uu and xdrlib.
Remove the 2to3 tool and lib2to3 module
(deprecated in Python 3.11).
Remove the tkinter.tix module (deprecated in Python 3.6).
Remove the locale.resetlocale() function.
Remove the typing.io and typing.re namespaces.
Remove chained classmethod descriptors.
Release schedule changes:
PEP 602 (“Annual Release Cycle for Python”) has been updated
to extend the full support (‘bugfix’) period for new releases to two years.
This updated policy means that:
Python 3.9–3.12 have one and a half years of full support,
followed by three and a half years of security fixes.
Python 3.13 and later have two years of full support,
followed by three years of security fixes.

[...]
### Free-threaded CPython¶
CPython now has experimental support for running in a free-threaded mode,
with the global interpreter lock (GIL) disabled.
This is an experimental feature and therefore is not enabled by default.
The free-threaded mode requires a different executable,
usually called python3.13t or python3.13t.exe.
Pre-built binaries marked as free-threaded can be installed as part of
the official Windows
and macOS installers,
or CPython can be built from source with the --disable-gil option.
Free-threaded execution allows for full utilization of the available
processing power by running threads in parallel on available CPU cores.
While not all software will benefit from this automatically, programs
designed with threading in mind will run faster on multi-core hardware.
The free-threaded mode is experimental and work is ongoing to improve it:
expect some bugs and a substantial single-threaded performance hit.
Free-threaded builds of CPython support optionally running with the GIL
enabled at runtime using the environment variable PYTHON_GIL or
the command-line option -X gil=1.
To check if the current interpreter supports free-threading, python -VV
and sys.version contain “experimental free-threading build”.
The new sys._is_gil_enabled() function can be used to check whether
the GIL is actually disabled in the running process.
C-API extension modules need to be built specifically for the free-threaded
build. Extensions that support running with the GIL disabled should
use the Py_mod_gil slot. Extensions using single-phase init should
use PyUnstable_Module_SetGIL() to indicate whether they support
running with the GIL disabled. Importing C extensions that don’t use these
mechanisms will cause the GIL to be enabled, unless the GIL was explicitly
disabled with the PYTHON_GIL environment variable or the
-X gil=0 option.
pip 24.1 or newer is required to install packages with C extensions in the
free-threaded build.
This work was made possible thanks to many individuals and
organizations, including the large community of contributors to Python
and third-party projects to test and enable free-threading support.
Notable contributors include:
Sam Gross, Ken Jin, Donghee Na, Itamar Oren, Matt Page, Brett Simmers,
Dino Viehland, Carl Meyer, Nathan Goldbaum, Ralf Gommers,
Lysandros Nikolaou, and many others.
```
