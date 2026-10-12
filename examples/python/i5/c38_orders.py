"""A module that logs but leaves logging setup to the application."""

import logging

logger = logging.getLogger(__name__)


def total(prices):
    logger.debug("adding %d prices", len(prices))
    result = sum(prices)
    if result > 100:
        logger.warning("large order: %s", result)
    return result
