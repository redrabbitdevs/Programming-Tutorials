class Registered:
    names = []

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        Registered.names.append(cls.__name__)


class Audited:
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        print("audited:", cls.__name__)


class Job(Registered, Audited):
    pass


print(Registered.names)
