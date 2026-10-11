class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance = self.balance + amount

    def describe(self):
        return f"{self.owner}: {self.balance}"


acct = Account("Asha", 100)
acct.deposit(50)
print(acct.describe())
