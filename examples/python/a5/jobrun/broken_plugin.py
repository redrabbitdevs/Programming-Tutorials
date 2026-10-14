import asyncio
from concurrent.futures import ThreadPoolExecutor
from dataclasses import dataclass

from jobrun.models import Context
from jobrun.plugin import Plugin


@dataclass(frozen=True)
class Mean(Plugin[float], kind="mean"):
    numbers: tuple[float, ...]

    async def run(self, ctx: Context) -> float:
        return sum(self.numbers) / len(self.numbers)

    def render(self, value: str) -> str:
        return "mean " + value


job = Mean("m", (1.0, 2.0, 4.5))
with ThreadPoolExecutor() as pool:
    value = asyncio.run(job.run(Context(pool)))
try:
    print(job.render(value))
except TypeError as error:
    print("TypeError:", error)
