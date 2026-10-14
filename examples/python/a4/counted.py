from functools import wraps


def counted(cls):
    original = cls.__init__

    @wraps(original)
    def __init__(self, *args, **kwargs):
        original(self, *args, **kwargs)
        cls.created += 1

    cls.created = 0
    cls.__init__ = __init__
    return cls
