import cProfile
import pstats


def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)


with cProfile.Profile() as profiler:
    fib(10)

stats = pstats.Stats(profiler)
for key, value in stats.stats.items():
    if key[2] == "fib":
        print("primitive calls:", value[0])
        print("total calls:", value[1])
