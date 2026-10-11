class Account:
    bank_name = "Pybank"

    def __init__(self, owner):
        self.owner = owner


a = Account("Asha")
b = Account("Ben")
a.bank_name = "Other Bank"
print(a.bank_name)
print(b.bank_name)
print(Account.bank_name)
