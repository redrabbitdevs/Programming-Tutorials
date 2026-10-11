class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance

    @staticmethod
    def is_valid_owner(name):
        return name.strip() != ""


print(Account.is_valid_owner("Asha"))
print(Account.is_valid_owner("   "))
