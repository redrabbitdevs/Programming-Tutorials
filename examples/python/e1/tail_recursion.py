import sys


def count(n, acc=0):
    if n == 0:
        return acc
    return count(n - 1, acc + 1)          # a call in tail position


print("recursion limit:", sys.getrecursionlimit())
try:
    print(count(100_000))
except RecursionError as err:
    print("RecursionError:", err)
