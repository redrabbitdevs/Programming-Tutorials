from typing import Protocol


class Drawable(Protocol):
    def draw(self) -> str: ...


class Circle:
    def draw(self) -> str:
        return "()"


class Label:
    def __init__(self, text):
        self.text = text

    def draw(self) -> str:
        return f"[{self.text}]"


def render(items: list[Drawable]) -> str:
    return " ".join(item.draw() for item in items)


print(render([Circle(), Label("hi"), Circle()]))
