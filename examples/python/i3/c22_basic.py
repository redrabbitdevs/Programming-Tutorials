from dataclasses import dataclass


@dataclass
class Item:
    name: str
    price: float
    quantity: int = 0


pen = Item("pen", 1.5, 10)
print(pen)
print(pen == Item("pen", 1.5, 10))
pen.quantity = 8
print(pen.quantity)
