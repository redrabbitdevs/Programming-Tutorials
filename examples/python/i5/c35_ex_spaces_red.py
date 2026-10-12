import unittest

from c35_duration import parse_duration


class SpacesTests(unittest.TestCase):
    def test_spaces_between_parts(self):
        self.assertEqual(parse_duration("1h 30m"), 5400)

    def test_a_space_inside_a_part_is_refused(self):
        with self.assertRaises(ValueError):
            parse_duration("1 h")


if __name__ == "__main__":
    unittest.main()
