import asyncio
import re
from collections import Counter
from dataclasses import dataclass
from math import isqrt
from typing import Self

from .models import ConfigError, Context
from .plugin import Plugin

WORD = re.compile(r"[a-z']+")
LOG_LINE = re.compile(r"(?P<time>[\d:]{8}) (?P<level>[A-Z]+) (?P<text>.*)")


@dataclass(frozen=True)
class WordCount(Plugin[list[tuple[str, int]]], kind="words"):
    """The three most common words in a text."""

    text: str

    @classmethod
    def from_params(cls, job_id: str, params: dict[str, object]) -> Self:
        match params:
            case {"text": str(text)}:
                return cls(job_id, text)
            case _:
                raise ConfigError(f"{job_id}: 'words' needs a string 'text'")

    async def run(self, ctx: Context) -> list[tuple[str, int]]:
        return Counter(WORD.findall(self.text.lower())).most_common(3)

    def render(self, value: list[tuple[str, int]]) -> str:
        return ", ".join(f"{word}={count}" for word, count in value)


@dataclass(frozen=True)
class LogLevels(Plugin[Counter[str]], kind="levels"):
    """Log lines per level. A line that does not parse counts as '?'."""

    log: str

    @classmethod
    def from_params(cls, job_id: str, params: dict[str, object]) -> Self:
        match params:
            case {"log": str(log)}:
                return cls(job_id, log)
            case _:
                raise ConfigError(f"{job_id}: 'levels' needs a string 'log'")

    async def run(self, ctx: Context) -> Counter[str]:
        levels = Counter[str]()
        for line in self.log.splitlines():
            match LOG_LINE.fullmatch(line):
                case None:
                    levels["?"] += 1
                case found:
                    levels[found["level"]] += 1
        return levels

    def render(self, value: Counter[str]) -> str:
        return " ".join(f"{level}={n}" for level, n in value.most_common())


@dataclass(frozen=True)
class Wait(Plugin[float], kind="wait"):
    """A stand-in for a slow network call: it sleeps, then reports."""

    seconds: float

    @classmethod
    def from_params(cls, job_id: str, params: dict[str, object]) -> Self:
        match params:
            case {"seconds": int() | float() as seconds} if seconds >= 0:
                return cls(job_id, float(seconds))
            case _:
                raise ConfigError(f"{job_id}: 'wait' needs 'seconds' >= 0")

    async def run(self, ctx: Context) -> float:
        await asyncio.sleep(self.seconds)
        return self.seconds

    def render(self, value: float) -> str:
        return f"waited {value}s"


def count_primes(below: int) -> int:
    """CPU-bound on purpose. It runs in a worker, never on the event loop."""
    if below < 2:
        raise ValueError(f"below must be at least 2, got {below}")
    count = 0
    for n in range(2, below):
        for d in range(2, isqrt(n) + 1):
            if n % d == 0:
                break
        else:
            count += 1
    return count


@dataclass(frozen=True)
class Primes(Plugin[int], kind="primes"):
    """How many primes are below a number, computed in the worker pool."""

    below: int

    @classmethod
    def from_params(cls, job_id: str, params: dict[str, object]) -> Self:
        match params:
            case {"below": int(below)}:
                return cls(job_id, below)
            case _:
                raise ConfigError(f"{job_id}: 'primes' needs an int 'below'")

    async def run(self, ctx: Context) -> int:
        loop = asyncio.get_running_loop()
        return await loop.run_in_executor(ctx.pool, count_primes, self.below)

    def render(self, value: int) -> str:
        return f"{value} primes below {self.below}"
