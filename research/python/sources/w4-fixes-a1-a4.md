# W4 fix PR: version extracts for the A1 and A4 additions

Fetched 2026-10-13 with `curl -sL` from docs.python.org/3.15/ (serving 3.15.0), peps.python.org and pypi.org.
Each line is quoted from the page named, then the claim it supports. Every example was also run on CPython 3.15.0.

## typing (library/typing.html)
- `typing.ClassVar`: "Added in version 3.5.3." "ClassVar does not change Python runtime behavior, but it can be used by static type checkers." Supports lesson 01, `ClassVar`.
- `class typing.NewType(name, tp)`: "Added in version 3.5.2." "Changed in version 3.10: NewType is now a class rather than a function." "At runtime, however, calling a NewType returns its argument unchanged." Supports lesson 01, `NewType`.
- `@typing.overload`: "@overload-decorated definitions are for the benefit of the type checker only, since they will be overwritten by the non-@overload-decorated definition." "Changed in version 3.11: Overloaded functions can now be introspected at runtime using get_overloads()." `typing.get_overloads(func)`: "Added in version 3.11." Supports lesson 02 (minVersion 3.12, so no `<Since>`).
- `typing.TYPE_CHECKING`: "A special constant that is assumed to be True by static type checkers. It's False at runtime." "annotations aren't eagerly evaluated (see PEP 649) so using undefined symbols in annotations is harmless–as long as you don't later examine them." "Added in version 3.5.2." Supports lesson 05.

## PEP 749 (peps.python.org/pep-0749/)
- "Sometime after the last release that did not support PEP 649 semantics (expected to be 3.13) reaches its end-of-life, from __future__ import annotations is deprecated." "After at least two releases, the future import is removed". Supports lesson 05, `from __future__ import annotations`.

## Data model (reference/datamodel.html)
- `object.__getattr__`: "Called when the default attribute access fails with an AttributeError". "if the attribute is found through the normal mechanism, __getattr__() is not called."
- `object.__getattribute__`: "Called unconditionally to implement attribute accesses for instances of the class." "its implementation should always call the base class method with the same name to access any attributes it needs, for example, object.__getattribute__(self, name)." "This method may still be bypassed when looking up special methods as the result of implicit invocation via language syntax or built-in functions."
- Customizing module attribute access: "Added in version 3.7: __getattr__ and __dir__ module attributes." "Defining module __getattr__ and setting module __class__ only affect lookups made using the attribute access syntax – directly accessing the module globals ... is unaffected." (PEP 562). Supports lesson 21.

## types (library/types.html)
- `class types.GenericAlias`: "Added in version 3.9." Lesson 22 imports it in its main path, so its minVersion is 3.9 (checked: ImportError on 3.8, runs on 3.9).

## Checker versions (pypi.org, checked 2026-10-13)
- mypy: latest release 2.4.0 (uploaded 2026-10-01). The lessons' transcripts were made with 2.3.1, so lessons 01, 06 and 07 present checker support as "as of mypy 2.3.1 and pyright 1.1.414, October 2026", not as current fact.
- pyright: latest release 1.1.414 (uploaded 2026-09-10).
