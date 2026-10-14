"""Use cases. Depend on the domain and on interfaces, not on adapters."""
from decimal import Decimal
from typing import Protocol

from .domain import Line, order_total


class Catalogue(Protocol):
    def price_of(self, sku: str) -> Decimal: ...


class Notifier(Protocol):
    def send(self, to: str, text: str) -> None: ...


class Checkout:
    def __init__(self, catalogue: Catalogue, notifier: Notifier) -> None:
        self.catalogue = catalogue
        self.notifier = notifier

    def place(self, email: str, items: dict[str, int],
              discount_code: str | None = None) -> Decimal:
        lines = [Line(sku, self.catalogue.price_of(sku), quantity)
                 for sku, quantity in items.items()]
        total = order_total(lines, discount_code)
        self.notifier.send(email, f"Your order: {total} EUR")
        return total
