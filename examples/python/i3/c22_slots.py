from dataclasses import dataclass


@dataclass(slots=True)
class Point:
    x: int
    y: int


p = Point(1, 2)
print(hasattr(p, "__dict__"))
try:
    p.z = 3
except AttributeError:
    print("AttributeError: no room for a new attribute")
