"""breakpoint() calls sys.breakpointhook(), which PYTHONBREAKPOINT controls."""

import os
import subprocess
import sys

child_code = """
x = 41
breakpoint()
print("finished without stopping:", x + 1)
"""


def run_child(setting):
    env = dict(os.environ, PYTHONBREAKPOINT=setting)
    command = [sys.executable, "-B", "-c", child_code]
    run = subprocess.run(
        command,
        env=env,
        capture_output=True,
        text=True,
        stdin=subprocess.DEVNULL,
    )
    return run.stdout


print(run_child("0"), end="")
print(repr(run_child("builtins.print")))
