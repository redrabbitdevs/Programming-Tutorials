import functools
from collections.abc import Callable


def logged[**P, R](func: Callable[P, R]) -> Callable[P, R]:
    @functools.wraps(func)
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
        return func(*args, **kwargs)

    return wrapper


@logged
def area(width: float, height: float) -> float:
    return width * height


print(area(3, 4))
print(area("ab", 2))
