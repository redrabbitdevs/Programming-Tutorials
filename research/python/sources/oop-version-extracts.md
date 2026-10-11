# Version extracts for module I3 (object-oriented Python)

Fetched 2026-10-11 with `curl -sL https://docs.python.org/3/...`, trimmed to the lines that carry a version claim.

## dataclasses `slots` and `kw_only` (3.10)
Source: https://docs.python.org/3/library/dataclasses.html and https://docs.python.org/3/whatsnew/3.10.html

- `kw_only`: "If true (the default value is False), then all fields will be marked as keyword-only." Added in version 3.10.
- `slots`: "If true (the default is False), `__slots__` attribute will be generated and new class will be returned instead of the original one." Added in version 3.10.
- What's New 3.10, dataclasses: "Added slots parameter in @dataclasses.dataclass decorator." and "dataclasses now supports fields that are keyword-only in the generated `__init__` method." (`KW_ONLY` marker, `kw_only=True`, `field(kw_only=True)`).
- `dataclasses.replace(obj, /, **changes)` creates a new object of the same type, calling `__init__` (so `__post_init__` runs).

## `copy.replace()` (3.13)
Source: https://docs.python.org/3/whatsnew/3.13.html (also cached in `whatsnew-313.md`)

"The copy module now has a copy.replace() function, with support for many builtin types and any class defining the `__replace__()` method."

## `enum.StrEnum` (3.11)
Source: https://docs.python.org/3/whatsnew/3.11.html and https://docs.python.org/3/library/enum.html

What's New 3.11, enum: "Added StrEnum, with members that can be used as (and must be) strings." Library docs: "Added in version 3.11: StrEnum, EnumCheck, ReprEnum, ..." `StrEnum` with `auto()` uses the lower-cased member name as the value.

## `typing.override` (3.12, PEP 698)
Source: https://docs.python.org/3/library/typing.html#typing.override

"Decorator to indicate that a method in a subclass is intended to override a method or attribute in a superclass. Type checkers should emit an error if a method decorated with @override does not, in fact, override anything." "The decorator will attempt to set an `__override__` attribute to True on the decorated object." "Added in version 3.12." Also cached in `whatsnew-312.md` (PEP 698).

## `typing.Protocol` (3.8)
Cached in `whatsnew-38.md` ("typing: TypedDict, Literal, Final, Protocol"; PEP 544).

## Unhashable error wording (3.14)
Source: https://docs.python.org/3/whatsnew/3.14.html

What's New 3.14, "Improved error message when trying to add an instance of an unhashable type to a dict or set": `TypeError: cannot use 'dict' as a set element (unhashable type: 'dict')` and `TypeError: cannot use 'list' as a dict key (unhashable type: 'list')`.
