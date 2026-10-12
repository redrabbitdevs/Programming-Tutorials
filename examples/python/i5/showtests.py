"""Run unittest cases and return their report with timings and paths removed.

Real output has the same shape; only the time and the directory differ.
"""

import io
import os
import re
import unittest


def run_tests(*cases, verbosity=1):
    loader = unittest.defaultTestLoader
    suite = unittest.TestSuite(loader.loadTestsFromTestCase(c) for c in cases)
    stream = io.StringIO()
    unittest.TextTestRunner(stream=stream, verbosity=verbosity).run(suite)
    text = stream.getvalue()
    text = re.sub(r"in \d+\.\d+s", "in 0.001s", text)
    return text.replace(os.getcwd() + os.sep, "")
