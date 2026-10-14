from inventory_view import Inventory

inventory = Inventory()
stock = inventory.stock
inventory.add("pen", 3)
inventory.add("pen", 2)
print(stock["pen"], dict(stock))
try:
    stock["pen"] = 0
except TypeError as error:
    print("TypeError:", error)
