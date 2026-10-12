from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p, p.x, p[1])

x, y = p
print(x + y, p == (3, 4))
print(p._replace(y=10), p._asdict())
