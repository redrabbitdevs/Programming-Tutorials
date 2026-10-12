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


if __name__ == "__main__":
    import doctest

    print(doctest.testmod())
