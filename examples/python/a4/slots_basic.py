class Point:
    __slots__ = ("x", "y")

    def __init__(self, x, y):
        self.x = x
        self.y = y


p = Point(1, 2)
print(type(Point.__dict__["x"]).__name__)
print(hasattr(p, "__dict__"))
try:
    p.z = 3
except AttributeError as error:
    print("AttributeError:", error)
