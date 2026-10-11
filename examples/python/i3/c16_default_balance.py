class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance


print(Account("Ben").balance)
print(Account("Asha", 100).balance)
