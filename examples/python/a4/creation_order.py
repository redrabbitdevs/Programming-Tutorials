class Field:
    def __set_name__(self, owner, name):
        print(f"2. __set_name__: {owner.__name__}.{name}")


class Base:
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        print(f"3. __init_subclass__: {cls.__name__}")


def decorate(cls):
    print(f"4. decorator: {cls.__name__}")
    return cls


@decorate
class Model(Base):
    print("1. the class body runs")
    title = Field()
