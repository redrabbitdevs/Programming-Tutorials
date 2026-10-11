def rotate_left(items, k):
    if not items:
        return []
    k %= len(items)
    return items[k:] + items[:k]


def rotate_right(items, k):
    return rotate_left(items, -k)


data = [1, 2, 3, 4, 5]
print(rotate_left(data, 2))
print(rotate_right(data, 2))
print(rotate_left(data, 7))
print(rotate_left([], 3))
print(data[::-1])
print(data)

# In place, using slice assignment
data[:] = data[::-1]
print(data)
