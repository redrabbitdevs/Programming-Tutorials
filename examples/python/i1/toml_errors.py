import tomllib

try:
    tomllib.loads("port = 80 81")
except tomllib.TOMLDecodeError as error:
    print("bad TOML:", type(error).__name__)
