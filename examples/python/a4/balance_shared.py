class NonNegative:
    def __set_name__(self, owner, name):
        self.name = name

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return self.value

    def __set__(self, obj, value):
        if value < 0:
            raise ValueError(f"{self.name} must be >= 0")
        self.value = value


class Account:
    balance = NonNegative()

    def __init__(self, balance):
        self.balance = balance


a = Account(10)
b = Account(99)
print(a.balance, b.balance)
