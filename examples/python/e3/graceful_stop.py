import signal
import subprocess
import sys

SERVICE = """
import asyncio, signal, sys

async def main(handle_sigterm):
    stop = asyncio.Event()
    if handle_sigterm:
        asyncio.get_running_loop().add_signal_handler(signal.SIGTERM, stop.set)
    print("ready", flush=True)
    try:
        await stop.wait()  # stands in for serving requests
        print("SIGTERM: finishing open requests")
    finally:
        print("cleanup ran")

asyncio.run(main(sys.argv[1] == "yes"))
"""

for handle in ("no", "yes"):
    child = subprocess.Popen([sys.executable, "-c", SERVICE, handle],
                             stdout=subprocess.PIPE, text=True)
    child.stdout.readline()  # wait for "ready"
    child.send_signal(signal.SIGTERM)
    rest = child.stdout.read().splitlines()
    print(f"handler {handle}: exit {child.wait()}, printed {rest}")
