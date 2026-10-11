from abc import ABC, abstractmethod


class Shape(ABC):
    @abstractmethod
    def area(self):
        """Return the area as a number."""

    @abstractmethod
    def perimeter(self):
        """Return the perimeter as a number."""


class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side**2


try:
    Square(3)
except TypeError:
    print("TypeError: Square is still abstract")
print(sorted(Shape.__abstractmethods__))
