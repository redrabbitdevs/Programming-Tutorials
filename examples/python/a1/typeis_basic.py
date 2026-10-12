from typing import TypeIs, reveal_type


def is_text(value: object) -> TypeIs[str]:
    return isinstance(value, str)


def shout(value: int | str) -> str:
    if is_text(value):
        reveal_type(value)
        return value.upper()
    reveal_type(value)
    return str(value * 10)


print(is_text("hi"), is_text(3), type(is_text("hi")).__name__)
print(shout("hi"), shout(3))
