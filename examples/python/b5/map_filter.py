numbers = [1, 2, 3, 4, 5, 6]

print(list(map(lambda n: n * n, numbers)))
print(list(filter(lambda n: n % 2 == 0, numbers)))

print([n * n for n in numbers])
print([n for n in numbers if n % 2 == 0])

print(list(map(str.upper, ["a", "b"])))
print(list(map(int, ["1", "2", "3"])))

lazy = map(str, numbers)
print(next(lazy))
print(list(lazy))
print(list(lazy))
