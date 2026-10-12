from collections.abc import Callable


def apply_twice(func: Callable[[int], int], value: int) -> int:
    return func(func(value))


def add_three(n: int) -> int:
    return n + 3


print(apply_twice(add_three, 10))
print(apply_twice(lambda n: n * n, 3))
