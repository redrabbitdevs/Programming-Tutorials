from collections.abc import Sized


def longest[S: Sized](a: S, b: S) -> S:
    return a if len(a) >= len(b) else b


try:
    print(longest(10, 200))
except TypeError as error:
    print("TypeError:", error)
