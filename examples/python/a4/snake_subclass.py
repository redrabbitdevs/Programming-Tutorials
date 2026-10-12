class SnakeCase:
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        for key, value in vars(cls).items():
            if callable(value) and key != key.lower():
                raise TypeError(f"{cls.__name__}.{key} is not snake_case")


class Good(SnakeCase):
    def load_data(self):
        return []


try:
    class Bad(SnakeCase):
        def loadData(self):
            return []
except TypeError as error:
    print("TypeError:", error)
print(Good.__name__)
