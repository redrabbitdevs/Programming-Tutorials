class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance

    @classmethod
    def from_text(cls, text):
        if ":" not in text:
            raise ValueError(f"expected 'owner:balance', got {text!r}")
        owner, balance = text.split(":")
        return cls(owner.strip(), int(balance))


for line in ["Asha:100", "Ben : 20", "Chi"]:
    try:
        acct = Account.from_text(line)
        print(acct.owner, acct.balance)
    except ValueError as error:
        print("error:", error)
