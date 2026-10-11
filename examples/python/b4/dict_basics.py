ages = {"Ada": 36, "Alan": 41}
ages["Grace"] = 85
ages["Ada"] = 37
print(ages, len(ages))

print(ages["Alan"])
try:
    ages["Linus"]
except KeyError as error:
    print("KeyError:", error)

print(ages.get("Linus"))
print(ages.get("Linus", 0))
print("Ada" in ages, "Linus" in ages)

# setdefault inserts only when the key is missing
groups = {}
for word in ["apple", "avocado", "banana", "blueberry", "cherry"]:
    groups.setdefault(word[0], []).append(word)
print(groups)

del ages["Alan"]
print(ages.pop("Grace"), ages)
print(ages.pop("Nobody", "not there"))

# Iteration follows insertion order
stock = {"pens": 12, "ink": 3, "paper": 40}
for key in stock:
    print(key, end=" ")
print()
for item, count in stock.items():
    print(f"{item}: {count}")
print(list(stock.keys()), list(stock.values()))
