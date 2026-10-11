import math


class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

    def __eq__(self, other):
        if not isinstance(other, Vector):
            return NotImplemented
        return self.x == other.x and self.y == other.y

    def __hash__(self):
        return hash((self.x, self.y))

    def __add__(self, other):
        if not isinstance(other, Vector):
            return NotImplemented
        return Vector(self.x + other.x, self.y + other.y)

    def __abs__(self):
        return math.hypot(self.x, self.y)


a = Vector(3, 4)
b = Vector(1, 2)
print(a + b)
print(abs(a))
print(a == Vector(3, 4))
print(a + b == Vector(4, 6))
print({a, Vector(3, 4)})
