class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance


acct = Account("Asha", 100)
acct.balence = 500  # typo: creates a new attribute
print(acct.balance)
print(acct.balence)
try:
    print(acct.blance)
except AttributeError as error:
    print("AttributeError:", error)
