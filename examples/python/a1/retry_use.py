from typing import reveal_type

from retry import retry

failures = iter(["timeout", "reset"])


@retry(times=3)
def fetch(url: str) -> str:
    reason = next(failures, None)
    if reason is not None:
        raise ConnectionError(reason)
    return f"200 OK {url}"


reveal_type(fetch)
print(fetch("https://example.com"))
