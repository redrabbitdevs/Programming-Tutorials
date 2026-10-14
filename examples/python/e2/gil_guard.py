import importlib
import sys
import sysconfig


def gil_report(modules):
    if not sysconfig.get_config_var("Py_GIL_DISABLED"):
        return "default build: the GIL is always on"
    for name in modules:
        importlib.import_module(name)
        if sys._is_gil_enabled():
            return f"GIL re-enabled by {name}"
    return "GIL still off"


print(gil_report(["json", "decimal", "sqlite3"]))
