import shop.adapters
from shop.domain import order_total

from .domain import Decimal


def checkout(prices):
    total = order_total(prices)
    shop.adapters.ConsoleNotifier().send("ana@example.com", str(total))
    return Decimal(total)
