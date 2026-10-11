first, *rest = [10, 20, 30, 40]
print(first, rest)

*init, last = "abcd"
print(init, last)

head, *middle, tail = range(1, 6)
print(head, middle, tail)

only, *none = [7]
print(only, none)
