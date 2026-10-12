from typing import TypeIs


def is_positive(value: int | str) -> TypeIs[int]:
    return isinstance(value, int) and value > 0


def show(value: int | str) -> str:
    if is_positive(value):
        return f"+{value}"
    return value.upper()


values: list[int | str] = [5, "abc", -5]
for value in values:
    try:
        print(show(value))
    except AttributeError as error:
        print("AttributeError:", error)
