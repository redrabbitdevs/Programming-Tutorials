from functools import cache


@cache
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)


print(fib(10))
print(fib(80))
print(fib.cache_info().misses)
