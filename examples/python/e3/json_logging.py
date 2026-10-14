import json
import logging
import logging.config

# Attribute names every LogRecord has; anything else came from extra=.
STANDARD = set(vars(logging.makeLogRecord({}))) | {"message"}


class JsonFormatter(logging.Formatter):
    def format(self, record):
        entry = {
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
        }
        for key, value in vars(record).items():
            if key not in STANDARD:
                entry[key] = value
        if record.exc_info:
            entry["error"] = repr(record.exc_info[1])
        return json.dumps(entry)


CONFIG = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {"json": {"()": JsonFormatter}},
    "handlers": {
        "stdout": {
            "class": "logging.StreamHandler",
            "stream": "ext://sys.stdout",
            "formatter": "json",
        },
    },
    "loggers": {"shop.db": {"level": "WARNING"}},
    "root": {"level": "INFO", "handlers": ["stdout"]},
}

logging.config.dictConfig(CONFIG)
log = logging.getLogger("shop.orders")
log.info("order placed", extra={"order_id": 42, "total": "19.90"})
logging.getLogger("shop.db").info("query took 3 ms")
try:
    1 / 0
except ZeroDivisionError:
    log.exception("refund failed", extra={"order_id": 42})
