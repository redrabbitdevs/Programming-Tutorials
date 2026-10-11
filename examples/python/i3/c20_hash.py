class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        if not isinstance(other, Point):
            return NotImplemented
        return self.x == other.x and self.y == other.y

    def __hash__(self):
        return hash((self.x, self.y))


points = {Point(1, 2), Point(1, 2), Point(3, 4)}
print(len(points))
labels = {Point(0, 0): "origin"}
print(labels[Point(0, 0)])
