import logging
import sys

logging.basicConfig(stream=sys.stdout, format="%(levelname)s %(message)s")
log = logging.getLogger("jobs")
log.setLevel(logging.INFO)

log.debug("queue length: %d", 3)
log.info("starting")
