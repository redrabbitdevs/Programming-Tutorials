from dataclasses import dataclass


@dataclass(frozen=True)
class Tag:
    label: str
    weight: int = 1


a = Tag("py")
b = Tag("py", 1)
c = Tag("py", 2)
print(a == b)
print(a == c)
print(len({a, b, c}))
