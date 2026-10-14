# e2-whatsnew-315-internals: extracts for Python module E2 (fetched 2026-10-14)

## https://docs.python.org/3/whatsnew/3.15.html

[lines 409-438 of the text dump]

PEP 831: Frame pointers enabled by default¶

CPython is now built with frame pointers by default on platforms that support
them.  This uses the compiler flags -fno-omit-frame-pointer and
-mno-omit-leaf-frame-pointer, making native stack unwinding faster and
more reliable for system profilers, debuggers, crash analysis tools, and
eBPF-based observability tools.

The flags are exposed through sysconfig, so extension modules built by
tools that consume Python’s build configuration inherit frame pointers by
default.  This propagation is intentional: mixed Python/native profiling needs
an unbroken frame-pointer chain through the interpreter, extension modules,
embedding applications, and native libraries.

Important

Third-party build backends and native build systems should preserve these
flags when they consume Python’s sysconfig values.  Build systems
that compile C, C++, Rust, or other native code without inheriting Python’s
compiler flags should enable equivalent frame-pointer flags themselves.  A
single native component built without frame pointers can break stack
unwinding for the whole Python process.

(Contributed by Pablo Galindo Salgado and Savannah Ostrowski in
gh-149201; PEP 831 written by Pablo Galindo Salgado, Ken Jin,
Savannah Ostrowski, and Diego Russo.)

See also

PEP 831 for further details.

[lines 479-539 of the text dump]

PEP 829: Package startup configuration files¶

Loaded by the site module when -S is not given, .pth files
can contain lines that both extend sys.path and execute arbitrary code
when the line starts with import (followed by a space or tab).  The latter
functionality can be problematic, since it is difficult to know exactly what
gets executed when Python starts up.

As a step towards improving the ability to audit pre-start executable code,
Python 3.15 introduces .start files which contain entry point
specifications of the form pkg.mod:callable where pkg.mod is the
import path to the given callable.  When Python starts up, the callable is
located and called with no arguments.

import lines in .pth files are silently deprecated.  When a
matching .start file is found, import lines in .pth files
are ignored.  There is no change to sys.path extension lines in
.pth files.

The site module also provides site.StartupState to batch
startup processing for multiple site directories, ensuring all static path
extensions are applied before any startup code is executed.  site.main()
uses an instance of this class implicitly to batch process all startup
configuration files during normal interpreter startup.  Callers needing the
same batching behavior can build a StartupState directly and
drive it with addsitedir(),
addusersitepackages(), and
addsitepackages(), then call
process() once at the end of the batch.

(Contributed by Barry Warsaw in gh-148641 and gh-150228.)

PEP 803: Stable ABI for free-threaded builds¶

C extensions that target the Stable ABI can now be
compiled for the new Stable ABI for Free-Threaded Builds (also known
as abi3t), which makes them compatible with
free-threaded builds of CPython.
This usually requires some non-trivial changes to the source code;
specifically:

Switching to API introduced in PEP 697 (Python 3.12), such as
negative basicsize and
PyObject_GetTypeData(), rather than making PyObject
part of the instance struct; and

Switching from a PyInit_ function to a new export hook,
PyModExport_*, introduced for this
purpose in PEP 793, with a new PySlot structure
introduced in PEP 820.

Note that Stable ABI does not offer all the functionality that CPython
has to offer.
Extensions that cannot switch to abi3t should continue to build for
the existing Stable ABI (abi3) and the version-specific ABI for
free-threading (cp315t) separately.

Stable ABI for Free-Threaded Builds should typically
be selected in a build tool. Tools with abi3t support include
meson-python, scikit-build-core, and Maturin; see
Setting up the build for links to their documentation on abi3t builds.

[lines 1120-1127 of the text dump]

gc¶

Python 3.14.0-3.14.4 shipped with a new incremental garbage collector.
However, due to a number of reports
of significant memory pressure in production environments,
it has been reverted back to the generational GC from 3.13.
This is the GC now used in Python 3.14.5 and later and Python 3.15.
(Contributed by Sergey Miryanov in gh-148726.)

[lines 1913-1920 of the text dump]

importlib¶

The load_module() methods of Loader and its
subclasses is removed.
The import system will no longer call it when defined on custom subclasses.
The method has been deprecated in favor of
exec_module() since Python 3.4.
(Contributed by Brett Cannon in gh-97850.)

[lines 1957-1961 of the text dump]

types¶

Removed codeobject.co_lnotab from types.CodeType,
deprecated since Python 3.12 by PEP 626.
(Contributed by Nikita Sobolev in gh-134690.)

[lines 1992-1996 of the text dump]

zipimport¶

Remove deprecated zipimport.zipimporter.load_module().
Use zipimport.zipimporter.exec_module() instead.
(Contributed by Jiahao Li in gh-133656.)

[lines 2393-2409 of the text dump]

Pending removal in Python 3.18¶

No longer accept a boolean value when a file descriptor is expected.
(Contributed by Serhiy Storchaka in gh-82626.)

decimal:

The non-standard and undocumented Decimal format
specifier 'N', which is only supported in the decimal module’s
C implementation, has been deprecated since Python 3.13.
(Contributed by Serhiy Storchaka in gh-89902.)

Deprecations defined by PEP 829:

import lines in name.pth files are silently ignored.

(Contributed by Barry Warsaw in gh-148641.)

[lines 2453-2453 of the text dump]

Pending removal in Python 3.20¶

[lines 2516-2524 of the text dump]

Deprecations defined by PEP 829:

Warnings are produced for import lines found in name.pth
files.

name.pth files are no longer decoded in the locale encoding by
default.  They MUST be encoded in utf-8-sig.

(Contributed by Barry Warsaw in gh-148641.)

[lines 2844-2847 of the text dump]

Add a new module export hook,
PyModExport_*.

(Contributed by Petr Viktorin in PEP 793 and gh-140550.)

[lines 2919-2920 of the text dump]

Add PyUnstable_SetImmortal() C API function to mark objects as immortal.
(Contributed by Kumar Aditya in gh-143300.)

[lines 3119-3120 of the text dump]

CPython is now built with frame pointers enabled by default
(PEP 831). Pass --without-frame-pointers to opt out.
