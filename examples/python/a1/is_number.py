from typing import TypeIs


def is_number(value: object) -> TypeIs[int | float]:
    return isinstance(value, (int, float)) and not isinstance(value, bool)


def total(items: list[object]) -> float:
    result = 0.0
    for item in items:
        if is_number(item):
            result += item
    return result


print(total([1, "two", 3.5, None, True, 4]))
print(is_number(2), is_number("2"), is_number(False))
