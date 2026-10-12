from datetime import datetime
from pathlib import Path

from spendlog.models import Category
from spendlog.report import format_expense, in_month
from spendlog.store import parse_expenses, read_rows


def in_category(expenses, category):
    for expense in expenses:
        if expense.category == category:
            yield expense


march = datetime.strptime("2026-03", "%Y-%m").date()
expenses = parse_expenses(read_rows(Path("expenses.csv")))
for expense in in_category(in_month(expenses, march), Category.FOOD):
    print(format_expense(expense))
