from dataclasses import dataclass, replace


@dataclass(frozen=True)
class Item:
    name: str
    quantity: int


old = Item("pen", 10)
new = replace(old, quantity=7)
print(old)
print(new)
