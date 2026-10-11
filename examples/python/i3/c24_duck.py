class Duck:
    def speak(self):
        return "Quack"


class Robot:
    def speak(self):
        return "Beep"


def announce(thing):
    print(thing.speak())


announce(Duck())
announce(Robot())
