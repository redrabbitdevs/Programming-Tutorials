data = [1, 2, 3, 4, 5]

k = 2
print(data[k:] + data[:k])
print(data[-k:] + data[:-k])

k = 7 % len(data)
print(data[k:] + data[:k])

print(data[::-1])
print(data)

data[:] = data[::-1]
print(data)
