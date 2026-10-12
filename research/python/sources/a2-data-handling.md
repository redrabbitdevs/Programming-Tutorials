# Module A2 (Advanced data handling): version extracts

Fetched 2026-10-12 with `curl -sL` from docs.python.org/3/ (serving 3.15.0) and peps.python.org.
Each line is quoted from the page named, then the claim it supports.

## Structural pattern matching: 3.10
- https://docs.python.org/3/reference/compound_stmts.html#the-match-statement
  "8.6. The match statement ... Added in version 3.10."
- https://docs.python.org/3/library/dataclasses.html
  "match_args: If true (the default is True), the `__match_args__` tuple will be created from the list of
  non keyword-only parameters to the generated `__init__()` method ... Added in version 3.10."
- PEP 634 status: Final.

## collections
- https://docs.python.org/3/library/collections.html
  `Counter.total()`: "Added in version 3.10."
  Counter rich comparisons: "Changed in version 3.10: Rich comparison operations were added."
  "Changed in version 3.10: In equality tests, missing elements are treated as having zero counts."
  "Added in version 3.15: Added support for the symmetric difference multiset operation, c ^ d."
  ChainMap: "Changed in version 3.10: Keyword arguments support was added."
  "Named tuples are also supported by generic function copy.replace()."
- https://docs.python.org/3/whatsnew/3.15.html, collections:
  "Added collections.Counter.__xor__() and collections.Counter.__ixor__() to compute the symmetric
  difference between Counter objects. (Contributed by Raymond Hettinger in gh-138682.)"

## frozendict: 3.15 (PEP 814, Final)
- https://docs.python.org/3/library/stdtypes.html#frozendict
  "dict has more methods than frozendict: __delitem__() __setitem__() clear() pop() popitem()
  setdefault() update()". "A frozendict can be hashed with hash(frozendict) if all keys and values can
  be hashed." "frozendict |= other does not modify the frozendict in-place but creates a new frozen
  dictionary." "frozendict is not a dict subclass but inherits directly from object." "Added in version 3.15."
- https://peps.python.org/pep-0814/ Status: Final.

## MappingProxyType: 3.3
- https://docs.python.org/3/library/types.html#types.MappingProxyType
  "Read-only proxy of a mapping. It provides a dynamic view on the mapping's entries, which means that
  when the mapping changes, the view reflects these changes." "Added in version 3.3."
  "Changed in version 3.9: Updated to support the new union (|) operator from PEP 584".

## dataclasses
- https://docs.python.org/3/library/dataclasses.html
  "frozen: If true (the default is False), assigning to fields will generate an exception."
  slots / kw_only / match_args: "Added in version 3.10."

## copy
- https://docs.python.org/3/library/copy.html
  "copy.replace(obj, /, **changes) Creates a new object of the same type as obj, replacing fields with
  values from changes. Added in version 3.13."
  "Function copy.replace() is more limited than copy() and deepcopy(), and only supports named tuples
  created by namedtuple(), dataclasses, and other classes which define method __replace__()."
  "object.__replace__(self, /, **changes) ... Added in version 3.13."
  "object.__deepcopy__(self, memo) Called to implement the deep copy operation; it is passed one
  argument, the memo dictionary."

## re
- https://docs.python.org/3/library/re.html
  `re.prefixmatch`: "This function now has two names and has long been known as match(). Use that
  name when you need to retain compatibility with older Python versions. Added in version 3.15."
  `re.match`: "Soft deprecated since version 3.15: match() has been soft deprecated in favor of the
  alternate prefixmatch() name". "We do not plan to remove the older match() name, as it has been used
  in code for over 30 years."
  `Pattern.prefixmatch`: "Added in version 3.15."
  `\z`: "Matches only at the end of the string. Added in version 3.14."
  Atomic groups and possessive quantifiers: "Added in version 3.11."
- https://docs.python.org/3/whatsnew/3.15.html, re:
  "re.prefixmatch() and a corresponding re.Pattern.prefixmatch() have been added as alternate, more
  explicit names for the existing and now soft deprecated re.match() and re.Pattern.match() APIs."
- https://docs.python.org/3/whatsnew/3.14.html, re: "Support \z as a synonym for \Z in regular expressions."

## bisect and heapq
- https://docs.python.org/3/library/bisect.html
  bisect_left / bisect_right / insort_left / insort_right: "Changed in version 3.10: Added the key parameter."
- https://docs.python.org/3/library/heapq.html
  heapify_max, heappush_max, heappop_max, heappushpop_max, heapreplace_max: "Added in version 3.14."
- https://docs.python.org/3/whatsnew/3.14.html, heapq: "The heapq module has improved support for
  working with max-heaps, via the following new functions: heapify_max() heappush_max() heappop_max()
  heapreplace_max() heappushpop_max()"
