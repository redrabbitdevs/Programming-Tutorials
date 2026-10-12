import pstats

import profiling.tracing  # Python 3.15 or newer

from c40_slow import build_report

profiler = profiling.tracing.Profile()
profiler.runcall(build_report)

stats = pstats.Stats(profiler)
calls = {name: ncalls for (_, _, name), (_, ncalls, *_rest) in stats.stats.items()}
print("is_known called", calls["is_known"], "times")
