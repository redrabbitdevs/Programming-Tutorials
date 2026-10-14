class Command:
    commands = {}

    def __init_subclass__(cls, /, name=None, **kwargs):
        super().__init_subclass__(**kwargs)
        Command.commands[name or cls.__name__.lower()] = cls
