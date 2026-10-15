import json
import logging
import sys
from contextvars import ContextVar

# Each asyncio task runs in its own copy of the context, so every job
# sees its own value here without passing it around.
job_id: ContextVar[str] = ContextVar("job_id", default="-")


class JobFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        record.job = job_id.get()
        return True


class JsonFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        return json.dumps({"level": record.levelname,
                           "job": getattr(record, "job", "-"),
                           "message": record.getMessage()})


TEXT = logging.Formatter("%(levelname)s %(job)s: %(message)s")


def setup(level: str, form: str) -> None:
    """Send the jobrun loggers to stderr, as text lines or JSON lines."""
    handler = logging.StreamHandler(sys.stderr)
    handler.addFilter(JobFilter())
    if form == "json":
        handler.setFormatter(JsonFormatter())
    else:
        handler.setFormatter(TEXT)
    logger = logging.getLogger("jobrun")
    logger.handlers[:] = [handler]
    logger.setLevel(level)
    logger.propagate = False
