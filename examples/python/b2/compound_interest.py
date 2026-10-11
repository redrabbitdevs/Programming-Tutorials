from decimal import Decimal, ROUND_HALF_UP

balance = Decimal("1000.00")
rate = Decimal("0.05")
cent = Decimal("0.01")

balance = (balance * (1 + rate)).quantize(cent, rounding=ROUND_HALF_UP)
print("Year 1:", balance)
balance = (balance * (1 + rate)).quantize(cent, rounding=ROUND_HALF_UP)
print("Year 2:", balance)
balance = (balance * (1 + rate)).quantize(cent, rounding=ROUND_HALF_UP)
print("Year 3:", balance)
