from functools import cache

calls = 0


@cache
def paths(rows, cols):
    """Number of right/down paths through a rows x cols grid."""
    global calls
    calls += 1
    if rows == 0 or cols == 0:
        return 1
    return paths(rows - 1, cols) + paths(rows, cols - 1)


print(paths(16, 16))
print("function bodies run:", calls)
print(paths.cache_info())
paths.cache_clear()
