from dataclasses import dataclass, FrozenInstanceError


@dataclass(frozen=True)
class Point:
    x: int
    y: int


p = Point(1, 2)
try:
    p.x = 10
except FrozenInstanceError as error:
    print("FrozenInstanceError:", error)
print({p, Point(1, 2)})
