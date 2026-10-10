word = "naïve café"
print(len(word))
print(len(word.encode("utf-8")))
print([hex(ord(c)) for c in "aï"])
print(word.encode("utf-8"))

composed = "é"
decomposed = "é"
print(composed == decomposed, len(composed), len(decomposed))

name, qty, price = "Tea", 3, 2.5
print("Item: " + name + " x" + str(qty))
print(f"{name:<10}{qty:>3} x {price:>6.2f} = {qty * price:>7.2f}")
