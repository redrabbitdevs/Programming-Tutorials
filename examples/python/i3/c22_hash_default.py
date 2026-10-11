from dataclasses import dataclass


@dataclass
class Point:
    x: int
    y: int


p = Point(1, 2)
print(p == Point(1, 2))
try:
    {p}
except TypeError:
    print("TypeError: a mutable dataclass is unhashable")
