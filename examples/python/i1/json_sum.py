import json

text = '{"apples": 3, "pears": 5, "plums": 2}'
stock = json.loads(text)

print("Total:", sum(stock.values()))
print("Most:", max(stock, key=stock.get))
