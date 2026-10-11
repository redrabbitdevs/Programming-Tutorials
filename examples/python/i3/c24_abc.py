from abc import ABC, abstractmethod


class Shape(ABC):
    @abstractmethod
    def area(self):
        """Return the area as a number."""


class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side**2


try:
    Shape()
except TypeError:
    print("TypeError: cannot create an abstract Shape")
print(Square(3).area())
print(isinstance(Square(3), Shape))
