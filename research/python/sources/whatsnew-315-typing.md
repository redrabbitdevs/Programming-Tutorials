# What's New In Python 3.15: sentinel and typing sections

- URL: https://docs.python.org/3/whatsnew/3.15.html
- Accessed: 2026-10-12
- Retrieval: direct fetch with curl -sL (primary source)
- Note: Confirms PEP 661, 728, 747 and 800 shipped in 3.15.0.

Trimmed extract (verbatim text, HTML stripped):

```text
===== PEP 661: Add sentinel built-in type¶
-----
PEP 661: Add sentinel built-in type¶
A new sentinel type is added to the builtins module for
creating unique sentinel values with a concise representation. Sentinel
objects preserve identity when copied, support use in type expressions with
the | operator, and can be pickled when they are importable by module and
name.
(Contributed by Jelle Zijlstra in gh-148829; PEP 661 written by Tal Einat.)
See also
PEP 661 for further details.
PEP 799: A dedicated profiling package¶
A new profiling module ha
===== typing¶
-----
typing¶
PEP 747: Add TypeForm, a new special form for annotating
values that are themselves type expressions.
TypeForm[T] means “a type form object describing T (or a type
assignable to T)”. At runtime, TypeForm(x) simply returns x,
which allows explicit annotation of type-form values without changing
behavior.
This helps libraries that accept user-provided type expressions
(for example int, str | None, TypedDict
classes, or list[int]) expose precise signatures:
from typing import Any, TypeForm
def cast[T](typ: TypeForm[T], value: Any) -> T: ...
(Contributed by Jelle Zijlstra in gh-145033.)
PEP 728: Add support in TypedDict for the closed
and extra_items class arguments. A closed TypedDict
does not allow extra keys beyond those specified in the class body, while
a TypedDict with extra_items allows arbitrary extra
items where the values are of the specified type. (Contributed by Angela
Liss in gh-137840.)
Code like class ExtraTypeVars(P1[S], Protocol[T, T2]): ... now raises
a TypeError, because S is not listed in Protocol parameters.
(Contributed by Nikita Sobolev in gh-137191.)
Code like class B2(A[T2], Protocol[T1, T2]): ... now correctly handles
type parameters order: it is (T1, T2), not (T2, T1)
as it was incorrectly inferred at runtime before.
(Contributed by Nikita Sobolev in gh-137191.)
PEP 800: Add @typing.disjoint_base, a new decorator marking a class
as a disjoint base. This is an advanced feature primarily intended to allow
type checkers to faithfully reflect the runtime semantics of types defined
as builtins or in compiled extensions. If a class C is a disjoint base, then
child classes of that class cannot inherit from other disjoint bases that are
not parent or child classes of C. (Contributed by Jelle Zijlstra in gh-148639.)
TypeVarTuple now accepts bound, covariant,
contravariant, and infer_variance keyword arguments, matching the
interface of TypeVar and ParamSpec.
bound semantics remain undefined in the specification.
unicodedata¶
The Unicode database has been updated to Unicode 17.0.0.
(Contributed by Benjamin Peterson in gh-138706.)
Add unicodedata.isxidstart() and unicodedata.isxidcontinue()
functions to check whether a character can start or
-----
typing¶
typing.ByteString has been removed from typing.__all__.
typing.ByteString has been deprecated since Python 3.9, and is
scheduled for removal in Python 3.17.
(Contributed by Alex Waygood in gh-118803.)
The undocumented keyword argument syntax for creating
NamedTuple classes (for example,
Point = NamedTuple("Point", x=int, y=int)) is no longer supported.
Use the class-based syntax or the functional syntax instead.
(Contributed by Bénédikt Tran in gh-133817.)
Using TD = TypedDict("TD") or TD = TypedDict("TD", None) to
construct a TypedDict type with zero fields is no
longer supported. Use class TD(TypedDict): pass
or TD = TypedDict("TD", {}) instead.
(Contributed by Bénédikt Tran in gh-133823.)
Deprecated @typing.no_type_check_decorator has been removed.
(Contributed by Nikita Sobolev in gh-133601.)
wave¶
Removed the getmark(), setmark() and getmarkers() methods
of the Wave_read and Wave_write classes,
which were deprecated since Python 3.13.
(Contributed by Bénédikt Tran in gh-133873.)
zipimport¶
Remove deprecated zipimport.zipimporter.load_module().
Use zipimport.zipimporter.exec_module() instead.
(Contributed by Jiahao Li in gh-133656.)
Deprecated¶
New deprecations¶
ast:
Creating instances of abstract AST nodes (such as ast.AST
or ast.expr) is deprecated and will raise an error in Python 3.20.
(Contributed by Brian Schubert in gh-116021.)
base64:
Accepting the + and / characters with an alternative alphabet in
b64decode() and urlsafe_b64decode() is now
deprecated.
In future Python versions they will be errors in the strict mode and
discarded in the non-strict mode.
(Contributed by Serhiy Storchaka in gh-125346.)
CLI:
Deprecate -b and -bb command-line options
and schedule them to become no-ops in Python 3.17.
These were primarily helpers for the Python 2 -> 3 transition.
Starting with Python 3.17, no BytesWarning will be raised
for these cases; use a type checker instead.
(Contributed by Nikita Sobolev in gh-136355.)
collections.abc:
The following statements now cause DeprecationWarnings to be emitted
at runtime:
from collections.abc import ByteString
import collections.abc; collections.abc.ByteString.
DeprecationWarnings were already emitted if
collectio
```
