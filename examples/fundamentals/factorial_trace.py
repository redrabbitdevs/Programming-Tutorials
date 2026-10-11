def factorial(n, depth=0):
    pad = "  " * depth
    print(f"{pad}call factorial({n})")
    if n <= 1:
        print(f"{pad}return 1")
        return 1
    result = n * factorial(n - 1, depth + 1)
    print(f"{pad}return {result}")
    return result


factorial(3)
