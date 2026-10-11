a = [1, 2]
b = a
b.append(3)
print(a)

a = [1, 2]
b = a
b = b + [3]
print(a)

a = "hi"
b = a
b += "!"
print(a)

a = [[1], [2]]
b = a.copy()
b[0].append(9)
print(a)

a = [[1], [2]]
b = a.copy()
b[0] = [9]
print(a)
