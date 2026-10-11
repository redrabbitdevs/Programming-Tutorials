from enum import Enum


class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3


print(Color.RED)
print(repr(Color.RED))
print(Color.RED.name, Color.RED.value)
