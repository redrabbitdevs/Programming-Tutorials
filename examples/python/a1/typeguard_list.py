from typing import TypeGuard


def all_text(items: list[object]) -> TypeGuard[list[str]]:
    return all(isinstance(item, str) for item in items)


def join(items: list[object]) -> str:
    if all_text(items):
        return "-".join(items)
    return "mixed"


print(join(["a", "b"]), join(["a", 1]))
