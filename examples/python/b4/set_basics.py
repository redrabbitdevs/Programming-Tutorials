colors = {"red", "green", "blue", "red"}
print(sorted(colors), len(colors))

empty_set = set()
empty_dict = {}
print(type(empty_set).__name__, type(empty_dict).__name__)

colors.add("yellow")
colors.discard("purple")
colors.discard("red")
print(sorted(colors))

try:
    colors.remove("purple")
except KeyError as error:
    print("KeyError:", error)

print("blue" in colors)

# Removing duplicates from a list
print(sorted(set([3, 1, 3, 2, 1])))

# Elements must be hashable
try:
    {[1, 2]}
except TypeError as error:
    print("TypeError:", error)
print({(1, 2), (1, 2)})
