from dataclasses import dataclass


@dataclass
class Item:
    name: str
    price: float
    quantity: int = 0

    def __post_init__(self):
        if self.price < 0:
            raise ValueError(f"price cannot be negative: {self.price}")


print(Item("pen", 1.5))
try:
    Item("pen", -1)
except ValueError as error:
    print("ValueError:", error)
