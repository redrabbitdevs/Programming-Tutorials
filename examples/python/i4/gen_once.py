def numbers():
    yield 1
    yield 2
    yield 3


gen = numbers()
print(sum(gen))
print(sum(gen))
print(list(numbers()), list(numbers()))
