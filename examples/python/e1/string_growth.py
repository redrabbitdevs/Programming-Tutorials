import io
import timeit


def plus_equals(words):
    s = ""
    for w in words:
        s += w
    return s


def prepend(words):
    s = ""
    for w in reversed(words):
        s = w + s
    return s


def join(words):
    return "".join(words)


def string_io(words):
    buf = io.StringIO()
    for w in words:
        buf.write(w)
    return buf.getvalue()


def best(fn, words):
    return min(timeit.repeat(lambda: fn(words), number=1, repeat=5))


small = [f"{i:09d} " for i in range(1_000)]
big = [f"{i:09d} " for i in range(10_000)]
for fn in [plus_equals, prepend, join, string_io]:
    assert fn(big) == join(big)
    growth = best(fn, big) / best(fn, small)
    shape = "quadratic" if growth > 40 else "linear"
    print(f"{fn.__name__:12} {shape}")
