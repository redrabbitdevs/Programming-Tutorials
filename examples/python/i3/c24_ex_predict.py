from abc import ABC, abstractmethod


class Animal(ABC):
    @abstractmethod
    def speak(self):
        pass

    @abstractmethod
    def move(self):
        pass


class Fish(Animal):
    def move(self):
        return "swim"


class Dog(Fish):
    def speak(self):
        return "woof"


for cls in [Fish, Dog]:
    try:
        animal = cls()
        print(cls.__name__, animal.speak(), animal.move())
    except TypeError:
        print(cls.__name__, "is abstract")
