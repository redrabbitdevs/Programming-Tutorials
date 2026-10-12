def mean(values):
    """Return the arithmetic mean of a non-empty sequence of numbers.

    >>> mean([2, 4, 6])
    4.0
    >>> mean([5])
    5.0

    An empty sequence is an error:

    >>> mean([])
    Traceback (most recent call last):
        ...
    ValueError: mean() needs at least one value
    """
    if not values:
        raise ValueError("mean() needs at least one value")
    return sum(values) / len(values)


if __name__ == "__main__":
    import doctest

    print(doctest.testmod())
