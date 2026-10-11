from typing import override


class Animal:
    def speak(self):
        return "..."


class Dog(Animal):
    @override
    def speak(self):
        return "Woof"


print(Dog().speak())
print(Dog.speak.__override__)
