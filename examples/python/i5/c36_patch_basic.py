import unittest
from unittest.mock import patch

import c36_weather
from showtests import run_tests


class DescribeTests(unittest.TestCase):
    @patch("c36_weather.fetch_temperature")
    def test_cold_day(self, fake_fetch):
        fake_fetch.return_value = 2
        self.assertEqual(c36_weather.describe("Oslo"), "Oslo: 2 C, wear a coat")
        fake_fetch.assert_called_once_with("Oslo")

    def test_warm_day(self):
        with patch("c36_weather.fetch_temperature", return_value=21) as fake_fetch:
            result = c36_weather.describe("Lima")
        self.assertEqual(result, "Lima: 21 C, no coat needed")
        self.assertEqual(fake_fetch.call_count, 1)

    def test_network_failure_reaches_the_caller(self):
        with patch("c36_weather.fetch_temperature", side_effect=ConnectionError):
            with self.assertRaises(ConnectionError):
                c36_weather.describe("Oslo")


print(run_tests(DescribeTests, verbosity=2))

# Outside the tests the real function is back in place.
print(c36_weather.fetch_temperature.__module__, c36_weather.fetch_temperature.__name__)
