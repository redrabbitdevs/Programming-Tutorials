class Money:
    def __init__(self, cents):
        self.cents = cents

    def __repr__(self):
        return f"Money({self.cents})"

    def __add__(self, other):
        if not isinstance(other, Money):
            return NotImplemented
        return Money(self.cents + other.cents)

    def __mul__(self, factor):
        if not isinstance(factor, int):
            return NotImplemented
        return Money(self.cents * factor)


print(Money(250) + Money(199))
print(Money(250) * 3)
