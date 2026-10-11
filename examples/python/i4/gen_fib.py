def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b


for position, value in zip(range(10), fibonacci()):
    print(position, value)
