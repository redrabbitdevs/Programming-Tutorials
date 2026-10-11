class BankError(Exception):
    """Base class for account errors."""


class InsufficientFundsError(BankError):
    def __init__(self, balance, requested):
        super().__init__(f"cannot withdraw {requested}, balance is {balance}")
        self.balance = balance
        self.requested = requested


class AccountClosedError(BankError):
    pass


class Account:
    def __init__(self, balance):
        self.balance = balance
        self.closed = False

    def withdraw(self, amount):
        if self.closed:
            raise AccountClosedError("account is closed")
        if amount > self.balance:
            raise InsufficientFundsError(self.balance, amount)
        self.balance -= amount


acct = Account(100)
for amount in [30, 500, 70]:
    try:
        acct.withdraw(amount)
        print("ok, balance", acct.balance)
    except InsufficientFundsError as error:
        print(error, "| short by", error.requested - error.balance)
acct.closed = True
try:
    acct.withdraw(1)
except BankError as error:
    print(type(error).__name__ + ":", error)
