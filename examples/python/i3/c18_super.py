class Animal:
    def __init__(self, name):
        self.name = name


class Dog(Animal):
    def __init__(self, name, tricks):
        super().__init__(name)
        self.tricks = tricks


rex = Dog("Rex", ["sit", "roll"])
print(rex.name, rex.tricks)
