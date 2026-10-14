from collections.abc import Iterator
from concurrent.futures import ThreadPoolExecutor

import pytest

from jobrun.models import Context


@pytest.fixture
def ctx() -> Iterator[Context]:
    """A Context with a thread pool. Any Executor will do, and threads
    start faster than processes."""
    with ThreadPoolExecutor(max_workers=2) as pool:
        yield Context(pool)
