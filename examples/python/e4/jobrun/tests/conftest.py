import logging
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


@pytest.fixture(autouse=True)
def forget_log_handlers() -> Iterator[None]:
    """main() points the jobrun logger at the stderr of the test that called
    it. Remove that handler, so later tests do not write to a closed stream."""
    yield
    logging.getLogger("jobrun").handlers.clear()
