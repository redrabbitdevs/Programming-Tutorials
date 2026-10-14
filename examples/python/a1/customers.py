from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from orders import Order


class Customer:
    def __init__(self, name: str) -> None:
        self.name = name
        self.orders: list[Order] = []

    def add(self, order: Order) -> None:
        self.orders.append(order)
