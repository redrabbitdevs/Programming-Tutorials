import importlib.abc
import sys


class ImportSpy(importlib.abc.MetaPathFinder):
    def find_spec(self, name, path, target=None):
        print("looking for", name)
        return None          # not mine: let the next finder try


sys.meta_path.insert(0, ImportSpy())

import colorsys              # not loaded yet: the spy sees it
import colorsys              # cached in sys.modules: no search
import os                    # loaded at startup: no search either

print(colorsys.rgb_to_hsv(1.0, 0.0, 0.0))
