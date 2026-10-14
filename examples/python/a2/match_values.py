from enum import Enum


class Level(Enum):
    INFO = 1
    WARNING = 2
    ERROR = 3


def route(level):
    match level:
        case Level.ERROR | Level.WARNING:
            return "pager"
        case Level.INFO:
            return "log file"


print(route(Level.WARNING), route(Level.INFO))
