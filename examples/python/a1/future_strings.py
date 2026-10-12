from __future__ import annotations

import typing


class Point:
    x: int
    y: int
    nearest: Point | None


print(Point.__annotations__)
print(typing.get_type_hints(Point))
