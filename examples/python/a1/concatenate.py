import itertools
from collections.abc import Callable
from typing import Concatenate

_ids = itertools.count(1)


def with_request_id[**P, R](
    func: Callable[Concatenate[int, P], R],
) -> Callable[P, R]:
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
        return func(next(_ids), *args, **kwargs)

    return wrapper


@with_request_id
def handle(request_id: int, path: str) -> str:
    return f"[{request_id}] GET {path}"


print(handle("/"))
print(handle(path="/about"))
