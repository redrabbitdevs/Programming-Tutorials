from typing import reveal_type


def double[S: (str, bytes)](a: S) -> S:
    return a + a


reveal_type(double("ab"))
reveal_type(double(b"ab"))
print(double("ab"), double(b"ab"))
