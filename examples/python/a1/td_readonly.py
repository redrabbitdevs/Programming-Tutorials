from typing import ReadOnly, TypedDict


class Account(TypedDict):
    id: ReadOnly[int]
    balance: float


acct: Account = {"id": 7, "balance": 10.0}
acct["balance"] += 5
acct["id"] = 8
print(acct)
print(sorted(Account.__readonly_keys__), sorted(Account.__mutable_keys__))
