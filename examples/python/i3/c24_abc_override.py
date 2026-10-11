from abc import ABC, abstractmethod
from typing import override


class Greeter(ABC):
    @abstractmethod
    def greet(self, name):
        """Return a greeting."""


class Formal(Greeter):
    @override
    def greet(self, name):
        return f"Good day, {name}."


print(Formal().greet("Asha"))
