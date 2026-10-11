class ConfigError(Exception):
    pass


def read_port(text):
    try:
        return int(text)
    except ValueError as error:
        raise ConfigError(f"port must be a whole number, got {text!r}") from error


try:
    read_port("80a")
except ConfigError as error:
    print("ConfigError:", error)
    print("cause:", repr(error.__cause__))
