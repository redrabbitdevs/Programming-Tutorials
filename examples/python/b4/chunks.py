def chunks(items, size):
    return [items[i : i + size] for i in range(0, len(items), size)]


print(chunks([1, 2, 3, 4, 5, 6, 7], 3))
print(chunks("abcdef", 2))
print(chunks([], 3))
