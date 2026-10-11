from dataclasses import dataclass, replace


@dataclass(frozen=True)
class Item:
    name: str
    price: float
    quantity: int = 0

    def __post_init__(self):
        if self.quantity < 0:
            raise ValueError(f"quantity cannot be negative: {self.quantity}")


def restock(item, amount):
    return replace(item, quantity=item.quantity + amount)


def sell(item, amount):
    return replace(item, quantity=item.quantity - amount)


pen = Item("pen", 1.5, 10)
more = restock(pen, 5)
print(pen.quantity, more.quantity)
try:
    sell(more, 20)
except ValueError as error:
    print("ValueError:", error)
print(more)
