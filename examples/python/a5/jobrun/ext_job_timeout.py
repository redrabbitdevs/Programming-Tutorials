import asyncio
import sys
from concurrent.futures import ThreadPoolExecutor

from jobrun.cli import report
from jobrun.config import Config, parse_config
from jobrun.models import Context, Outcome
from jobrun.runner import execute


def job_limits(raw_jobs: list[object]) -> dict[str, float]:
    limits = {}
    for raw in raw_jobs:
        match raw:
            case {"id": str(job_id), "timeout": int() | float() as limit}:
                limits[job_id] = float(limit)
    return limits


async def run_with_limits(
    config: Config, ctx: Context, limits: dict[str, float]
) -> list[Outcome]:
    async with asyncio.TaskGroup() as tg:
        tasks = [
            tg.create_task(
                execute(job, ctx, limits.get(job.job_id, config.timeout))
            )
            for job in config.jobs
        ]
    return [task.result() for task in tasks]


raw_jobs: list[object] = [
    {"id": "patient", "kind": "wait", "seconds": 0.3, "timeout": 0.5},
    {"id": "impatient", "kind": "wait", "seconds": 0.1, "timeout": 0.05},
    {"id": "normal", "kind": "wait", "seconds": 0.05},
]
config = parse_config({"timeout": 0.2, "workers": 1, "jobs": raw_jobs})
with ThreadPoolExecutor() as pool:
    ctx = Context(pool)
    outcomes = asyncio.run(run_with_limits(config, ctx, job_limits(raw_jobs)))
report(outcomes, sys.stdout)
