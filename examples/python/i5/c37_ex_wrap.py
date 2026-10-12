"""Break text into lines of a fixed width."""


def wrap_words(text, width):
    """Split text into lines of at most width characters.

    Args:
        text: The text to wrap.
        width: Maximum line length. A longer word gets its own line.

    Raises:
        ValueError: If width is less than 1.

    >>> wrap_words("the quick brown fox jumps", 10)
    ['the quick', 'brown fox', 'jumps']
    >>> wrap_words("extraordinarily short", 5)
    ['extraordinarily', 'short']
    >>> wrap_words("", 10)
    []
    >>> wrap_words("x", 0)
    Traceback (most recent call last):
        ...
    ValueError: width must be at least 1
    """
    if width < 1:
        raise ValueError("width must be at least 1")
    lines = []
    current = ""
    for word in text.split():
        if current and len(current) + 1 + len(word) > width:
            lines.append(current)
            current = word
        else:
            current = f"{current} {word}" if current else word
    if current:
        lines.append(current)
    return lines


if __name__ == "__main__":
    import doctest

    print(doctest.testmod())
