from dataclasses import dataclass
from typing import assert_never

from shapes import Circle, Square


@dataclass
class Triangle:
    side: float


def area(shape: Circle | Square | Triangle) -> float:
    match shape:
        case Circle(radius=r):
            return 3.14159 * r * r
        case Square(side=s):
            return s * s
        case _:
            assert_never(shape)


try:
    area(Triangle(3.0))
except AssertionError as error:
    print("AssertionError:", error)
