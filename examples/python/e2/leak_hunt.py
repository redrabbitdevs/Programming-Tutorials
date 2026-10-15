import gc
import tracemalloc
from collections import Counter

handled = []                    # the leak: nothing ever empties it


class Request:
    def __init__(self, n):
        self.body = bytearray(1_000)
        handled.append(self)


def live_types():
    return Counter(type(o).__name__ for o in gc.get_objects())


tracemalloc.start()
gc.collect()
before, counts = tracemalloc.take_snapshot(), live_types()
for n in range(500):
    Request(n)
gc.collect()

print("growing:", (live_types() - counts).most_common(1))
top = tracemalloc.take_snapshot().compare_to(before, "lineno")[0]
print("biggest new allocations: line", top.traceback[0].lineno,
      f"(at least {top.size_diff // 100_000 * 100} kB)")

suspect = next(o for o in gc.get_objects() if isinstance(o, Request))
holders = gc.get_referrers(suspect)
print("held by:", [type(h).__name__ for h in holders])
print("the holder is handled:", any(h is handled for h in holders))
