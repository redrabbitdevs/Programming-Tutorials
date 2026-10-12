from datetime import datetime
from pathlib import Path

from spendlog.report import format_expense, in_month
from spendlog.store import parse_expenses, read_rows


def biggest(expenses, n):
    ranked = sorted(expenses, key=lambda expense: expense.amount, reverse=True)
    return ranked[:n]


march = datetime.strptime("2026-03", "%Y-%m").date()
expenses = parse_expenses(read_rows(Path("expenses.csv")))
for expense in biggest(in_month(expenses, march), 2):
    print(format_expense(expense))
