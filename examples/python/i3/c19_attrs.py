class InsufficientFundsError(Exception):
    def __init__(self, balance, requested):
        super().__init__(f"cannot withdraw {requested}, balance is {balance}")
        self.balance = balance
        self.requested = requested

    @property
    def shortfall(self):
        return self.requested - self.balance


try:
    raise InsufficientFundsError(150, 500)
except InsufficientFundsError as error:
    print(error)
    print(error.balance, error.requested, error.shortfall)
