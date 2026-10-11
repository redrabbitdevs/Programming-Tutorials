def average(*numbers, default=0):
    if not numbers:
        return default
    return sum(numbers) / len(numbers)


print(average(2, 4, 6))
print(average())
print(average(default=-1))
