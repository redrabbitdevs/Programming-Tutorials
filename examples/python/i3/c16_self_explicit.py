class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance = self.balance + amount


acct = Account("Asha", 100)
acct.deposit(50)
Account.deposit(acct, 25)
print(acct.balance)
