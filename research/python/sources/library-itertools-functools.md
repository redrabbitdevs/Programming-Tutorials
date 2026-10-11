# itertools and functools: version-added notes

- URLs: https://docs.python.org/3/library/itertools.html and https://docs.python.org/3/library/functools.html
- Accessed: 2026-10-11 (`curl -sL`, primary source)
- Trimmed extract: signatures with their "Added in" and "Changed in" notes only.

## itertools

```text
itertools.batched(iterable, n, *, strict=False)
    Added in version 3.12.
    Changed in version 3.13: Added the strict option.

itertools.pairwise(iterable)
    Added in version 3.10.
```

## functools

```text
@functools.cache(user_function)
    Added in version 3.9.

@functools.lru_cache(user_function)
@functools.lru_cache(maxsize=128, typed=False)
    Changed in version 3.8: Added the user_function option.   (bare @lru_cache without parentheses)

functools.partial(func, /, *args, **keywords)
    Changed in version 3.14: Added support for Placeholder in positional arguments.

functools.reduce(function, iterable, /[, initial])
    Changed in version 3.14: initial is now supported as a keyword argument.

@functools.singledispatch
    register() attribute: type annotations supported since 3.7; typing.Union supported since 3.11.

functools.wraps
    Changed in version 3.12: The __type_params__ attribute is now copied by default.
```

Also from What's New 3.15 (`whatsnew-315.md`): calling the Python implementation of `functools.reduce()`
with `function` or `sequence` as keyword arguments has been deprecated since Python 3.14.
