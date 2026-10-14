import tracemalloc


def peak_of(func):
    tracemalloc.start()
    result = func()
    _now, peak = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    return result, peak


def with_list():
    squares = [n * n for n in range(200_000)]   # all at once
    return sum(squares)


def with_generator():
    return sum(n * n for n in range(200_000))   # one at a time


a, list_peak = peak_of(with_list)
b, gen_peak = peak_of(with_generator)
print("same answer:", a == b)
print("generator peak is 100x smaller:", gen_peak * 100 < list_peak)
