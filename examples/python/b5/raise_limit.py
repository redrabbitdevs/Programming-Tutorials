import sys


def total_to(n):
    if n == 0:
        return 0
    return n + total_to(n - 1)


print(total_to(500))
print(sum(range(5001)))

sys.setrecursionlimit(10_000)
print(total_to(5000))
