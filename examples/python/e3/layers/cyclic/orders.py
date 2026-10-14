from .customers import Customer


class Order:
    def __init__(self, customer: Customer, total):
        self.customer = customer
        self.total = total
