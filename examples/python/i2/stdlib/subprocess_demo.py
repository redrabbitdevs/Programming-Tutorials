import subprocess
import sys

result = subprocess.run(
    [sys.executable, "-c", "print('hello from a child process')"],
    capture_output=True,
    text=True,
)
print(result.returncode)
print(result.stdout.strip())

failing = [sys.executable, "-c", "import sys; sys.exit(3)"]
print(subprocess.run(failing).returncode)

try:
    subprocess.run(failing, check=True)
except subprocess.CalledProcessError as error:
    print("failed with status", error.returncode)
