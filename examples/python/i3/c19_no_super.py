class InsufficientFundsError(Exception):
    def __init__(self, balance, requested):
        self.balance = balance
        self.requested = requested


try:
    raise InsufficientFundsError(150, 500)
except InsufficientFundsError as error:
    print(error)
    print(error.args)
