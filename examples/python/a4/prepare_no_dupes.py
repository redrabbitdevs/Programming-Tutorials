class NoDuplicates(dict):
    def __setitem__(self, key, value):
        if key in self and not key.startswith("__"):
            raise TypeError(f"{key!r} defined twice")
        super().__setitem__(key, value)


class Strict(type):
    @classmethod
    def __prepare__(mcls, name, bases, **kwargs):
        return NoDuplicates()


try:
    class Handlers(metaclass=Strict):
        def on_save(self):
            return "first"

        def on_save(self):
            return "second"
except TypeError as error:
    print("TypeError:", error)
