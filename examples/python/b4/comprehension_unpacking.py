lists = [[1, 2], [3, 4], [5]]

print([x for sub in lists for x in sub])
print([*sub for sub in lists])

sets = [{1, 2}, {2, 3}, {3, 4}]
print(sorted({*s for s in sets}))

dicts = [{"a": 1}, {"b": 2}, {"a": 3}]
print({**d for d in dicts})

gen = (*sub for sub in lists)
print(list(gen))

# Filtering still works
print([*sub for sub in lists if len(sub) > 1])
