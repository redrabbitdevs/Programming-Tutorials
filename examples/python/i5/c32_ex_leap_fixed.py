import unittest

def is_leap_year(year):
    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)


class LeapYearTests(unittest.TestCase):
    def test_known_years(self):
        cases = [
            (2024, True),
            (2023, False),
            (1900, False),
            (2000, True),
            (2100, False),
        ]
        for year, expected in cases:
            with self.subTest(year=year):
                self.assertEqual(is_leap_year(year), expected)


if __name__ == "__main__":
    unittest.main()
