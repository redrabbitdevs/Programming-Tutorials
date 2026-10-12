def add_tax(price, rate):
    """Return price plus tax.

    >>> add_tax(10, 0.2)
    12.5
    >>> add_tax(100, 0.2)
    120.0
    """
    return round(price * (1 + rate), 2)
