import ctypes
import ctypes.util
import timeit

libc = ctypes.CDLL(ctypes.util.find_library("c"))
libc.strlen.argtypes = [ctypes.c_char_p]
libc.strlen.restype = ctypes.c_size_t

word = b"performance"
via_c = min(timeit.repeat(lambda: libc.strlen(word), number=20_000,
                          repeat=5))
via_len = min(timeit.repeat(lambda: len(word), number=20_000, repeat=5))

print("same answer:", libc.strlen(word) == len(word))
print("len() at least 3x faster:", via_c > 3 * via_len)
