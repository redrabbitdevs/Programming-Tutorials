from functools import cache

calls = 0


@cache
def slow_square(n):
    global calls
    calls += 1
    return n * n


print(slow_square(4), slow_square(4), slow_square(5))
print("calls:", calls)
print(slow_square.cache_info())
slow_square.cache_clear()
print(slow_square.cache_info().currsize)
