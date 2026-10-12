from collections.abc import Callable
from typing import Literal

Op = Literal["add", "sub", "mul"]

OPERATIONS: dict[Op, Callable[[int, int], int]] = {
    "add": lambda a, b: a + b,
    "sub": lambda a, b: a - b,
    "mul": lambda a, b: a * b,
}


def calc(op: Op, a: int, b: int) -> int:
    return OPERATIONS[op](a, b)


try:
    print(calc("div", 6, 3))
except KeyError as error:
    print("KeyError:", error)
