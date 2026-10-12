import unittest


def clamp(value, low, high):
    return max(low, min(value, high))


class ClampTests(unittest.TestCase):
    def test_inside_range(self):
        self.assertEqual(clamp(5, 0, 10), 5)

    def test_below_range(self):
        self.assertEqual(clamp(-3, 0, 10), 0)

    def test_above_range(self):
        self.assertEqual(clamp(99, 0, 10), 10)


if __name__ == "__main__":
    unittest.main()
