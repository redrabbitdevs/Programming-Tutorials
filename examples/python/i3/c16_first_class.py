class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance


acct = Account("Asha", 100)
print(acct.owner)
print(acct.balance)
print(type(acct))
