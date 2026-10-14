import timeit


def compare(a, b, setup="pass", margin=1.25):
    """Say which statement is faster, or 'tie' within the margin."""
    ta = min(timeit.repeat(a, setup, number=500, repeat=5))
    tb = min(timeit.repeat(b, setup, number=500, repeat=5))
    if ta * margin < tb:
        return "a"
    if tb * margin < ta:
        return "b"
    return "tie"


setup = "data = list(range(5_000)); s = set(data)"
print(compare("4_999 in data", "4_999 in s", setup))
print(compare("sorted(data)", "sorted(data)", setup, margin=2))
print(compare("data[:]", "[x for x in data]", setup))
