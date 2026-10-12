import json
from typing import TypedDict, cast


class Item(TypedDict):
    sku: str
    qty: int


item = cast(Item, json.loads('{"sku": "A1", "qty": 4}'))
print(item["sku"], item["qty"] * 2)

wrong = cast(int, "not a number")
print(repr(wrong), type(wrong).__name__)
