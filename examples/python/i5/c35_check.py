"""One command that runs every check this project has.

Run it before each commit. Real projects add ruff, a type checker and pytest to
the list (see the linting lesson); the pattern stays the same.
"""

import subprocess
import sys
from pathlib import Path

PROJECT = Path("c35_project")


def no_leftover_breakpoints():
    """A custom check: fail if any source file still calls breakpoint()."""
    marker = "break" + "point("  # written in two pieces so this file does not flag itself
    hits = [p.name for p in PROJECT.glob("*.py") if marker in p.read_text(encoding="utf-8")]
    return (0 if not hits else 1), "found in " + ", ".join(hits) if hits else ""


def run(command):
    result = subprocess.run(command, capture_output=True, text=True)
    return result.returncode, result.stdout + result.stderr


CHECKS = [
    ("doctests", lambda: run([sys.executable, "-B", "-m", "doctest", str(PROJECT / "wordcount.py")])),
    ("unit tests", lambda: run([sys.executable, "-B", "-m", "unittest", "discover", "-s", str(PROJECT), "-q"])),
    ("breakpoints", no_leftover_breakpoints),
]

failed = []
for name, check in CHECKS:
    code, output = check()
    print(f"{name:12} {'ok' if code == 0 else 'FAILED'}")
    if code != 0:
        failed.append(name)
        print(output)

print("all checks passed" if not failed else f"{len(failed)} check(s) failed: {', '.join(failed)}")
sys.exit(1 if failed else 0)
