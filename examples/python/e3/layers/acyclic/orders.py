from .customers import Customer


class Order:
    def __init__(self, customer: Customer, total):
        self.customer = customer
        self.total = total


def place(customer: Customer, total):
    order = Order(customer, total)
    customer.orders.append(order)
    return order
