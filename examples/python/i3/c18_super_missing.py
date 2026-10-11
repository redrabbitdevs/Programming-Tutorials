class Animal:
    def __init__(self, name):
        self.name = name


class Dog(Animal):
    def __init__(self, name, tricks):
        self.tricks = tricks  # forgot super().__init__(name)


rex = Dog("Rex", ["sit"])
print(rex.tricks)
try:
    print(rex.name)
except AttributeError as error:
    print("AttributeError:", error)
