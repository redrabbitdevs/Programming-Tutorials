from collections.abc import Sequence
from typing import reveal_type


def first[T](items: Sequence[T]) -> T:
    return items[0]


reveal_type(first([3, 1, 2]))
reveal_type(first("abc"))
reveal_type(first((2.5, 1.0)))
print(first([3, 1, 2]), first("abc"))
