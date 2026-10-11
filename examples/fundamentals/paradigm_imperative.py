numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

total = 0
for n in numbers:
    if n % 2 == 0:
        total += n * n
print("total:", total)
