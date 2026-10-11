class AppError(Exception):
    pass


class ConfigError(AppError):
    pass


def check(value):
    if value == 1:
        raise ConfigError("c")
    if value == 2:
        raise AppError("a")
    raise KeyError("k")


for value in [1, 2, 3]:
    try:
        check(value)
    except AppError as error:
        print("app:", type(error).__name__)
    except Exception as error:
        print("other:", type(error).__name__)
