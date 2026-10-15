import asyncio
import logging
import signal
from collections.abc import Callable

from .config import Config
from .logs import job_id
from .models import Context, Outcome, Status
from .plugin import Plugin

log = logging.getLogger("jobrun.runner")


async def attempt[T](job: Plugin[T], ctx: Context, timeout: float) -> Outcome:
    try:
        async with asyncio.timeout(timeout):
            value = await job.run(ctx)
    except TimeoutError:
        detail = f"no result after {timeout}s"
        return Outcome(job.job_id, Status.TIMEOUT, detail)
    except Exception as error:
        detail = f"{type(error).__name__}: {error}"
        return Outcome(job.job_id, Status.FAILED, detail)
    return Outcome(job.job_id, Status.OK, job.render(value))


async def execute[T](job: Plugin[T], ctx: Context, timeout: float) -> Outcome:
    job_id.set(job.job_id)  # only this task's copy of the context changes
    log.info("started")
    outcome = await attempt(job, ctx, timeout)
    log.info("%s: %s", outcome.status, outcome.detail)
    return outcome


def on_sigterm(loop: asyncio.AbstractEventLoop,
               stop: Callable[[], None]) -> bool:
    """Call stop() on SIGTERM. False where the loop cannot do it (Windows)."""
    try:
        loop.add_signal_handler(signal.SIGTERM, stop)
    except (NotImplementedError, RuntimeError):
        return False
    return True


def outcome_of(task: asyncio.Task[Outcome]) -> Outcome:
    if task.cancelled():
        return Outcome(task.get_name(), Status.CANCELLED, "stopped by SIGTERM")
    return task.result()


async def run_all(config: Config, ctx: Context) -> list[Outcome]:
    loop = asyncio.get_running_loop()
    tasks: list[asyncio.Task[Outcome]] = []

    def stop() -> None:
        log.warning("SIGTERM: cancelling the unfinished jobs")
        for task in tasks:
            task.cancel()

    watching = on_sigterm(loop, stop)
    try:
        async with asyncio.TaskGroup() as tg:
            for job in config.jobs:
                coro = execute(job, ctx, config.timeout)
                tasks.append(tg.create_task(coro, name=job.job_id))
    finally:
        if watching:
            loop.remove_signal_handler(signal.SIGTERM)
    return [outcome_of(task) for task in tasks]
