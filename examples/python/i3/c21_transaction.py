class Transaction:
    def __init__(self, data):
        self.data = data

    def __enter__(self):
        self._snapshot = dict(self.data)
        return self.data

    def __exit__(self, exc_type, exc_value, traceback):
        if exc_type is None:
            print("committed")
        else:
            self.data.clear()
            self.data.update(self._snapshot)
            print("rolled back")
        return False


balances = {"a": 100, "b": 0}

with Transaction(balances) as t:
    t["a"] -= 50
    t["b"] += 50
print(balances)

try:
    with Transaction(balances) as t:
        t["a"] -= 80
        raise ValueError("insufficient funds")
except ValueError as error:
    print("error:", error)
print(balances)
