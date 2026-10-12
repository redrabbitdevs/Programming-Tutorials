class Command:
    commands = {}

    def __init_subclass__(cls, /, name=None, **kwargs):
        super().__init_subclass__(**kwargs)
        Command.commands[name or cls.__name__.lower()] = cls


class Hello(Command):
    def run(self):
        return "hello!"


class Bye(Command, name="exit"):
    def run(self):
        return "goodbye"


print(sorted(Command.commands))
print(Command.commands["hello"]().run())
print(Command.commands["exit"]().run())
