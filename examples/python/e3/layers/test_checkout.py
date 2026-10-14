import unittest
from decimal import Decimal

from shop.service import Checkout


class FakeCatalogue:
    def __init__(self, prices):
        self.prices = prices

    def price_of(self, sku):
        return Decimal(self.prices[sku])


class RecordingNotifier:
    def __init__(self):
        self.sent = []

    def send(self, to, text):
        self.sent.append((to, text))


class CheckoutTest(unittest.TestCase):
    def setUp(self):
        self.notifier = RecordingNotifier()
        catalogue = FakeCatalogue({"tea": "4.50", "mug": "12.00"})
        self.checkout = Checkout(catalogue, self.notifier)

    def test_discount_code_takes_ten_percent(self):
        total = self.checkout.place("b@example.com", {"mug": 1}, "WELCOME10")
        self.assertEqual(total, Decimal("10.80"))

    def test_customer_is_told_the_total(self):
        self.checkout.place("b@example.com", {"tea": 3})
        self.assertEqual(self.notifier.sent,
                         [("b@example.com", "Your order: 13.50 EUR")])


if __name__ == "__main__":
    unittest.main()
