"""A small bank account, used as the code under test."""


class InsufficientFunds(Exception):
    """Raised when a withdrawal is larger than the balance."""


class Account:
    def __init__(self, owner, balance=0):
        if balance < 0:
            raise ValueError("opening balance cannot be negative")
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("deposit must be positive")
        self.balance += amount

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("withdrawal must be positive")
        if amount > self.balance:
            raise InsufficientFunds(f"balance {self.balance}, asked for {amount}")
        self.balance -= amount
