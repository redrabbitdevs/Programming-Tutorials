from enum import StrEnum


class Level(StrEnum):
    DEBUG = "debug"
    INFO = "info"
    ERROR = "error"


def parse_level(text):
    try:
        return Level(text.strip().lower())
    except ValueError:
        raise ValueError(f"unknown level: {text!r}") from None


for text in ["INFO", " error ", "loud"]:
    try:
        level = parse_level(text)
        print(level.name, level.value)
    except ValueError as error:
        print("error:", error)
