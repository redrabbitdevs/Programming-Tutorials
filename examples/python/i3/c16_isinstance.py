class Account:
    def __init__(self, owner):
        self.owner = owner


acct = Account("Asha")
print(isinstance(acct, Account))
print(isinstance("Asha", Account))
print(acct.__class__.__name__)
