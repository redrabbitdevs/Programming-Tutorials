from enum import Enum


class Color(Enum):
    RED = 1
    GREEN = 2


try:
    Color(5)
except ValueError as error:
    print("ValueError:", error)
try:
    Color["PURPLE"]
except KeyError as error:
    print("KeyError:", error)
