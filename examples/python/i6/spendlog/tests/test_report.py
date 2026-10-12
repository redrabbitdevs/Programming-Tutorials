from datetime import date
from decimal import Decimal

import pytest

from spendlog.models import Category
from spendlog.report import format_report, in_month, total_by_category


@pytest.mark.parametrize(
    ("month", "count"),
    [
        (date(2026, 2, 1), 1),
        (date(2026, 3, 1), 3),
        (date(2026, 4, 1), 1),
        (date(2026, 5, 1), 0),
    ],
    ids=["february", "march", "april", "may"],
)
def test_in_month_keeps_only_that_month(expenses, month, count):
    assert len(list(in_month(expenses, month))) == count


def test_totals_add_up_per_category(expenses):
    totals = total_by_category(expenses)
    assert totals[Category.FOOD] == Decimal("55.45")
    assert totals[Category.HOME] == Decimal("640.00")


def test_report_lists_the_biggest_category_first_and_ends_with_the_total():
    totals = {Category.FOOD: Decimal("5"), Category.HOME: Decimal("20")}
    assert format_report(totals).splitlines() == [
        "home          20.00",
        "food           5.00",
        "total         25.00",
    ]
