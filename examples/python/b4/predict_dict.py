stock = {"pens": 12, "ink": 3}
print(stock.get("paper", 0))
print(stock.pop("ink"))
print(stock)
print("ink" in stock)
