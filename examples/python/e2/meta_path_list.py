import importlib.util
import sys

for finder in sys.meta_path:
    print(getattr(finder, "__name__", type(finder).__name__))

spec = importlib.util.find_spec("json")
print(spec.name, type(spec.loader).__name__)
print(spec.submodule_search_locations is not None)
print(spec.origin.endswith("__init__.py"))
