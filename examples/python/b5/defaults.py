def power(base, exponent=2):
    return base**exponent


print(power(5))
print(power(2, 10))
print(power(exponent=3, base=2))


def add_item_bad(item, items=[]):
    items.append(item)
    return items


print(add_item_bad("a"))
print(add_item_bad("b"))
print(add_item_bad.__defaults__)


def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items


print(add_item("a"))
print(add_item("b"))
print(add_item("c", ["x"]))
