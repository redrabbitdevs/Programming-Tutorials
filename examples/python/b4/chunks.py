items = [1, 2, 3, 4, 5, 6, 7]
size = 3

for start in range(0, len(items), size):
    print(items[start : start + size])
