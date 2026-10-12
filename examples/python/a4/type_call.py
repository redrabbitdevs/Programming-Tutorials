class Point:
    dims = 2


print(type(Point), type(type))


def area(self):
    return self.w * self.h


Rect = type("Rect", (), {"w": 3, "h": 4, "area": area})
print(Rect.__name__, Rect().area())
