import unittest

from c32_textutil import average, slugify


class SlugifyTests(unittest.TestCase):
    def test_lowercases_and_joins_with_hyphens(self):
        self.assertEqual(slugify("Hello World"), "hello-world")

    def test_drops_punctuation(self):
        self.assertEqual(slugify("Hello, World!"), "hello-world")

    def test_empty_text_gives_empty_slug(self):
        self.assertEqual(slugify(""), "")


class AverageTests(unittest.TestCase):
    def test_mean_of_integers(self):
        self.assertEqual(average([2, 4, 6]), 4)

    def test_float_result_needs_tolerance(self):
        self.assertAlmostEqual(average([0.1, 0.2]), 0.15)

    def test_empty_list_is_an_error(self):
        with self.assertRaises(ValueError) as caught:
            average([])
        self.assertIn("at least one", str(caught.exception))


if __name__ == "__main__":
    unittest.main()
