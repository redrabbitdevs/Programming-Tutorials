class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        self.celsius = value  # bug: calls this setter again


try:
    Temperature(20)
except RecursionError:
    print("RecursionError: the setter called itself forever")
