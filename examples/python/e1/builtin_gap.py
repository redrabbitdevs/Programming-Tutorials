import sys
import timeit

setup = "data = list(range(100_000))"


def ratio(loop, builtin):
    a = min(timeit.repeat(loop, setup, number=20, repeat=5))
    b = min(timeit.repeat(builtin, setup, number=20, repeat=5))
    return a / b


total = ratio("t = 0\nfor x in data: t += x", "sum(data)")
biggest = ratio("m = data[0]\nfor x in data:\n    if x > m: m = x",
                "max(data)")
print("sum() beats the loop by over 2x:", total > 2)
print("max() and the loop within 3x:", 1 / 3 < biggest < 3)
print(f"measured: sum {total:.1f}x, max {biggest:.1f}x",
      file=sys.stderr)
