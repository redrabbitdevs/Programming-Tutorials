import json
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from . import builtin  # noqa: F401  Importing it registers the plugins.
from .models import ConfigError
from .plugin import REGISTRY, Plugin


@dataclass(frozen=True)
class Config:
    timeout: float
    workers: int
    jobs: tuple[Plugin[Any], ...]


def parse_job(raw: object) -> Plugin[Any]:
    match raw:
        case {"id": str(job_id), "kind": str(kind), **rest}:
            if kind not in REGISTRY:
                raise ConfigError(f"{job_id}: unknown kind {kind!r}")
            params = {str(key): value for key, value in rest.items()}
            return REGISTRY[kind].from_params(job_id, params)
        case _:
            raise ConfigError(f"a job needs a string id and kind: {raw!r}")


def parse_config(data: object) -> Config:
    match data:
        case {
            "timeout": int() | float() as timeout,
            "workers": int(workers),
            "jobs": [*raw_jobs],
        } if timeout > 0 and workers > 0:
            jobs = tuple(parse_job(raw) for raw in raw_jobs)
            return Config(float(timeout), workers, jobs)
        case _:
            raise ConfigError(
                "expected positive 'timeout' and 'workers', and a 'jobs' list"
            )


def load_config(path: Path) -> Config:
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as error:
        raise ConfigError(f"{path} is not valid JSON: {error}") from error
    return parse_config(data)
