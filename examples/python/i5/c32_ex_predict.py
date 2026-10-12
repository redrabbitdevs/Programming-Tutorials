import unittest

from showtests import run_tests


def discount(price, percent):
    return price - price * percent / 100


class DiscountTests(unittest.TestCase):
    def test_ten_percent(self):
        self.assertEqual(discount(200, 10), 180)

    def test_zero_percent(self):
        self.assertEqual(discount(50, 0), 50)

    def test_full_discount(self):
        self.assertEqual(discount(80, 100), 80)

    def test_text_price(self):
        self.assertEqual(discount("100", 10), 90)


print(run_tests(DiscountTests, verbosity=2))
