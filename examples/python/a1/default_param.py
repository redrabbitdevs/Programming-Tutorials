from typing import reveal_type


class Page[T = str]:
    def __init__(self, items: list[T]) -> None:
        self.items = items


def blank() -> Page:
    return Page([])


reveal_type(blank())
reveal_type(Page([1, 2]))
(T,) = Page.__type_params__
print(T.__default__, T.has_default())
