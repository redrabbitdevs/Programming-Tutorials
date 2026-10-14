import timeit

setup = "data = list(range(10_000))"
as_list = min(timeit.repeat("sum([x * x for x in data])", setup,
                            number=100, repeat=5))
as_gen = min(timeit.repeat("sum(x * x for x in data)", setup,
                           number=100, repeat=5))

ratio = as_gen / as_list
print("same ballpark (within 3x):", 1 / 3 < ratio < 3)
