# Tracing the stack: indentation shows how deep each call is.
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


# No base case: the stack fills up and Python stops it.
def forever(n):
    return forever(n + 1)


try:
    forever(0)
except RecursionError:
    print("RecursionError: the stack ran out of room")

# Recursion over nested data: a folder is a dict, a file is its size.
tree = {
    "readme.txt": 5,
    "logo.png": 40,
    "src": {
        "main.py": 20,
        "util.py": 12,
        "tests": {"test_main.py": 8},
    },
}


def total_size(node):
    if isinstance(node, int):  # base case: a file
        return node
    return sum(total_size(child) for child in node.values())  # a folder


print("total size:", total_size(tree))


# The same factorial as a loop.
def factorial_loop(n):
    result = 1
    for k in range(2, n + 1):
        result *= k
    return result


print(factorial_loop(5))
