"""Talk to the outside world: a database and a way to send messages."""
from decimal import Decimal


class SqliteCatalogue:
    def __init__(self, connection):
        self.db = connection

    def price_of(self, sku):
        row = self.db.execute(
            "SELECT price FROM products WHERE sku = ?", (sku,)
        ).fetchone()
        if row is None:
            raise KeyError(sku)
        return Decimal(row[0])


class ConsoleNotifier:
    def send(self, to, text):
        print(f"to {to}: {text}")
