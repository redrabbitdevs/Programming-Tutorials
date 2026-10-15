import sys
import timeit


def per_call(stmt, n, number):
    setup = f"data = list(range({n})); s = set(data); x = {n} - 1"
    return min(timeit.repeat(stmt, setup, number=number, repeat=5)) / number


for stmt, number in [("x in data", 200), ("x in s", 200_000)]:
    small = per_call(stmt, 10_000, number)  # cheap code needs more loops
    big = per_call(stmt, 100_000, number)
    growth = big / small               # 10x more data: how much slower?
    if growth > 5:
        shape = "grows with n (linear)"
    elif growth < 2.5:
        shape = "flat (constant)"
    else:
        shape = "unclear, measure again"
    print(f"{stmt:10} {shape}")
    print(f"measured: {growth:.1f}x", file=sys.stderr)  # varies
