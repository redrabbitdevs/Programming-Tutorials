import asyncio

from .config import Config
from .models import Context, Outcome, Status
from .plugin import Plugin


async def execute[T](job: Plugin[T], ctx: Context, timeout: float) -> Outcome:
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


async def run_all(config: Config, ctx: Context) -> list[Outcome]:
    async with asyncio.TaskGroup() as tg:
        tasks = [
            tg.create_task(execute(job, ctx, config.timeout), name=job.job_id)
            for job in config.jobs
        ]
    return [task.result() for task in tasks]
