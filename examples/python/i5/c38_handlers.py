import logging
import sys
import tempfile
from pathlib import Path

log = logging.getLogger("backup")
log.setLevel(logging.DEBUG)  # the logger lets everything through...

# ...and each handler decides what it shows.
console = logging.StreamHandler(sys.stdout)
console.setLevel(logging.INFO)
console.setFormatter(logging.Formatter("%(levelname)s: %(message)s"))

FILE_FORMAT = "%(levelname)s %(name)s %(funcName)s: %(message)s"

with tempfile.TemporaryDirectory() as folder:
    logfile = Path(folder) / "backup.log"
    to_file = logging.FileHandler(logfile, encoding="utf-8")
    to_file.setLevel(logging.DEBUG)
    to_file.setFormatter(logging.Formatter(FILE_FORMAT))

    log.addHandler(console)
    log.addHandler(to_file)

    def run():
        log.debug("scanning %s", "/data")
        log.info("copied %d files", 12)
        log.warning("skipped %s: permission denied", "/data/private")

    run()

    log.removeHandler(to_file)
    to_file.close()
    print("--- contents of the file")
    print(logfile.read_text(encoding="utf-8"), end="")
