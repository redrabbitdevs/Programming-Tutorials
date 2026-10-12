from pathlib import Path

from spendlog.store import parse_expenses, read_rows

path = Path("expenses.csv")

rows = read_rows(path)
print(type(rows).__name__)
print(next(rows))

expenses = list(parse_expenses(read_rows(path)))
print(len(expenses), "expenses")
print(expenses[1])
