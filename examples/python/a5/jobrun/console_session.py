"""Run the jobrun command the way the lesson's console blocks show it.

Each command runs the real command code in a fresh interpreter, with the
project's src folder on the path (the job `pip install -e .` does on a
learner's machine). The script prints each command line, its output (both
streams, in order) and, when it is not 0, its exit code.
"""

import os
import subprocess
import sys
from pathlib import Path

PROJECT = Path(__file__).resolve().parent
CODE = "import sys; from jobrun.cli import main; sys.exit(main())"
COMMANDS = [
    "jobrun jobs.json",
    "jobrun jobs.json --pool interpreter",
    "jobrun bad.json",
    "jobrun missing.json",
]

env = {**os.environ, "PYTHONPATH": str(PROJECT / "src"),
       "PYTHONDONTWRITEBYTECODE": "1"}
for command in COMMANDS:
    args = command.split()[1:]
    done = subprocess.run(
        [sys.executable, "-c", CODE, *args],
        cwd=PROJECT, env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
        text=True,
    )
    print(f"$ {command}")
    print(done.stdout.rstrip("\n"))
    if done.returncode:
        print(f"[exit code {done.returncode}]")
