import io
from typing import Protocol, runtime_checkable


@runtime_checkable
class Closeable(Protocol):
    def close(self) -> None: ...


class Connection:
    def close(self) -> None:
        print("closed")


class Brick:
    pass


print(isinstance(Connection(), Closeable))
print(isinstance(Brick(), Closeable))
print(isinstance(io.StringIO(), Closeable))
