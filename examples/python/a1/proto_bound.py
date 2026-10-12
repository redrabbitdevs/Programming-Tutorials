from decimal import Decimal
from typing import Any, Protocol


class SupportsGt(Protocol):
    def __gt__(self, other: Any, /) -> bool: ...


def biggest[T: SupportsGt](a: T, b: T) -> T:
    return a if a > b else b


print(biggest(3, 7), biggest("pear", "apple"))
print(biggest(Decimal("1.10"), Decimal("1.05")))
print(biggest((1, 2), (1, 3)))
