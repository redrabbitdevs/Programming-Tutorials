def total_to(n):
    if n <= 0:
        return 0
    return n + total_to(n - 1)


print(total_to(3))
print(total_to(0))
