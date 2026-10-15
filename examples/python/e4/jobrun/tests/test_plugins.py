import asyncio
from typing import Any

import pytest

from jobrun.builtin import LogLevels, Primes, Wait, WordCount
from jobrun.models import Context
from jobrun.plugin import REGISTRY, Plugin


def test_importing_builtin_registers_four_kinds() -> None:
    assert {"words", "levels", "wait", "primes"} <= set(REGISTRY)
    assert REGISTRY["words"] is WordCount


def test_a_second_plugin_with_the_same_kind_is_refused() -> None:
    with pytest.raises(TypeError, match="already registered"):
        class Again(Plugin[int], kind="words"): ...


@pytest.mark.parametrize(
    ("job", "expected"),
    [
        (WordCount("w", "a b a c a b"), "a=3, b=2, c=1"),
        (LogLevels("l", "10:00:00 INFO x\nbad\n10:00:01 INFO y"), "INFO=2 ?=1"),
        (Wait("s", 0.0), "waited 0.0s"),
        (Primes("p", 30), "10 primes below 30"),
    ],
    ids=["words", "levels", "wait", "primes"],
)
def test_run_then_render(job: Plugin[Any], expected: str, ctx: Context) -> None:
    value = asyncio.run(job.run(ctx))
    assert job.render(value) == expected
