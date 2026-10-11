class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance

    @classmethod
    def from_text(cls, text):
        owner, balance = text.split(":")
        return cls(owner, int(balance))


acct = Account.from_text("Asha:100")
print(acct.owner, acct.balance)
