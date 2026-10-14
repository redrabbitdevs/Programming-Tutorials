from decimal import Decimal

from .adapters import ConsoleNotifier


def order_total(prices):
    total = sum(prices, Decimal("0"))
    ConsoleNotifier().send("ops@example.com", f"new order: {total}")
    return total
