for i in range(3):
    print(i)
print(list(range(2, 10, 3)))
print(list(range(5, 0, -2)))

fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit.upper())

for position, fruit in enumerate(fruits, start=1):
    print(position, fruit)

for row in range(1, 4):
    line = ""
    for col in range(1, 6):
        line += f"{row * col:3}"
    print(line)
