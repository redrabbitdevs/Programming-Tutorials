import unittest

from showtests import run_tests


def parse_duration(text):
    # the least code that makes the one test pass
    return int(text[:-1])


class ParseDurationTests(unittest.TestCase):
    def test_seconds_only(self):
        self.assertEqual(parse_duration("90s"), 90)


print(run_tests(ParseDurationTests))
