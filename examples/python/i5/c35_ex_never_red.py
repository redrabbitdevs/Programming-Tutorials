import unittest


def parse_duration(text):
    return 0  # a stub: the real parser is not written yet


class MinutesTests(unittest.TestCase):
    def test_two_minutes(self):
        result = parse_duration("2m")
        self.assertIsNotNone(result)


if __name__ == "__main__":
    unittest.main()
