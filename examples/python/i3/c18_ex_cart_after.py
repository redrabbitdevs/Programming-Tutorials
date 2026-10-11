class Cart:
    def __init__(self):
        self._prices = []

    def add(self, price):
        self._prices.append(price)

    def total(self):
        return sum(self._prices)

    def count(self):
        return len(self._prices)


cart = Cart()
cart.add(2.5)
cart.add(4.0)
print(cart.total())
print(cart.count())
print(hasattr(cart, "append"))
