import subprocess
import sys

LEGACY = """
import asyncio
import profile

flag = True
print(~flag, asyncio.iscoroutinefunction(print))
"""

result = subprocess.run(
    [sys.executable, "-W", "always::DeprecationWarning", "-c", LEGACY],
    capture_output=True, text=True,
)
for line in result.stderr.splitlines():
    if "DeprecationWarning" in line:
        message = line.split("DeprecationWarning: ")[1]
        print(message.split(";")[0].split(". ")[0])
print("program output:", result.stdout.strip())
