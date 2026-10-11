items = []


def add(x):
    items.append(x)


add(1)
add(2)
print(items)


def rebind():
    items = ["new"]
    return items


print(rebind())
print(items)
