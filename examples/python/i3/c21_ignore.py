class Ignore:
    def __init__(self, *exc_types):
        self.exc_types = exc_types

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        return exc_type is not None and issubclass(exc_type, self.exc_types)


with Ignore(KeyError):
    {}["missing"]
print("after the first block")

try:
    with Ignore(KeyError):
        1 / 0
except ZeroDivisionError:
    print("ZeroDivisionError was not ignored")
