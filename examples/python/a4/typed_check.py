from typed_field import Typed


class Product:
    name = Typed(str)
    price = Typed(float)

    def __init__(self, name, price):
        self.name = name
        self.price = price


p = Product("pen", 1.5)
print(p.name, p.price)
try:
    p.price = "cheap"
except TypeError as error:
    print("TypeError:", error)
print(Product.price.kind.__name__)
