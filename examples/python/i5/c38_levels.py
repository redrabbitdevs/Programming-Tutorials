import logging
import sys

logging.basicConfig(stream=sys.stdout, format="%(levelname)-8s %(message)s")
log = logging.getLogger("demo")


def emit_all():
    log.debug("a detail for developers")
    log.info("a normal event")
    log.warning("something unexpected, but handled")
    log.error("an operation failed")


print("-- default level (WARNING)")
emit_all()

print("-- after log.setLevel(logging.INFO)")
log.setLevel(logging.INFO)
emit_all()

print("-- after log.setLevel(logging.DEBUG)")
log.setLevel(logging.DEBUG)
emit_all()

print(logging.getLevelName(30), logging.WARNING, logging.getLevelName(logging.ERROR))
