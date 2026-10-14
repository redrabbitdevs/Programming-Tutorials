import subprocess
import sys
import tempfile
from pathlib import Path

WORKER = """
import time
running = True
print("ready", flush=True)
while running:
    time.sleep(0.01)
print("worker stopped cleanly", flush=True)
"""

worker = subprocess.Popen([sys.executable, "-c", WORKER],
                          stdout=subprocess.PIPE, text=True)
print(worker.stdout.readline().strip())       # wait until it runs
with tempfile.TemporaryDirectory() as tmp:
    script = Path(tmp, "stop_worker.py")
    script.write_text("import __main__\n__main__.running = False\n",
                      encoding="utf-8")
    sys.remote_exec(worker.pid, str(script))
    rest, _ = worker.communicate(timeout=10)   # file must outlive the run
print(rest.strip())
print("exit code:", worker.returncode)
