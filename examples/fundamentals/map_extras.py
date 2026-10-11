words = ["the", "cat", "and", "the", "hat"]

# dict.get(key, default) avoids the "is it there yet?" branch.
counts = {}
for w in words:
    counts[w] = counts.get(w, 0) + 1
print(counts)

# Grouping: map each key to a list of values.
by_length = {}
for w in words:
    by_length.setdefault(len(w), []).append(w)
print(by_length)

# Remove duplicates but keep first-seen order.
seen = set()
unique_in_order = []
for w in words:
    if w not in seen:
        seen.add(w)
        unique_in_order.append(w)
print(unique_in_order)

# A missing key is an error for [] but not for get().
prices = {"apples": 3}
print(prices.get("pears"))
try:
    prices["pears"]
except KeyError as err:
    print("KeyError:", err)

# Unhashable keys are rejected.
try:
    bad = {[1, 2]: "list as key"}
except TypeError as err:
    print("TypeError:", err)
