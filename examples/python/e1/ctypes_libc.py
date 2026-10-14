import ctypes
import ctypes.util

libc = ctypes.CDLL(ctypes.util.find_library("c"))   # Linux: libc.so.6

libc.strlen.argtypes = [ctypes.c_char_p]
libc.strlen.restype = ctypes.c_size_t
print(libc.strlen(b"performance"))

libc.labs.argtypes = [ctypes.c_long]
libc.labs.restype = ctypes.c_long
print(libc.labs(-(2 ** 40)))

buf = ctypes.create_string_buffer(32)                # writable char[32]
libc.snprintf(buf, 32, b"%d items at %s", 3, b"4.50")
print(buf.value)
