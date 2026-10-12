"""A script with a -v / -q switch that controls how much it logs."""

import argparse
import logging
import sys

log = logging.getLogger("cleanup")
LEVELS = {-1: logging.ERROR, 0: logging.WARNING, 1: logging.INFO}


def configure(verbosity):
    level = LEVELS.get(verbosity, logging.DEBUG)
    logging.basicConfig(
        stream=sys.stdout,
        level=level,
        format="%(levelname)s %(message)s",
        force=True,
    )


def cleanup(names):
    for name in names:
        log.debug("checking %s", name)
        if name.endswith(".tmp"):
            log.info("removing %s", name)
        elif name.startswith("."):
            log.warning("leaving hidden file %s", name)
    log.info("done")


parser = argparse.ArgumentParser()
parser.add_argument("-v", "--verbose", action="count", default=0)
parser.add_argument("-q", "--quiet", action="store_true")

for argv in ([], ["-v"], ["-vv"], ["-q"]):
    args = parser.parse_args(argv)
    configure(-1 if args.quiet else args.verbose)
    print("== arguments:", argv)
    cleanup(["a.tmp", ".env", "notes.txt"])
