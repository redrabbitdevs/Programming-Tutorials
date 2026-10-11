import copy
from dataclasses import dataclass


@dataclass(frozen=True)
class Item:
    name: str
    quantity: int


old = Item("pen", 10)
new = copy.replace(old, quantity=7)
print(old, new)
