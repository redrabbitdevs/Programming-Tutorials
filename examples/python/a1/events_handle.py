from typing import assert_never

from events import Click, Event, Key, Quit


def handle(event: Event) -> str:
    match event:
        case Click(x=x, y=y):
            return f"click at {x},{y}"
        case Key(name="Escape"):
            return "escape pressed"
        case Key(name=name):
            return f"key {name}"
        case Quit():
            return "bye"
        case _:
            assert_never(event)


events: list[Event] = [Click(3, 4), Key("a"), Key("Escape"), Quit()]
for event in events:
    print(handle(event))
