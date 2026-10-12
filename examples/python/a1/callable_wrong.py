from collections.abc import Callable


def apply_twice(func: Callable[[int], int], value: int) -> int:
    return func(func(value))


def label(n: int) -> str:
    return f"#{n}"


print(apply_twice(label, 1))
