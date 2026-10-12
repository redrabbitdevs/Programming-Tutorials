def auto_repr(cls):
    def __repr__(self):
        fields = ", ".join(f"{k}={v!r}" for k, v in vars(self).items())
        return f"{type(self).__name__}({fields})"

    cls.__repr__ = __repr__
    return cls


@auto_repr
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y


print(Point(1, 2))
print([Point(0, 0), Point(3, 4)])
