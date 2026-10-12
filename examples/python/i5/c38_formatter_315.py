import logging
import sys

# Python 3.15 or newer: basicConfig accepts a ready-made Formatter object.
formatter = logging.Formatter("[{levelname}] {name}: {message}", style="{")
logging.basicConfig(stream=sys.stdout, level=logging.INFO, formatter=formatter)

logging.getLogger("billing").info("invoice %s sent", "A-17")
logging.getLogger("billing.retry").warning("attempt %d failed", 2)
