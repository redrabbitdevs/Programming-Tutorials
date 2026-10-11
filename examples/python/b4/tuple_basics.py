point = (3, 4)
print(point[0], point[1], len(point))

single = (5,)
not_a_tuple = (5)
print(type(single).__name__, type(not_a_tuple).__name__)

try:
    point[0] = 10
except TypeError as error:
    print("TypeError:", error)

x, y = point
print(x, y)

# Swap without a temporary
a, b = 1, 2
a, b = b, a
print(a, b)


def min_max(numbers):
    return min(numbers), max(numbers)


low, high = min_max([4, 9, 2, 7])
print(low, high)
print(min_max([4, 9, 2, 7]))

# Tuples can be dict keys; lists cannot
visits = {(0, 0): "home", (1, 2): "shop"}
print(visits[(1, 2)])
try:
    {[1, 2]: "x"}
except TypeError as error:
    print("TypeError:", error)
