from typing import Generic, TypeVar

T = TypeVar("T")


class Box(Generic[T]):
    def __init__(self, item: T) -> None:
        self.item = item


def unwrap(box: Box[T]) -> T:
    return box.item


print(unwrap(Box(5)))
