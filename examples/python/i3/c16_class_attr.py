class Account:
    bank_name = "Pybank"
    open_accounts = 0

    def __init__(self, owner):
        self.owner = owner
        Account.open_accounts = Account.open_accounts + 1


a = Account("Asha")
b = Account("Ben")
print(a.bank_name, b.bank_name)
print(Account.open_accounts)
