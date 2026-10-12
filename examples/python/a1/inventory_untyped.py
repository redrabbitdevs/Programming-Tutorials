LOW_STOCK = 5


def make_item(name, qty, price):
    return {"name": name, "qty": qty, "price": price}


def select(items, keep):
    return [item for item in items if keep(item)]


stock = [
    make_item("pen", 40, 1.5),
    make_item("ink", 3, 7.0),
    make_item("pad", 2, 4.25),
]
low = select(stock, lambda item: item["qty"] < LOW_STOCK)
print([item["name"] for item in low])
print(sum(item["qty"] * item["price"] for item in stock))
