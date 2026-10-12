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
