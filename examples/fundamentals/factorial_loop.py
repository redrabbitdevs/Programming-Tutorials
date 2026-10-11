def factorial_loop(n):
    result = 1
    for k in range(2, n + 1):
        result *= k
    return result


print(factorial_loop(5))
