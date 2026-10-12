from typing import reveal_type

MISSING = sentinel("MISSING")


def get(
    data: dict[str, int], key: str, default: int | MISSING = MISSING
) -> int:
    if key in data:
        return data[key]
    if default is MISSING:
        raise KeyError(key)
    reveal_type(default)
    return default


print(get({"a": 1}, "a"), get({}, "b", 0), get({}, "c", default=-1))
try:
    get({}, "d")
except KeyError as error:
    print("KeyError:", error)
