from typing import TypeGuard, TypeIs, reveal_type


def guard_text(value: object) -> TypeGuard[str]:
    return isinstance(value, str)


def is_text(value: object) -> TypeIs[str]:
    return isinstance(value, str)


def check(value: int | str) -> None:
    if not guard_text(value):
        reveal_type(value)
    if not is_text(value):
        reveal_type(value)


check(5)
print(guard_text("x"), is_text(5))
