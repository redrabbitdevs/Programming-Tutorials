import logging
import sys

logging.basicConfig(
    stream=sys.stdout,
    level=logging.DEBUG,
    format="%(levelname)s:%(name)s:%(message)s",
)

logging.debug("reading settings")
logging.info("server started on port %d", 8080)
logging.warning("disk is %d%% full", 91)
logging.error("could not open %s", "report.csv")
logging.critical("out of memory")
