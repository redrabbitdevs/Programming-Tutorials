from collections import ChainMap

defaults = {"colour": "auto", "width": 80, "verbose": False}
from_file = {"width": 100}
from_cli = {"verbose": True}

settings = ChainMap(from_cli, from_file, defaults)
print(settings["width"], settings["verbose"], settings["colour"])
print(dict(settings))

settings["colour"] = "never"
print(from_cli)
print(defaults["colour"], settings["colour"])

test = settings.new_child({"width": 40})
print(test["width"], settings["width"])
