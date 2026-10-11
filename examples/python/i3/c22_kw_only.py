from dataclasses import dataclass


@dataclass(kw_only=True)
class Connection:
    host: str
    port: int = 5432
    use_tls: bool = True


print(Connection(host="db.example", use_tls=False))
try:
    Connection("db.example")
except TypeError:
    print("TypeError: positional arguments are not accepted")
