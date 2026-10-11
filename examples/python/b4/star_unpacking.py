first, *rest = [10, 20, 30, 40]
print(first, rest)

*init, last = "abcd"
print(init, last)

head, *middle, tail = range(1, 6)
print(head, middle, tail)

only, *none = [7]
print(only, none)

# Unpacking in a for loop
pairs = [("Ada", 1815), ("Alan", 1912)]
for name, year in pairs:
    print(name, year)

# Nested unpacking
(a, b), c = (1, 2), 3
print(a, b, c)

# Unpacking into a call or a new list
numbers = [1, 2, 3]
print(*numbers)
combined = [0, *numbers, 4]
print(combined)

try:
    p, q = [1, 2, 3]
except ValueError as error:
    print("ValueError:", error)
