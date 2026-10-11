class Cart(list):
    def total(self):
        return sum(self)


cart = Cart()
cart.append(2.5)
cart.append(4.0)
print(cart.total())
