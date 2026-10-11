def mystery(items, size):
    result = []
    for start in range(0, len(items), size):
        result.append(items[start:start + size])
    return result


print(mystery([1, 2, 3, 4, 5, 6, 7], 3))
print(mystery([], 3))
print(mystery(["a", "b"], 5))
