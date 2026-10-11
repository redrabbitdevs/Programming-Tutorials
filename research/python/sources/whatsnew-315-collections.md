# What's New in Python 3.15: collections-related extracts

Fetched 2026-10-11 with `curl -sL https://docs.python.org/3/whatsnew/3.15.html`, then trimmed to two sections.
Source: https://docs.python.org/3/whatsnew/3.15.html (Python 3.15.0, released 2026-10-09).

## PEP 814: Add frozendict built-in type

A new immutable type, frozendict, is added to the builtins module.
It does not allow modification after creation. A frozendict is not a subclass of dict;
it inherits directly from object. A frozendict is hashable
as long as all of its keys and values are hashable. A frozendict preserves
insertion order, but comparison does not take order into account.

    >>> a = frozendict(x=1, y=2)
    >>> a
    frozendict({'x': 1, 'y': 2})
    >>> a['z'] = 3
    TypeError: 'frozendict' object does not support item assignment
    >>> b = frozendict(y=2, x=1)
    >>> hash(a) == hash(b)
    True
    >>> a == b
    True

The following standard library modules have been updated to accept
frozendict: copy, decimal, json, marshal, plistlib (only for serialization),
pickle, pprint and xml.etree.ElementTree.

eval() and exec() accept frozendict for globals, and type() and str.maketrans()
accept frozendict for dict.

Code checking for dict type using isinstance(arg, dict) can be updated to
isinstance(arg, (dict, frozendict)) to accept also the frozendict type, or to
isinstance(arg, collections.abc.Mapping) to accept also other mapping types
such as MappingProxyType.
(Contributed by Victor Stinner and Donghee Na in gh-141510.)

## PEP 798: Unpacking in comprehensions

List, set, and dictionary comprehensions, as well as generator expressions, now
support unpacking with * and **. This extends the unpacking syntax from PEP 448
to comprehensions. It is a direct alternative to nested comprehensions,
itertools.chain(), and itertools.chain.from_iterable().

    >>> lists = [[1, 2], [3, 4], [5]]
    >>> [*L for L in lists]  # equivalent to [x for L in lists for x in L]
    [1, 2, 3, 4, 5]
    >>> sets = [{1, 2}, {2, 3}, {3, 4}]
    >>> {*s for s in sets}  # equivalent to {x for s in sets for x in s}
    {1, 2, 3, 4}
    >>> dicts = [{'a': 1}, {'b': 2}, {'a': 3}]
    >>> {**d for d in dicts}  # equivalent to {k: v for d in dicts for k,v in d.items()}
    {'a': 3, 'b': 2}
    >>> gen = (*L for L in lists)  # equivalent to (x for L in lists for x in L)
    >>> list(gen)
    [1, 2, 3, 4, 5]

(Contributed by Adam Hartz in gh-143055.)
