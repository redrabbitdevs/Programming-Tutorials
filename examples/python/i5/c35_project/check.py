"""Run every check this project has. Exit with status 1 if any fails."""

import subprocess
import sys

CHECKS = [
    ("doctests", [sys.executable, "-m", "doctest", "wordcount.py"]),
    ("unit tests", [sys.executable, "-m", "unittest", "-q"]),
]

failed = []
for name, command in CHECKS:
    result = subprocess.run(command, capture_output=True, text=True)
    status = "ok" if result.returncode == 0 else "FAILED"
    print(f"{name:12} {status}")
    if result.returncode != 0:
        failed.append(name)
        print(result.stdout + result.stderr)

print("all checks passed" if not failed else f"failed: {', '.join(failed)}")
sys.exit(1 if failed else 0)
