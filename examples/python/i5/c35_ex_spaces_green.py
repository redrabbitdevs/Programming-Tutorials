import unittest

from c35_spaces_duration import parse_duration


class DurationTests(unittest.TestCase):
    def test_spaces_between_parts(self):
        self.assertEqual(parse_duration("1h 30m"), 5400)

    def test_a_space_inside_a_part_is_refused(self):
        with self.assertRaises(ValueError):
            parse_duration("1 h")

    def test_the_old_cases_still_pass(self):
        self.assertEqual(parse_duration("1h1m1s"), 3661)
        self.assertEqual(parse_duration(" 2H "), 7200)
        with self.assertRaises(ValueError):
            parse_duration("")


if __name__ == "__main__":
    unittest.main()
