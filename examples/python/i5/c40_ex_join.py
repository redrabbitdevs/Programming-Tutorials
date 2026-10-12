import timeit


def build_with_plus(n):
    result = []
    for i in range(n):
        result = result + [i]  # copies the whole list every time
    return result


def build_with_append(n):
    result = []
    for i in range(n):
        result.append(i)
    return result


assert build_with_plus(100) == build_with_append(100)

plus = min(timeit.repeat("build_with_plus(4_000)", globals=globals(), number=5, repeat=5))
append = min(timeit.repeat("build_with_append(4_000)", globals=globals(), number=5, repeat=5))

print("same result:", build_with_plus(100) == build_with_append(100))
print("append is at least 3 times faster:", plus > 3 * append)
