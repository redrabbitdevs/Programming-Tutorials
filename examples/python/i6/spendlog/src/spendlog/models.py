from dataclasses import dataclass
from datetime import date
from decimal import Decimal
from enum import StrEnum


class Category(StrEnum):
    FOOD = "food"
    TRANSPORT = "transport"
    HOME = "home"
    FUN = "fun"


@dataclass(frozen=True)
class Expense:
    day: date
    category: Category
    amount: Decimal
    note: str = ""
