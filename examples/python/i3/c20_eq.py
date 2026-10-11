class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        if not isinstance(other, Point):
            return NotImplemented
        return self.x == other.x and self.y == other.y


a = Point(1, 2)
b = Point(1, 2)
print(a == b)
print(a != Point(5, 5))
print(a == (1, 2))
