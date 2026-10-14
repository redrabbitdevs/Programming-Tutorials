import importlib.abc
import importlib.util
import sys


class NewLoader(importlib.abc.Loader):
    def create_module(self, spec):
        return None                   # default module object

    def exec_module(self, module):    # fill in the module
        module.answer = 42


class NewFinder:
    def find_spec(self, name, path, target=None):
        if name == "legacy":
            return importlib.util.spec_from_loader(name, NewLoader())
        return None


sys.meta_path.insert(0, NewFinder())

import legacy

print("imported, answer =", legacy.answer)
print(sys.modules["legacy"] is legacy)
