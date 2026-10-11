from typing import Protocol, runtime_checkable


@runtime_checkable
class Closeable(Protocol):
    def close(self) -> None: ...


class Odd:
    def close(self, a, b, c):  # wrong shape, right name
        return "not what the protocol described"


print(isinstance(Odd(), Closeable))
