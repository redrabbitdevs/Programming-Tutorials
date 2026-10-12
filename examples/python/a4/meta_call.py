class Singleton(type):
    def __call__(cls, *args, **kwargs):
        if "_instance" not in cls.__dict__:
            cls._instance = super().__call__(*args, **kwargs)
        return cls._instance


class Settings(metaclass=Singleton):
    def __init__(self):
        print("loading settings")


a = Settings()
b = Settings()
print(a is b)
