import subprocess
import sys

# A child process that hangs. faulthandler dumps its stack after 0.5 s.
CHILD = """
import faulthandler
import time

faulthandler.dump_traceback_later(0.5, exit=True)


def wait_for_lock():
    time.sleep(30)


wait_for_lock()
"""

result = subprocess.run([sys.executable, "-c", CHILD],
                        capture_output=True, text=True)
print("exit code:", result.returncode)
for line in result.stderr.splitlines():
    if line.startswith(("Timeout", "  File")):
        print(line)
