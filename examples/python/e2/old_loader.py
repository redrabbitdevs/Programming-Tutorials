import importlib.util
import sys
import types


class OldLoader:
    def load_module(self, fullname):          # the pre-3.4 protocol
        module = types.ModuleType(fullname)
        module.answer = 42
        sys.modules[fullname] = module
        return module


class OldFinder:
    def find_spec(self, name, path, target=None):
        if name == "legacy":
            return importlib.util.spec_from_loader(name, OldLoader())
        return None


sys.meta_path.insert(0, OldFinder())
try:
    import legacy
    print("imported, answer =", legacy.answer)
except AttributeError as exc:
    print("AttributeError:", exc)
