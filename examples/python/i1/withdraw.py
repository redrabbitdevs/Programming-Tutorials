def withdraw(balance, amount):
    if amount <= 0:
        raise ValueError("amount must be positive")
    if amount > balance:
        raise ValueError(f"insufficient funds: balance {balance}, requested {amount}")
    return balance - amount


for amount in [30, 0, 500]:
    try:
        print("new balance:", withdraw(100, amount))
    except ValueError as error:
        print("refused:", error)
