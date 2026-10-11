lists = [[1, 2], [3, 4], [5]]

print([x for sub in lists for x in sub])
print([*sub for sub in lists])
