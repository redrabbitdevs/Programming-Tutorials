class Wallet:
    def __init__(self, cents):
        self.cents = cents

    def __bool__(self):
        return self.cents > 0


for wallet in (Wallet(250), Wallet(0)):
    if wallet:
        print("has money")
    else:
        print("empty")
print(bool(Wallet(1)))
