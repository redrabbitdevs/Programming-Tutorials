import functools
from collections.abc import Callable


def retry[**P, R](times: int) -> Callable[[Callable[P, R]], Callable[P, R]]:
    def decorate(func: Callable[P, R]) -> Callable[P, R]:
        @functools.wraps(func)
        def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
            for attempt in range(1, times + 1):
                try:
                    return func(*args, **kwargs)
                except ConnectionError as error:
                    print(f"attempt {attempt} failed: {error}")
            raise ConnectionError(f"gave up after {times} attempts")

        return wrapper

    return decorate
