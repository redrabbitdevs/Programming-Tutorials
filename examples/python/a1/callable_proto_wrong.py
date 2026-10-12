from typing import Protocol


class Formatter(Protocol):
    def __call__(self, value: float, *, digits: int = 2) -> str: ...


def rounded(value: float) -> str:
    return str(round(value, 2))


def report(values: list[float], fmt: Formatter) -> None:
    print(", ".join(fmt(v) for v in values))


report([0.125, 0.5], rounded)
