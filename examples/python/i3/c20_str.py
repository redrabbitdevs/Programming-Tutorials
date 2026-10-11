class Money:
    def __init__(self, cents):
        self.cents = cents

    def __repr__(self):
        return f"Money({self.cents})"

    def __str__(self):
        return f"${self.cents // 100}.{self.cents % 100:02d}"


price = Money(1999)
print(price)
print(repr(price))
print([price])
print(f"total: {price}")
