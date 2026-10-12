import functools
import inspect
from collections.abc import Callable
from typing import reveal_type


def logged[**P, R](func: Callable[P, R]) -> Callable[P, R]:
    @functools.wraps(func)
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
        return func(*args, **kwargs)

    return wrapper


@logged
def scale(value: float, factor: float = 2.0) -> float:
    return value * factor


reveal_type(scale)
print(inspect.signature(scale))
try:
    scale("1.5", fator=3)
except TypeError as error:
    print("TypeError:", error)
