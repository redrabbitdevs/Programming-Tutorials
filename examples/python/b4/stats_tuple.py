numbers = [4, 8, 15, 16, 23, 42]
low, high, mean = min(numbers), max(numbers), sum(numbers) / len(numbers)
print(low, high, round(mean, 2))

winner, *others = ["Ada", "Ben", "Cy"]
print(winner, others)
