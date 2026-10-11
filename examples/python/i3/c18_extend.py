class Animal:
    def speak(self):
        return "..."


class Puppy(Animal):
    def speak(self):
        return super().speak() + " (squeaky) Yip"


print(Puppy().speak())
