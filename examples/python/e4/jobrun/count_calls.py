import asyncio
import pstats
from concurrent.futures import ThreadPoolExecutor

import profiling.tracing

from jobrun.builtin import LogLevels
from jobrun.models import Context

LOG = "\n".join(f"09:00:{n % 60:02} INFO line {n}" for n in range(1000))
job = LogLevels("log", LOG)

profiler = profiling.tracing.Profile()
with ThreadPoolExecutor() as pool:
    value = profiler.runcall(asyncio.run, job.run(Context(pool)))
print(job.render(value))

functions = pstats.Stats(profiler).get_stats_profile().func_profiles
for name, profile in functions.items():
    if "fullmatch" in name or "splitlines" in name:
        print(f"{profile.ncalls:>5} calls  {name}")
