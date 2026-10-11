squares = [n * n for n in range(1, 6)]

result = []
for n in range(1, 6):
    result.append(n * n)
print(result == squares)
