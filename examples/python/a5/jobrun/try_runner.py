import asyncio
from concurrent.futures import ProcessPoolExecutor
from pathlib import Path

from jobrun.config import load_config
from jobrun.models import Context
from jobrun.runner import run_all

if __name__ == "__main__":
    config = load_config(Path("jobs.json"))
    with ProcessPoolExecutor(max_workers=config.workers) as pool:
        outcomes = asyncio.run(run_all(config, Context(pool)))
    for outcome in outcomes:
        print(outcome.job_id, outcome.status, outcome.detail, sep=" | ")
