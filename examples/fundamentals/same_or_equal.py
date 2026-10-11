a = [1, 2]
b = [1, 2]
c = a

print("equal contents (a, b):", "yes" if a == b else "no")
print("same list (a, b):", "yes" if a is b else "no")
print("same list (a, c):", "yes" if a is c else "no")

c[0] = 99
print("a:", a)
print("b:", b)
