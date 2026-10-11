from dataclasses import dataclass


@dataclass(kw_only=True, slots=True)
class Settings:
    host: str
    port: int = 8000
    debug: bool = False

    def __post_init__(self):
        if not 1 <= self.port <= 65535:
            raise ValueError(f"port out of range: {self.port}")


print(Settings(host="localhost"))
print(Settings(host="example.org", port=443))
try:
    Settings(host="x", port=70000)
except ValueError as error:
    print("ValueError:", error)
try:
    Settings("localhost")
except TypeError:
    print("TypeError: keyword arguments only")
