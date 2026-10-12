import inspect


def resize(width, height, factor=1.0):
    """Scale a width and height by a factor.

    Args:
        width: Width in pixels.
        height: Height in pixels.
        factor: Multiplier, 1.0 leaves the size unchanged.

    Returns:
        A (width, height) tuple of ints.

    Raises:
        ValueError: If factor is not positive.
    """
    if factor <= 0:
        raise ValueError("factor must be positive")
    return round(width * factor), round(height * factor)


print(resize.__doc__.splitlines()[0])
print("---")
print(inspect.getdoc(resize))
print("---")
print(inspect.signature(resize))
