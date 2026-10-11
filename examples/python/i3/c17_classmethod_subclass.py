class Shape:
    def __init__(self, name):
        self.name = name

    @classmethod
    def named(cls, name):
        return cls(name)


class Square(Shape):
    pass


s = Square.named("tile")
print(type(s).__name__, s.name)
