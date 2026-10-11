class Engine:
    def __init__(self, horsepower):
        self.horsepower = horsepower
        self.running = False

    def start(self):
        self.running = True


class Car:
    def __init__(self, name, horsepower):
        self.name = name
        self.engine = Engine(horsepower)  # a Car has an Engine

    def start(self):
        self.engine.start()
        return f"{self.name} started, {self.engine.horsepower} hp"


car = Car("Mini", 120)
print(car.start())
print(car.engine.running)
