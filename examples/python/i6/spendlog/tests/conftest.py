import pytest

from spendlog.store import parse_expenses, read_rows

CSV_TEXT = """date,category,amount,note
2026-02-27,food,12.40,Market
2026-03-01,home,640.00,Rent
2026-03-02,food,23.15,Groceries
2026-03-05,transport,48.50,Monthly pass
2026-04-02,food,19.90,Groceries
"""


@pytest.fixture
def csv_file(tmp_path):
    """A small expenses file in a temporary folder, new for every test."""
    path = tmp_path / "expenses.csv"
    path.write_text(CSV_TEXT, encoding="utf-8")
    return path


@pytest.fixture
def expenses(csv_file):
    """The same file, already parsed into Expense objects."""
    return list(parse_expenses(read_rows(csv_file)))
