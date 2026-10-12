"""breakpoint() calls sys.breakpointhook(), which PYTHONBREAKPOINT can redirect or disable."""

import os
import subprocess
import sys

child_code = """
x = 41
breakpoint()
print("finished without stopping:", x + 1)
"""

env = dict(os.environ, PYTHONBREAKPOINT="0")
result = subprocess.run(
    [sys.executable, "-B", "-c", child_code],
    env=env,
    capture_output=True,
    text=True,
    stdin=subprocess.DEVNULL,
)
print(result.stdout, end="")

# Any importable callable can take over, for example a function that only prints.
env["PYTHONBREAKPOINT"] = "builtins.print"
result = subprocess.run(
    [sys.executable, "-B", "-c", child_code],
    env=env,
    capture_output=True,
    text=True,
    stdin=subprocess.DEVNULL,
)
print(repr(result.stdout))
