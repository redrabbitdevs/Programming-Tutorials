stock = {"pens": 12, "ink": 3, "paper": 40}

for key in stock:
    print(key, end=" ")
print()

for item, count in stock.items():
    print(f"{item}: {count}")
