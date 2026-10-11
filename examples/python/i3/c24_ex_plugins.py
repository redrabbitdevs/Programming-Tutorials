from abc import ABC, abstractmethod


class Plugin(ABC):
    name = "plugin"

    @abstractmethod
    def run(self, text):
        """Return the transformed text."""


class Upper(Plugin):
    name = "upper"

    def run(self, text):
        return text.upper()


class Reverse(Plugin):
    name = "reverse"

    def run(self, text):
        return text[::-1]


def apply_all(plugins, text):
    for plugin in plugins:
        text = plugin.run(text)
        print(f"{plugin.name}: {text}")
    return text


result = apply_all([Upper(), Reverse()], "hello")
print(result)
try:
    Plugin()
except TypeError:
    print("Plugin is abstract")
