def average(numbers):
    total = 0
    for n in numbers:
        total += n
    return total / len(numbers)


print(average([2, 4, 6]))
print(average([5]))
