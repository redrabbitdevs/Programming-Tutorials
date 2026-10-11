def summarize(numbers):
    return min(numbers), max(numbers), sum(numbers) / len(numbers)


low, high, mean = summarize([4, 8, 15, 16, 23, 42])
print(low, high, round(mean, 2))

winner, *others = ["Ada", "Ben", "Cy"]
print(winner, others)
