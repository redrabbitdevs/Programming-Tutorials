class Positive:
    def __set_name__(self, owner, name):
        self.name = name
        self.private = "_" + name

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return getattr(obj, self.private)

    def __set__(self, obj, value):
        if value <= 0:
            raise ValueError(f"{self.name} must be > 0, got {value}")
        setattr(obj, self.private, value)


class Order:
    quantity = Positive()
    price = Positive()

    def __init__(self, quantity, price):
        self.quantity = quantity
        self.price = price


order = Order(3, 9.5)
print(order.quantity, order.price, vars(order))
try:
    order.price = -1
except ValueError as error:
    print("ValueError:", error)
