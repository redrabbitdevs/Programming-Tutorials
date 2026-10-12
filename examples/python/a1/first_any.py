from collections.abc import Sequence
from typing import Any, reveal_type


def first(items: Sequence[Any]) -> Any:
    return items[0]


reveal_type(first([3, 1, 2]))
print(first([3, 1, 2]))
