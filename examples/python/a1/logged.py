import functools
from collections.abc import Callable


def logged[**P, R](func: Callable[P, R]) -> Callable[P, R]:
    @functools.wraps(func)
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
        print(f"calling {func.__name__}{args}")
        return func(*args, **kwargs)

    return wrapper


@logged
def scale(value: float, factor: float = 2.0) -> float:
    return value * factor


print(scale(1.5))
print(scale(1.5, factor=10))
print(logged.__type_params__)
