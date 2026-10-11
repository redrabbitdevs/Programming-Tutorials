import math


class Shape:
    def __init__(self, name):
        self.name = name

    def area(self):
        raise NotImplementedError("subclasses must define area()")

    def describe(self):
        return f"{self.name}: area {self.area():.2f}"


class Rectangle(Shape):
    def __init__(self, width, height):
        super().__init__("rectangle")
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height


class Square(Rectangle):
    def __init__(self, side):
        super().__init__(side, side)
        self.name = "square"


class Circle(Shape):
    def __init__(self, radius):
        super().__init__("circle")
        self.radius = radius

    def area(self):
        return math.pi * self.radius**2


shapes = [Rectangle(3, 4), Circle(1), Square(2)]
for shape in shapes:
    print(shape.describe())
print(f"total: {sum(s.area() for s in shapes):.2f}")
