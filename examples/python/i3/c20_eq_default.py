class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y


a = Point(1, 2)
b = Point(1, 2)
print(a == a)
print(a == b)
