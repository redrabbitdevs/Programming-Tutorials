import subprocess
import sys
import tempfile
from pathlib import Path

WORKER = """
import time
jobs = ["resize", "upload", "notify"]
running = True
print("ready", flush=True)
while running:
    time.sleep(0.01)
"""

PEEK = """
import __main__
print("pending jobs:", len(__main__.jobs), flush=True)
__main__.running = False
"""

worker = subprocess.Popen([sys.executable, "-c", WORKER],
                          stdout=subprocess.PIPE, text=True)
print(worker.stdout.readline().strip())
with tempfile.TemporaryDirectory() as tmp:
    script = Path(tmp, "peek.py")
    script.write_text(PEEK, encoding="utf-8")
    sys.remote_exec(worker.pid, str(script))
    rest, _ = worker.communicate(timeout=10)
print(rest.strip())
