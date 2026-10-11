colors = {"apple": "red", "cherry": "red", "banana": "yellow", "lime": "green"}

inverted = {}
for fruit, color in colors.items():
    inverted.setdefault(color, []).append(fruit)
print(inverted)
