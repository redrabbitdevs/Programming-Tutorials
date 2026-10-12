import cProfile
import pstats

from c40_slow import build_report

profiler = cProfile.Profile()
profiler.enable()
result = build_report()
profiler.disable()
print("result:", result)

stats = pstats.Stats(profiler)
# stats.stats maps (file, line, name) to (cc, nc, tottime, cumtime, callers)
calls = {key[2]: value[1] for key, value in stats.stats.items()}
for name in ["build_report", "count_known", "is_known", "load_ids"]:
    print(f"{name:13} called {calls[name]} times")
