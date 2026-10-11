from enum import Enum


class Color(Enum):
    RED = 1


try:
    Color.RED = 5
except AttributeError:
    print("AttributeError: members cannot be reassigned")
