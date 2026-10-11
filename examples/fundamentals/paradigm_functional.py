def is_even(n):
    return n % 2 == 0


def square(n):
    return n * n


numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print("total:", sum(map(square, filter(is_even, numbers))))
