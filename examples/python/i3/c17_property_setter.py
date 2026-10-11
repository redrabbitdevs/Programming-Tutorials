class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius  # goes through the setter

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError(f"below absolute zero: {value}")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9 / 5 + 32


t = Temperature(100)
print(t.celsius, t.fahrenheit)
t.celsius = 0
print(t.celsius, t.fahrenheit)
try:
    t.celsius = -300
except ValueError as error:
    print("ValueError:", error)
try:
    Temperature(-500)
except ValueError as error:
    print("ValueError:", error)
