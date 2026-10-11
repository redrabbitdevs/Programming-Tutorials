from dataclasses import dataclass, field


@dataclass
class Basket:
    owner: str
    items: list[str] = field(default_factory=list)


a = Basket("Asha")
b = Basket("Ben")
a.items.append("apple")
print(a)
print(b)
