import sys
import sysconfig

free_threaded_build = sysconfig.get_config_var("Py_GIL_DISABLED") == 1
print("free-threaded build:", free_threaded_build)
print("GIL enabled now:", sys._is_gil_enabled())
