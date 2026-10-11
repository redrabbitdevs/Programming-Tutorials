values = [4, 1, 4, 2, 1, 3]

seen = set()
result = []
for v in values:
    if v not in seen:
        seen.add(v)
        result.append(v)
print(result)
