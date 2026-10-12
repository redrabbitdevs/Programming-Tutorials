class SnakeCase(type):
    def __new__(mcls, name, bases, ns):
        for key, value in ns.items():
            if callable(value) and key != key.lower():
                raise TypeError(f"{name}.{key} is not snake_case")
        return super().__new__(mcls, name, bases, ns)


class Good(metaclass=SnakeCase):
    def load_data(self):
        return []


try:
    class Bad(metaclass=SnakeCase):
        def loadData(self):
            return []
except TypeError as error:
    print("TypeError:", error)
print(Good.__name__)
