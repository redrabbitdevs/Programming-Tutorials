from dataclasses import dataclass
from typing import Protocol


class Named(Protocol):
    name: str


@dataclass
class User:
    name: str


def greet(thing: Named) -> str:
    return f"Hello, {thing.name}"


print(greet(User("Ada")))
try:
    greet({"name": "Mars"})
except AttributeError as error:
    print("AttributeError:", error)
