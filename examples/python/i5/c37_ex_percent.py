def percent(part, whole):
    """Return part as a percentage of whole, rounded to one decimal place.

    >>> percent(1, 4)
    25.0
    >>> percent(1, 3)
    33.3
    >>> percent(0, 5)
    0.0

    A whole of zero has no percentage:

    >>> percent(1, 0)
    Traceback (most recent call last):
        ...
    ValueError: whole must not be zero
    """
    if whole == 0:
        raise ValueError("whole must not be zero")
    return round(part / whole * 100, 1)


if __name__ == "__main__":
    import doctest
    print(doctest.testmod())
