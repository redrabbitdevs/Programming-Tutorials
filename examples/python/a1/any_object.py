from typing import Any


def loose(value: Any) -> int:
    return value.bit_length()


def strict(value: object) -> int:
    return value.bit_length()


print(loose(255), strict(255))
try:
    loose("255")
except AttributeError as error:
    print("AttributeError:", error)
