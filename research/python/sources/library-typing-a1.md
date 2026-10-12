# typing module (3.15 docs): version notes used by module A1

- URL: https://docs.python.org/3/library/typing.html
- Accessed: 2026-10-12
- Retrieval: direct fetch with curl -sL (primary source)
- Note: Runtime probe on CPython 3.15.0: typing.TypeForm, typing.disjoint_base, typing.NoExtraItems, typing.TypeIs, typing.ReadOnly all exist; TypedDict accepts closed= and extra_items=.

Trimmed extract (verbatim text, HTML stripped):

```text
typing.TypeIs¶
    Added in version 3.13.
typing.TypeGuard¶
    Added in version 3.10.
typing.ReadOnly¶
    Added in version 3.13.
typing.Required¶
    Added in version 3.11.
typing.NotRequired¶
    Added in version 3.11.
typing.Unpack¶
    Added in version 3.11.
@typing.override¶
    Added in version 3.12.
typing.Self¶
    Added in version 3.11.
typing.Literal¶
    Added in version 3.8.
    Changed in version 3.9.1: Literal now de-duplicates parameters. Equality comparisons of
typing.Final¶
    Added in version 3.8.
    Changed in version 3.13: Final can now be nested in ClassVar and vice versa.
typing.assert_never(arg, /)¶
    Added in version 3.11.
typing.Concatenate¶
    Added in version 3.10.
class typing.TypeAliasType(name, value, *, type_params=(), qualname=None)¶
    Added in version 3.12.
typing.get_type_hints(obj, globalns=None, localns=None, include_extras=False, *, format=Format.VALUE)¶
    Changed in version 3.9: Added include_extras parameter as part of PEP 593.
    Changed in version 3.11: Previously, Optional[t] was added for function and method annotations
    Changed in version 3.14: Added the format parameter. See the documentation on
    Changed in version 3.14: Calling get_type_hints() on instances is no longer supported.
typing.TypeForm¶
    Added in version 3.15.
@typing.disjoint_base¶
    Added in version 3.15.
typing.reveal_type(obj, /)¶
    Added in version 3.11.

===== Changed in version 3.13: Support for default values was added
-----
Changed in version 3.13: Support for default values was adde
-----
Changed in version 3.13: Support for default values was adde
-----
Changed in version 3.13: Support for default values was adde
===== Changed in version 3.1[3-5][^\n]*TypedDict
-----
Changed in version 3.13: Removed support for the keyword-argument method of creating TypedDicts.
Changed in version 3.13: Support for the ReadOnly qualifier was added. See PEP 705.
Changed in version
===== typing.TypeForm¶
-----
typing.TypeForm¶
A special form representing the value that results from evaluating a
type expression.
This value encodes the information supplied in the type expression, and
it represents the type described by that type expression.
When used in a type expression, TypeForm describes a set of type form
objects. It accepts a single type argument, which must be a valid type
expression. TypeForm[T] describes the set of all type form objects that
represent the type T or types assignable to T.
TypeForm(obj) simply returns obj unchanged. This is useful for
explicitly marking a value as a type form for static type checkers.
Example:
from typing import Any, TypeForm
def cast[T](typ: TypeForm[T], value: Any) -> T: ...
reveal_type(cast(int, "x")) # Revealed type is "int"
See PEP 747 for details.
Added in version 3.15.
typing.TypeIs¶
Special typing construct for marking user-defined type predicate f
===== @typing.disjoint_base¶
-----
@typing.disjoint_base¶
Decorator to mark a class as a disjoint base.
Type checkers do not allow child classes of a disjoint base C to
inherit from other disjoint bases that are not parent or child classes of C.
For example:
@disjoint_base
class Disjoint1: pass
@disjoint_base
class Disjoint2: pass
class Disjoint3(Disjoint1, Disjoint2): pass # Type checker error
Type checkers can use knowledge of disjoint bases to detect unreachable code
and determine when two types can overlap.
The corresponding runtime concept is a solid base (see Multiple inheritance).
Classes that are solid bases at runtime can be marked with @disjoint_base in stub files.
Users may also mark other classes as disjoint bases to indicate to type checkers that
multiple inheritance with other disjoint bases should not be allowed.
Note that the concept of a solid base is a CPython implementation
detail, and the exact set of standard library classes that are
disjoint bases at runtime may change in future versions of Python.
Added in version 3.15.
@typing.type_check_only¶
Decorator to mark a class or function as unavailabl
===== closed=True, the TypedDict
-----
closed=True, the TypedDict cannot contain additional keys.
class ClosedPoint(TypedDict, closed=True):
 x: int
 y: int
class ClosedPoint3D(ClosedPoint): # type checker error: cannot add keys to a closed TypedDict
 z: int
Setting closed=False explicitly requests the default open behavior. If the argument is not
passed, this state is inherited from the parent class.
In addition to being open or closed, a TypedDict can also be configured to have extra items.
If the extra_items class argument is set to a type, the TypedDict can contain arbitrary
additional keys, but the values of those keys must be of the specified type.
class ExtraItemsPoint(TypedDict, extra_items=int):
 x: int
 y: int
point: ExtraItemsPoint = {'x': 1, 'y': 2, 'anything': 3} # OK
The extra_items argument is also inherited through subclassing. It is unset
by default, and it may not be used together with the closed argument.
A
```
