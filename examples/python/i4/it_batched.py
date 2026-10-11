from itertools import batched

ids = range(1, 8)
for batch in batched(ids, 3):
    print(batch)

print(list(batched("abcdef", 2)))
