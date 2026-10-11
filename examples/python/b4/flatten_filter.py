orders = [
    {"customer": "Ada", "items": ["pen", "ink", "pen"]},
    {"customer": "Ben", "items": ["tape"]},
    {"customer": "Cy", "items": []},
    {"customer": "Dee", "items": ["paper", "pen"]},
]

# Style 1: nested comprehension (works on every Python 3)
nested = [
    item
    for order in orders
    if order["customer"] != "Ben"
    for item in order["items"]
]
print(nested)

# Style 2: unpacking comprehension (3.15 and later)
unpacked = [*order["items"] for order in orders if order["customer"] != "Ben"]
print(unpacked)

print(nested == unpacked)

# Filtering the inner items as well
no_ink = [item for order in orders for item in order["items"] if item != "ink"]
print(no_ink)
print(sorted({item for order in orders for item in order["items"]}))
