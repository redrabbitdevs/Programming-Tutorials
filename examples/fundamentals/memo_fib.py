calls = 0


def fib_plain(n):
    global calls
    calls += 1
    if n < 2:
        return n
    return fib_plain(n - 1) + fib_plain(n - 2)


def fib_memo(n, cache):
    global calls
    calls += 1
    if n < 2:
        return n
    if n not in cache:                       # compute each n only once
        cache[n] = fib_memo(n - 1, cache) + fib_memo(n - 2, cache)
    return cache[n]


fib_plain(25)
print("fib(25) plain calls:", calls)

calls = 0
fib_memo(25, {})
print("fib(25) memo calls:", calls)

print("fib(50) =", fib_memo(50, {}))
