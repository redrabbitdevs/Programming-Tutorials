import inspect

import jobrun.builtin  # noqa: F401  Importing it registers the plugins.
from jobrun.plugin import REGISTRY

for kind, plugin in sorted(REGISTRY.items()):
    print(f"{kind:<7} run is async: {inspect.iscoroutinefunction(plugin.run)}")
