from functools import lru_cache

calls = 0


def fib(n):
    global calls
    calls += 1
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)


print(fib(20), calls)

calls = 0


@lru_cache(maxsize=None)
def fib_cached(n):
    global calls
    calls += 1
    if n < 2:
        return n
    return fib_cached(n - 1) + fib_cached(n - 2)


print(fib_cached(20), calls)
print(fib_cached(90))
