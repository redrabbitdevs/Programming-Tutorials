numbers = [1, 2, 3, 4, 5, 6]

print(list(map(lambda n: n * n, numbers)))
print(list(filter(lambda n: n % 2 == 0, numbers)))
