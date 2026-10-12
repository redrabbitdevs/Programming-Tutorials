from collections.abc import Sized
from typing import reveal_type


def longest_plain(a: Sized, b: Sized) -> Sized:
    return a if len(a) >= len(b) else b


def longest[S: Sized](a: S, b: S) -> S:
    return a if len(a) >= len(b) else b


reveal_type(longest_plain("pear", "fig"))
reveal_type(longest("pear", "fig"))
reveal_type(longest([1, 2], [3, 4, 5]))
print(longest("pear", "fig"), longest([1, 2], [3, 4, 5]))
(S,) = longest.__type_params__
print(S.__bound__)
