# e2-immortal-refcount: extracts for Python module E2 (fetched 2026-10-14)

## https://docs.python.org/3/library/sys.html

[lines 940-956 of the text dump]

sys.getrefcount(object)¶

Return the reference count of the object.  The count returned is generally one
higher than you might expect, because it includes the (temporary) reference as
an argument to getrefcount().

Note that the returned value may not actually reflect how many
references to the object are actually held.  For example, some
objects are immortal and have a very high refcount that does not
reflect the actual number of references.  Consequently, do not rely
on the returned value to be accurate, other than a value of 0 or 1.

CPython implementation detail: Immortal objects with a large reference count can be
identified via _is_immortal().

Changed in version 3.12: Immortal objects have very large refcounts that do not match
the actual number of references to the object.

[lines 1402-1416 of the text dump]

sys._is_immortal(op)¶

Return True if the given object is immortal, False
otherwise.

Note

Objects that are immortal (and thus return True upon being passed
to this function) are not guaranteed to be immortal in future versions,
and vice versa for mortal objects.

Added in version 3.14.

CPython implementation detail: This function should be used for specialized purposes only.
It is not guaranteed to exist in all implementations of Python.

[lines 1318-1321 of the text dump]

sys._is_gil_enabled()¶

Return True if the GIL is enabled and False if
it is disabled.

## https://docs.python.org/3/whatsnew/3.12.html

[lines 2771-2778 of the text dump]

PEP 683: Introduce Immortal Objects, which allows objects
to bypass reference counts, and related changes to the C-API:

_Py_IMMORTAL_REFCNT: The reference count that defines an object

as immortal.

_Py_IsImmortal Checks if an object has the immortal reference count.
