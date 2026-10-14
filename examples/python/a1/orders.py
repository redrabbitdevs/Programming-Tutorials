from customers import Customer


class Order:
    def __init__(self, customer: Customer, total: float) -> None:
        self.customer = customer
        self.total = total
        customer.add(self)
