class Tracing(type):
    def __new__(mcls, name, bases, namespace, **kwargs):
        own = [k for k in namespace if not k.startswith("__")]
        print(f"creating {name} with {own}")
        return super().__new__(mcls, name, bases, namespace, **kwargs)


class Service(metaclass=Tracing):
    timeout = 5

    def start(self):
        pass


class Web(Service):
    port = 80


print(type(Web).__name__)
