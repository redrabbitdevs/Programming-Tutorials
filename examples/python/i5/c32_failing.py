import unittest

from c32_textutil import slugify
from showtests import run_tests


class SlugifyTests(unittest.TestCase):
    def test_plus_signs_kept(self):
        self.assertEqual(slugify("C++ tips"), "c++-tips")

    def test_numbers_kept(self):
        self.assertEqual(slugify("Top 10 tips"), "top-10-tips")

    def test_none_is_rejected_politely(self):
        self.assertEqual(slugify(None), "")


print(run_tests(SlugifyTests))
