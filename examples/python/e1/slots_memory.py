import sys
import tracemalloc


class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y


class SlotPoint:
    __slots__ = ("x", "y")

    def __init__(self, x, y):
        self.x, self.y = x, y


def traced_bytes(cls, n=100_000):
    tracemalloc.start()
    points = [cls(0.0, 0.0) for _ in range(n)]
    used, _peak = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    return used


print("getsizeof:", sys.getsizeof(Point(0, 0)), sys.getsizeof(SlotPoint(0, 0)))
plain, slotted = traced_bytes(Point), traced_bytes(SlotPoint)
print("slots use less:", slotted < plain)
print("saving at least 30%:", slotted < 0.7 * plain)
