from datetime import datetime
from typing import NamedTuple


class Payment(NamedTuple):
    day: str
    amount: float


rows = [("2026-03-14", 12.5), ("2026-03-02", 40.0)]
payments = [Payment(*row) for row in rows]
for payment in sorted(payments):
    day = datetime.strptime(payment.day, "%Y-%m-%d")
    print(f"{day:%d %b}: {payment.amount:6.2f}")
