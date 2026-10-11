ada = ["Grace", "Alan", "Linus", "Margaret"]
ben = ["Alan", "Margaret", "Dennis", "Alan"]

print(sorted(set(ada) & set(ben)))
print(sorted(set(ada) - set(ben)))

seen = set()
unique_in_order = []
for name in ben:
    if name not in seen:
        seen.add(name)
        unique_in_order.append(name)
print(unique_in_order)
