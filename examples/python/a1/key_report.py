from typing import NotRequired, ReadOnly, TypedDict


def key_report(td: type) -> None:
    print(td.__name__)
    for label in ("required", "optional", "readonly"):
        keys = getattr(td, f"__{label}_keys__")
        print(f"  {label}: {', '.join(sorted(keys)) or '-'}")


class Product(TypedDict):
    sku: ReadOnly[str]
    price: float
    note: NotRequired[str]


key_report(Product)
