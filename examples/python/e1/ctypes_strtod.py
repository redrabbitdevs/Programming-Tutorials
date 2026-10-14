import ctypes
import ctypes.util

libc = ctypes.CDLL(ctypes.util.find_library("c"))
libc.strtod.argtypes = [ctypes.c_char_p, ctypes.POINTER(ctypes.c_char_p)]
libc.strtod.restype = ctypes.c_double


def parse_number(text):
    """Return (value, unparsed rest) using C's strtod."""
    raw = ctypes.c_char_p(text)
    end = ctypes.c_char_p()
    value = libc.strtod(raw, ctypes.byref(end))
    return value, end.value


print(parse_number(b"2.5e3 metres"))
print(parse_number(b"-0.125"))
print(parse_number(b"abc"))
