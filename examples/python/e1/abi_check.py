import sys
import sysconfig

info = sys.abi_info
print("pointer bits:", info.pointer_bits)
print("free-threaded build:", info.free_threaded)
print("debug build:", info.debug)
print("extension suffix:", sysconfig.get_config_var("EXT_SUFFIX"))
