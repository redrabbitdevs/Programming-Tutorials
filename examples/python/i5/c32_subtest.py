import unittest

from c32_textutil import slugify
from showtests import run_tests


class SlugifyTable(unittest.TestCase):
    def test_table(self):
        cases = [
            ("Hello World", "hello-world"),
            ("  padded  ", "padded"),
            ("Rock & Roll", "rock-roll"),
            ("C++ tips", "c-tips"),
            ("v1.2 notes", "v1.2-notes"),
            ("a.b.c", "a.b.c"),
            ("snake_case name", "snake-case-name"),
        ]
        for text, expected in cases:
            with self.subTest(text=text):
                self.assertEqual(slugify(text), expected)


print(run_tests(SlugifyTable))
