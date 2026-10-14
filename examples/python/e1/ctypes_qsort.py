import ctypes
import ctypes.util

libc = ctypes.CDLL(ctypes.util.find_library("c"))

IntArray = ctypes.c_int * 6
values = IntArray(42, 7, 19, 3, 88, 1)

CMP = ctypes.CFUNCTYPE(ctypes.c_int, ctypes.POINTER(ctypes.c_int),
                       ctypes.POINTER(ctypes.c_int))
calls = 0


@CMP
def compare(a, b):                       # C calls back into Python
    global calls
    calls += 1
    return a[0] - b[0]


libc.qsort(values, len(values), ctypes.sizeof(ctypes.c_int), compare)
print(list(values))
print("callback ran:", calls > 0)
