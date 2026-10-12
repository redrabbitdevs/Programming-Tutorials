import logging
import sys

logging.basicConfig(
    stream=sys.stdout,
    level=logging.INFO,
    format="%(name)s %(levelname)s %(message)s",
)

app = logging.getLogger("app")
db = logging.getLogger("app.db")
net = logging.getLogger("net")

db.setLevel(logging.ERROR)
net.setLevel(logging.DEBUG)

app.info("starting")
app.debug("config loaded")
db.warning("slow query")
db.error("connection lost")
net.debug("sending %d bytes", 512)
