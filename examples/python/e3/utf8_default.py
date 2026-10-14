import subprocess
import sys

CHILD = """
import sys, tempfile
print("utf8_mode =", sys.flags.utf8_mode)
with tempfile.TemporaryFile("w+") as f:  # no encoding= given
    f.write("plain text")
"""

for flags in ([], ["-X", "utf8=0"], ["-X", "warn_default_encoding"]):
    result = subprocess.run([sys.executable, *flags, "-c", CHILD],
                            capture_output=True, text=True)
    print(" ".join(flags) or "(no flags)")
    print("   ", result.stdout.strip())
    if result.stderr:
        print("   ", result.stderr.strip().splitlines()[-1])
