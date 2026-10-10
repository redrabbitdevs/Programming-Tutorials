items = [("Coffee", 2, 3.5), ("Bagel", 1, 2.25), ("Orange juice", 3, 4.0)]

print(f"{'Item':<14}{'Qty':>4}{'Price':>9}{'Total':>9}")
print("-" * 36)
grand = 0
for name, qty, price in items:
    line = qty * price
    grand += line
    print(f"{name:<14}{qty:>4}{price:>9.2f}{line:>9.2f}")
print("-" * 36)
print(f"{'Total':<27}{grand:>9.2f}")
