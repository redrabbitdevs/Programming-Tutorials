class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError(f"deposit must be positive: {amount}")
        self.balance = self.balance + amount

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError(f"cannot withdraw {amount}, balance is {self.balance}")
        self.balance = self.balance - amount


acct = Account("Asha", 100)
acct.deposit(50)
try:
    acct.withdraw(500)
except ValueError as error:
    print("error:", error)
acct.withdraw(30)
print(acct.balance)
