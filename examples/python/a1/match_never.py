from typing import assert_never

from shapes import Circle, Shape, Square


def area(shape: Shape) -> float:
    match shape:
        case Circle(radius=r):
            return 3.14159 * r * r
        case Square(side=s):
            return s * s
        case _:
            assert_never(shape)


print(round(area(Circle(1.0)), 2), area(Square(3.0)))
