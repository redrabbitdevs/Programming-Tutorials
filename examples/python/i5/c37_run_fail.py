"""Run `python -m doctest c37_doctest_fail.py` and show what it prints."""

import os
import subprocess
import sys

result = subprocess.run(
    [sys.executable, "-B", "-m", "doctest", "c37_doctest_fail.py"],
    capture_output=True,
    text=True,
)
# doctest prints the full path of the file. Show it relative, so the output is
# the same on every machine. The last two lines mirror `echo $?` in a shell.
print(result.stdout.replace(os.getcwd() + os.sep, ""), end="")
print("$ echo $?")
print(result.returncode)
