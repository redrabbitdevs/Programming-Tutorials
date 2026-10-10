# Three ways to swap two variables
a, b = 1, 2
temp = a
a = b
b = temp
print("temp:", a, b)

a, b = 1, 2
a, b = b, a
print("tuple:", a, b)

a, b = 1, 2
a = a + b
b = a - b
a = a - b
print("arithmetic:", a, b)

# Binding versus copying
x = [1, 2]
y = x
y.append(3)
print(x, y, x is y)
