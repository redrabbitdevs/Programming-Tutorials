from typing import ReadOnly, TypedDict


class Settings(TypedDict, closed=True):
    name: ReadOnly[str]
    debug: bool


config: Settings = {"name": "app", "debug": False}
config["debug"] = True
config["name"] = "other"
config["verbose"] = True
print(config)
