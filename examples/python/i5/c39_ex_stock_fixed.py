LINES = ["apple,3,0.5", "pear,12,0.25", "fig,5,2.0", "plum,20,0.1"]


def parse_line(line):
    name, qty, price = line.split(",")
    return name, int(qty), float(price)


def total_value(items):
    total = 0
    for name, qty, price in items:
        total += qty * price
    return total


def most_valuable(items):
    best = None
    for item in items:
        if best is None or item[1] * item[2] > best[1] * best[2]:
            best = item
    return best[0]


def low_stock(items, limit=5):
    return [name for name, qty, price in items if qty <= limit]


def name_list(items):
    names = sorted(name for name, qty, price in items)
    return ", ".join(names)


items = [parse_line(line) for line in LINES]
print("total value:", total_value(items))
print("most valuable:", most_valuable(items))
print("low stock:", low_stock(items))
print("names:", name_list(items))
