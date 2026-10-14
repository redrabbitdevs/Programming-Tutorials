from snake_meta import SnakeCase


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
