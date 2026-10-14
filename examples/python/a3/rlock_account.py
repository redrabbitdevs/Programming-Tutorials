import threading

plain = threading.Lock()
with plain:
    print("Lock taken again:", plain.acquire(timeout=0.1))

reentrant = threading.RLock()
with reentrant:
    print("RLock taken again:", reentrant.acquire(timeout=0.1))
    reentrant.release()


class Account:
    def __init__(self):
        self.balance = 0
        self._lock = threading.RLock()

    def deposit(self, amount):
        with self._lock:
            self.balance += amount

    def deposit_twice(self, amount):
        with self._lock:  # holds the lock while deposit takes it again
            self.deposit(amount)
            self.deposit(amount)


account = Account()
account.deposit_twice(5)
print("balance:", account.balance)
