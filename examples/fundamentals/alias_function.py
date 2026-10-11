def add_item(items):
    items.append("new")            # changes the caller's list


def replace_all(items):
    items = ["replaced"]           # re-points the local name only
    return items


basket = ["apple"]
add_item(basket)
print("[" + ", ".join(basket) + "]")
replace_all(basket)
print("[" + ", ".join(basket) + "]")
