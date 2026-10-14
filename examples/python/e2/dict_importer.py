import importlib.abc
import importlib.util
import sys

SOURCES = {
    "greetings": "def hello(name):\n    return f'Hello, {name}!'\n",
}


class DictImporter(importlib.abc.MetaPathFinder, importlib.abc.Loader):
    def find_spec(self, name, path, target=None):
        if name in SOURCES:
            return importlib.util.spec_from_loader(
                name, self, origin=f"<dict:{name}>")
        return None

    def create_module(self, spec):
        return None          # use the default module object

    def exec_module(self, module):
        code = compile(SOURCES[module.__name__], module.__spec__.origin, "exec")
        exec(code, module.__dict__)


sys.meta_path.insert(0, DictImporter())

import greetings

print(greetings.hello("Ada"))
print(greetings.__spec__.origin, type(greetings.__loader__).__name__)
