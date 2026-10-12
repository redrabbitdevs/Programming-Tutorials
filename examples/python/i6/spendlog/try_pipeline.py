from datetime import datetime
from pathlib import Path

from spendlog.report import in_month, total_by_category
from spendlog.store import parse_expenses, read_rows

march = datetime.strptime("2026-03", "%Y-%m").date()
print(march)

pipeline = in_month(parse_expenses(read_rows(Path("expenses.csv"))), march)
print(type(pipeline).__name__)

totals = total_by_category(pipeline)
for category, amount in totals.items():
    print(category, amount)
