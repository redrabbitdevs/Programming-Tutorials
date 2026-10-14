# e2-import-system: extracts for Python module E2 (fetched 2026-10-14)

## https://peps.python.org/pep-0829/

[lines 100-135 of the text dump]

×

See PEP 1 for how to propose changes.

Abstract

This PEP changes the way packages influence Python’s startup process.
Previously controlled through legacy .pth files parsed and executed by the
site.py file during interpreter startup, such files are used to extend
sys.path and execute package initialization code before control is passed
to the first line of user code.

This PEP proposes:

Replacing import lines in .pth files with entry point specifications
(i.e. pkg.mod:callable) in .start files.

The presence of a matching .start file disables import line
processing in the matched .pth file.

The sys.path extension functionality of .pth files is retained.

Support for import lines in .pth files will be gradually removed:

For the first three years (expected to be Python 3.15, 3.16, and 3.17)
import line processing in .pth files will remain, except in the
presence of a matching .start file.

For the next two years (expected to be Python 3.18 and 3.19), import
lines in .pth files will be silently ignored.

Afterwards (expected to be Python 3.20 and higher), a warning will be
produced for the existence of import lines in .pth files.

Motivation

## https://docs.python.org/3/library/site.html

[lines 124-170 of the text dump]

Startup entry points (.start files)¶

Added in version 3.15.

A startup entry point file is a file whose name has the form
name.start and exists in one of the site-packages directories
described above.  Each file specifies entry points to be called during
interpreter startup, using the pkg.mod:callable syntax understood by
pkgutil.resolve_name().

Each non-blank line that does not begin with # must contain an entry
point reference in the form pkg.mod:callable.  The colon and callable
portion are mandatory.  Each callable is invoked with no arguments, and
any return value is discarded.

.start files are processed after all .pth path extensions
have been applied to sys.path, ensuring that paths are available
before any startup code runs.

Unlike sys.path extensions from .pth files, duplicate entry
points are not de-duplicated — if an entry point appears more than once,
it will be called more than once.

If an exception occurs during resolution or invocation of an entry point,
a traceback is printed to sys.stderr and processing continues with
the remaining entry points.

.start files must be encoded in UTF-8.

PEP 829 defined the original specification for these features.

Note

If a name.start file exists alongside a name.pth file
with the same base name, any import lines in the .pth file are
ignored in favor of the entry points in the .start file.

Note

Executable lines (import lines in name.pth files and
name.start file entry points) are always run at Python startup
(unless -S is given to disable the site.py module entirely),
regardless of whether a particular module is actually going to be used.

Note

name.start files invoke pkgutil.resolve_name() with
