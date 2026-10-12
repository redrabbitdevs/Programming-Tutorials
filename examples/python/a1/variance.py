from collections.abc import Sequence


def total(values: list[float]) -> float:
    return sum(values)


def total_ro(values: Sequence[float]) -> float:
    return sum(values)


counts: list[int] = [1, 2, 3]
print(total(counts))
print(total_ro(counts))
