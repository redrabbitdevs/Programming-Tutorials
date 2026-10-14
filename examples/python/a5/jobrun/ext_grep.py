import asyncio
import re
import sys
from concurrent.futures import ThreadPoolExecutor
from dataclasses import dataclass
from typing import Self

from jobrun.cli import report
from jobrun.config import parse_config
from jobrun.models import ConfigError, Context
from jobrun.plugin import Plugin
from jobrun.runner import run_all


@dataclass(frozen=True)
class Grep(Plugin[list[str]], kind="grep"):
    """The lines of a log that match a regular expression."""

    pattern: re.Pattern[str]
    log: str

    @classmethod
    def from_params(cls, job_id: str, params: dict[str, object]) -> Self:
        match params:
            case {"pattern": str(text), "log": str(log)}:
                try:
                    return cls(job_id, re.compile(text), log)
                except re.error as error:
                    raise ConfigError(f"{job_id}: bad pattern: {error}")
            case _:
                raise ConfigError(f"{job_id}: 'grep' needs 'pattern' and 'log'")

    async def run(self, ctx: Context) -> list[str]:
        lines = self.log.splitlines()
        return [line for line in lines if self.pattern.search(line)]

    def render(self, value: list[str]) -> str:
        return f"{len(value)} found: " + " | ".join(value)


LOG = "09:00:01 INFO up\n09:00:05 ERROR disk full\n09:00:07 ERROR no retry"
data = {
    "timeout": 1,
    "workers": 1,
    "jobs": [{"id": "errors", "kind": "grep", "pattern": "ERROR", "log": LOG}],
}
with ThreadPoolExecutor() as pool:
    report(asyncio.run(run_all(parse_config(data), Context(pool))), sys.stdout)

bad_job = {"id": "oops", "kind": "grep", "pattern": "(ERROR", "log": LOG}
try:
    parse_config({**data, "jobs": [bad_job]})
except ConfigError as error:
    print("ConfigError:", error)
