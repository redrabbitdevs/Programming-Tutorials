class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)


r = Rectangle(3, 4)
print(r.area())
print(r.perimeter())
r.width = 10
print(r.area())
