from collections.abc import Callable
from typing import Any, Literal


def level(name: Literal["low", "high"]) -> int:
    return 1 if name == "low" else 2


def shout(value: object) -> str:
    return str(value).upper()


def whisper(value: Any) -> str:
    return value.lower()


print(level("high"))  # A
print(level("medium"))  # B
print(shout(42), whisper("HEY"))  # C
op: Callable[[float], float] = shout  # D
print(op(1.5))
