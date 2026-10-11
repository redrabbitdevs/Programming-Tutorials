class Money:
    def __init__(self, cents):
        self.cents = cents

    def __add__(self, other):
        if not isinstance(other, Money):
            return NotImplemented
        return Money(self.cents + other.cents)


try:
    Money(250) + 5
except TypeError as error:
    print("TypeError:", error)
