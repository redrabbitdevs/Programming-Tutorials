# What's New In Python 3.9

- URL: https://docs.python.org/3/whatsnew/3.9.html
- Accessed: 2026-10-10
- Retrieval: direct fetch (primary source)

Trimmed extract (verbatim lines, some omitted):

```text
This article explains the new features in Python 3.9, compared to 3.8.
Python 3.9 was released on October 5, 2020.
## Summary – Release highlights¶
New syntax features:
PEP 584, union operators added to dict;
PEP 585, type hinting generics in standard collections;
PEP 614, relaxed grammar restrictions on decorators.
New built-in features:
PEP 616, string methods to remove prefixes and suffixes.
New features in the standard library:
PEP 593, flexible function and variable annotations;
os.pidfd_open() added that allows process management without races
and signals.
Interpreter improvements:
PEP 573, fast access to module state from methods of C extension
types;
PEP 617, CPython now uses a new parser based on PEG;
a number of Python builtins (range, tuple, set, frozenset, list, dict) are
now sped up using PEP 590 vectorcall;
garbage collection does not block on resurrected objects;
a number of Python modules (_abc, audioop, _bz2,
_codecs, _contextvars, _crypt, _functools,
_json, _locale, math, operator, resource,
time, _weakref) now use multiphase initialization as defined
by PEP 489;
a number of standard library modules (audioop, ast, grp,
_hashlib, pwd, _posixsubprocess, random,
select, struct, termios, zlib) are now using
the stable ABI defined by PEP 384.
New library modules:
PEP 615, the IANA Time Zone Database is now present in the standard
library in the zoneinfo module;
an implementation of a topological sort of a graph is now provided in
the new graphlib module.
Release process changes:
PEP 602, CPython adopts an annual release cycle.
```
