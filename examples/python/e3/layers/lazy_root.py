import sys

lazy import sqlite3
lazy from shop.adapters import ConsoleNotifier, SqliteCatalogue
from shop.service import Checkout


def loaded():
    return [m for m in ("sqlite3", "shop.adapters") if m in sys.modules]


def main(argv):
    if argv == ["--help"]:
        print("usage: shop [--help]")
    else:
        db = sqlite3.connect(":memory:")
        db.execute("CREATE TABLE products (sku TEXT, price TEXT)")
        db.execute("INSERT INTO products VALUES ('tea', '4.50')")
        checkout = Checkout(SqliteCatalogue(db), ConsoleNotifier())
        checkout.place("ana@example.com", {"tea": 1})
    print("loaded:", loaded())


main(["--help"])
main([])
