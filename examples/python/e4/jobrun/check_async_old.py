import subprocess
import sys

OLD = """
import asyncio
import jobrun.builtin
from jobrun.plugin import REGISTRY

for kind, plugin in sorted(REGISTRY.items()):
    print(kind, asyncio.iscoroutinefunction(plugin.run))
"""

done = subprocess.run(
    [sys.executable, "-W", "error::DeprecationWarning", "-c", OLD],
    capture_output=True, text=True,
)
print("exit code:", done.returncode)
print(done.stderr.strip().splitlines()[-1].split(";")[0])
