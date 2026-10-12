from typing import reveal_type


def describe(value: int | str | None) -> str:
    if value is None:
        reveal_type(value)
        return "nothing"
    reveal_type(value)
    if isinstance(value, str):
        reveal_type(value)
        return f"text of length {len(value)}"
    reveal_type(value)
    return f"number {value + 1}"


print(describe(None), describe("abc"), describe(41), sep=" | ")
