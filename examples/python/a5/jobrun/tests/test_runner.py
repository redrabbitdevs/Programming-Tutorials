import asyncio

from jobrun.builtin import Primes, Wait
from jobrun.config import Config
from jobrun.models import Context, Status
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
