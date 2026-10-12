import unittest


class Basket:
    def __init__(self):
        self.items = []

    def add(self, name, price):
        self.items.append((name, price))

    def total(self):
        return sum(price for _, price in self.items)


class BasketTests(unittest.TestCase):
    def setUp(self):
        # runs before every test method, so each test gets a fresh basket
        self.basket = Basket()
        self.basket.add("tea", 3)

    def test_total_with_one_item(self):
        self.assertEqual(self.basket.total(), 3)

    def test_total_after_adding(self):
        self.basket.add("cake", 4)
        self.assertEqual(self.basket.total(), 7)

    def test_tests_do_not_share_state(self):
        self.assertEqual(len(self.basket.items), 1)


if __name__ == "__main__":
    unittest.main()
