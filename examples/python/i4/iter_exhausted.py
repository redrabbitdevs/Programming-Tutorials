numbers = [1, 2, 3]
it = iter(numbers)

print(list(it))
print(list(it))

print(iter(numbers) is numbers)
print(iter(it) is it)
print(list(numbers), list(numbers))
