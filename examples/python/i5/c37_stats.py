"""Small statistics helpers whose docstrings double as tests."""


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


def clamp(value, low, high):
    """Limit value to the range low..high.

    >>> clamp(15, 0, 10)
    10
    >>> clamp(-3, 0, 10)
    0
    >>> clamp(7, 0, 10)
    7
    """
    return max(low, min(value, high))


def histogram(words):
    """Count how often each word occurs, most common first.

    The result is a list of (word, count) pairs:

    >>> histogram(["b", "a", "b", "c", "b", "a"])
    [('b', 3), ('a', 2), ('c', 1)]
    """
    counts = {}
    for word in words:
        counts[word] = counts.get(word, 0) + 1
    return sorted(counts.items(), key=lambda pair: -pair[1])


if __name__ == "__main__":
    import doctest

    print(doctest.testmod())
