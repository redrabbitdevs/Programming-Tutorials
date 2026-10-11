stock = {"pens": 12, "ink": 3, "paper": 40}
print(list(stock.keys()), list(stock.values()))

for key in reversed(stock):
    print(key, end=" ")
print()
