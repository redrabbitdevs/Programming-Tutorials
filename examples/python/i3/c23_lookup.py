from enum import Enum


class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3


print(Color(2))
print(Color["BLUE"])
for color in Color:
    print(color.name, color.value)
print(Color.RED is Color.RED, Color.RED == Color.GREEN)
