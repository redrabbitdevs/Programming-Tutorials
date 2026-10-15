import signal
import subprocess
import sys
import tempfile
from pathlib import Path

# -u: unbuffered, so each line reaches the pipe as soon as it is printed.
TOOL = [sys.executable, "-u", str(Path(__file__).with_name("numlines.py"))]


def start(*args):
    return subprocess.Popen(TOOL + [*args], text=True, stdin=subprocess.PIPE,
                            stdout=subprocess.PIPE, stderr=subprocess.PIPE)


# printf 'alpha\nbeta\n' | numlines
done = subprocess.run(TOOL, input="alpha\nbeta\n", capture_output=True,
                      text=True)
print(done.stdout, end="")
print("stdin: exit", done.returncode, "stderr", repr(done.stderr))

# numlines big.txt | head -1
with tempfile.TemporaryDirectory() as folder:
    big = Path(folder, "big.txt")
    big.write_text("line\n" * 100_000, encoding="utf-8")
    with start(big) as child:
        print(child.stdout.readline(), end="")
        child.stdout.close()  # head leaves after one line
        code = child.wait()
        print("head -1: exit", code, "stderr", repr(child.stderr.read()))

# Ctrl-C while numlines waits for more input
with start() as child:
    child.stdin.write("first\n")
    child.stdin.flush()
    print(child.stdout.readline(), end="")
    child.send_signal(signal.SIGINT)
    code = child.wait()
    print("Ctrl-C: exit", code, "stderr", repr(child.stderr.read()))
