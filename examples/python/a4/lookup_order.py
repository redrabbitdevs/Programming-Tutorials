class Data:
    def __get__(self, obj, objtype=None):
        return "from the data descriptor"

    def __set__(self, obj, value):
        raise AttributeError("read-only")


class NonData:
    def __get__(self, obj, objtype=None):
        return "from the non-data descriptor"


class Box:
    a = Data()
    b = NonData()


box = Box()
box.__dict__["a"] = "from the instance"
box.__dict__["b"] = "from the instance"
print(box.a)
print(box.b)
