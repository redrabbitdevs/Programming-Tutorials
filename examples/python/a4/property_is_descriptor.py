class Account:
    def __init__(self, balance):
        self._balance = balance

    @property
    def balance(self):
        return self._balance


attr = Account.__dict__["balance"]
print(type(attr).__name__)
print(hasattr(attr, "__get__"), hasattr(attr, "__set__"))
account = Account(50)
print(attr.__get__(account, Account))
print(account.balance)
