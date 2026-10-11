friends = {
    "Ada": ["Grace", "Alan", "Linus", "Margaret"],
    "Ben": ["Alan", "Margaret", "Dennis", "Alan"],
}

common = set(friends["Ada"]) & set(friends["Ben"])
print(sorted(common))

only_ada = set(friends["Ada"]) - set(friends["Ben"])
print(sorted(only_ada))

# Remove duplicates but keep the original order
seen = set()
unique_in_order = []
for name in friends["Ben"]:
    if name not in seen:
        seen.add(name)
        unique_in_order.append(name)
print(unique_in_order)
print(list(dict.fromkeys(friends["Ben"])))
