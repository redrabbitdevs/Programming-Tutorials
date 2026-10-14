from typing import Literal, get_overloads, overload, reveal_type


@overload
def load(text: str, *, as_list: Literal[True]) -> list[str]: ...
@overload
def load(text: str, *, as_list: Literal[False] = False) -> str: ...
def load(text: str, *, as_list: bool = False) -> list[str] | str:
    lines = text.strip().splitlines()
    return lines if as_list else " ".join(lines)


reveal_type(load("a\nb"))
reveal_type(load("a\nb", as_list=True))
print(load("a\nb"), load("a\nb", as_list=True))
print(len(get_overloads(load)), load.__name__)
