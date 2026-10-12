import time


def fetch_with_retry(fetch, attempts=3):
    """Call fetch() until it works, at most `attempts` times."""
    for attempt in range(1, attempts + 1):
        try:
            return fetch()
        except ConnectionError:
            if attempt == attempts:
                raise
            time.sleep(attempt)
