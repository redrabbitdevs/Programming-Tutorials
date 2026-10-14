import asyncio
from concurrent.futures import ProcessPoolExecutor
from typing import Any

from jobrun.builtin import LogLevels, Primes, Wait, WordCount
from jobrun.models import Context
from jobrun.plugin import REGISTRY, Plugin

LOG = "09:00:01 INFO up\n09:00:05 ERROR disk full\noops\n09:00:09 INFO retry"


async def demo(ctx: Context) -> None:
    jobs: list[Plugin[Any]] = [
        WordCount("w", "the cat and the hat and the bat"),
        LogLevels("l", LOG),
        Wait("s", 0.05),
        Primes("p", 100),
    ]
    for job in jobs:
        value = await job.run(ctx)
        print(f"{job.kind:<7}| {value!r:<41}| {job.render(value)}")


if __name__ == "__main__":
    print(sorted(REGISTRY))
    with ProcessPoolExecutor(max_workers=1) as pool:
        asyncio.run(demo(Context(pool)))
