from collections.abc import Callable
from typing import Final, TypedDict

LOW_STOCK: Final = 5


class Item(TypedDict):
    name: str
    qty: int
    price: float


def select(items: list[Item], keep: Callable[[Item], bool]) -> list[Item]:
    return [item for item in items if keep(item)]


stock: list[Item] = [
    Item(name="pen", qty=40, price=1.5),
    Item(name="ink", qty=3, price=7.0),
    Item(name="pad", qty=2, price=4.25),
]
low = select(stock, lambda item: item["qty"] < LOW_STOCK)
print([item["name"] for item in low])
print(sum(item["qty"] * item["price"] for item in stock))
