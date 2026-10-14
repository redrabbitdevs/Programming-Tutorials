import sqlite3

from shop.adapters import ConsoleNotifier, SqliteCatalogue
from shop.service import Checkout

PRODUCTS = [("tea", "4.50"), ("mug", "12.00")]


def build_checkout():
    """The composition root: the one place that picks real adapters."""
    db = sqlite3.connect(":memory:")
    db.execute("CREATE TABLE products (sku TEXT PRIMARY KEY, price TEXT)")
    db.executemany("INSERT INTO products VALUES (?, ?)", PRODUCTS)
    return Checkout(SqliteCatalogue(db), ConsoleNotifier())


checkout = build_checkout()
total = checkout.place("ana@example.com", {"tea": 2, "mug": 1}, "WELCOME10")
print("charged", total)
