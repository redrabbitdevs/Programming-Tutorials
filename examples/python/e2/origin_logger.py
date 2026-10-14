import importlib.abc
import importlib.machinery
import sys
from pathlib import Path


class OriginLogger(importlib.abc.MetaPathFinder):
    def find_spec(self, name, path, target=None):
        finder = importlib.machinery.PathFinder
        spec = finder.find_spec(name, path, target)
        if spec is not None and spec.has_location:
            print(f"{name} <- {Path(spec.origin).name}")
        return spec


sys.meta_path.insert(0, OriginLogger())

import colorsys
import graphlib

print(colorsys.__name__, graphlib.__name__)
