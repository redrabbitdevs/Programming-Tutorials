import ctypes
import ctypes.util

libc = ctypes.CDLL(ctypes.util.find_library("c"))

libc.labs.argtypes = [ctypes.c_long]     # argument declared ...
print(libc.labs(-(2 ** 33)))             # ... but not the result type
