class AppError(Exception):
    """Base class for every error this application raises."""


class ConfigError(AppError):
    """The configuration is missing or invalid."""


class NetworkError(AppError):
    """A remote service could not be reached."""


def load(name):
    if name == "config":
        raise ConfigError("missing key: port")
    if name == "net":
        raise NetworkError("timeout after 5s")
    return "ok"


for name in ["config", "net", "fine"]:
    try:
        print(load(name))
    except ConfigError as error:
        print("config problem:", error)
    except AppError as error:
        print("other app problem:", error)
