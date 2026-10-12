"""Run the spend command the way the lesson's console blocks show it.

The script runs the real command code in a fresh interpreter for every line, with the
project's src folder on the path (the job `pip install -e .` does on a learner's machine),
and prints each command line followed by its output (both streams, in order) and, when not 0, its exit code.
"""

import os
import subprocess
import sys
from pathlib import Path

PROJECT = Path(__file__).resolve().parent
CODE = "import sys; from spendlog.cli import main; sys.exit(main())"
COMMANDS = [
    "spend --month 2026-03",
    "spend --month 2026-03 --list",
    "spend --file messy.csv",
    "spend --month 2026-03 -v",
    "spend --file nothing.csv",
    "spend --month 2026-13",
]

env = {**os.environ, "PYTHONPATH": str(PROJECT / "src"), "PYTHONDONTWRITEBYTECODE": "1"}
for command in COMMANDS:
    args = command.split()[1:]
    done = subprocess.run(
        [sys.executable, "-c", CODE, *args],
        cwd=PROJECT, env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True,
    )
    print(f"$ {command}")
    print(done.stdout.rstrip("\n"))
    if done.returncode:
        print(f"[exit code {done.returncode}]")
