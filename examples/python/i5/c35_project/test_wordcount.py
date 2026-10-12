import unittest

from wordcount import count_words


class CountWordsTests(unittest.TestCase):
    def test_empty_text_has_no_words(self):
        self.assertEqual(count_words(""), {})

    def test_capitals_are_merged(self):
        self.assertEqual(count_words("Go go GO"), {"go": 3})


if __name__ == "__main__":
    unittest.main()
