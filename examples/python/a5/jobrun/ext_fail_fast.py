import asyncio
from concurrent.futures import ThreadPoolExecutor
from typing import Any

from jobrun.config import Config, parse_config
from jobrun.models import Context, Outcome, Status
from jobrun.plugin import Plugin
from jobrun.runner import execute


async def run_fail_fast(config: Config, ctx: Context) -> dict[str, Outcome]:
    finished: dict[str, Outcome] = {}
    async with asyncio.TaskGroup() as tg:

        async def guarded(job: Plugin[Any]) -> None:
            outcome = await execute(job, ctx, config.timeout)
            finished[job.job_id] = outcome
            if outcome.status is not Status.OK:
                tg.cancel()

        for job in config.jobs:
            tg.create_task(guarded(job))
    return finished


config = parse_config({"timeout": 10, "workers": 1, "jobs": [
    {"id": "motto", "kind": "words", "text": "Now is better than never."},
    {"id": "primes-bad", "kind": "primes", "below": 1},
    {"id": "slow-api", "kind": "wait", "seconds": 5},
]})
with ThreadPoolExecutor() as pool:
    finished = asyncio.run(run_fail_fast(config, Context(pool)))
for job in config.jobs:
    outcome = finished.get(job.job_id)
    print(job.job_id, outcome.status if outcome else "cancelled", sep=": ")
