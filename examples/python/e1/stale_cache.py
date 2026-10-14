from functools import cache

RATES = {"EUR": 1.10}


@cache
def convert(amount, currency):
    return round(amount * RATES[currency], 2)


print(convert(100, "EUR"))
RATES["EUR"] = 1.20                 # the rate changes during the day
print(convert(100, "EUR"))
