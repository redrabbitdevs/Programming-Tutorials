import doctest


def describe(obj):
    """Show an object the way a debugger would.

    The address changes on every run, so the ELLIPSIS option matches it loosely:

    >>> describe(object())  # doctest: +ELLIPSIS
    '<object object at 0x...>'

    Long output can be laid out freely when whitespace is normalised:

    >>> list(range(12))  # doctest: +NORMALIZE_WHITESPACE
    [0, 1, 2, 3,
     4, 5, 6, 7,
     8, 9, 10, 11]

    A line that is slow or needs a network can be skipped:

    >>> describe(open("/no/such/file"))  # doctest: +SKIP
    """
    return repr(obj)


result = doctest.testmod()
print(result.failed, "failed,", result.attempted, "attempted")
