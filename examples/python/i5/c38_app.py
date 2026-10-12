import logging
import sys

import c38_orders

print("before configuring:", c38_orders.total([60, 70]))

logging.basicConfig(
    stream=sys.stdout,
    level=logging.DEBUG,
    format="%(name)s %(levelname)s %(message)s",
)

print("after configuring:", c38_orders.total([60, 70]))
