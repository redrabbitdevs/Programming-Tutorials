import subprocess
import sys

LEGACY = """
import asyncio

async def job():
    pass

print("coroutine function?", asyncio.iscoroutinefunction(job))
"""

for flags in ([], ["-W", "error::DeprecationWarning"]):
    result = subprocess.run([sys.executable, *flags, "-c", LEGACY],
                            capture_output=True, text=True)
    print(" ".join(flags) or "(no flags)", "-> exit", result.returncode)
    if result.stdout:
        print("    stdout:", result.stdout.strip())
    warning = result.stderr.strip().splitlines()[-1]
    print("    stderr:", warning.split("Warning: ")[1].split(";")[0])
