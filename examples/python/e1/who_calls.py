import pstats

import profiling.tracing


def money(cents):
    return f"{cents / 100:.2f}"


def invoice_lines(items):
    return [money(c) for c in items]


def invoice_total(items):
    return money(sum(items))


def run():
    for _ in range(50):
        invoice_lines([199, 250, 1000])
        invoice_total([199, 250, 1000])


profiler = profiling.tracing.Profile()
profiler.runcall(run)
stats = pstats.Stats(profiler).stats
# each value is (primitive calls, calls, tottime, cumtime, callers)
for key, value in stats.items():
    if key[2] == "money":
        print("money called", value[1], "times")
        for caller, counts in sorted(value[4].items()):
            print(f"  from {caller[2]}: {counts[1]}")
