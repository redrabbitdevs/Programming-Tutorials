import math


class Circle:
    def __init__(self, radius):
        self.radius = radius

    @property
    def area(self):
        return math.pi * self.radius**2


c = Circle(2)
try:
    c.area = 10
except AttributeError as error:
    print("AttributeError:", error)
