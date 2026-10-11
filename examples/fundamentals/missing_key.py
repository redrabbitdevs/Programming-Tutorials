prices = {"apples": 3}

print(prices.get("pears"))
try:
    prices["pears"]
except KeyError as err:
    print("KeyError:", err)
