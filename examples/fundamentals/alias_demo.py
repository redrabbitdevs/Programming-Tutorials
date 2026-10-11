x = 5
y = x            # numbers: a copy of the value
y = 6
print("x:", x, "y:", y)

a = [1, 2, 3]
b = a            # lists: a copy of the reference, one list
b[2] = 99
print("a after changing b:", a)

c = a.copy()     # a real copy: a second list
c[0] = 0
print("a after changing c:", a)
print("c:", c)
