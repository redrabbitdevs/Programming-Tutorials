"""Inspect a crash after the fact, with a scripted post-mortem session."""

import io
import os
import pdb
import sys


def average_by_group(rows):
    sums = {}
    for group, value in rows:
        sums[group] = sums[group] + value
    return sums


rows = [("a", 1), ("b", 2)]
try:
    average_by_group(rows)
except KeyError:
    traceback = sys.exc_info()[2]

commands = """\
where
p group
p value
p sums
up
p rows
quit
"""

out = io.StringIO()
debugger = pdb.Pdb(stdin=io.StringIO(commands), stdout=out)
debugger.reset()
debugger.interaction(None, traceback)

print(out.getvalue().replace(os.getcwd() + os.sep, ""))
