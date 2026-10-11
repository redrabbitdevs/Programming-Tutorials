def total(*numbers):
    print(type(numbers).__name__, numbers)
    return sum(numbers)


print(total())
print(total(1, 2, 3))
