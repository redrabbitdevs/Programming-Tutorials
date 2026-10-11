class Item:
    def __init__(self, name, price, quantity=0):
        self.name = name
        self.price = price
        self.quantity = quantity

    def __repr__(self):
        return f"Item(name={self.name!r}, price={self.price!r}, quantity={self.quantity!r})"

    def __eq__(self, other):
        if not isinstance(other, Item):
            return NotImplemented
        return (self.name, self.price, self.quantity) == (other.name, other.price, other.quantity)


print(Item("pen", 1.5, 10))
