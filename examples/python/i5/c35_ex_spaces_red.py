import unittest

from c35_duration import parse_duration
from showtests import run_tests


class SpacesTests(unittest.TestCase):
    def test_spaces_between_parts(self):
        self.assertEqual(parse_duration("1h 30m"), 5400)

    def test_spaces_inside_are_still_not_a_free_for_all(self):
        with self.assertRaises(ValueError):
            parse_duration("1 h")


print(run_tests(SpacesTests))
