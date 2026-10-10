# What's New In Python 3.15

- URL: https://docs.python.org/3/whatsnew/3.15.html
- Accessed: 2026-10-10
- Retrieval: direct fetch (primary source)

Trimmed extract (verbatim lines, some omitted):

```text
This article explains the new features in Python 3.15, compared to 3.14.
Python 3.15 was released on 9 October 2026.
## Summary – Release highlights¶
Python 3.15 is the latest stable release of the Python programming
language, with a mix of changes to the language, the implementation,
and the standard library.
The biggest changes include
lazy imports,
frozendict and
sentinel builtins,
UTF-8 as the default encoding,
unpacking in comprehensions,
and a stable ABI for free-threaded builds.
The library changes include a new
profiling package with
Tachyon,
a high-frequency statistical sampling profiler,
more color in command-line output,
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
See Porting to Python 3.15 for guidance on upgrading from
earlier versions of Python.
Interpreter improvements:
PEP 661: Add sentinel built-in type
PEP 686: Python now uses UTF-8 as the default encoding
PEP 798: Unpacking in comprehensions
PEP 810: Explicit lazy imports for faster startup times
PEP 814: Add frozendict built-in type
PEP 829: Package startup configuration files
The experimental JIT compiler has been significantly upgraded
Improved error messages
Significant improvements in the standard library:
PEP 799: A dedicated profiling package for organizing Python
profiling tools
PEP 799: Tachyon: High-frequency statistical sampling profiler
More color
New typing features:
PEP 728: TypedDict with typed extra items
PEP 747: Annotating type forms with TypeForm
PEP 800: Disjoint bases in the type system
C API improvements:
PEP 782: A new PyBytesWriter C API to create a Python bytes object
PEP 788: Protection against finalization in the C API
PEP 803, 820, 793:
Stable ABI for free-threaded builds and
related C API
Build changes:
PEP 831: Frame pointers are enabled by default for improved
system-level observability
Release changes:
The official Windows 64-bit binaries now use the tail-calling interpreter
The official macOS binaries now install free-threading support by default

[...]
### PEP 810: Explicit lazy imports¶
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

[...]
### PEP 814: Add frozendict built-in type¶
A new immutable type, frozendict, is added to the builtins module.
It does not allow modification after creation. A frozendict is not a subclass of dict;
it inherits directly from object. A frozendict is hashable
as long as all of its keys and values are hashable. A frozendict preserves
insertion order, but comparison does not take order into account.
For example:
>>> a = frozendict(x=1, y=2)

[...]
### PEP 661: Add sentinel built-in type¶
A new sentinel type is added to the builtins module for
creating unique sentinel values with a concise representation. Sentinel
objects preserve identity when copied, support use in type expressions with
the | operator, and can be pickled when they are importable by module and
name.
See also
PEP 661 for further details.

[...]
## Other language changes¶
Python now uses UTF-8 as the default encoding, independent of the system’s
environment. This means that I/O operations without an explicit encoding,
for example, open('flying-circus.txt'), will use UTF-8.
UTF-8 is a widely-supported Unicode character encoding that has become a
de facto standard for representing text, including nearly every webpage
on the internet, many common file formats, programming languages, and more.
This only applies when no encoding argument is given. For best
compatibility between versions of Python, ensure that an explicit encoding
argument is always provided. The opt-in encoding warning
can be used to identify code that may be affected by this change.
The special encoding='locale' argument uses the current locale
encoding, and has been supported since Python 3.10.
To retain the previous behaviour, Python’s UTF-8 mode may be disabled with
the PYTHONUTF8=0 environment variable or the
-X utf8=0 command-line option.
See also
PEP 686 for further details.

[...]
### Upgraded experimental JIT compiler¶
Results from the pyperformance
benchmark suite report a
7-8%
geometric mean performance improvement for the JIT over the standard CPython
interpreter built with all optimizations enabled on x86-64 Linux. On AArch64
macOS, the JIT has an
11-12%
speedup over the tail calling interpreter
with all optimizations enabled. The speedups for JIT
builds versus no JIT builds range from roughly 15% slowdown to over
100% speedup (ignoring the unpack_sequence microbenchmark) on

[...]
## Removed¶
### ast¶
The constructors of AST nodes now raise a TypeError
when a required argument is omitted or when a keyword argument that does not
map to a field on the AST node is passed. These cases had previously raised a
DeprecationWarning since Python 3.13.
### collections.abc¶
collections.abc.ByteString has been removed from
collections.abc.__all__. collections.abc.ByteString has been
deprecated since Python 3.12, and is scheduled for removal in Python 3.17.
### ctypes¶
Removed the undocumented function ctypes.SetPointerType(),
which has been deprecated since Python 3.13.
### datetime¶
strptime() now raises ValueError when the
format string contains %d (day of month) without a year directive.
This has been deprecated since Python 3.13.
### glob¶
Removed the undocumented glob.glob0() and glob.glob1()
functions, which have been deprecated since Python 3.13. Use
glob.glob() and pass a directory to its root_dir argument instead.
### http.server¶
Removed the CGIHTTPRequestHandler class
and the --cgi flag from the python -m http.server
command-line interface. They were deprecated in Python 3.13.
### importlib¶
The load_module() methods of Loader and its
subclasses is removed.
The import system will no longer call it when defined on custom subclasses.
The method has been deprecated in favor of
exec_module() since Python 3.4.
### importlib.resources¶
Removed deprecated package parameter
from importlib.resources.files() function.
### pathlib¶
Removed deprecated pathlib.PurePath.is_reserved().
Use os.path.isreserved() to detect reserved paths on Windows.
### platform¶
Removed the platform.java_ver() function,
which was deprecated since Python 3.13.
### sre_*¶
Removed sre_compile, sre_constants and sre_parse modules.
### sysconfig¶
Removed the check_home parameter of sysconfig.is_python_build().
### threading¶
Remove support for arbitrary positional or keyword arguments in the C
implementation of RLock objects. This was deprecated
in Python 3.14.
### types¶
Removed codeobject.co_lnotab from types.CodeType,
deprecated since Python 3.12 by PEP 626.
### typing¶
typing.ByteString has been removed from typing.__all__.
typing.ByteString has been deprecated since Python 3.9, and is
scheduled for removal in Python 3.17.
The undocumented keyword argument syntax for creating
NamedTuple classes (for example,
Point = NamedTuple("Point", x=int, y=int)) is no longer supported.
Use the class-based syntax or the functional syntax instead.
Using TD = TypedDict("TD") or TD = TypedDict("TD", None) to
construct a TypedDict type with zero fields is no
longer supported. Use class TD(TypedDict): pass
or TD = TypedDict("TD", {}) instead.
Deprecated @typing.no_type_check_decorator has been removed.
### wave¶
Removed the getmark(), setmark() and getmarkers() methods
of the Wave_read and Wave_write classes,
which were deprecated since Python 3.13.
### zipimport¶
Remove deprecated zipimport.zipimporter.load_module().
Use zipimport.zipimporter.exec_module() instead.

[...]
### New deprecations¶
ast:
Creating instances of abstract AST nodes (such as ast.AST
or ast.expr) is deprecated and will raise an error in Python 3.20.
base64:
Accepting the + and / characters with an alternative alphabet in
b64decode() and urlsafe_b64decode() is now
deprecated.
In future Python versions they will be errors in the strict mode and
discarded in the non-strict mode.
CLI:
Deprecate -b and -bb command-line options
and schedule them to become no-ops in Python 3.17.
These were primarily helpers for the Python 2 -> 3 transition.
Starting with Python 3.17, no BytesWarning will be raised
for these cases; use a type checker instead.
collections.abc:
The following statements now cause DeprecationWarnings to be emitted
at runtime:
from collections.abc import ByteString
import collections.abc; collections.abc.ByteString.
DeprecationWarnings were already emitted if
collections.abc.ByteString was subclassed or used as the second
argument to isinstance() or issubclass(), but warnings were not
previously emitted if it was merely imported or accessed from the
collections.abc module.
hashlib:
In hash function constructors such as new() or the
direct hash-named constructors such as md5() and
sha256(), the optional initial data parameter could
also be passed as a keyword argument named data= or string= in
various hashlib implementations.
Support for the string keyword argument name is now deprecated and
is slated for removal in Python 3.19. Prefer passing the initial data as
a positional argument for maximum backwards compatibility.
http.cookies:
Morsel.js_output and
BaseCookie.js_output are
deprecated and will be removed in Python 3.19. Use
Morsel.output or
BaseCookie.output instead.
imaplib:
Altering IMAP4.file is now deprecated
and slated for removal in Python 3.19. This property is now unused
and changing its value does not explicitly close the current file.
profile:
The profile module is deprecated and will be removed in
Python 3.17. Use profiling.tracing instead, which provides a
compatible API. See PEP 799 for details.
re:
re.match() and re.Pattern.match() are now
soft deprecated in favor of the new re.prefixmatch() and
re.Pattern.prefixmatch() APIs, which have been added as alternate,
more explicit names. These are intended to be used to alleviate confusion
around what match means by following the Zen of Python’s “Explicit is
better than implicit” mantra. Most other language regular expression
libraries use an API named match to mean what Python has always called
search.
We do not plan to remove the older match() name, as it has been
used in code for over 30 years. Code supporting older versions of Python

[...]
### Pending removal in Python 3.16¶
The import system:
Setting __loader__ on a module while
failing to set __spec__.loader
is deprecated. In Python 3.16, __loader__ will cease to be set or
taken into consideration by the import system or the standard library.
array:
The 'u' format code (wchar_t)
has been deprecated in documentation since Python 3.3
and at runtime since Python 3.13.
Use the 'w' format code (Py_UCS4)
for Unicode characters instead.
asyncio:
asyncio.iscoroutinefunction() is deprecated
and will be removed in Python 3.16;
use inspect.iscoroutinefunction() instead.
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
builtins:
Bitwise inversion on boolean types, ~True or ~False
has been deprecated since Python 3.12,
as it produces surprising and unintuitive results (-2 and -1).
Use not x instead for the logical negation of a Boolean.
In the rare case that you need the bitwise inversion of
the underlying integer, convert to int explicitly (~int(x)).
functools:
Calling the Python implementation of functools.reduce() with function
or sequence as keyword arguments has been deprecated since Python 3.14.
logging:
Support for custom logging handlers with the strm argument is deprecated
and scheduled for removal in Python 3.16. Define handlers with the stream
argument instead. (Contributed by Mariusz Felisiak in gh-115032.)
mimetypes:
Valid extensions start with a ‘.’ or are empty for
mimetypes.MimeTypes.add_type().
Undotted extensions are deprecated and will
raise a ValueError in Python 3.16.
shutil:
The ExecError exception
has been deprecated since Python 3.14.
It has not been used by any function in shutil since Python 3.4,
and is now an alias of RuntimeError.
symtable:
The Class.get_methods method
has been deprecated since Python 3.14.
sys:
The _enablelegacywindowsfsencoding() function
has been deprecated since Python 3.13.
Use the PYTHONLEGACYWINDOWSFSENCODING environment variable instead.
sysconfig:
The sysconfig.expand_makefile_vars() function
has been deprecated since Python 3.14.
Use the vars argument of sysconfig.get_paths() instead.
tarfile:
The undocumented and unused TarFile.tarfile attribute
has been deprecated since Python 3.13.
### Pending removal in Python 3.17¶

[...]
### Pending removal in future versions¶
The following APIs will be removed in the future,
although there is currently no date scheduled for their removal.
argparse:
Nesting argument groups and nesting mutually exclusive
groups are deprecated.
Passing the undocumented keyword argument prefix_chars to
add_argument_group() is now
deprecated.
The argparse.FileType type converter is deprecated.
builtins:
Generators: throw(type, exc, tb) and athrow(type, exc, tb)
signature is deprecated: use throw(exc) and athrow(exc) instead,
the single argument signature.
Currently Python accepts numeric literals immediately followed by keywords,
for example 0in x, 1or x, 0if 1else 2. It allows confusing and
ambiguous expressions like [0x1for x in y] (which can be interpreted as
[0x1 for x in y] or [0x1f or x in y]). A syntax warning is raised
if the numeric literal is immediately followed by one of keywords
and, else, for, if,
in, is and or. In a future release it
will be changed to a syntax error. (gh-87999)
Support for __index__() and __int__() method returning non-int type:
these methods will be required to return an instance of a strict subclass of
int.
Support for __float__() method returning a strict subclass of
float: these methods will be required to return an instance of
float.
Support for __complex__() method returning a strict subclass of
complex: these methods will be required to return an instance of
complex.
Passing a complex number as the real or imag argument in the
complex() constructor is now deprecated; it should only be passed
as a single positional argument.
calendar: calendar.January and calendar.February constants are
deprecated and replaced by calendar.JANUARY and
calendar.FEBRUARY.
codecs: use open() instead of codecs.open(). (gh-133038)
codeobject.co_lnotab: use the codeobject.co_lines() method
instead.
datetime:
utcnow():
use datetime.datetime.now(tz=datetime.UTC).
utcfromtimestamp():
use datetime.datetime.fromtimestamp(timestamp, tz=datetime.UTC).
gettext: Plural value must be an integer.
```
