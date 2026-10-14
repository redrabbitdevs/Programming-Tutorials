import ctypes
import ctypes.util

libc = ctypes.CDLL(ctypes.util.find_library("c"))

libc.labs.argtypes = [ctypes.c_long]
libc.labs.restype = ctypes.c_long        # the default is c_int
print(libc.labs(-(2 ** 33)))
