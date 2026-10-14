from types import MappingProxyType


class Inventory:
    def __init__(self):
        self._stock = {}
        self.stock = MappingProxyType(self._stock)

    def add(self, item, count):
        self._stock[item] = self._stock.get(item, 0) + count
