class SnakeCase(type):
    def __new__(mcls, name, bases, ns):
        for key, value in ns.items():
            if callable(value) and key != key.lower():
                raise TypeError(f"{name}.{key} is not snake_case")
        return super().__new__(mcls, name, bases, ns)
