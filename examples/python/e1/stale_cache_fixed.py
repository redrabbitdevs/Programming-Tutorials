from functools import cache

RATES = {"EUR": 1.10}


@cache
def convert_at(amount, rate):       # every input is an argument
    return round(amount * rate, 2)


def convert(amount, currency):
    return convert_at(amount, RATES[currency])


print(convert(100, "EUR"))
RATES["EUR"] = 1.20
print(convert(100, "EUR"))
