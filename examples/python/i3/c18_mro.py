class Animal:
    pass


class Dog(Animal):
    pass


class Puppy(Dog):
    pass


for cls in Puppy.__mro__:
    print(cls.__name__)
