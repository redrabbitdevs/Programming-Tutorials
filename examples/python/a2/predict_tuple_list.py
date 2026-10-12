pair = ([1], [2])
pair[0].append(9)
print(pair)
try:
    pair[0] += [3]
except TypeError as error:
    print("TypeError:", error)
print(pair)
