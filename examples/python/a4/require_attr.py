class Command:
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        if not isinstance(cls.__dict__.get("help"), str):
            raise TypeError(f"{cls.__name__} must define a help string")


class Deploy(Command):
    help = "Deploy the site"


try:
    class Broken(Command):
        pass
except TypeError as error:
    print("TypeError:", error)
print(Deploy.help)
