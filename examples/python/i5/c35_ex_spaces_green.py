import re
import unittest

from showtests import run_tests

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
        if not parts or "".join(n + unit for n, unit in parts) != token:
            raise ValueError(f"not a duration: {text!r}")
        total += sum(int(n) * _SECONDS[unit] for n, unit in parts)
    return total


class DurationTests(unittest.TestCase):
    def test_spaces_between_parts(self):
        self.assertEqual(parse_duration("1h 30m"), 5400)

    def test_spaces_inside_are_still_not_a_free_for_all(self):
        with self.assertRaises(ValueError):
            parse_duration("1 h")

    def test_the_old_cases_still_pass(self):
        self.assertEqual(parse_duration("1h1m1s"), 3661)
        self.assertEqual(parse_duration(" 2H "), 7200)
        with self.assertRaises(ValueError):
            parse_duration("")


print(run_tests(DurationTests))
