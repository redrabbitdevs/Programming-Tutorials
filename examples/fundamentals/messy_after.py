STANDARD_TAX_RATE = 0.2
TAX_FREE_CATEGORIES = {"book"}


def price_with_tax(price, category):
    if category in TAX_FREE_CATEGORIES:
        return price
    return price * (1 + STANDARD_TAX_RATE)


def order_total(items):
    total = 0
    for price, category in items:
        total += price_with_tax(price, category)
    return total


print(order_total([(10, "food"), (20, "book"), (5, "toy")]))
