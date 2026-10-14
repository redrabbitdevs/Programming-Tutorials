class Typed:
    def __init__(self, kind):
        self.kind = kind

    def __set_name__(self, owner, name):
        self.name = name

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return obj.__dict__[self.name]

    def __set__(self, obj, value):
        if not isinstance(value, self.kind):
            raise TypeError(f"{self.name} must be {self.kind.__name__}, "
                            f"got {type(value).__name__}")
        obj.__dict__[self.name] = value
