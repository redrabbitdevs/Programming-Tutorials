def average(numbers: list[float]) -> float | None:
    if not numbers:
        return None
    return sum(numbers) / len(numbers)


result = average([3, 4, 5])
if result is not None:
    print(result)
print(average([]))
