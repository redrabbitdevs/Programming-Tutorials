import os
import signal
import subprocess
import sys

# Run `jobrun stop.json --log-level INFO` in a child process, as a
# scheduler or container runtime would.
CODE = "import sys; from jobrun.cli import main; sys.exit(main())"
args = ["stop.json", "--log-level", "INFO"]
child = subprocess.Popen([sys.executable, "-c", CODE, *args],
                         stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                         text=True, env={**os.environ, "PYTHONPATH": "src"})

# Wait until the quick job has finished, then ask the child to stop.
for line in child.stderr:
    print("stderr:", line.rstrip())
    if line.startswith("INFO quick-api: ok"):
        child.send_signal(signal.SIGTERM)
        break
out, err = child.communicate(timeout=10)
for line in err.splitlines():
    print("stderr:", line)
print(out, end="")
print("exit code:", child.returncode)
