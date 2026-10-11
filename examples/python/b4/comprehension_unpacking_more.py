lists = [[1, 2], [3, 4], [5]]

gen = (*sub for sub in lists)
print(list(gen))
print([*sub for sub in lists if len(sub) > 1])
