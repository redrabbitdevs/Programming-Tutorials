def sign(n):
    if n < 0:
        return "negative"
    if n == 0:
        return "zero"
    return "positive"


def min_max(numbers):
    return min(numbers), max(numbers)


def classify(n):
    if n > 0:
        return "positive"


print(sign(-4), sign(0), sign(9))

low, high = min_max([3, 9, 1, 7])
print(low, high)
print(min_max([3, 9, 1, 7]))

print(classify(5))
print(classify(-5))
