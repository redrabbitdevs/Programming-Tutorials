class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance


first = Account("Asha", 100)
second = Account("Ben", 20)
first.balance = 150
print(first.balance)
print(second.balance)
