class Animal:
    pass


class Dog(Animal):
    pass


rex = Dog()
print(isinstance(rex, Dog))
print(isinstance(rex, Animal))
print(isinstance(Animal(), Dog))
print(issubclass(Dog, Animal))
