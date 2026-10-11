from typing import override


class Animal:
    def speak(self):
        return "..."


class Dog(Animal):
    @override
    def spek(self):  # typo: overrides nothing
        return "Woof"


print(Dog().speak())
