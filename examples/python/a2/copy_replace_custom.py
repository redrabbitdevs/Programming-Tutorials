import copy
from collections import namedtuple

Point = namedtuple("Point", "x y")
print(copy.replace(Point(1, 2), y=5))


class Money:
    def __init__(self, amount, currency):
        self.amount = amount
        self.currency = currency

    def __replace__(self, **changes):
        fields = {"amount": self.amount, "currency": self.currency}
        return Money(**(fields | changes))

    def __repr__(self):
        return f"Money({self.amount}, {self.currency!r})"


price = Money(5, "EUR")
print(copy.replace(price, amount=7), price)
