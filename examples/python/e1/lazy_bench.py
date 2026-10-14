import timeit

setup = "data = list(range(10_000))"
as_list = min(timeit.repeat("[x * x for x in data]", setup,
                            number=100, repeat=5))
as_gen = min(timeit.repeat("(x * x for x in data)", setup,
                           number=100, repeat=5))

print("generator is faster:", as_gen < as_list)
print("generator is 50x faster:", as_gen * 50 < as_list)
