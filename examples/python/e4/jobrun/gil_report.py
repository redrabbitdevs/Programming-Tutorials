import sys
import sysconfig

import jobrun.cli  # noqa: F401  Imports every jobrun module.

free_threaded_build = sysconfig.get_config_var("Py_GIL_DISABLED") == 1
print("free-threaded build:", free_threaded_build)
print("GIL enabled now:", sys._is_gil_enabled())
print("thread_inherit_context:", sys.flags.thread_inherit_context)
print("context_aware_warnings:", sys.flags.context_aware_warnings)
