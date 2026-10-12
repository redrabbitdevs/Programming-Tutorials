class Reader:
    registry = {}

    def __init_subclass__(cls, /, ext, **kwargs):
        super().__init_subclass__(**kwargs)
        Reader.registry[ext] = cls

    @classmethod
    def for_file(cls, filename):
        ext = filename.rsplit(".", 1)[-1]
        return cls.registry[ext]()


class CsvReader(Reader, ext="csv"):
    pass


class JsonReader(Reader, ext="json"):
    pass


print(Reader.registry)
print(type(Reader.for_file("data.json")).__name__)
