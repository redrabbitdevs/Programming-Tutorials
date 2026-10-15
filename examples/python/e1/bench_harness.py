import statistics
import sys
import timeit


def bench(stmt, setup="pass", repeat=5, target=0.02):
    """Return (best, median) seconds per execution of stmt."""
    timer = timeit.Timer(stmt, setup)
    number = 1
    while timer.timeit(number) < target:   # calibrate the loop count
        number *= 2
    runs = [t / number for t in timer.repeat(repeat, number)]
    return min(runs), statistics.median(runs)


setup = "words = ['spam'] * 10_000"
join_best, join_median = bench("''.join(words)", setup)
loop_best, _ = bench("s = ''\nfor w in words: s = w + s", setup)

ratio = loop_best / join_best
print("best <= median:", join_best <= join_median)
print("prepend loop slower than join:", ratio > 1)
print("at least 20x slower:", ratio > 20)
print(f"measured: {ratio:.0f}x slower", file=sys.stderr)  # varies
