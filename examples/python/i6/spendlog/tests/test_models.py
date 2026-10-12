from dataclasses import FrozenInstanceError
from datetime import date
from decimal import Decimal

import pytest

from spendlog.models import Category, Expense


@pytest.mark.parametrize(
    ("text", "expected"),
    [("food", Category.FOOD), ("transport", Category.TRANSPORT), ("home", Category.HOME)],
)
def test_category_from_text(text, expected):
    assert Category(text) is expected


@pytest.mark.parametrize("text", ["travel", "Food", ""])
def test_unknown_category_is_refused(text):
    with pytest.raises(ValueError):
        Category(text)


def test_expense_cannot_be_changed():
    expense = Expense(date(2026, 3, 2), Category.FOOD, Decimal("3.50"))
    with pytest.raises(FrozenInstanceError):
        expense.amount = Decimal("4.00")
