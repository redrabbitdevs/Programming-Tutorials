def rotate(items, k):
    if not items:
        return []
    k = k % len(items)
    return items[k:] + items[:k]


print(rotate([1, 2, 3, 4, 5], 2))
print(rotate([1, 2, 3, 4, 5], 7))
