def add_item_bad(item, items=[]):
    items.append(item)
    return items


print(add_item_bad("a"))
print(add_item_bad("b"))
print(add_item_bad.__defaults__)
