name1, qty1, price1 = "Coffee", 2, 3.5
name2, qty2, price2 = "Bagel", 1, 2.25
name3, qty3, price3 = "Orange juice", 3, 4.0

total1 = qty1 * price1
total2 = qty2 * price2
total3 = qty3 * price3

print(f"{'Item':<14}{'Qty':>4}{'Price':>9}{'Total':>9}")
print("-" * 36)
print(f"{name1:<14}{qty1:>4}{price1:>9.2f}{total1:>9.2f}")
print(f"{name2:<14}{qty2:>4}{price2:>9.2f}{total2:>9.2f}")
print(f"{name3:<14}{qty3:>4}{price3:>9.2f}{total3:>9.2f}")
print("-" * 36)
print(f"{'Total':<27}{total1 + total2 + total3:>9.2f}")
