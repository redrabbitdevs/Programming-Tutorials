import subprocess
import sys

# The same as typing `python -m todo --help` in this folder.
result = subprocess.run(
    [sys.executable, "-m", "todo", "--help"],
    capture_output=True, text=True,
)
print(result.stdout, end="")
print("[exit", str(result.returncode) + "]")
