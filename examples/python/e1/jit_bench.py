import sys
import time


def mandel_rows(size=250, limit=80):
    inside = 0
    for y in range(size):
        for x in range(size):
            c = complex(3.0 * x / size - 2.0, 2.0 * y / size - 1.0)
            z = 0j
            for _ in range(limit):
                z = z * z + c
                if abs(z) > 2.0:
                    break
            else:
                inside += 1
    return inside


start = time.perf_counter()
result = mandel_rows()
elapsed = time.perf_counter() - start
jit = getattr(sys, "_jit", None)
print("points inside:", result)
print("JIT enabled:", jit is not None and jit.is_enabled())
print(f"seconds: {elapsed:.3f}")
