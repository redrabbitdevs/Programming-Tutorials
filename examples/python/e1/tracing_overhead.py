import sys
import time

import profiling.tracing


def tiny(x):
    return x + 1


def many_calls():
    total = 0
    for i in range(300_000):
        total = tiny(total)
    return total


start = time.perf_counter()
many_calls()
plain = time.perf_counter() - start

profiler = profiling.tracing.Profile()
start = time.perf_counter()
profiler.runcall(many_calls)
traced = time.perf_counter() - start

ratio = traced / plain
print("tracing made it slower:", ratio > 1)
print("at least 2x slower:", ratio > 2)
print(f"measured: {ratio:.1f}x slower", file=sys.stderr)  # varies
