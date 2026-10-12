import cProfile
import pstats

from c40_slow import build_report

with cProfile.Profile() as profiler:
    build_report()

pstats.Stats(profiler).strip_dirs().sort_stats("cumulative").print_stats(6)
