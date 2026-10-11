prices = {"apple": 0.5, "pear": 0.75}


def price_per_item(name, total_cost, count):
    try:
        base = prices[name]
        return total_cost / count - base
    except KeyError as error:
        print("No such fruit:", error)
    except ZeroDivisionError:
        print("Count cannot be zero")


print(price_per_item("apple", 3.0, 4))
print(price_per_item("plum", 3.0, 4))
print(price_per_item("pear", 3.0, 0))
