import contextvars
import logging
import sys

request_id = contextvars.ContextVar("request_id", default="-")


class RequestIdFilter(logging.Filter):
    def filter(self, record):
        record.request_id = request_id.get()
        return True


handler = logging.StreamHandler(sys.stdout)
handler.addFilter(RequestIdFilter())
handler.setFormatter(
    logging.Formatter("%(request_id)s %(name)s: %(message)s"))
logging.basicConfig(level=logging.INFO, handlers=[handler])
log = logging.getLogger("shop.web")


def handle(rid, path):
    token = request_id.set(rid)
    try:
        log.info("GET %s", path)
        log.info("200 OK")
    finally:
        request_id.reset(token)


handle("req-7f3a", "/cart")
handle("req-91bc", "/checkout")
log.info("idle")
