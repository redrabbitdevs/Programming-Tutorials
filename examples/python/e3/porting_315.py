import argparse
import base64
import sqlite3
import unittest
import warnings

parser = argparse.ArgumentParser()
parser.add_argument("-f", "-file")
print("argparse dest:", vars(parser.parse_args(["-f", "a.txt"])))

print("unpadded base64:", base64.urlsafe_b64decode("YWI"))

case = unittest.TestCase()
with warnings.catch_warnings(record=True) as leaked:
    warnings.simplefilter("always", UserWarning)
    with case.assertWarns(DeprecationWarning):
        warnings.warn("old API", DeprecationWarning)
        warnings.warn("unrelated", UserWarning)
print("leaked past assertWarns:", [str(w.message) for w in leaked])

try:
    sqlite3.connect(":memory:", 5.0)  # timeout given by position
except TypeError as error:
    print("TypeError:", error)
