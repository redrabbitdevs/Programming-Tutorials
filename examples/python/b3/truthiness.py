values = [0, 1, -3, 0.0, "", "0", " ", [], [0], {}, None, False]

for value in values:
    print(f"{value!r:>6} -> {bool(value)}")

zero = 0
print(zero is None, zero == False)

name = None
if name is None:
    print("no name yet")

print(not [], not [1])
print(int(True) + int(True))
