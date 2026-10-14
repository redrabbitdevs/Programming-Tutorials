from dataclasses import dataclass, fields
from typing import ClassVar


@dataclass
class Connection:
    host: str
    port: int = 5432
    opened: ClassVar[int] = 0

    def __post_init__(self) -> None:
        Connection.opened += 1


a = Connection("db1")
b = Connection("db2", 6543)
print([f.name for f in fields(Connection)], Connection.opened)
a.opened = 99
print(Connection.opened, a.opened)
