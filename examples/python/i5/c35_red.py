import unittest


def parse_duration(text):
    return 0  # a stub: it exists, but it does not work yet


class ParseDurationTests(unittest.TestCase):
    def test_seconds_only(self):
        self.assertEqual(parse_duration("90s"), 90)


if __name__ == "__main__":
    unittest.main()
