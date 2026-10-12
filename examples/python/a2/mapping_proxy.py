from types import MappingProxyType


class Registry:
    def __init__(self):
        self._plugins = {}
        self.plugins = MappingProxyType(self._plugins)

    def register(self, name, plugin):
        self._plugins[name] = plugin


registry = Registry()
view = registry.plugins
registry.register("csv", "CsvReader")
print(view, len(view))
try:
    view["json"] = "JsonReader"
except TypeError as error:
    print("TypeError:", error)
