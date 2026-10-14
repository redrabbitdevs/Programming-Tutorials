import argparse
import asyncio
import sys
from collections import Counter
from concurrent.futures import Executor, ProcessPoolExecutor
from pathlib import Path

from .config import load_config
from .models import ConfigError, Context, Outcome, Sink, Status
from .runner import run_all


def make_pool(kind: str, workers: int) -> Executor:
    match kind:
        case "process":
            return ProcessPoolExecutor(max_workers=workers)
        case "interpreter":
            from concurrent.futures import InterpreterPoolExecutor

            return InterpreterPoolExecutor(max_workers=workers)
        case _:
            raise ValueError(f"unknown pool kind {kind!r}")


def report(outcomes: list[Outcome], out: Sink) -> None:
    width = max((len(o.job_id) for o in outcomes), default=0) + 2
    for o in outcomes:
        out.write(f"{o.job_id:<{width}}{o.status:<9}{o.detail}\n")
    counts = Counter(o.status for o in outcomes)
    parts = [f"{counts[s]} {s}" for s in Status if counts[s]]
    out.write(f"{len(outcomes)} jobs: {', '.join(parts)}\n")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="jobrun")
    parser.add_argument("jobs", type=Path, help="JSON file of jobs")
    parser.add_argument(
        "--pool", choices=["process", "interpreter"], default="process"
    )
    return parser


def main(argv: list[str] | None = None, out: Sink | None = None) -> int:
    args = build_parser().parse_args(argv)
    try:
        config = load_config(args.jobs)
    except (OSError, ConfigError) as error:
        print(f"jobrun: {error}", file=sys.stderr)
        return 2
    with make_pool(args.pool, config.workers) as pool:
        outcomes = asyncio.run(run_all(config, Context(pool)))
    report(outcomes, out if out is not None else sys.stdout)
    return 0 if all(o.status is Status.OK for o in outcomes) else 1
