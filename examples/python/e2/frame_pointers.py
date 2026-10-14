import sys
import sysconfig

flags = sysconfig.get_config_var("CFLAGS") or ""
print(sys.version.split()[0], sys.platform)
print("frame pointers:", "-fno-omit-frame-pointer" in flags)
