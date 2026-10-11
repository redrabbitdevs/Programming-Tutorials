total = sum(n * n for n in range(1, 1001))
print(total)

gen = (n * n for n in range(3))
print(next(gen), next(gen), next(gen))
