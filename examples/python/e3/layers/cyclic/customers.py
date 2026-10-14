from .orders import Order


class Customer:
    def __init__(self, name):
        self.name = name
        self.orders = []

    def place(self, total):
        order = Order(self, total)
        self.orders.append(order)
        return order
