from typing import Protocol


class Formatter(Protocol):
    def __call__(self, value: float, *, digits: int = 2) -> str: ...


def fixed(value: float, *, digits: int = 2) -> str:
    return f"{value:.{digits}f}"


def percent(value: float, *, digits: int = 2) -> str:
    return f"{value:.{digits}%}"


def report(values: list[float], fmt: Formatter) -> None:
    print(", ".join(fmt(v) for v in values), "|", fmt(values[0], digits=0))


report([0.125, 0.5], fixed)
report([0.125, 0.5], percent)
