# annotationlib (3.15 docs)

- URL: https://docs.python.org/3/library/annotationlib.html
- Accessed: 2026-10-12
- Retrieval: direct fetch with curl -sL (primary source)

Trimmed extract (verbatim text, HTML stripped):

```text
annotationlib.get_annotations(obj, *, globals=None, locals=None, eval_str=False, format=Format.VALUE)¶
    Added in version 3.14.
annotationlib.call_annotate_function(annotate, format, *, owner=None)¶
    Added in version 3.14.

===== VALUE = 1
-----
VALUE = 1¶
Values are the result of evaluating the annotation expressions.
VALUE_WITH_FAKE_GLOBALS = 2¶
Special value used to signal that an annotate function is being
evaluated in a special environment with fake globals. When passed this
value, annotate functions should either return the same value as for
the Format.VALUE format, or raise NotImplementedError
to signal that they do not support execution in this environment.
This format is only used internally and should not be passed to
the functions in this module.
FORWARDREF = 3¶
Values are real annotation values (as per Format.VALUE format)
for defined values, and ForwardRef proxies for undefined
values. Real objects may contain references to ForwardRef
proxy objects.
STRING = 4¶
Values are the text string of the annotation as it appears in the
source code, up to modifications including, but not restricted to,
whitespace normalizations and constant values optimizations.
The exact values of these strings may change in future versions
===== Deferred evaluation \(default
-----
Deferred evaluation (default in Python 3.14 and newer; see PEP 649 and
PEP 749): Annotations are evaluated lazily, only when they are accessed.
As an example, consider the following program:
def func(a: Cls) -> None:
 print(a)
class Cls: pass
print(func.__annotations__)
This will behave as follows:
Under stock semantics (Python 3.13 and earlier), it will throw a
NameError at the line where func is defined,
because Cls is an undefined name at that point.
Under stringified annotations (if from __future__ import annotations
is used), it will print {'a': 'Cls', 'return': 'None'}.
Under deferred ev
===== Stringified annotations are still used
-----
Stringified annotations are still used if
from __future__ import annotations is present, but this behavior will
eventually be removed.
Classes¶
class annotationlib.Format¶
An IntEnum describing the fo
```
