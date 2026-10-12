import unittest
from unittest.mock import patch

import c36_shop


class BannerTests(unittest.TestCase):
    def test_morning_banner(self):
        with patch("c36_clock.current_hour", return_value=9) as fake_hour:
            c36_shop.banner()
        self.assertEqual(fake_hour.call_count, 1)


if __name__ == "__main__":
    unittest.main()
