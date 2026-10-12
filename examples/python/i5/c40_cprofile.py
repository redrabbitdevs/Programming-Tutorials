import cProfile
import pstats

from c40_slow import build_report

profiler = cProfile.Profile()
profiler.enable()
result = build_report()
profiler.disable()

print("result:", result)

stats = pstats.Stats(profiler)
# stats.stats maps (file, line, name) to (primitive calls, calls, own time, cumulative time, callers).
calls = {name: ncalls for (_, _, name), (_, ncalls, *_rest) in stats.stats.items()}
for name in ["build_report", "count_known", "is_known", "load_ids"]:
    print(f"{name:13} called {calls[name]} times")

# To read the table yourself, sort and print the top rows:
#     stats.strip_dirs().sort_stats("cumulative").print_stats(5)
