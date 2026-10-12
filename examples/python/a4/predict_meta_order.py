class Meta(type):
    @classmethod
    def __prepare__(mcls, name, bases):
        print("prepare", name)
        return {}

    def __new__(mcls, name, bases, ns):
        print("new", name)
        return super().__new__(mcls, name, bases, ns)

    def __init__(cls, name, bases, ns):
        print("init", name)
        super().__init__(name, bases, ns)

    def __call__(cls, *args):
        print("call", cls.__name__)
        return super().__call__(*args)


class Base(metaclass=Meta):
    def __init_subclass__(cls):
        print("init_subclass", cls.__name__)


class Child(Base):
    print("body")


Child()
