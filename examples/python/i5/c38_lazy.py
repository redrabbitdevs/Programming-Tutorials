import logging
import sys

logging.basicConfig(stream=sys.stdout, level=logging.WARNING, format="%(message)s")
log = logging.getLogger("lazy")


class Expensive:
    def __str__(self):
        print("(building the message)")
        return "expensive text"


print("with an f-string:")
log.debug(f"state: {Expensive()}")

print("with %s arguments:")
log.debug("state: %s", Expensive())

print("when the level is enabled:")
log.warning("state: %s", Expensive())
