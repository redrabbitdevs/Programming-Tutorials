import csv
import logging
from datetime import date
from decimal import Decimal, InvalidOperation

from .models import Category, Expense

log = logging.getLogger(__name__)


def read_rows(path):
    with path.open(newline="", encoding="utf-8") as file:
        yield from csv.DictReader(file)


def parse_expense(row):
    return Expense(
        day=date.fromisoformat(row["date"]),
        category=Category(row["category"]),
        amount=Decimal(row["amount"]),
        note=row["note"],
    )


def parse_expenses(rows):
    # Line 1 of the file is the header, so the first data row is line 2.
    for number, row in enumerate(rows, start=2):
        try:
            yield parse_expense(row)
        except (ValueError, InvalidOperation):
            log.warning("line %d: skipped invalid row %r", number, row)
