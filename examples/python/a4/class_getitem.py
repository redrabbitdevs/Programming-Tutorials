from types import GenericAlias


class Box:
    def __init__(self, item):
        self.item = item

    def __class_getitem__(cls, item):
        return GenericAlias(cls, item)


alias = Box[int]
print(alias, alias.__origin__.__name__, alias.__args__)
box = alias(5)
print(type(box).__name__, box.item)
