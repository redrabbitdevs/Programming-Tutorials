def sum_to(n):
    total = 0
    for i in range(1, n):
        total += i
        print("i =", i, "total =", total)
    return total


print("result:", sum_to(4))
