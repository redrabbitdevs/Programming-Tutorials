from concurrent.futures import Executor
from dataclasses import dataclass
from enum import StrEnum
from typing import Protocol


class ConfigError(ValueError):
    """The jobs file does not have the expected shape."""


class Status(StrEnum):
    OK = "ok"
    FAILED = "failed"
    TIMEOUT = "timeout"
    CANCELLED = "cancelled"


@dataclass(frozen=True)
class Outcome:
    job_id: str
    status: Status
    detail: str


@dataclass(frozen=True)
class Context:
    """What every job may use while it runs."""

    pool: Executor


class Sink(Protocol):
    """Anything with a write(str) method: sys.stdout, io.StringIO, a file."""

    def write(self, text: str, /) -> object: ...
