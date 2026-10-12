import functools
from collections.abc import Callable
from typing import Any, reveal_type


def logged(func: Callable[..., Any]) -> Callable[..., Any]:
    @functools.wraps(func)
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        return func(*args, **kwargs)

    return wrapper


@logged
def area(width: float, height: float) -> float:
    return width * height


reveal_type(area)
print(area(3, 4))
print(area("ab", 2))
