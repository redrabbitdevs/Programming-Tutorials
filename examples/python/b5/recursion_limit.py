import sys

print(sys.getrecursionlimit())


def count_down_forever(n):
    return count_down_forever(n - 1)


try:
    count_down_forever(10)
except RecursionError as error:
    print("RecursionError:", error)


def total_to(n):
    if n == 0:
        return 0
    return n + total_to(n - 1)


print(total_to(500))
try:
    print(total_to(5000))
except RecursionError:
    print("5000 levels is too deep")

print(sum(range(5001)))

sys.setrecursionlimit(10_000)
print(total_to(5000))
