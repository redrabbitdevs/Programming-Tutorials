"""parse_duration, grown one failing test at a time."""

import re

_PART = re.compile(r"(\d+)([hms])")
_SECONDS = {"h": 3600, "m": 60, "s": 1}


def parse_duration(text):
    """Return the number of seconds in text such as '1h30m' or '90s'."""
    text = text.strip().lower()
    parts = _PART.findall(text)
    if not parts or "".join(n + unit for n, unit in parts) != text:
        raise ValueError(f"not a duration: {text!r}")
    return sum(int(n) * _SECONDS[unit] for n, unit in parts)
