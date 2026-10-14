import io
import tracemalloc

SIZE = 8_000_000
SOURCE = io.BytesIO(b"x" * SIZE)


def peak_of(finish):
    buffer = bytearray(SIZE)               # exact size, filled in place
    SOURCE.seek(0)
    SOURCE.readinto(buffer)
    tracemalloc.start()
    data = finish(buffer)
    _now, peak = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    return data, peak


copied, copy_peak = peak_of(bytes)
taken, take_peak = peak_of(bytearray.take_bytes)
print("same bytes:", copied == taken)
print("bytes() allocated a second copy:", copy_peak >= SIZE)
print("take_bytes() allocated almost nothing:", take_peak < SIZE // 100)
