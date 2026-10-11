class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        if not isinstance(other, Point):
            return NotImplemented
        return self.x == other.x and self.y == other.y


print(Point.__hash__ is None)
try:
    {Point(1, 2)}
except TypeError as error:
    print("TypeError:", error)
