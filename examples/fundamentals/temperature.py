class Temperature:
    def __init__(self):
        self._celsius = 0.0

    def set_celsius(self, value):
        if value < -273.15:
            raise ValueError(f"{value} is below absolute zero")
        self._celsius = value

    def celsius(self):
        return self._celsius


t = Temperature()
t.set_celsius(20)
print("accepted:", t.celsius())
try:
    t.set_celsius(-500)
except ValueError as err:
    print("rejected:", err)
