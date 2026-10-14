import importlib.abc
import sys


class ImportSpy(importlib.abc.MetaPathFinder):
    def find_spec(self, name, path, target=None):
        print("looking for", name)
        return None


sys.meta_path.insert(0, ImportSpy())

lazy import colorsys

print("past the import line")
print(colorsys.rgb_to_hsv(1.0, 0.0, 0.0))
