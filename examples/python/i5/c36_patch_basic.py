import unittest
from unittest.mock import patch

import c36_weather

FETCH = "c36_weather.fetch_temperature"


class DescribeTests(unittest.TestCase):
    @patch(FETCH)
    def test_cold_day(self, fake_fetch):
        fake_fetch.return_value = 2
        result = c36_weather.describe("Oslo")
        self.assertEqual(result, "Oslo: 2 C, wear a coat")
        fake_fetch.assert_called_once_with("Oslo")

    def test_warm_day(self):
        with patch(FETCH, return_value=21) as fake_fetch:
            result = c36_weather.describe("Lima")
        self.assertEqual(result, "Lima: 21 C, no coat needed")
        self.assertEqual(fake_fetch.call_count, 1)

    def test_network_failure_reaches_the_caller(self):
        with patch(FETCH, side_effect=ConnectionError):
            with self.assertRaises(ConnectionError):
                c36_weather.describe("Oslo")


if __name__ == "__main__":
    unittest.main()
