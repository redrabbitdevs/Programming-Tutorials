import asyncio
import os
import signal
import sys

import pytest

from jobrun.builtin import Primes, Wait
from jobrun.config import Config
from jobrun.models import Context, Outcome, Status
from jobrun.runner import run_all


def test_failures_and_timeouts_become_outcomes(ctx: Context) -> None:
    jobs = (Wait("fast", 0), Wait("slow", 5), Primes("bad", 0))
    outcomes = asyncio.run(run_all(Config(0.05, 1, jobs), ctx))
    assert [o.status for o in outcomes] == [
        Status.OK,
        Status.TIMEOUT,
        Status.FAILED,
    ]
    assert outcomes[2].detail.startswith("ValueError: below must be")


def test_results_keep_the_order_of_the_config(ctx: Context) -> None:
    jobs = (Wait("first", 0.03), Wait("second", 0))
    outcomes = asyncio.run(run_all(Config(1.0, 1, jobs), ctx))
    assert [o.job_id for o in outcomes] == ["first", "second"]


@pytest.mark.skipif(sys.platform == "win32", reason="Unix signal handlers")
def test_sigterm_cancels_the_unfinished_jobs(ctx: Context) -> None:
    async def run_then_signal() -> list[Outcome]:
        loop = asyncio.get_running_loop()
        loop.call_later(0.05, os.kill, os.getpid(), signal.SIGTERM)
        jobs = (Wait("fast", 0), Wait("slow", 5))
        return await run_all(Config(10.0, 1, jobs), ctx)

    outcomes = asyncio.run(run_then_signal())
    assert [o.status for o in outcomes] == [Status.OK, Status.CANCELLED]
