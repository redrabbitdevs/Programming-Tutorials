from dataclasses import dataclass


@dataclass
class Point:
    x: float
    y: float


@dataclass
class Circle:
    centre: Point
    radius: float


@dataclass
class Rect:
    corner: Point
    width: float
    height: float


print(Point.__match_args__, Rect.__match_args__)


def describe(shape):
    match shape:
        case Circle(Point(0, 0), r):
            return f"circle of radius {r} at the origin"
        case Circle(centre=Point(x=x), radius=r) if r > 5:
            return f"big circle, centre x={x}"
        case Rect(_, w, h) if w == h:
            return f"square, side {w}"
        case Rect(width=w, height=h):
            return f"rectangle {w}x{h}"
        case Point() | Circle():
            return f"other {type(shape).__name__}"


shapes = [
    Circle(Point(0, 0), 2),
    Circle(Point(3, 4), 9),
    Rect(Point(1, 1), 4, 4),
    Rect(Point(0, 0), 2, 5),
    Circle(Point(1, 1), 1),
]
for shape in shapes:
    print(describe(shape))
