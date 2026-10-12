import logging
import re
import sys


class RedactSecrets(logging.Filter):
    """Mask the value after password= or token= in every message."""

    pattern = re.compile(r"(password|token)=\S+")

    def filter(self, record):
        record.msg = self.pattern.sub(r"\1=***", record.getMessage())
        record.args = None
        return True


handler = logging.StreamHandler(sys.stdout)
handler.addFilter(RedactSecrets())
logging.basicConfig(
    handlers=[handler],
    level=logging.INFO,
    format="%(levelname)s %(message)s",
)

logging.info("connecting as ana with password=hunter2")
logging.info("calling the API with token=abc123 for user %s", "ana")
logging.info("done")
