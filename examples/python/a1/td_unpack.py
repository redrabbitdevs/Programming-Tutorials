from typing import NotRequired, TypedDict, Unpack


class Options(TypedDict):
    host: str
    port: NotRequired[int]


def connect(**options: Unpack[Options]) -> str:
    return f"{options['host']}:{options.get('port', 5432)}"


print(connect(host="db.local"))
print(connect(host="db.local", port=6543))
print(connect(host="db.local", prot=6543))
