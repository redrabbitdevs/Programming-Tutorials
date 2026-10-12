class Money:
    __match_args__ = ("amount", "currency")

    def __init__(self, amount, currency):
        self.amount = amount
        self.currency = currency


def show(money):
    match money:
        case Money(0, _):
            return "nothing"
        case Money(amount, "EUR"):
            return f"{amount} euro"
        case Money(amount, currency):
            return f"{amount} {currency}"


for money in [Money(0, "USD"), Money(5, "EUR"), Money(7, "GBP")]:
    print(show(money))
