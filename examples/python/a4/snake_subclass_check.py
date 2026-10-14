from snake_subclass import SnakeCase


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
