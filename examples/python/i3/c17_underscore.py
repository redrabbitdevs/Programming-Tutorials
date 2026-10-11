class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self._balance = balance  # the underscore says: internal

    def deposit(self, amount):
        self._balance = self._balance + amount

    def balance(self):
        return self._balance


acct = Account("Asha", 100)
acct.deposit(50)
print(acct.balance())
print(acct._balance)  # allowed, but you are on your own
