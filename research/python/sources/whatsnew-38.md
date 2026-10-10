# What's New In Python 3.8

- URL: https://docs.python.org/3/whatsnew/3.8.html
- Accessed: 2026-10-10
- Retrieval: direct fetch (primary source)

Trimmed extract (verbatim lines, some omitted). The 3.8 page has no bullet summary, so the
section headings and first lines are kept.

```text
This article explains the new features in Python 3.8, compared to 3.7.
Python 3.8 was released on October 14, 2019.
## New Features
### Assignment expressions
There is new syntax := that assigns values to variables as part of a larger
expression. It is affectionately known as "the walrus operator" due to
its resemblance to the eyes and tusks of a walrus.
### Positional-only parameters
There is a new function parameter syntax / to indicate that some
function parameters must be specified positionally and cannot be used as
keyword arguments.
### Parallel filesystem cache for compiled bytecode files
### Debug build uses the same ABI as release build
### f-strings support = for self-documenting expressions and debugging
Added an = specifier to f-strings. An f-string such as
f'{expr=}' will expand to the text of the expression, an equal sign,
then the representation of the evaluated expression.
### PEP 578: Python Runtime Audit Hooks
### PEP 587: Python Initialization Configuration
### PEP 590: Vectorcall: a fast calling protocol for CPython
### Pickle protocol 5 with out-of-band data buffers
[...]
### functools
@functools.lru_cache can now be used as a straight decorator rather
than as a function returning a decorator.
[...]
### typing
The typing module incorporates several new features:
A dictionary type with per-key types. See PEP 589 and
typing.TypedDict.
[... also Literal (PEP 586), Final (PEP 591), Protocol (PEP 544)]
```
