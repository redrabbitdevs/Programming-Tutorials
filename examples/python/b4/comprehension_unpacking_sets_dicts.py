sets = [{1, 2}, {2, 3}, {3, 4}]
print(sorted({*s for s in sets}))

dicts = [{"a": 1}, {"b": 2}, {"a": 3}]
print({**d for d in dicts})
