import math


class Circle:
    def __init__(self, radius):
        self.radius = radius

    @property
    def area(self):
        return math.pi * self.radius**2


c = Circle(2)
print(round(c.area, 2))
c.radius = 3
print(round(c.area, 2))
