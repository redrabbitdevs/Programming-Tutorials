from types import MappingProxyType


class Inventory:
    def __init__(self):
        self._stock = {}
        self.stock = MappingProxyType(self._stock)

    def add(self, item, count):
        self._stock[item] = self._stock.get(item, 0) + count

inventory = Inventory()
stock = inventory.stock
inventory.add("pen", 3)
inventory.add("pen", 2)
print(stock["pen"], dict(stock))
try:
    stock["pen"] = 0
except TypeError as error:
    print("TypeError:", error)
