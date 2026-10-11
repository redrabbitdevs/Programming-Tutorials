"""Run every crashes/*.crash script and print the error text Python reports.

Each script is copied to a temporary folder as <name>.py and run there, so the
traceback shows a short file name instead of a path from this machine.
"""
import os
import pathlib
import subprocess
import sys
import tempfile

crash_dir = pathlib.Path(__file__).parent / "crashes"
env = dict(os.environ, NO_COLOR="1", PYTHON_COLORS="0")
env.pop("FORCE_COLOR", None)

for script in sorted(crash_dir.glob("*.crash")):
    with tempfile.TemporaryDirectory() as tmp:
        target = pathlib.Path(tmp) / f"{script.stem}.py"
        target.write_text(script.read_text(encoding="utf-8"), encoding="utf-8")
        result = subprocess.run(
            [sys.executable, target.name],
            cwd=tmp,
            capture_output=True,
            text=True,
            encoding="utf-8",
            env=env,
        )
    print(f"--- {script.stem}.py (exit code {result.returncode})")
    # Python 3.15 prints the full path of the script; swap the temporary
    # folder for a stand-in so the output is the same on every machine.
    print(result.stderr.replace(tmp, "/home/you/project").rstrip())
