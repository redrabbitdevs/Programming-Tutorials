import logging
from datetime import date
from decimal import Decimal

from spendlog.models import Category, Expense
from spendlog.store import parse_expenses, read_rows


def test_read_rows_gives_one_dict_per_line(csv_file):
    rows = read_rows(csv_file)
    first = next(rows)
    assert first == {"date": "2026-02-27", "category": "food", "amount": "12.40", "note": "Market"}


def test_parse_expenses_builds_expense_objects(expenses):
    assert len(expenses) == 5
    assert expenses[1] == Expense(date(2026, 3, 1), Category.HOME, Decimal("640.00"), "Rent")


def test_bad_rows_are_skipped_and_logged(tmp_path, caplog):
    path = tmp_path / "messy.csv"
    path.write_text(
        "date,category,amount,note\n"
        "2026-03-02,food,23.15,Groceries\n"
        "2026-03-31,food,abc,Lunch\n"
        "2026-13-01,home,10.00,Typo\n",
        encoding="utf-8",
    )
    with caplog.at_level(logging.WARNING):
        result = list(parse_expenses(read_rows(path)))

    assert len(result) == 1
    assert [record.getMessage()[:7] for record in caplog.records] == ["line 3:", "line 4:"]
