import re

_PART = re.compile(r"(\d+)([hms])")
_SECONDS = {"h": 3600, "m": 60, "s": 1}


def parse_duration(text):
    """Return seconds for text such as '1h30m' or '1h 30m'."""
    tokens = text.strip().lower().split()
    if not tokens:
        raise ValueError(f"not a duration: {text!r}")
    total = 0
    for token in tokens:
        parts = _PART.findall(token)
        if not parts or "".join(n + u for n, u in parts) != token:
            raise ValueError(f"not a duration: {text!r}")
        total += sum(int(n) * _SECONDS[u] for n, u in parts)
    return total
