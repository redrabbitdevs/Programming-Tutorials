from abc import ABC
from enum import Enum


class Meta(type):
    pass


class Plugin(metaclass=Meta):
    pass


print(type(ABC).__name__, type(Enum).__name__)
try:
    class Both(Plugin, ABC):
        pass
except TypeError as error:
    print("TypeError:", error)
