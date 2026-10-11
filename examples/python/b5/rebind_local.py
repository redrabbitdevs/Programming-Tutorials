items = [1, 2]


def rebind():
    items = ["new"]
    return items


print(rebind())
print(items)
