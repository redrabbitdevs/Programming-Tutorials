class Upper(type):
    def __new__(mcls, name, bases, ns):
        ns = {k if k.startswith("__") else k.upper(): v
              for k, v in ns.items()}
        return super().__new__(mcls, name, bases, ns)

    def __init__(cls, name, bases, ns):
        super().__init__(name, bases, ns)
        print("initialised", cls.__name__, cls.__dict__.get("RETRIES"))


class Config(metaclass=Upper):
    retries = 3
    host = "db"


print(Config.RETRIES, Config.HOST, hasattr(Config, "retries"))
