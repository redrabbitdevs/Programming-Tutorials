import logging
import logging.config

early = logging.getLogger("shop.early")  # created before configuration

logging.config.dictConfig({
    "version": 1,
    "handlers": {
        "out": {"class": "logging.StreamHandler",
                "stream": "ext://sys.stdout"},
    },
    "root": {"level": "INFO", "handlers": ["out"]},
})

late = logging.getLogger("shop.late")
early.warning("A from shop.early")
late.warning("B from shop.late")
logging.getLogger("shop").warning("C from shop")
