import os
import sys
from importlib.util import find_spec

here = os.path.dirname(os.path.abspath(__file__))
print(sys.path[0] == here)

spec = find_spec("temperature")
print(spec.origin == os.path.join(here, "temperature.py"))

print(find_spec("no_such_module_anywhere"))
