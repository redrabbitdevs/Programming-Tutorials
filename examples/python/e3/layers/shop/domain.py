"""Business rules. Imports nothing from the rest of the application."""
from dataclasses import dataclass
from decimal import Decimal


@dataclass(frozen=True)
class Line:
    sku: str
    price: Decimal
    quantity: int


def order_total(lines, discount_code=None):
    total = sum((line.price * line.quantity for line in lines),
                Decimal("0"))
    if discount_code == "WELCOME10":
        total = total * Decimal("0.9")
    return total.quantize(Decimal("0.01"))
