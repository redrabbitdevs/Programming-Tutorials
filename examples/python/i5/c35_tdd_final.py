import unittest

from c35_duration import parse_duration
from showtests import run_tests


class ParseDurationTests(unittest.TestCase):
    def test_seconds_only(self):
        self.assertEqual(parse_duration("90s"), 90)

    def test_minutes_and_seconds(self):
        self.assertEqual(parse_duration("1m30s"), 90)

    def test_hours_and_minutes(self):
        self.assertEqual(parse_duration("1h30m"), 5400)

    def test_all_three_units(self):
        self.assertEqual(parse_duration("1h1m1s"), 3661)

    def test_capitals_and_spaces_are_tolerated(self):
        self.assertEqual(parse_duration(" 2H "), 7200)

    def test_rejects_text_that_is_not_a_duration(self):
        for bad in ["", "abc", "10", "5x", "1h junk"]:
            with self.subTest(bad=bad):
                with self.assertRaises(ValueError):
                    parse_duration(bad)


print(run_tests(ParseDurationTests, verbosity=2))
