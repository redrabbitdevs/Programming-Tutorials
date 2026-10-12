import json
from typing import TypeForm, cast, get_origin, reveal_type


def load[T](form: TypeForm[T], raw: str) -> T:
    value = json.loads(raw)
    expected = get_origin(form) or form
    if not isinstance(value, cast(type, expected)):
        raise TypeError(f"expected {form}, got {value!r}")
    return cast(T, value)


port = load(int, "8080")
hosts = load(list[str], '["a.example", "b.example"]')
reveal_type(port)
reveal_type(hosts)
print(port + 1, hosts[0].upper())
print(TypeForm(int | None))
try:
    load(int, '"8080"')
except TypeError as error:
    print("TypeError:", error)
