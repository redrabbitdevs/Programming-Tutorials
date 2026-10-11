class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

    def describe(self):
        return f"{self.name} says {self.speak()}"


class Dog(Animal):
    def speak(self):
        return "Woof"


class Cat(Animal):
    pass


print(Dog("Rex").describe())
print(Cat("Tib").describe())
