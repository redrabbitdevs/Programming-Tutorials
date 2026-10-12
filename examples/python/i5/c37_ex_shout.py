def shout(text):
    """Return text in capitals with an exclamation mark.

    >>> shout("hi")
    HI!
    """
    return text.upper() + "!"


if __name__ == "__main__":
    import doctest

    print(doctest.testmod())
