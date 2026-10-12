import timeit

setup = "data = list(range(10_000)); as_set = set(data)"

in_list = timeit.timeit("9_999 in data", setup=setup, number=2_000)
in_set = timeit.timeit("9_999 in as_set", setup=setup, number=2_000)

# Exact times differ on every machine; the ratio is what matters.
print("list slower than set:", in_list > in_set)
print("at least 20 times slower:", in_list > 20 * in_set)

# Repeat the measurement and keep the best run, which has the least noise.
runs = timeit.repeat("sum(range(1_000))", number=1_000, repeat=5)
print("runs taken:", len(runs))
print("best is the smallest:", min(runs) == sorted(runs)[0])
