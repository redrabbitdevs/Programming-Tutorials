from typing import TypedDict


class Point(TypedDict, closed=True):
    x: int
    y: int


class Labels(TypedDict, extra_items=str):
    name: str


p: Point = {"x": 1, "y": 2, "z": 3}
tags: Labels = {"name": "web", "env": "prod", "port": 80}
print(p, tags)
print(Point.__closed__, Labels.__closed__, Labels.__extra_items__)
